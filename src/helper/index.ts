import RNFetchBlob from 'react-native-fetch-blob'

function decode(binary: any, start = 0, end = binary.length): any {
  if (start !== 0 || end !== binary.length) {
    return decode(binary.subarray(start, end));
  } else {
    return decode(binary);
  }
}

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
          'clientVersion',
          'previewFormat',
          'previewFormatSupport'
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
  RNFetchBlob.fetch('POST', 'http://192.168.1.1/osc/commands/execute', {
    'boundary': '---osclivepreview---',
    'Content-type': 'multipart/x-mixed-replace'
  }, [
    { 'name': 'camera.getLivePreview' }
  ])
    .then((res: any) => {
      console.log(res)
      console.log(res.base64())
    })

  // var oReq = new XMLHttpRequest();
  // oReq.open("POST", 'http://192.168.1.1/osc/commands/execute', true);
  // oReq.setRequestHeader("Content-Type", "multipart/x-mixed-replace; application/json; text/html;boundary=\"---osclivepreview---\"");
  // oReq.onreadystatechange = async function () {
  //   if (oReq.readyState == 3) {
  //     var x = oReq.responseText.split("---osclivepreview---");
  //     console.log(oReq.status);
  //     console.log(x[x.length - 1]);
  //     console.log(oReq)
  //   }
  //   console.log('Test: ', oReq)
  // };
  // oReq.onload = (event) => {
  //   const arrayBuffer = oReq.response; // Note: not req.responseText
  //   if (arrayBuffer) {
  //     const byteArray = new Uint8Array(arrayBuffer);
  //     byteArray.forEach(element => {
  //       console.log(element)
  //     });
  //   }
  // }
  // oReq.send(JSON.stringify({
  //   name: "camera.getLivePreview"
  // }));

  // const url = 'http://192.168.1.1/osc/commands/execute'
  // fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     // 'Accept': 'multipart/x-mixed-replace',
  //     // 'Content-Type': 'application/json;charset=utf8',
  //     // 'X-XSRF-Protected': '1',
  //     "Content-Type": "multipart/x-mixed-replace"
  //   },
  //   body: JSON.stringify({
  //     'name': 'camera.getLivePreview',
  //   })
  // })
  //   // .then(async res => {
  //   //   if (res.body !== null)
  //   //     for await (const chunk of res.body) {
  //   //       console.dir(JSON.parse(chunk.toString()))
  //   //     }
  //   // console.log(`HTTP code: ${res.status}`)
  //   // const data = await res.json()
  //   // console.log(`Data: ${JSON.stringify(data)}`)
  //   // const decoder = decode(res)
  //   // const data = await res.json()
  //   // console.log(data)
  //   // action.setBinaryData(data)
  //   // })
  //   .then(async res => {
  //   })
  //   .catch(error => console.error(error.stack))
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
