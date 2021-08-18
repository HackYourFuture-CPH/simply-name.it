exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('fullName').notNullable().index();
    table.string('email').unique().notNullable().index();
    table.datetime('createdOn').defaultTo(knex.fn.now()).notNullable();
    table.string('firebaseUId').notNullable();
    table.string('photoUrl');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
