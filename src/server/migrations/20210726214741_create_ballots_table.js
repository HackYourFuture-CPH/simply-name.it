// This is a migration for Ballots table

exports.up = function (knex) {
  return knex.schema.createTable('ballots', (table) => {
    table.integer('userId').unsigned().notNullable().references('users.id');
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
    table.primary(['boardId', 'userId', 'candidateId']);
    table.integer('rank').notNullable().defaultTo(-1);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('ballots');
};
