# RemoteOk.js

JS lib to get and manage [remoteok.io/api](https://remoteok.io/api) data.

## Installation

```
npm install --save remoteok
```

## Usage

```javascript
const RemoteOk = require('remoteok');

const RO = new RemoteOk();

RO.getData()
  .then(success => {
    if (success) {
      console.log(RO.data);

      const tags = RO.getTags();
      console.log(tags);

      const nodeJobs = RO.getJobsByTags(['node', 'nodejs', 'node.js'])
      console.log(nodeJobs);

      return;
    }
    console.log(RO.error);
  })
  .catch(err => console.error(err));
```

## Collaboration

Feel free to send pull requests.
