exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('boards')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('boards').insert([
        {
          id: 1,
          creatorId: 2,
          createdOn: '2013-12-02 22:30:00',
          title: 'What should I name my pet?',
          deadline: '2021-08-13 00:00:00',
          isDeleted: false,
        },
        {
          id: 2,
          creatorId: 2,
          createdOn: '2021-08-01 22:30:00',
          title: 'Puppy name',
          deadline: '2021-08-31 00:00:00',
          isDeleted: false,
        },
      ]);
    });
};
