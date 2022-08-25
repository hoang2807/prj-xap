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
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
      console.log(res.json());
    })
    // .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(error => console.error(error));
}

function setOption(options: object) {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'name': 'camera.setOptions',
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

function getOption(options: object) {
  const url = 'http://192.168.1.1/osc/commands/execute';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
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
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function status() {
  const url = 'http://192.168.1.1/osc/commands/status';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`);
      res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function listAll() {
  const url = 'http://192.168.1.1/osc/commands';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json:charset=utf-8',
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
      'Content-Type': 'application/json:charset=utf-8',
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
      'Content-Type': 'application/json:charset=utf-8',
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

export {
  takePicture,
  setOption,
  getOption,
  listImages,
  oscState,
  status,
  listAll,
  startSession,
  endSession,
};
