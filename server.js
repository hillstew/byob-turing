const express = require('express');
const app = express()
app.use(express.json());
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3001)
app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')}.`)
});


app.get('/api/v1/cohorts', (request, response) => {
  database('cohorts').select()
    .then((cohorts) => {
      response.status(200).json(cohorts)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/cohorts/:id', (request, response) => {
  database('cohorts').select()
    .then((cohorts) => {
      response.status(200).json(cohorts)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/students', (request, response) => {
  database('students').select()
    .then((students) => {
      response.status(200).json(students)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/students/:id', (request, response) => {
  database('students').select()
    .then((students) => {
      response.status(200).json(students)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})

app.post('/api/v1/cohorts', (request, response) => {
  const cohort = request.body;

  for (let requiredParam of ['cohort_num', 'current_mod', 'lead_instructor']) {
    if (!cohort[requiredParam]) {
      return response
        .status(422)
        .send({ error: `Expected format: 
        { 
          cohort_num: <String>, 
          current_mod: <String>, 
          lead_instructor: <String> 
        }. You're missing a "${requiredParam}" property.` 
      });
    }
  }

  database('cohorts').insert(cohort, 'id')
    .then(cohort => {
      response.status(201).json({ id: cohort[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/students', (request, response) => {
  console.log(request.body)
  const student = request.body;
  let requiredParams = ['pronouns', 'first_name', 'last_name', 'cohort_id'];
  requiredParams.forEach(param => {
    if (!student[param]) {
      return response
        .status(422)
        .send({ error: `Expected format: 
        { 
          pronouns: <String>, 
          first_name: <String>, 
          last_name: <String>,
          cohort_id: <Integer>
        }. You're missing a "${requiredParam}" property.` 
      });
    }
  })

  database('students').insert(student, 'id')
    .then(student => {
      response.status(201).json({ id: student[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/students/:id', (request, response) => {

})