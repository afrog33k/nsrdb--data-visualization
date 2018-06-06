const chai = require('chai');
// eslint-disable-next-line
const should = chai.should();
const { app, database } = require('../server.js');
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

describe('Endpoint tests', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done()
              })
          })
      })
  })

  it('should get all the solar data', (done) => {
    chai.request(app)
      .get('/api/v1/denver')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array')
        response.body.length.should.equal(3)
        response.body[0].should.have.property('Latitude')
        response.body[0].Latitude.should.equal('39.09')
        response.body[0].should.have.property('Longitude')
        response.body[0].Longitude.should.equal('-105.86')
        response.body[0].should.have.property('Day')
        response.body[0].Day.should.equal('2016-6-19')
        response.body[0].should.have.property('Time')
        response.body[0].Time.should.equal(10)
        response.body[0].should.have.property('DNI')
        response.body[0].DNI.should.equal(100)
        done();
      })
  })

  it('should return days btwn days selected by user on slider', (done) => {
    chai.request(app)
      .get('/api/v1/denver?start=17&end=19')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array')
        response.body.length.should.equal(1)
        response.body[0].should.have.property('Latitude')
        response.body[0].Latitude.should.equal('39.09')
        response.body[0].should.have.property('Longitude')
        response.body[0].Longitude.should.equal('-105.86')
        response.body[0].should.have.property('Day')
        response.body[0].Day.should.equal('2016-6-19')
        response.body[0].should.have.property('Time')
        response.body[0].Time.should.equal(10)
        response.body[0].should.have.property('DNI')
        response.body[0].DNI.should.equal(100)
        done();
      })
  })

  it('should return error if day range is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/denver?start=22')
      .end((error, response) => {
        response.should.have.status(500);
        response.should.be.json;
        response.should.be.an('object')
        response.body.should.have.property('err')
        response.body.err.should.equal('Date range is invalid')
        done();
      })
  })

  it('should return day selected by user on dropdown', (done) => {
    chai.request(app)
      .get('/api/v1/denver/20')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array')
        response.body.length.should.equal(1)
        response.body[0].should.have.property('Latitude')
        response.body[0].Latitude.should.equal('39.17')
        response.body[0].should.have.property('Longitude')
        response.body[0].Longitude.should.equal('-105.26')
        response.body[0].should.have.property('Day')
        response.body[0].Day.should.equal('2016-6-20')
        response.body[0].should.have.property('Time')
        response.body[0].Time.should.equal(12)
        response.body[0].should.have.property('DNI')
        response.body[0].DNI.should.equal(200)
        done();
      })
  })

  it('should return error if day is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/denver/25')
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.an('object')
        response.body.should.have.property('error')
        response.body.error.should.equal('Could not find data from June 25')
        done();
      })
  })
})