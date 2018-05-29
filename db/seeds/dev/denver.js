const solarData = require('../../../masterData');

exports.seed = function(knex, Promise) {
  return knex('denver').del()
    .then(() => {
      let solarPromises = []
      solarData.forEach(dataPoint => {
        solarPromises.push(createSolarPoints(knex, dataPoint))
      })
      return Promise.all(solarPromises)

    });
};

const createSolarPoints = (knex, dataPoint) => {
  const timePromises = dataPoint.map(time => {
    return knex('denver').insert({
      Latitude: time.Latitude,
      Longitude: time.Longitude,
      Day: time.Day,
      Time: time.Time,
      DNI: time.DNI
    })
  })
  return Promise.all(timePromises)
}

