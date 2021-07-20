exports.up = function (knex) {
  return knex.schema.createTable('boards', (table) => {
    table.increments();
    table
      .integer('creatorId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users');
    table.timestamp('createdOn').defaultTo(knex.fn.now()).notNullable();
    table.varchar('title').notNullable();
    table.datetime('deadline').notNullable();
    table.boolean('isDeleted').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('boards');
};
