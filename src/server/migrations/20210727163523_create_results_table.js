exports.up = function (knex) {
  return knex.schema.createTable('results', (table) => {
    table.integer('boardId').unsigned().notNullable().references('boards.id');
    table
      .integer('candidateId')
      .unsigned()
      .notNullable()
      .references('candidates.id')
      .onDelete('CASCADE');
    table.primary(['boardId', 'candidateId']);
    table.integer('rank').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('results');
};
