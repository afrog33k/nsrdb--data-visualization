const expect = require('chai').expect;
const { 
  getData,
  fetchDay, 
  dayRange, 
  geojsonify 
} = require('./script-fetchcalls.js');
const { data, geoJson } = require('./mockdata.js');
const chai = require('chai');
const chaiFetchMock = require('chai-fetch-mock');
const fetchMock = require('fetch-mock');


chai.use(chaiFetchMock);

describe('getData', () => {
  it('Should fetch all the data from /api/v1/denver', () => {
    const fetchMockedData = fetchMock.get('/api/v1/denver', data)

    return getData()
      .then(() => {
        expect(fetchMockedData).route('/api/v1/denver').to.have.been.called

      })
      .catch(error => {
        throw error;
      })
  })
});

describe('fetchDay', () => {
  it('Should fetch all the data from /api/v1/denver/:hour', () => {
    const hour = 2;
    const fetchMockedData = fetchMock.get(`/api/v1/denver/${hour}`, data)

    return fetchDay(hour)
      .then(() => {
        expect(fetchMockedData).route('/api/v1/denver/2').to.have.been.called

      })
      .catch(error => {
        throw error;
      })
  });
});

describe('dayRange', () => {
  it('Should fetch all the data from /api/v1/denver/', () => {
    const event = { target: { value: 2 }};
    // eslint-disable-next-line
    const fetchMockedData = fetchMock.get(`/api/v1/denver?dayRange=${event.target.value}`, data)

    return dayRange(event)
      .then(() => {
        // eslint-disable-next-line
        expect(fetchMockedData).route('/api/v1/denver?dayRange=2').to.have.been.called

      })
      .catch(error => {
        throw error;
      })
  });
});

describe('geojsonify', () => {
  it('should change the data into a geojson format', () => {
    const expected = geojsonify(data)

    expect(expected).to.deep.equal(geoJson)
  });
});