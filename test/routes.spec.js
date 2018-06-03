const chai = require('chai');
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
        done();
      })

  })
})