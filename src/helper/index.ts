class Action {
  id: string;
  latestFileUrl: string
  clientVersion: number

  constructor() {
    this.id = '';
    this.latestFileUrl = ''
    this.clientVersion = 1
  }

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setLatestFileUrl(latestFileUrl: string) {
    this.latestFileUrl = latestFileUrl;
  }

  getLatestFileUrl() {
    return this.latestFileUrl;
  }

  setClientVersion(clientVersion: number) {
    this.clientVersion = clientVersion;
  }

  getClientVersion() {
    return this.clientVersion;
  }
}

const action = new Action();

function takePicture() {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'name': 'camera.takePicture',
    }),
  })
    .then(async res => {
      console.log(`HTTP code: ${res.status}`);
      const data = await res.json();
      console.log('Data: ', data)
      action.setId(data.id)
      console.log(action.getId())
    })
    //    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(error => console.error(error));
}

function setOption() {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'name': 'camera.setOptions',
      'parameters': {
        'options': action.getClientVersion(),
      },
    }),
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function getOption(options: object) {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'camera.getOptions',
      'parameters': {
        options: options,
      },
    }),
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function listImages() {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'name': 'camera.listImages',
      'parameters': {
        fileType: 'all',
        entryCount: 3,
        includeThumb: false,
      },
    }),
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function oscState() {
  const url = 'http://192.168.1.1/osc/state';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async res => {
      console.log(`HTTP code: ${res.status}`);
      const data = await res.json()
      console.log(String(data.state._latestFileUrl))
      action.setLatestFileUrl(String(data.state._latestFileUrl))
    })
    .catch(error => console.error(error));
}

function status() {
  const url = 'http://192.168.1.1/osc/commands/status';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'id': action.getId(),
    })
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
      console.log(`ID status: ${action.getId()}`)
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function listAll() {
  const url = 'http://192.168.1.1/osc/commands';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': 'camera._listAll',
    }),
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function startSession() {
  const url = 'http://192.168.1.1/osc/commands';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'name': 'startSession',
      'parameters': {},
    }),
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function endSession() {
  const url = 'http://192.168.1.1/osc/commands';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'name': 'camera.closeSession',
      'parameters': {},
    }),
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function listFiles() {
  const url = 'http:192.168.1.1/osc/commands/execute'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      'name': 'camera.listImages',
      'parameters': {
        'entryCount': 12,
        'maxSize': 160
      }
    })
  })
}

export {
  takePicture,
  setOption,
  getOption,
  listImages,
  oscState,
  listAll,
  startSession,
  endSession,
  listFiles,
  status,
  action
};
