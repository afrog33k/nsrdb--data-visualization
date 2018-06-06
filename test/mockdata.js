const data = [ 
  { DNI: 0,
    Day: "2016-6-20",
    Latitude: "39.09",
    Longitude: "-105.78",
    Time: 2,
    id: 401885,
  }, {
    DNI: 0,
    Day: "2016-6-21",
    Latitude: "39.09",
    Longitude: "-105.86",
    Time: 2,
    id: 401837,
  }
];

const geojsonedArray = [
  {
    "type": "Feature",
    "properties": {
      "DNI": 0,
      "start": 1466409600000,
      "end": 1466413199000,
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-105.78, 39.09]
    }
  }, {
    "type": "Feature",
    "properties": {
      "DNI": 0,
      "start": 1466496000000,
      "end": 1466499599000,
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-105.86, 39.09]
    }
  }
];

const geoJson = {
  "type": "FeatureCollection",
  "features": geojsonedArray
};



module.exports = { data, geoJson };

