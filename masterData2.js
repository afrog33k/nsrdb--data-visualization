// const data143891 = require('./data/143891.json');
// const data143892 = require('./data/143892.json');
// const data143893 = require('./data/143893.json');
// const data143894 = require('./data/143894.json');
// const data143895 = require('./data/143895.json');
// const data143896 = require('./data/143896.json');
// const data143897 = require('./data/143897.json');
// const data143898 = require('./data/143898.json');
// const data143899 = require('./data/143899.json');
// const data143900 = require('./data/143900.json');
// const data143901 = require('./data/143901.json');
// const data143902 = require('./data/143902.json');
// const data143903 = require('./data/143903.json');
// const data144358 = require('./data/144358.json');
// const data144359 = require('./data/144359.json');
// const data144360 = require('./data/144360.json');
// const data144361 = require('./data/144361.json');
// const data144362 = require('./data/144362.json');
// const data144363 = require('./data/144363.json');
// const data144364 = require('./data/144364.json');
// const data144365 = require('./data/144365.json');
// const data144366 = require('./data/144366.json');
// const data144367 = require('./data/144367.json');
// const data144368 = require('./data/144368.json');
// const data144369 = require('./data/144369.json');
// const data144370 = require('./data/144370.json');
// const data144371 = require('./data/144371.json');
// const data144372 = require('./data/144372.json');
// const data144373 = require('./data/144373.json');
// const data144374 = require('./data/144374.json');
// const data144375 = require('./data/144375.json');
// const data144376 = require('./data/144376.json');
// const data144377 = require('./data/144377.json');
// const data144378 = require('./data/144378.json');
// const data144379 = require('./data/144379.json');

// const allFiles = [data143891, data143892, data143893, data143894, data143895, data143896, 
// data143897, data143898, data143899, data143900, data143901, data143902, 
// data143903, data144358, data144359, data144360, data144361, data144362, 
// data144363, data144364, data144365, data144366, data144367, data144368, 
// data144369, data144370, data144371, data144372, data144373, data144374, 
// data144375, data144376, data144377, data144378, data144379]

// const dataCleaner = (datasetInput) => {
//   let dataset = datasetInput
//   let infoObject = dataset.splice(0, 1)
//   const timeArray = dataset.reduce((array, time) => {
//     if (time.Month == 6 && time.Minute == 0 && time.Day == 21){
//       array.push({
//         Latitude: infoObject[0].Latitude,
//         Longitude: infoObject[0].Longitude,
//         Day: `2016-${time.Month}-${time.Day}`,
//         Time: `${time.Hour}`,
//         DNI: time.DNI
//       })
//     }
//     return array
//   }, [])
//   return timeArray
// }

// const superCleanData2 = allFiles.map(file => {
//   return dataCleaner(file)
// })

// module.exports = superCleanData2;