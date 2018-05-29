import 138176 from './data/138176.json';

const allFiles = [138176, ]

const dataCleaner = (datasetInput) => {
  let dataset = datasetInput
  let infoObject = dataset.splice(0, 1)
  const timeArray = dataset.map(time => {
    return {
      day: `2016-${time.Month}-${time.Day}`,
      time: `${time.Hour}:${time.Minute}`,
      DNI: time.DNI
    }
  })
  let newObject = {
    Latitude: infoObject[0].Latitude,
    Longitude: infoObject[0].Longitude,
    timeData: timeArray
  }
  return newObject
}

const superCleanData = allFiles.map(file => {
  dataCleaner(file)
})


