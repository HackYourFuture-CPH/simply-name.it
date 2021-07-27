// This is a migration for Ballots table

exports.up = function (knex) {
  return knex.schema.createTable('ballots', (table) => {
    table.integer('userId').unsigned().notNullable().references('users.id');
    table.integer('boardId').unsigned().notNullable().references('boards.id');
    table
      .integer('candidateId')
      .unsigned()
      .notNullable()
      .references('candidates.id');
    table.primary(['boardId', 'userId', 'candidateId']);
    table.integer('rank').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('ballots');
};
