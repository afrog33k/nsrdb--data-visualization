// geoJSON data
//var geojsonFeature = {
//   "type": "Feature",
//   "properties": {
//     "DNI": 88,
//     "time": YYYY-MM-DDtHH:MM
//   },
//   "geometry": {
//     "type": "Point",
//     "coordinates": [Lat, Long]
//   }
// }

const element = document.getElementById('map');
// const solarLayer = document.getElementById('solarLayer');

const map = L.map(element, {
  zoom: 8,
  center: [39, -105]
});

var marker = L.marker([39.004, -105]).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1kYmVyZyIsImEiOiJjamZ5NGNmOXEwaXJsMndtbnZweGx0MTExIn0.3uj1LoQZyx2ZVksJL-3Exg', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW1kYmVyZyIsImEiOiJjamZ5NGNmOXEwaXJsMndtbnZweGx0MTExIn0.3uj1LoQZyx2ZVksJL-3Exg'
}).addTo(map);

function solarFeed(data) {
  var getInterval = function(solar) {
    return {
      start: solar.properties.start,
      end: solar.properties.end
    }
  };
  var timelineControl = L.timelineSliderControl({
    formatOutput: function(date) {
      return new Date(date).toString();
    },
    position: 'topright'
  })
  var timeline = L.timeline(data, {
    getInterval: getInterval,
    waitToUpdateMap: true,
    pointToLayer: function(data, latlng) {
      var hue_min = 1110;
      var hue_max = 0;
      var hue = data.properties.DNI 
      // console.log(hue);
      return L.circleMarker(latlng, {
        radius: 10,
        color: 'red',
        fillColor: 'blue'
      });
    }
  })
  timelineControl.addTo(map);
  timelineControl.addTimelines(timeline);
  timeline.addTo(map);
  console.log(map);
}

const geojsonify = (data) => {
  let geojsonedArray = data.map(datapoint => {
    var startDateFormat = new Date(`${datapoint.Day} ${datapoint.Time}0:00`)
    var startDate = startDateFormat.getTime()
    var endDateFormat = new Date(`${datapoint.Day} ${datapoint.Time}9:00`)
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
        "coordinates": [parseInt(datapoint.Longitude), parseInt(datapoint.Latitude)]
      }
    }
  })
  const geojsonedData = {
    "type": "FeatureCollection",
    "features": geojsonedArray
  }
  return geojsonedData
}

const getData = async() => {
  const response = await fetch('/api/v1/denver');
  const data = await response.json();
  const geojsonData = geojsonify(data)
  solarFeed(geojsonData)
}

getData()

