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
          firebaseToken: 'supersecret1',
          profilePicture: '',
          status: 'ACTIVE',
        },
        {
          id: 2,
          fullName: 'Morty Smith',
          email: 'morty@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseToken: 'supersecret2',
          profilePicture: '',
          status: 'ACTIVE',
        },
        {
          id: 3,
          fullName: 'Beth Smith',
          email: 'beth@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseToken: 'supersecret3',
          profilePicture: '',
          status: 'ACTIVE',
        },
        {
          id: 4,
          fullName: 'Summer Smith',
          email: 'summer@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseToken: 'supersecret4',
          profilePicture: '',
          status: 'ACTIVE',
        },
        {
          id: 5,
          fullName: 'Jerry Smith',
          email: 'nobodylovesme@universe.net',
          createdOn: '2013-12-02 22:30:00',
          firebaseToken: 'supersecret5',
          profilePicture: '',
          status: 'ACTIVE',
        },
      ]);
    });
};
