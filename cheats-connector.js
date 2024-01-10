// ==== RADAR ====

const radar = document.createElement('div')
const map = document.createElement('img')
radar.id = 'radar-map'
radar.appendChild(map)
document.body.appendChild(radar)

ws.addEventListener('message', (e) => {
  if (isListeningForBinary) {
    switch (binaryListener) {
      case 'map-src':
        map.src = URL.createObjectURL(e.data)
        ws.binaryType = 'text'
        break
    }
  } else {
    const msg = JSON.parse(e.data)
    switch(msg.type) {
      case 'transmit-map-src-binary':
        ws.binaryType = 'blob'
        isListeningForBinary = true
        binaryListener = 'map-src'
        break
    }
  }
})

let sentInroom = null
setInterval(() => {
  if (sentInroom !== window.inroom) {
    ws.send(JSON.stringify({
      type: 'update-inroom',
      inroom: window.inroom
    }))
    sentInroom = window.inroom
  }
}, 10)

// ==== RADAR ====