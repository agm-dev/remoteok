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

  it('getJobsByTags must return items whose tags matches', () => {
    const fakeData = [
      { id: 1, tags: [ 'nodejs', 'vue', 'mongodb' ]},
      { id: 2, tags: [ 'vue', 'mongodb' ]},
      { id: 3, tags: [ 'nodejs', 'mongodb' ]},
      { id: 4, tags: [ 'nodejs', 'vue' ]},
      { id: 5, tags: [ 'javascript', 'angular' ]},
      { id: 6, tags: [ 'c++', 'sql' ]},
      { id: 7, tags: [ 'mysql', 'python', 'ruby' ]},
      { id: 8, tags: [ 'python', 'linux ']}
    ];
    const orExpectedResults = [
      { tags: [ 'nodejs', 'vue' ], ids: [ 1, 2, 3, 4 ]},
      { tags: [ 'javascript', 'vue' ], ids: [ 1, 2, 4, 5 ]},
      { tags: [ 'python', 'c++' ], ids: [ 6, 7, 8 ]},
    ];
    const andExpectedResults = [
      { tags: [ 'nodejs', 'vue' ], ids: [ 1, 4 ]},
      { tags: [ 'javascript', 'vue' ], ids: [] },
      { tags: [ 'python', 'c++' ], ids: []},
      { tags: [ 'mongodb', 'vue' ], ids: [ 1, 2 ]},
    ];

    const instance = new RemoteOk();
    instance.data = fakeData;

    const validate = type => expected => {
      type === 'AND' ? type : 'OR';
      const results = instance.getJobsByTags(expected.tags, type);
      expect(Array.isArray(results)).to.be.true;
      expect(results.length).to.be.equal(expected.ids.length);

      const everyExpectedItem = results.every(result => expected.ids.includes(result.id));
      expect(everyExpectedItem).to.be.true;
    }

    orExpectedResults.map(validate('OR'));
    andExpectedResults.map(validate('AND'));
  });

});
