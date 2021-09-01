exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ballots')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ballots').insert([
        {
          boardId: 1,
          userId: 1,
          candidateId: 1,
          rank: 1,
        },
        {
          boardId: 1,
          userId: 1,
          candidateId: 2,
          rank: 2,
        },
        {
          boardId: 1,
          userId: 1,
          candidateId: 3,
          rank: 3,
        },
        {
          boardId: 1,
          userId: 2,
          candidateId: 1,
          rank: 2,
        },
        {
          boardId: 1,
          userId: 2,
          candidateId: 2,
          rank: 1,
        },
        {
          boardId: 1,
          userId: 2,
          candidateId: 3,
          rank: 3,
        },
        {
          boardId: 1,
          userId: 3,
          candidateId: 1,
          rank: 2,
        },
        {
          boardId: 1,
          userId: 3,
          candidateId: 2,
          rank: 3,
        },
        {
          boardId: 1,
          userId: 3,
          candidateId: 3,
          rank: 1,
        },
        {
          boardId: 1,
          userId: 4,
          candidateId: 1,
          rank: 3,
        },
        {
          boardId: 1,
          userId: 4,
          candidateId: 2,
          rank: 2,
        },
        {
          boardId: 1,
          userId: 4,
          candidateId: 3,
          rank: 1,
        },
        {
          boardId: 2,
          userId: 95,
          candidateId: 4,
          rank: 1,
        },
        {
          boardId: 2,
          userId: 95,
          candidateId: 5,
          rank: 2,
        },
        {
          boardId: 2,
          userId: 75,
          candidateId: 3,
          rank: 3,
        },
      ]);
    });
};
