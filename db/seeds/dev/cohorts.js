const cohorts = require('../../../data');

const createCohort = (knex, cohort) => {
  return knex('cohorts').insert({
    cohort_num: cohort.cohort_num,
    current_mod: cohort.current_mod,
    lead_instructor: cohort.lead_instructor
  }, 'id')
    .then(cohortId => {
      let studentPromises = [];
      cohort.students.forEach(student => {
        studentPromises.push(
          createStudent(knex, {
            pronouns: student.pronouns,
            first_name: student.first_name,
            last_name: student.last_name,
            cohort_id: cohortId[0]
          })
        )
      });
      return Promise.all(studentPromises)
    })
}

const createStudent = (knex, student) => {
  return knex('students').insert(student)
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(() => knex('cohorts').del())

    .then(function () {
      let cohortPromises = [];

      cohorts.forEach(cohort => {
        cohortPromises.push(createCohort(knex, cohort))
      });

      return Promise.all(cohortPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
