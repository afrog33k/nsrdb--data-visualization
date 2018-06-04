const element = document.getElementById('map');
var timelineControl;

const map = L.map(element, {
  zoom: 10,
  center: [39.4244, -105.2361]
});


var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 650, 700, 750, 800, 850, 900, 950,  1000],
    labels = []

  for (let i = 0; i < grades.length; i++) {
    div.innerHTML += 
      '<i style="background-color:' + getColor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+' );
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

  timelineControl = L.timelineSliderControl({
    formatOutput: function(date) {
      return new Date(date).toString();
    },
    position: 'topright',
    steps: 2000,
    enablePlayback:true, 
    enableKeyboardControls: true 
  })

  console.log(timelineControl)
  var timeline = L.timeline(data, {
    getInterval: getInterval,
    waitToUpdateMap: true,
    pointToLayer: function(data, latlng) {
      var color = getColor(data.properties.DNI)

      return L.circleMarker(latlng, {
        radius: 13.5,
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
  rerenderMap(data)
}

const dayRange = async (e) => {
  e.preventDefault();
  const dayRange = e.target.value;
  const response = await fetch(`/api/v1/denver?dayRange=${dayRange}`);
  const data = await response.json();
  rerenderMap(data)
}

const rerenderMap = (data) => {
  timelineControl.remove(map);
  const geojsonData = geojsonify(data);
  solarFeed(geojsonData);
}

const resetMap = (e) => {
  e.preventDefault();
  timelineControl.remove(map);
  getData();
}

getData();

$('.select-day').change(selectDay);
$('.range').change(dayRange);
$('.reset-map').click(resetMap)
