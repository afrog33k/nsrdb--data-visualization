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
        response.body[0].Day.should.equal('2016-6-21')
        response.body[0].should.have.property('Time')
        response.body[0].Time.should.equal(10)
        response.body[0].should.have.property('DNI')
        response.body[0].DNI.should.equal(100)
        done();
      })
  })

  it('should return hours above hour selected by user on slider', (done) => {
    chai.request(app)
      .get('/api/v1/denver?start=13&end=15')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array')
        response.body.length.should.equal(1)
        response.body[0].should.have.property('Latitude')
        response.body[0].Latitude.should.equal('39.53')
        response.body[0].should.have.property('Longitude')
        response.body[0].Longitude.should.equal('-105.02')
        response.body[0].should.have.property('Day')
        response.body[0].Day.should.equal('2016-6-21')
        response.body[0].should.have.property('Time')
        response.body[0].Time.should.equal(14)
        response.body[0].should.have.property('DNI')
        response.body[0].DNI.should.equal(300)
        done();
      })
  })


  it('should return hour selected by user on dropdown', (done) => {
    chai.request(app)
      .get('/api/v1/denver/10')
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
        response.body[0].Day.should.equal('2016-6-21')
        response.body[0].should.have.property('Time')
        response.body[0].Time.should.equal(10)
        response.body[0].should.have.property('DNI')
        response.body[0].DNI.should.equal(100)
        done();
      })
  })
})