import { floors } from '@/data.js'
import { onPropertyChange } from '@/utils/index.js'

export function initRadar() {
  try {
    const radar = document.createElement('div')
    const map = document.createElement('img')
    radar.id = 'radar-map'
    radar.style.position = 'relative'
    radar.style.top = '0px'
    radar.style.zIndex = '1000'
    document.body.appendChild(radar)
    radar.appendChild(map)
    map.style.width = '100%'
    
    const maya = document.createElement('img')
    const jimmy = document.createElement('img')
    maya.src = 'cheats/assets/maya.png'
    jimmy.src = 'cheats/assets/jimmy.png'
    radar.appendChild(maya)
    radar.appendChild(jimmy)
    maya.style.position = 'absolute'
    maya.style.top = '-999px'
    maya.style.left = '-999px'
    maya.style.zIndex = '1001'
    maya.style.transform = 'translate(-50%, -50%)'
    maya.style.transition = 'left 1s, top 1s'
    jimmy.style.position = 'absolute'
    jimmy.style.top = '-999px'
    jimmy.style.left = '-999px'
    jimmy.style.zIndex = '1001'
    jimmy.style.transform = 'translate(-50%, -50%)'
    jimmy.style.transition = 'left 1s, top 1s'

    const changeFloors = () => {
      if (window.floor >= 2) {
        map.src = `cheats/assets/map/floor-${window.floor - 1}.png`
        radar.style.display = 'block'
      } else {
        radar.style.display = 'none'
      }
    }

    const moveCharacter = (character, xpos, ypos, speed) => {
      const floorMap = floors[window.floor - 2]
      if (!floorMap) {
        return
      }

      const point = floorMap.points.find(point => point.xpos === xpos && point.ypos === ypos)
      if (!point) {
        console.error('Couldn\'t find point with coordinates' + `${xpos},${ypos}`)
        character.style.transition = 'left 0s, top 0s'
        character.style.left = '-999px'
        character.style.top = '-999px'
        return
      } else {
        const { x, y } = calculatePosition(point.x, point.y)
        const isOutOfMap = character.style.left === '-999px'
        if (!isOutOfMap) {
          character.style.transition = `left ${speed}, top ${speed}`
        } else {
          character.style.transition = 'left 0s, top 0s'
        }
        character.style.left = `${x}px`
        character.style.top = `${y}px`
        if (isOutOfMap) {
          setTimeout(() => character.style.transition = `left ${speed}, top ${speed}`, 5)
        }
      }
    }

    const moveMaya = (skipTransition = false) => {
      const floorMap = floors[window.floor - 2]
      if (!floorMap) {
        return
      }

      if (window.inroom === 0) {
        const xpos = window.pos[0]
        const ypos = window.pos[1]
        const dir = window.pos[2]
        moveCharacter(maya, xpos, ypos, skipTransition ? '0s' : '1s')
      } else {
        const room = floorMap.rooms.find(({ room }) => room === window.inroom)
        if (!room) return
        const { x, y } = calculatePosition(room.x, room.y)
        maya.style.left = `${x}px`
        maya.style.top = `${y}px`
      }
    }

    const moveJimmy = (skipTransition = false) => {
      const xpos = Number(window.jmop[0].slice(0,2))
      const ypos = Number(window.jmop[0].slice(2,4))
      const dir = window.jmop[1]
      moveCharacter(jimmy, xpos, ypos, skipTransition ? '0s' : '0.5s')
    }

    let currentRadarScale = 'mini'
    const scaleRadar = (level: 'hide' | 'mini' | 'full') => {
      currentRadarScale = level
      jimmy.style.transition = 'left 0s, top 0s'
      maya.style.transition = 'left 0s, top 0s'
      setTimeout(() => {
        if(level === 'full') {
          radar.style.display = 'block'
          radar.style.width = 'auto'
          radar.style.height = window.innerHeight * 0.8 + 'px'
          radar.style.left = '50%'
          radar.style.top = window.innerHeight * 0.5 + 'px'
          radar.style.transform = 'translate(-50%, -50%)'

          map.style.position = 'absolute'
          map.style.width = 'auto'
          map.style.height = '100%'
          map.style.left = '50%'
          map.style.transform = 'translateX(-50%)'

          maya.style.width = 'auto'
          maya.style.height = '5%'

          jimmy.style.width = 'auto'
          jimmy.style.height = '5%'
          moveMaya(true)
          moveJimmy(true)
        } else if(level === 'mini') {
          radar.style.display = 'block'
          radar.style.width = '300px'
          radar.style.height = 'auto'
          radar.style.left = '200px'
          radar.style.top = '0px'
          radar.style.transform = ''

          map.style.position = 'static'
          map.style.width = '100%'
          map.style.height = 'auto'
          map.style.left = ''
          map.style.transform = ''

          maya.style.width = '5%'
          maya.style.height = 'auto'

          jimmy.style.width = '5%'
          jimmy.style.height = 'auto'
          moveMaya(true)
          moveJimmy(true)
        } else if(level === 'hide') {
          radar.style.display = 'none'
        }
      }, 1)
    }

    scaleRadar('mini')

    const calculatePosition = (x: number, y: number) => {
      const mapLeft = (radar.offsetWidth - map.offsetWidth) / 2
      const mapTop = (radar.offsetHeight - map.offsetHeight) / 2
      const mapWidth = map.clientWidth
      const mapHeight = map.clientHeight
      const imageWidth = map.naturalWidth
      const imageHeight = map.naturalHeight
      const scaledX = x * mapWidth / imageWidth
      const scaledY = y * mapHeight / imageHeight
      return { x: scaledX + mapLeft, y: scaledY + mapTop }
    }

    onPropertyChange('floor', () => {
      changeFloors()
    })

    onPropertyChange('inroom', () => {
      moveMaya()
    })

    onPropertyChange('pos', () => {
      moveMaya()
    })

    onPropertyChange('jmop', () => {
      moveJimmy()
    })

    changeFloors()

    document.addEventListener('keydown', (event) => {
      if(event.key === '=') {
        if(currentRadarScale === 'hide') {
          scaleRadar('mini')
        } else if(currentRadarScale === 'mini') {
          scaleRadar('full')
        }
      } else if(event.key === '-') {
        if (currentRadarScale === 'full') {
          scaleRadar('mini')
        } else if (currentRadarScale === 'mini') {
          scaleRadar('hide')
        }
      }
    })
  } catch(e) {
    console.error(e.message)
  }
}