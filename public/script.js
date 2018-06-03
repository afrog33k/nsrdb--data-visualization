const element = document.getElementById('map');

const map = L.map(element, {
  zoom: 18,
  center: [39, -105]
});

var marker = L.marker([39.09, -105.5]).addTo(map);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibW1kYmVyZyIsImEiOiJjamZ5NGNmOXEwaXJsMndtbnZweGx0MTExIn0.3uj1LoQZyx2ZVksJL-3Exg', {
    maxZoom: 8,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW1kYmVyZyIsImEiOiJjamZ5NGNmOXEwaXJsMndtbnZweGx0MTExIn0.3uj1LoQZyx2ZVksJL-3Exg'
}).addTo(map);

var legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 1000],
    labels = []

  for (let i = 0; i < grades.length; i++) {
    div.innerHTML += 
      '<i style="background-color:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div
}

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
    steps: 2000,
    enablePlayback:true, 
    enableKeyboardControls: true 
  })
  var timeline = L.timeline(data, {
    getInterval: getInterval,
    waitToUpdateMap: true,
    pointToLayer: function(data, latlng) {
      var color = getColor(data.properties.DNI)

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
  legend.addTo(map);
}

const geojsonify = (data) => {
  console.log('data in script:', data);
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
  const geojsonData = geojsonify(data);
  solarFeed(geojsonData);
}

const selectDay = (e) => {
  e.preventDefault();
  const hour = event.target.value;
  fetchDay(hour);
}

const fetchDay = async (hour) => {
  const response = await fetch(`/api/v1/denver/${hour}`);
  const data = await response.json();
  const geojsonData = geojsonify(data);
  solarFeed(geojsonData);
}

const dayRange = async (e) => {
  e.preventDefault();
  const dayRange = e.target.value;
  console.log(dayRange)
  const response = await fetch(`/api/v1/denver?dayRange=${dayRange}`);
  const data = await response.json();
  console.log(data)
}

getData()

$('.select-day').change(selectDay);
$('.range').change(dayRange);
