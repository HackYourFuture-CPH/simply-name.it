exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('candidates')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('candidates').insert([
        {
          id: 1,
          boardId: 1,
          name: 'Breaker of Sky',
          isBlocked: false,
        },
        {
          id: 2,
          boardId: 1,
          name: 'Slayer of Mountain',
          isBlocked: false,
        },
        {
          id: 3,
          boardId: 1,
          name: 'Balthromaw',
          isBlocked: false,
        },
      ]);
    });
};
