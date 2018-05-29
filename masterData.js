const data138176 = require('./data/138176.json');
const data138177 = require('./data/138177.json');
const data138178 = require('./data/138178.json');

const allFiles = [data138176, data138177, data138178];

const dataCleaner = (datasetInput) => {
  let dataset = datasetInput
  let infoObject = dataset.splice(0, 1)
  const timeArray = dataset.map(time => {
    return {
      Latitude: infoObject[0].Latitude,
      Longitude: infoObject[0].Longitude,
      Day: `2016-${time.Month}-${time.Day}`,
      Time: `${time.Hour}:${time.Minute}`,
      DNI: time.DNI
    }
  })
  return timeArray
}

const superCleanData = allFiles.map(file => {
  return dataCleaner(file)
})

module.exports = superCleanData;


