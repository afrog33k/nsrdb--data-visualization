// const { jsonData } = require('./mockdata.js');

// eslint-disable-next-line
const fetchDay = async (hour) => {
  const response = await fetch(`/api/v1/denver/${hour}`);
  const data = await response.json();

  rerenderMap(data)
}

const rerenderMap = (data) => {
  return data;
}

const solarFeed = (data) => {
  return data;
}

const geojsonify = (data) => {
  let geojsonedArray = data.map(datapoint => {
    var startDateFormat = new Date(`${datapoint.Day} ${datapoint.Time}:00:00`)
    var startDate = startDateFormat.getTime()
    var endDateFormat = new Date(`${datapoint.Day} ${datapoint.Time}:59:59`)
    var endDate = endDateFormat.getTime()

    return {
      "type": "Feature",
      "properties": {
        "DNI": datapoint.DNI,
        "start": startDate,
        "end": endDate
      },
      "geometry": {
        "type": "Point",
        // eslint-disable-next-line
        "coordinates": [parseFloat(datapoint.Longitude), parseFloat(datapoint.Latitude)]
      }
    }
  });

  const geojsonedData = {
    "type": "FeatureCollection",
    "features": geojsonedArray
  }

  return geojsonedData
}

const getData = async() => {
  const response = await fetch('/api/v1/denver');
  const data = await response.json();
  const geojsonData = geojsonify(data);

  solarFeed(geojsonData);
}

module.exports = { getData, fetchDay,  geojsonify}