exports.up = function (knex) {
  return knex.schema.createTable('members', (table) => {
    table.integer('board_id').references('id').inTable('boards');
    table.integer('user_id').references('id').inTable('users');
    table.integer('role').references('id').inTable('roles');
    // current DB setup does ot have roles table, but
    // I did this in regards to Niels' comments on PR #58
    // https://github.com/HackYourFuture-CPH/simply-name.it/pull/58
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
