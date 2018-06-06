const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Visualization';

app.use(express.static('public'));

// eslint-disable-next-line
app.get('/', (request, response) => {

});

app.get('/api/v1/denver', (request, response) => {
  const queryStart = `2016-6-${request.query.start}`
  const queryEnd = `2016-6-${request.query.end}`

  if (queryStart !== '2016-6-undefined') {
    database('denver').whereBetween('Day', [queryStart, queryEnd]).select()
      .then(range => {
        if (range.length) {
          response.status(200).json(range)
        } else {
          response.status(500).json({err: 'Date range is invalid'})
        }
      })
      .catch(error => {
        response.status(500).json({error})
      })
  } else {
    database('denver').select()
      .then(denverData => {
        response.status(200).json(denverData)
      })
      .catch(error => {
        response.status(500).json({error})
      })
  }
});

app.get('/api/v1/denver/:day', (request, response) => {
  let day = `2016-6-${request.params.day}`

  database('denver').where('Day', day).select()
    .then(day => {
      if (day.length) {
        response.status(200).json(day)
      } else {
        response.status(404).json({
          error: `Could not find data from June ${request.params.day}`
        })
      }
    })
    .catch(error => {
      response.status(500).json({error})
    });
});



app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = { app, database }