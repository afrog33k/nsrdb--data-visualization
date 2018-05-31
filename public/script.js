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

const map = L.map(element, {
  zoom: 10,
  center: [39.09, -105.86],
  timeDimension: true,
  timeDimensionControl: true
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1kYmVyZyIsImEiOiJjamZ5NGNmOXEwaXJsMndtbnZweGx0MTExIn0.3uj1LoQZyx2ZVksJL-3Exg', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW1kYmVyZyIsImEiOiJjamZ5NGNmOXEwaXJsMndtbnZweGx0MTExIn0.3uj1LoQZyx2ZVksJL-3Exg'
}).addTo(map);

function solarFeed(data) {
  var getInterval = function(solar) {
    return {
      start: solar.properties.time,
      end: solar.properties.time + 5000
    }
  };
  var timelineControl = L.timelineSliderControl({
    formatOutput: function(date) {
      return new Date(date).toString();
    }
  })
  var timeline = L.timeline(data, {
    getInterval: getInterval,
    pointToLayer: function(data, latlng) {
      var hue_min = 1110;
      var hue_max = 0;
      var hue = data.properties.dni 
      return L.circleMarker(latlng, {
        radius: 20,
        color: `hsl(${hue}, 100%, 50%)`,
        fillColor: `hsl(${hue}, 100%, 50%)`
      })
    }
  })
  timelineControl.addTo(map);
  timelineControl.addTimelines(timeline);
  timeline.addTo(map);
}

const geojsonify = (data) => {

  let geojsonedArray = data.map(datapoint => {
    return {
      "type": "Feature",
      "properties": {
        "DNI": datapoint.DNI,
        "time": `${datapoint.Day}t${datapoint.Time}0`
      },
      "geometry": {
        "type": "Point",
        "coordinates": [datapoint.Latitude, datapoint.Longitude]
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

