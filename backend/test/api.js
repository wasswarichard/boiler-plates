process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const router = require('../routes/blocks/v1a')
const {describe} = require("mocha");

describe('GET /blocks', () => {
    it('OK, getting all blocks', (done) => {
        request(router).get('/v1a/blocks')
            .then(res => {
                expect(res.text).to.be.a('string');
                done()
            })
            .catch(error => done(error))
    })
})
describe('GET /blocks', () => {
    it('OK, getting block details by hash', async(done) => {
        await request(router).get('/v1a/blocks/0000000000000000000efcea1cc1a169955e9cf6f039ddeabfdd1da1ac6d9899')
            .then(res => {
                expect(res.text).to.be.a('string');
                done()
            })
            .catch(error => done(error))
    }, 1000)
})
