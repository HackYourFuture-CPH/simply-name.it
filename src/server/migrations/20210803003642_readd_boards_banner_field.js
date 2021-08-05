exports.up = function (knex) {
  return knex.schema.table('boards', (table) => {
    table.binary('banner');
  });
};

exports.down = function (knex) {
  return knex.schema.table('boards', (table) => {
    table.dropColumn('banner');
  });
};
