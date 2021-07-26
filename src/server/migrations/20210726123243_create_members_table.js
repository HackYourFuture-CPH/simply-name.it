exports.up = function (knex) {
  return knex.schema.createTable('members', (table) => {
    table.integer('boardId').unsigned().notNullable().references('boards.id');
    table.integer('userId').unsigned().notNullable().references('users.id');
    table.primary(['boardId', 'userId']);
    table
      .enum('role', [
        'basic',
        'owner',
        'add_candidates',
        'block_candidates',
        'add_members',
      ])
      .defaultTo('basic');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('members');
};
