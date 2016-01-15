var chai = require('chai');
var path = require('path');
chai.config.includeStack = true;
var expect = chai.expect;
var assert = chai.assert;
var chaiHttp = require('chai-http');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiHttp);
chai.use(chaiAsPromised);

var resOK = (res) => {
    expect(res.status).to.eql(200);
};

describe('Bootstrap class', () => {
    before(() => {
        
    });

    describe('Demo e2e test', () => {
        describe('User basic scenarios', () => {
            it('create a user and getting the created user with id succeeds', (done) => {
                expect(true).to.equal(true);

                done();
            });
        });
    });

    after(() => {
            
    });
});