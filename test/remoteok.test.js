const expect = require('chai').expect;
const fetch = require('node-fetch');
const RemoteOk = require('../src/remoteok');

const BASE_URL = 'https://remoteok.io/api';
const remoteok = new RemoteOk({ baseUrl: BASE_URL });

describe('RemoteOk', () => {

  it('getData must return the data from BASE_URL', async () => {
    const apiResponse = await fetch(BASE_URL);
    expect(apiResponse.status).to.be.equal(200);

    const expectedResponse = await apiResponse.json();

    const response = await remoteok.getData();
    expect(response).to.be.true;
    expect(JSON.stringify(remoteok.data)).to.be.equal(JSON.stringify(expectedResponse));
    expect(JSON.stringify(remoteok.data.length) > 0).to.be.true;
  })

  it('getTags must return different tags from data', () => {
    const fakeData = [
      { tags: ['a', 'b', 'c']},
      { tags: ['a', 'd', 'e']},
      { tags: ['e', 'f']},
    ];
    const expectedResult = ['a', 'b', 'c', 'd', 'e', 'f'];
    const instance = new RemoteOk();
    instance.data = fakeData;

    const tags = instance.getTags();
    expect(Array.isArray(tags)).to.be.true;
    expect(tags.length).to.be.equal(expectedResult.length);

    const containsAll = expectedResult.every(tag => tags.includes(tag));
    expect(containsAll).to.be.true;
  })

});