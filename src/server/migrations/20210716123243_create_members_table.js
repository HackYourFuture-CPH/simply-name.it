exports.up = function (knex) {
  return knex.schema.createTable('members', (table) => {
    table
      .integer('boardId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('boards');
    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users');
    table.primary(['boardId', 'userId']);
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
