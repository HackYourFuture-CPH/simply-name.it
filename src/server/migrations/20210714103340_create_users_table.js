exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('fullname').notNullable().index();
    table.string('email').notNullable();
    table.datetime('createdOn').defaultTo(knex.fn.now()).notNullable();
    table.string('firebaseToken', 152).notNullable();
    table.binary('profilePicture');
    table.enum('role', ['creator', 'member']); // should i give a defualt here like this : .defaultTo('creator')
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
