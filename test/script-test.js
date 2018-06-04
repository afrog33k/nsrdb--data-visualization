const assert= require('chai').assert;
const expect= require('chai').expect;

const { getData, fetchDay, dayRange,  geojsonify } = require('./script-fetchcalls.js');
const data = require('./mockdata.js');
const chai = require('chai');
const should = chai.should();
const chaiFetchMock = require('chai-fetch-mock');
const fetchMock = require('fetch-mock');


chai.use(chaiFetchMock);

describe('getData', (done) => {
  it('Should fetch all the data from /api/v1/denver', () => {
    const fetchMockedData = fetchMock.get('/api/v1/denver', data)
    return getData()
      .then(() => {
        expect(fetchMockedData).route('/api/v1/denver').to.have.been.called

      })
      .catch(error => {
        console.log(error)
      })
  })
 
  fetchMock.restore();
});

describe('fetchDay', (done) => {
  it('Should fetch all the data from /api/v1/denver/:hour', () => {
    const hour = 2;
    const fetchMockedData = fetchMock.get(`/api/v1/denver/${hour}`, data)
    return fetchDay(hour)
      .then(() => {
        expect(fetchMockedData).route('/api/v1/denver/2').to.have.been.called

      })
      .catch(error => {
        console.log(error)
      })
  })
 
  fetchMock.restore();
});

describe('dayRange', (done) => {
  it('Should fetch all the data from /api/v1/denver/', () => {
    const event = { target: { value: 2 }};
    const fetchMockedData = fetchMock.get(`/api/v1/denver?dayRange=${event.target.value}`, data)
    return dayRange(event)
      .then(() => {
        expect(fetchMockedData).route('/api/v1/denver?dayRange=2').to.have.been.called

      })
      .catch(error => {
        console.log(error)
      })
  })
 
  fetchMock.restore();
})