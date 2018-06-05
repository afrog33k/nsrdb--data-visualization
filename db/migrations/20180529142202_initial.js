<<<<<<< HEAD

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('denver', 
      function(table) {
        table.increments('id').primary();
        table.string('Latitude');
        table.string('Longitude');
        table.string('Day');
        table.integer('Time').unsigned();
        table.integer('DNI').unsigned();
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('denver')
  ])
};
=======

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
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('denver')
  ])
};
>>>>>>> lint script file for tests
