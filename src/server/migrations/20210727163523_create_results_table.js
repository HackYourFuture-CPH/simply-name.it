exports.up = function (knex) {
  return knex.schema.createTable('results', (table) => {
    table
      .integer('boardId')
      .unsigned()
      .notNullable()
      .references('boards.id')
      .onDelete('CASCADE');
    table
      .integer('candidateId')
      .unsigned()
      .notNullable()
      .references('candidates.id');
    table.primary(['boardId', 'candidateId']);
    table.integer('rank').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('results');
};
