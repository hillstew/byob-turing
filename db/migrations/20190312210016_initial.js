
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cohorts', function(table) {
      table.increments('id').primary();
      table.integer('cohort_num');
      table.string('current_mod');
      table.string('lead_instructor');
      table.timestamps(true, true);
    }),
    
    knex.schema.createTable('students', function(table) {
      table.increments('id').primary();
      table.string('pronouns');
      table.string('first_name');
      table.string('last_name');
      table.integer('cohort_id').unsigned()
      table.foreign('cohort_id')
        .references('cohorts.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('students'),
    knex.schema.dropTable('cohorts')
  ])
};
