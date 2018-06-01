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
    position: 'topright',
    steps: 10000
  })
  var timeline = L.timeline(data, {
    getInterval: getInterval,
    waitToUpdateMap: true,
    pointToLayer: function(data, latlng) {
      var hue = data.properties.DNI 
      var color;
      switch(true) {
        case (hue < 100):
          color = '#05051B';
          break;
        case((hue > 100) && (hue < 150)):
          color = '#1F3B60';
          break; 
        case((hue > 150) && (hue < 200)):
          color = '#22416B';
          break; 
        case((hue > 200) && (hue < 250)):
          color = '#294F82';
          break; 
        case((hue > 250) && (hue < 300)):
          color = '#2C568C';
          break;  
        case((hue > 300) && (hue < 350)):
          color = '#1B1A42';
          break;       
        case((hue > 350) && (hue < 400)):
          color = '#212054';
          break;
        case((hue > 400) && (hue < 450)):
          color = '#2A296B';
          break;
        case((hue > 450) && (hue < 500)):
          color = '#373589';
          break;
        case((hue > 550) && (hue < 600)):
          color = '#413FA3';
          break;
        case ((hue > 600) && (hue < 650)):
          color = '#4C4ABF';
          break;
        case ((hue > 650) && (hue < 700)):
          color = '#5654D8';
          break;
        case ((hue > 700) && (hue < 750)):
          color = '#605EF2';
          break;
        case ((hue > 750) && (hue < 800)):
          color = '#9789FF';
          break;
        case ((hue > 850) && (hue < 900)):
          color = '#A499FF';
          break;
        case ((hue > 900) && (hue < 950)):
          color = '#B6ADFF';
          break;
        case ((hue > 950) && (hue < 100)):
          color = '#D1CCFF';
          break;
        default:
          color = '#DFDBFF';
      }
      return L.circleMarker(latlng, {
        radius: 4,
        stroke: false,
        fillColor: color,
        fillOpacity: 1.0
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
    var startDateFormat = new Date(`${datapoint.Day} ${datapoint.Time}:00:00`)
    var startDate = startDateFormat.getTime()
    var endDateFormat = new Date(`${datapoint.Day} ${datapoint.Time}:59:00`)
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

