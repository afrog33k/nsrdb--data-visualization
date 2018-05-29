
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('denver', 
      function(table) {
        table.increments('id').primary();
        table.string('Latitude');
        table.string('Longitude');
        table.string('Day');
        table.string('Time');
        table.integer('DNI').unsigned();
        table.timestamps(true, true);
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('denver')
  ])
};
