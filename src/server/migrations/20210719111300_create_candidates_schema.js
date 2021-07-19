exports.up = function (knex) {
  return knex.schema.createTable('candidates', (table) => {
    table.increments('id');
    table
      .integer('boardId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('boards');
    table.string('name').notNullable();
    table.boolean('isBlocked').notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('candidates');
};
