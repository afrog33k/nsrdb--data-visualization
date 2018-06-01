const element = document.getElementById('map');

const map = L.map(element, {
  zoom: 16,
  center: [39, -105]
});

var marker = L.marker([39.09, -105.5]).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1kYmVyZyIsImEiOiJjamZ5NGNmOXEwaXJsMndtbnZweGx0MTExIn0.3uj1LoQZyx2ZVksJL-3Exg', {
    maxZoom: 8,
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
      var hue = data.properties.DNI 
      var color;
      console.log(hue);
      switch(true) {
        case (hue < 100):
          color = 'red';
          break;
        case ((hue > 100) && (hue < 200)):
          color = 'blue';
          break;
        default:
          color = 'green';
      }
      return L.circleMarker(latlng, {
        radius: 3,
        color: color,
        // fillColor: 'blue'
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
    // console.log(datapoint.Latitude);
    return {
      "type": "Feature",
      "properties": {
        "DNI": datapoint.DNI,
        "start": startDate,
        "end": endDate
      },
      "geometry": {
        "type": "Point",
        "coordinates": [parseFloat(datapoint.Longitude), parseFloat(datapoint.Latitude)]
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

