exports.up = function (knex) {
  return knex.schema.createTable('members', (table) => {
    table.integer('board_id').references('id').inTable('boards');
    table.integer('user_id').references('id').inTable('users');
    table.enum('role', ['member', 'admin']).defaultTo('member');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('members');
};

// Table members {
//   boardId int [pk, ref: > boards.id]
//   userId int [pk, ref: > users.id]
//   role enum
// }
