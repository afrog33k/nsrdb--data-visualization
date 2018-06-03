// const solarData = require('../../../masterData');
const mockData = [[
  {
    Latitude: 39.09,
    Longitude: -105.86,
    Day: '2016-6-21',
    Time: 10,
    DNI: 100
  },
  {
    Latitude: 39.17,
    Longitude: -105.26,
    Day: '2016-6-21',
    Time: 12,
    DNI: 200
  },
  {
    Latitude: 39.53,
    Longitude: -105.02,
    Day: '2016-6-21',
    Time: 14,
    DNI: 300
  }
]]

exports.seed = function(knex, Promise) {
  return knex('denver').del()
    .then(() => {
      let solarPromises = []
      mockData.forEach(dataPoint => {
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

