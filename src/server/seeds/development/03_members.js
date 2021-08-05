exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('members')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {
          boardId: 1,
          userId: 1,
          role: 'basic',
        },
        {
          boardId: 1,
          userId: 2,
          role: 'owner',
        },
        {
          boardId: 1,
          userId: 3,
          role: 'basic',
        },
        {
          boardId: 1,
          userId: 4,
          role: 'basic',
        },
      ]);
    });
};
