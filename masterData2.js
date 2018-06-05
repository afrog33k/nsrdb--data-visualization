const fs = require('fs');
const data143882 = require('./data/143882.json');
const data143883 = require('./data/143883.json');
const data143884 = require('./data/143884.json');
const data143885 = require('./data/143885.json');
const data143886 = require('./data/143886.json');
const data143887 = require('./data/143887.json');
const data143888 = require('./data/143888.json');
const data143889 = require('./data/143889.json');
const data143890 = require('./data/143890.json');
const data143891 = require('./data/143891.json');
const data143892 = require('./data/143892.json');
const data143893 = require('./data/143893.json');
const data143894 = require('./data/143894.json');
const data143895 = require('./data/143895.json');
const data143896 = require('./data/143896.json');
const data143897 = require('./data/143897.json');
const data143898 = require('./data/143898.json');
const data143899 = require('./data/143899.json');
const data143900 = require('./data/143900.json');
const data143901 = require('./data/143901.json');
const data143902 = require('./data/143902.json');
const data143903 = require('./data/143903.json');
const data144358 = require('./data/144358.json');
const data144359 = require('./data/144359.json');
const data144360 = require('./data/144360.json');
const data144361 = require('./data/144361.json');
const data144362 = require('./data/144362.json');
const data144363 = require('./data/144363.json');
const data144364 = require('./data/144364.json');
const data144365 = require('./data/144365.json');
const data144366 = require('./data/144366.json');
const data144367 = require('./data/144367.json');
const data144368 = require('./data/144368.json');
const data144369 = require('./data/144369.json');
const data144370 = require('./data/144370.json');
const data144371 = require('./data/144371.json');
const data144372 = require('./data/144372.json');
const data144373 = require('./data/144373.json');
const data144374 = require('./data/144374.json');
const data144375 = require('./data/144375.json');
const data144376 = require('./data/144376.json');
const data144377 = require('./data/144377.json');
const data144378 = require('./data/144378.json');
const data144379 = require('./data/144379.json');
const data144835 = require('./data/144835.json');
const data144836 = require('./data/144836.json');
const data144837 = require('./data/144837.json');
const data144838 = require('./data/144838.json');

const data145313 = require('./data/145313.json');
const data145314 = require('./data/145314.json');
const data145315 = require('./data/145315.json');
const data145316 = require('./data/145316.json');
const data145317 = require('./data/145317.json');
const data145318 = require('./data/145318.json');
const data145319 = require('./data/145319.json');
const data145320 = require('./data/145320.json');
const data145321 = require('./data/145321.json');
const data145322 = require('./data/145322.json');
const data145323 = require('./data/145323.json');
const data145324 = require('./data/145324.json');
const data145325 = require('./data/145325.json');
const data145326 = require('./data/145326.json');
const data145327 = require('./data/145327.json');
const data145328 = require('./data/145328.json');
const data145329 = require('./data/145329.json');
const data145330 = require('./data/145330.json');
const data145331 = require('./data/145331.json');
const data145332 = require('./data/145332.json');
const data145333 = require('./data/145333.json');
const data145334 = require('./data/145334.json');
const data146753 = require('./data/146753.json');
const data146754 = require('./data/146754.json');
const data146755 = require('./data/146755.json');
const data146756 = require('./data/146756.json');
const data146757 = require('./data/146757.json');
const data146758 = require('./data/146758.json');
const data146759 = require('./data/146759.json');
const data146760 = require('./data/146760.json');
const data146761 = require('./data/146761.json');
const data146762 = require('./data/146762.json');
const data146763 = require('./data/146763.json');
const data146764 = require('./data/146764.json');
const data146765 = require('./data/146765.json');
const data146766 = require('./data/146766.json');
const data146767 = require('./data/146767.json');
const data146768 = require('./data/146768.json');
const data146769 = require('./data/146769.json');
const data146770 = require('./data/146770.json');
const data146771 = require('./data/146771.json');
const data146772 = require('./data/146772.json');
const data146773 = require('./data/146773.json');
const data146774 = require('./data/146774.json');













const allFiles = [data143882, data143883, data143884,
data143885, data143886, data143887, data143888, data143889, data143890, 
data143891, data143892, data143893, data143894, data143895, data143896, 
data143897, data143898, data143899, data143900, data143901, data143902, 
data143903, data144358, data144359, data144360, data144361, data144362, 
data144363, data144364, data144365, data144366, data144367, data144368, 
data144369, data144370, data144371, data144372, data144373, data144374, 
data144375, data144376, data144377, data144378, data144379, data145313, 
data145314, data145315, data145316, data145317, data145318, data145319, 
data145320, data145321, data145322, data145323, data145324, data145325, 
data145326, data145327, data145328, data145329, data145330, data145331, 
data145332, data145333, data145334, data144835, data144836, data144837, data144838,
data146753, data146754, data146755, data146756, data146757, data146758, 
data146759, data146760, data146761, data146762, data146763, data146764, 
data146765, data146766, data146767, data146768, data146769, data146770, 
data146771, data146772, data146773, data146774]
 


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
  fs.writeFile('./clean-data2.json', solarData, 'utf8', err => {
    if(err) {
      return console.log('write file error', err);
    }
  })
    console.log('data saved to clean-data file');
}

addFile(allFiles)