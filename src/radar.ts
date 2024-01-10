import { floors } from '@/data.js'
import { onPropertyChange } from '@/utils.js'

export function initRadar() {
  const radar = document.createElement('div')
  const map = document.createElement('img')
  radar.id = 'radar-map'
  radar.style.position = 'absolute'
  radar.style.top = '0px'
  radar.style.left = '0px'
  radar.style.zIndex = '1000'
  document.body.appendChild(radar)
  radar.appendChild(map)
  map.style.width = '100%'
  radar.style.width = '400px'
  
  const maya = document.createElement('img')
  const jimmy = document.createElement('img')
  maya.src = 'cheats/assets/maya.png'
  jimmy.src = 'cheats/assets/jimmy.png'
  radar.appendChild(maya)
  radar.appendChild(jimmy)
  maya.style.position = 'absolute'
  maya.style.top = '0px'
  maya.style.left = '0px'
  maya.style.width = '50px'
  maya.style.zIndex = '1001'
  maya.style.transform = 'translate(-50%, -50%)'
  jimmy.style.position = 'absolute'
  jimmy.style.top = '0px'
  jimmy.style.left = '0px'
  jimmy.style.width = '50px'
  jimmy.style.zIndex = '1001'
  jimmy.style.transform = 'translate(-50%, -50%)'

  onPropertyChange('floor', () => {
    if (window.floor >= 2) {
      map.src = `cheats/assets/map/floor-${window.floor - 1}.png`
      map.style.display = 'block'
    } else {
      map.style.display = 'none'
    }
  })

  onPropertyChange('room', () => {
    if (window.room !== 0) {
      
    } else {
      const floorMap = floors[window.floor - 2]
      if (!floorMap) return
      const room = floorMap.rooms.find(({ room }) => room === window.room)
      if (!room) return
      maya.style.left = `${room.x}px`
      maya.style.top = `${room.y}px`
    }
  })
}