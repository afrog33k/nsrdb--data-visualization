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
  database('denver').select()
    .then( denverData => {
      response.status(200).json(denverData)
    })
    .catch( error => {
      response.status(500).json({error})
    })
});

app.get('/api/v1/denver/:day', (request, response) => {
  database('denver').where('Day', `2016-6-${request.params.day}`).select()
    .then( day => {
      if (day.length) {
        response.status(200).json(day)
      } else {
        response.status(404).json({
          error: `Could not find data with Day ${request.params.day} `
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