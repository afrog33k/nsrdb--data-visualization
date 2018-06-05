const solarData1 = require('../../../clean-data.json');
const solarData2 = require('../../../clean-data2.json');
const solarData3 = require('../../../clean-data3.json');
const solarData = [...solarData1, ...solarData2, ...solarData3]

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
      Latitude: time.Latitude || 39.49,
      Longitude: time.Longitude || -105.86,
      Day: time.Day,
      Time: time.Time,
      DNI: time.DNI
    })
  })
  return Promise.all(timePromises)
}

