require('dotenv').config();

const { client, usersIndex } = require('../../../config/elastic');
const knex = require('../../../config/db');

const findIndex = async (index) => {
  const indexExists = await client.indices.exists({
    index: index,
  });
  return indexExists.body;
};

const createIndex = async (index) => {
  if (await findIndex(index)) {
    await client.indices.delete({
      index: index,
    });
  }

  await client.indices.create({
    index: index,
    body: {
      mappings: {
        dynamic: 'strict',
        properties: {
          fullName: {
            type: 'keyword',
            fields: {
              autocomplete: {
                // looks like this subfield is not being placed into mapping
                type: 'search_as_you_type',
              },
            },
          },
          email: {
            type: 'keyword',
          },
        },
      },
    },
  });
  const indexMapping = await client.indices.get({
    index: index,
  });
  console.log(indexMapping);
  console.log(`'${index}' index created! `);
};

const moveUSersfromDBtoES = async () => {
  const DBusers = await knex('users').select(
    'users.id',
    'users.fullName',
    'users.email',
    'users.createdOn',
    'users.firebaseUId',
  );

  const usersPromises = DBusers.map(async (user) => {
    const newESuser = {
      fullName: user.fullName, // fullname
      email: user.email,
    };
    //await?
    const DBuserToES = await client.index({
      id: user.id,
      index: usersIndex,
      body: newESuser,
    });
    return DBuserToES;
  });
  const resolveUsersPromises = await Promise.all(usersPromises);
  console.log('promises', resolveUsersPromises);
};

createIndex(usersIndex).then(() =>
  moveUSersfromDBtoES().then(() => {
    console.log('moving from DB to ES done!');
    knex.destroy();
  }),
);
