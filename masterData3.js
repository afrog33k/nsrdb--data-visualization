const fs = require('fs');
const data148688 = require('./data/148688.json');
const data148689 = require('./data/148689.json');
const data148690 = require('./data/148690.json');
const data148691 = require('./data/148691.json');
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
const data149175 = require('./data/149175.json');
const data149176 = require('./data/149176.json');
const data149177 = require('./data/149177.json');
const data149178 = require('./data/149178.json');
const data149179 = require('./data/149179.json');
const data149180 = require('./data/149180.json');
const data149181 = require('./data/149181.json');
const data149182 = require('./data/149182.json');
const data149183 = require('./data/149183.json');
const data149184 = require('./data/149184.json');
const data149185 = require('./data/149185.json');
const data149186 = require('./data/149186.json');
const data149187 = require('./data/149187.json');
const data149188 = require('./data/149188.json');
const data149189 = require('./data/149189.json');
const data149190 = require('./data/149190.json');
const data149191 = require('./data/149191.json');
const data149192 = require('./data/149192.json');
const data149193 = require('./data/149193.json');
const data149194 = require('./data/149194.json');
const data149195 = require('./data/149195.json');
const data149196 = require('./data/149196.json');


const allFiles = [data148688, data148689, data148690, data148691, 
  data148692, data148693, data148694, data148695, data148696, data148697, 
  data148698, data148699, data148700, data148701, data148702, data148703, 
  data148704, data148705, data148706, data148707, data148708, data148709,
  data149175, data149176, data149177, data149178, data149179, data149180, 
  data149181, data149182, data149183, data149184, data149185, data149186, 
  data149187, data149188, data149189, data149190, data149191, data149192, 
  data149193, data149194, data149195, data149196]


const dataCleaner = (datasetInput) => {
  let dataset = datasetInput
  let infoObject = dataset.splice(0, 1)
  const timeArray = dataset.reduce((array, time) => {
    if (time.Month == 6 && time.Minute == 0 
      && time.Day >= 14 && time.Day <= 21) {
      array.push({
        Latitude: infoObject[0].Latitude,
        Longitude: infoObject[0].Longitude,
        Day: `2016-${time.Month}-${time.Day}`,
        Time: time.Hour,
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
    if (err) {
      // eslint-disable-next-line
      return console.log('write file error', err);
    }
  })
  // eslint-disable-next-line
  console.log('data saved to clean-data file');
}

addFile(allFiles)