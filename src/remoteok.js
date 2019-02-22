const fetch = require('node-fetch');


const DEFAULT_BASE_URL = 'https://remoteok.io/api';

class RemoteOk {

  constructor(config = {}) {
    this.baseUrl = typeof config.baseUrl === 'string' && config.baseUrl.length ? config.baseUrl : DEFAULT_BASE_URL;
    this.data = [];
    this.error = null;
  }

  getData() {
    return fetch(this.baseUrl)
      .then(response => response.json())
      .then(data => {
        this.data = typeof data !== 'undefined' && Array.isArray(data) && data.length ? data : [];
        return true;
      })
      .catch(err => {
        this.error = err;
        return false;
      });
  }

}

module.exports = RemoteOk;