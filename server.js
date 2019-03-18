const express = require('express');
const app = express();
app.use(express.json());
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}.`);
});

// GET all the cohorts
app.get('/api/v1/cohorts', (request, response) => {
  database('cohorts')
    .select()
    .then(cohorts => {
      response.status(200).json(cohorts);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// GET one cohort based off the required param
app.get('/api/v1/cohorts/:id', (request, response) => {
  const { id } = request.params;
  database('cohorts')
    .where('id', id)
    .select()
    .then(cohort => {
      if (cohort.length) {
        return response.status(200).json(cohort);
      } else {
        return response.status(404).json({ error: `There was not a cohort with the id of ${id}` });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// GET all the students
app.get('/api/v1/students', (request, response) => {
  database('students')
    .select()
    .then(students => {
      response.status(200).json(students);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// GET one student based off the required param
app.get('/api/v1/students/:id', (request, response) => {
  const { id } = request.params;
  database('students')
    .where('id', id)
    .select()
    .then(student => {
      if (student.length) {
        return response.status(200).json(student);
      } else {
        return response.status(404).json({ error: `There was not a student with the id of ${id}` });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// POST a new cohort
app.post('/api/v1/cohorts', (request, response) => {
  const cohort = request.body;
  let requiredParams = ['cohort_num', 'current_mod', 'lead_instructor'];
  requiredParams.forEach(param => {
    if (!cohort[param]) {
      return response.status(422).send({
        error: `Expected format: { cohort_num: <String>, current_mod: <String>, lead_instructor: <String> }. You are missing a "${param}" property.`
      });
    }
  });

  database('cohorts')
    .insert(cohort, 'id')
    .then(cohort => {
      response.status(201).json({ id: cohort[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// POST a new student
app.post('/api/v1/students', (request, response) => {
  const student = request.body;
  let requiredParams = ['pronouns', 'first_name', 'last_name', 'cohort_id'];
  requiredParams.forEach(param => {
    if (!student[param]) {
      return response.status(422).send({
        error: `Expected format: { pronouns: <String>, first_name: <String>, last_name: <String>, cohort_id: <Integer> }. You're missing a ${param} property.`
      });
    }
  });

  database('students')
    .insert(student, 'id')
    .then(student => {
      response.status(201).json({ id: student[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// DELETE a student based off the student id (required)
app.delete('/api/v1/students/:id', (request, response) => {
  const { id } = request.params;
  database('students')
    .where('id', id)
    .del()
    .then(student => {
      if (student) {
        response.status(201).json({ message: `You successfully deleted the student with the ID of ${id}` });
      } else {
        response.status(404).json({ error: `There was not a student with the provided id: ${id}.` });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
