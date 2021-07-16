exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('fullname').notNullable().index();
    table.string('email').unique().notNullable().index();
    table.datetime('createdOn').defaultTo(knex.fn.now()).notNullable();
    table.string('uid').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
