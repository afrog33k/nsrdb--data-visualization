const fs = require('fs');
const data148692 = require('./data/148692.json');
const data148693 = require('./data/148693.json');
const data148694 = require('./data/148694.json');
const data148695 = require('./data/148695.json');
const data148696 = require('./data/148696.json');
const data148697 = require('./data/148697.json');
const data148698 = require('./data/148698.json');
const data148699 = require('./data/148699.json');
const data148700 = require('./data/148700.json');
const data148701 = require('./data/148701.json');
const data148702 = require('./data/148702.json');
const data148703 = require('./data/148703.json');
const data148704 = require('./data/148704.json');
const data148705 = require('./data/148705.json');
const data148706 = require('./data/148706.json');
const data148707 = require('./data/148707.json');
const data148708 = require('./data/148708.json');
const data148709 = require('./data/148709.json');


const allFiles = [data148688, data148689, data148690, data14891, 
data148692, data148693, data148694, data148695, data148696, 
data148697, data148698, data148699, data148700, data148701, data148702, data148703, 
data148704, data148705, data148706, data148707, data148708, data148709]


const dataCleaner = (datasetInput) => {
  let dataset = datasetInput
  let infoObject = dataset.splice(0, 1)
  const timeArray = dataset.reduce((array, time) => {
    if (time.Month == 6 && time.Minute == 0 && time.Day == 21){
      array.push({
        Latitude: infoObject[0].Latitude,
        Longitude: infoObject[0].Longitude,
        Day: `2016-${time.Month}-${time.Day}`,
        Time: `${time.Hour}`,
        DNI: time.DNI
      })
    }
    return array
  }, [])
  return timeArray
}

const addFile = async (allFiles) => {
  const superCleanDataPromises = await allFiles.map(async file => {
    let data = await dataCleaner(file)
    return data
  })
  const superCleanData = await Promise.all(superCleanDataPromises)
  const solarData = JSON.stringify(superCleanData, null, ' ')
  fs.writeFile('./clean-data3.json', solarData, 'utf8', err => {
    if(err) {
      return console.log('write file error', err);
    }
  })
    console.log('data saved to clean-data file');
}

addFile(allFiles)