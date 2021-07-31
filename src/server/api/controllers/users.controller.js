/* TODO: This is an example controller to illustrate a server side controller.
Can be deleted as soon as the first real controller is added. */

const knex = require('../../config/db');

const getUsers = async () => {
  return knex('users').select(
    'users.id',
    'users.fullname',
    'users.createdOn',
    'users.firebaseUId',
  );
};

module.exports = {
  getUsers,
};
