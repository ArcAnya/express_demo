const chai = require('chai');
const expect = chai.expect;
const app = require('../app'); // Note: when you type "../" => will suggest the files and prevents typos
const supertest = require('supertest');

let server, request, response;

before((done) => {
    server = app.listen(done);
    request = supertest.agent(server);
});

after((done) => {
    server.close(done);
});

describe('GET /', () => {
    beforeEach(async () => {
        response = await request.get('/?message=Venus');
    });

    it('responds with status 200', () => {
        expect(response.status).to.equal(200);
    });

    it('returns hello Venus', () => {
        expect(response.text).to.equal('<h1>Hello Venus!</h1>');
    });

});

describe('POST /', () => {
    beforeEach(async () => {
        response = await request.post('/').send({ name: 'john' });
    });

    it('returns a bit of HTML', () => {
        expect(response.body).to.deep.equal({ message: { name: 'john' } }); // deep.equal instead of equal => to compare objects
    });
});