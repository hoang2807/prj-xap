class Action {
  id: string;
  latestFileUrl: string
  clientVersion: number
  sessionId: number
  binaryData: string
  constructor() {
    this.id = '';
    this.latestFileUrl = ''
    this.clientVersion = 1
    this.sessionId = 1
    this.binaryData = ''
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

  setSessionId(sessionId: number) {
    this.sessionId = sessionId
  }

  getSessionId() {
    return this.sessionId
  }

  setBinaryData(binaryData: string) {
    this.binaryData = binaryData
  }

  getBinaryData() {
    return this.binaryData
  }
}

const action = new Action();

function takePicture() {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
    .then(async res => {
      console.log(`HTTP code: ${res.status}`);
      const data = await res.json();
      console.log(`Set option: ${data}`)
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function getOption() {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'camera.getOptions',
      'parameters': {
        'optionNames': [
          'iso',
          'isoSupport',
          'clientVersion'
        ],
      },
    }),
  })
    .then(async res => {
      console.log(`HTTP code: ${res.status}`);
      const data = await res.json();
      console.log(`getOption: ${JSON.stringify(data)}`)
    })
    .catch(error => console.error(error));
}

// function listImages() {
//   const url = 'http://192.168.1.1/osc/commands/execute';
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8',
//     },
//     body: JSON.stringify({
//       'name': 'camera.listImages',
//       'parameters': {
//         fileType: 'all',
//         entryCount: 3,
//         includeThumb: false,
//       },
//     }),
//   })
//     .then(async res => {
//       console.log(`HTTP code: ${res.status}`);
//       const data = await res.json();
//       console.log(`listImages: ${data}`)
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
// }

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
    .then(async res => {
      console.log(`HTTP code: ${res.status}`);
      const data = await res.json()
      console.log(`status: ${data}`)
      console.log(`ID status: ${action.getId()}`)
    })
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
    .then(async res => {
      console.log(`HTTP code: ${res.status}`);
      const data = await res.json();
      console.log(`listAll: ${data}`)
    })
    .catch(error => console.error(error));
}

function listFiles() {
  const url = 'http:192.168.1.1/osc/commands/execute'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'camera.listFiles',
      'parameters': {
        'fileType': 'all',
        'entryCount': 12,
      }
    })
  })
    .then(async res => {
      console.log(`HTTP code: ${res.status}`)
      const data = await res.json()
      console.log(`listFiles: ${data}`)
    })
    .catch(error => console.error(error))
}

function getLivePreview() {
  console.log(1)
  const url = 'http://192.168.1.1/osc/commands/execute'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'camera.getLivePreview',
    })
  })
    .then(async res => {
      console.log(`HTTP code: ${res.status}`)
      const data = await res.json()
      console.log(data)
      console.log(3)
      action.setBinaryData(data)
    })
    .catch(error => console.error(error))
  console.log(2)
}

// api version 2.0
// function startSession() {
//   const url = 'http://192.168.1.1/osc/commands';
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       'name': 'camera.startSession',
//     })
//   })
//     .then(async res => {
//       console.log(`HTTP code: ${res.status}`);
//       const data = await res.json()
//       console.log(`Start session: ${data}`)
//     })
//     .catch(error => console.error(error));
// }

// function endSession() {
//   const url = 'http://192.168.1.1/osc/commands';
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       'name': 'camera.closeSession',
//       'parameters': {
//         'sessionId': action.getSessionId(),
//       },
//     }),
//   })
//     .then(async res => {
//       console.log(`HTTP code: ${res.status}`);
//       const data = await res.json()
//       console.log(`closeSession: ${data}`)
//     })
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
// }

export {
  takePicture,
  setOption,
  getOption,
  // listImages,
  oscState,
  listAll,
  // startSession,
  // endSession,
  listFiles,
  getLivePreview,
  status,
  action
};
