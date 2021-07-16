// This is a migration for Results table

exports.up = function (knex) {
  return knex.schema.createTable('results', (table) => {
    table.integer('fk_boardId').unsigned().notNullable();
    table.foreign('fk_boardId').references('boards.id');
    table.integer('fk_candidateId').unsigned().notNullable();
    table.foreign('fk_candidateId').references('candidates.id');
    table.integer('rank').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('results');
};
