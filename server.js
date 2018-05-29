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
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});