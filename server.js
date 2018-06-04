const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Visualization';

app.use(express.static('public'));

app.get('/', (request, response) => {

});

app.get('/api/v1/denver', (request, response) => {
  const querySelector = request.param('dayRange');
  
  if (querySelector) {
    database('denver').where('Time', '>', querySelector).select()
      .then( range => {
        if (range.length) {
          console.log(range)
          response.status(200).json(range)
        } else {
          response.status(404).json({
            error: `Could not find data with Hour ${querySelector}`
          });
        };
      })
      .catch( error => {
        response.status(500).json({error})
      })
  }

  else {
    database('denver').select()
      .then( denverData => {
        response.status(200).json(denverData)
      })
      .catch( error => {
        response.status(500).json({error})
      })
  }
  
});

app.get('/api/v1/denver/:hour', (request, response) => {
  database('denver').where('Time', request.params.hour).select()
    .then( hour => {
      if (hour.length) {
        response.status(200).json(hour)
      } else {
        response.status(404).json({
          error: `Could not find data with Hour ${request.params.hour} `
        })
      }
    })
    .catch( error => {
      response.status(500).json({error})
    });
});



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = { app, database }