require('dotenv').config();

const { client, usersIndex } = require('../../../config/elastic');
const knex = require('../../../config/db');

const moveUSersfromDBtoES = async () => {
  const DBusers = await knex('users').select(
    'users.id',
    'users.fullname',
    'users.email',
    'users.createdOn',
    'users.firebaseUId',
  );
  await DBusers.map(async (user) => {
    const newESuser = {
      fullname: user.fullname, // fullname
      email: user.email,
    };
    //await?
    await client.index({
      id: user.id,
      index: usersIndex,
      body: newESuser,
    });
  });
};

// client.indices.exists({
//   index: string | string[],
// //   local: boolean,
// //   ignore_unavailable: boolean,
// //   allow_no_indices: boolean,
// //   expand_wildcards: 'open' | 'closed' | 'hidden' | 'none' | 'all',
// //   flat_settings: boolean,
// //   include_defaults: boolean
// })

// client.indices.create({
//   index: string,
// //   include_type_name: boolean,
// //   wait_for_active_shards: string,
// //   timeout: string,
// //   master_timeout: string,
//     body: {mappings:{}},
// });

const createIndex = () => {
  //does the index exist? move
  //if not, create and move
};

moveUSersfromDBtoES().then(() => {
  console.log('moving from DB to ES done!');
  knex.destroy();
});
