function takePicture() {
  const url = 'http://192.168.1.1/osc/commands/execute'
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      'name': 'camera.takePicture'
    })
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`)
      res.json()
    })
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(error => console.error(error))
}

function setOption(options: object) {
  const url = 'http://192.168.1.1/osc/commands/execute'
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      'name': 'camera.setOptions',
      'parameters': {
        'options': options
      }
    })
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`)
      res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

function getOption(options: object) {
  const url = 'http://192.168.1.1/osc/commands/execute'
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      'name': 'camera.getOptions',
      'parameters': {
        'options': options
      }
    })
  })
    .then(res => {
      console.log(`HTTP code :${res.status}`)
      res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

function listImages(parameters: object) {
  const url = 'http://192.168.1.1/osc/commands/execute'
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      'name': 'camera.listImages',
      'parameters': parameters
    })
  })
    .then(res => {
      console.log(`HTTP code: ${res.status}`)
      res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

export { takePicture, setOption, getOption, listImages }