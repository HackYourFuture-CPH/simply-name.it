exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          fullName: 'Rick Sanchez',
          email: 'rick@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseUId: 'supersecret1',
        },
        {
          id: 2,
          fullName: 'Morty Smith',
          email: 'morty@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseUId: 'supersecret2',
        },
        {
          id: 3,
          fullName: 'Beth Smith',
          email: 'beth@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseUId: 'supersecret3',
        },
        {
          id: 4,
          fullName: 'Summer Smith',
          email: 'summer@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseUId: 'supersecret4',
        },
        {
          id: 5,
          fullName: 'Jerry Smith',
          email: 'nobodylovesme@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseUId: 'supersecret5',
        },
      ]);
    });
};
