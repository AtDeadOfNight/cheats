import { floors } from '@/data.js'
import { onPropertyChange } from '@/utils/index.js'
import { Key } from 'ts-keycode-enum'

export function initRadar() {
  try {
    const radar = document.createElement('div')
    const map = document.createElement('img')
    radar.id = 'radar-map'
    radar.style.pointerEvents = 'none'
    radar.style.position = 'relative'
    radar.style.top = '0px'
    radar.style.zIndex = '1000'
    document.body.appendChild(radar)
    radar.appendChild(map)
    map.style.width = '100%'

    const maya = document.createElement('div')
    const jimmy = document.createElement('div')
    const mayaImg = document.createElement('img')
    const jimmyImg = document.createElement('img')
    mayaImg.src = 'cheats/assets/maya.png'
    jimmyImg.src = 'cheats/assets/jimmy.png'
    const mayaDirImg = document.createElement('img')
    const jimmyDirImg = document.createElement('img')
    mayaDirImg.src = 'cheats/assets/view-direction.png'
    jimmyDirImg.src = 'cheats/assets/view-direction.png';
    ([mayaImg, jimmyImg].forEach(img => {
      Object.assign(img.style, {
        width: '100%',
        height: 'auto'
      })
    }));
    ([mayaDirImg, jimmyDirImg]).forEach(element => {
      Object.assign(element.style, {
        transition: 'transform 1s'
      })
      element.className = 'view-direction'
    })
    maya.appendChild(mayaImg)
    maya.appendChild(mayaDirImg)
    jimmy.appendChild(jimmyDirImg)
    jimmy.appendChild(jimmyImg)
    radar.appendChild(maya)
    radar.appendChild(jimmy)
    const imgsContainers = [maya, jimmy]
    imgsContainers.forEach(container => {
      Object.assign(container.style, {
        position: 'absolute',
        top: '-999px',
        left: '-999px',
        zIndex: '1001',
        transform: 'translate(-50%, -50%)',
        transition: 'left 1s, top 1s'
      })
    })

    const jimmysFloor = document.createElement('div')
    jimmysFloor.id = 'jimmys-floor'
    const jimmysFloorIcon = document.createElement('img')
    const jimmysFloorSpan = document.createElement('span')
    jimmysFloorIcon.src = 'cheats/assets/jimmys-floor.png'
    jimmysFloorIcon.style.height = '25px'
    jimmysFloorSpan.innerText = '0'
    Object.assign(jimmysFloor.style, {
      display: 'none',
      alignItems: 'center',
      gap: '8px',
      position: 'absolute',
      right: '0px',
      bottom: '0px',
      font: 'bold 24px sans-serif',
    })
    jimmysFloor.append(jimmysFloorIcon)
    jimmysFloor.append(jimmysFloorSpan)
    radar.append(jimmysFloor)

    const friends: HTMLDivElement[] = []
    const createFriends = () => {
      for (let i = 0; i < 5; i++) {
        const friend = document.createElement('div')
        const friendImg = document.createElement('img')
        friendImg.src = 'cheats/assets/maya-friend.svg'
        Object.assign(friendImg.style, {
          opacity: '0.75',
          width: '100%',
          height: '100%'
        })
        Object.assign(friend.style, {
          position: 'absolute',
          top: '-999px',
          left: '-999px',
          zIndex: '1001',
          transform: 'translate(-50%, -50%)'
        })
        friend.appendChild(friendImg)
        radar.appendChild(friend)
        friend.className = 'friend'
        friends.push(friend)
      }
    }

    createFriends()

    const changeFloors = () => {
      moveFriends()
      if (window.floor >= 2) {
        map.src = `cheats/assets/map/floor-${window.floor - 1}.png`
        radar.style.display = 'block'

        if (window.floor !== window.jhfloor) {
          jimmy.style.display = 'none'
          jimmysFloor.style.display = 'flex'
          jimmysFloorSpan.innerText = (window.jhfloor === 5 || window.jhfloor === 0) ? '--' : String(window.jhfloor - 1)
        } else {
          jimmy.style.display = 'block'
          jimmysFloor.style.display = 'none'
        }
      } else {
        radar.style.display = 'none'
      }
    }

    const moveCharacter = (character: HTMLElement, xpos: number | 'stairs', ypos: number | 'stairs', dir: 'N' | 'S' | 'W' | 'E', speed) => {
      const floorMap = floors[window.floor - 2]
      if (!floorMap) {
        return
      }

      const point = xpos === 'stairs' || ypos === 'stairs' 
        ? floorMap.stairs
        : floorMap.points.find(point => point.xpos === xpos && point.ypos === ypos)
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
        const viewDirectionDir = { 'N': 90, 'E': 180, 'W': 0, 'S': -90 }[dir]
        const dirAngle = character.querySelector('.view-direction') as HTMLElement
        if (dirAngle)
          dirAngle.style.transform = `translate(-50%, -50%) rotate(${viewDirectionDir}deg)`
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
        if (window.stairs === 2) {
          moveCharacter(maya, 'stairs', 'stairs', 'N', skipTransition ? '0s' : '1s')
        } else {
          const xpos = window.pos[0]
          const ypos = window.pos[1]
          const dir = window.pos[2]
          moveCharacter(maya, xpos, ypos, dir, skipTransition ? '0s' : '1s')
        }
      } else {
        const room = floorMap.rooms.find(({ room }) => room === window.inroom)
        if (!room) return
        const { x, y } = calculatePosition(room.x, room.y)
        maya.style.left = `${x}px`
        maya.style.top = `${y}px`
      }
    }

    const moveJimmy = (skipTransition = false) => {
      const floorMap = floors[window.floor - 2]
      if (!floorMap) {
        return
      }

      if (window.jhinroom === 0) {
        const xpos = Number(window.jmop[0].slice(0,2))
        const ypos = Number(window.jmop[0].slice(2,4))
        const dir = window.jmop[1]
        moveCharacter(jimmy, xpos, ypos, dir, skipTransition ? '0s' : '0.5s')
      } else {
        const room = floorMap.rooms.find(({ room }) => room === window.jhinroom)
        if (!room) return
        const { x, y } = calculatePosition(room.x, room.y)
        jimmy.style.left = `${x}px`
        jimmy.style.top = `${y}px`
      }
    }

    const moveFriends = () => {
      const floorMap = floors[window.floor - 2]
      if (!floorMap) {
        return
      }

      const guestRooms = window.guestrooms
        .filter((_, index) => window.guestsin[index] === 1)
        .filter(room => floorMap.rooms.some(r => r.room === room))
        .map(room => floorMap.rooms.find(r => r.room === room)!)

      friends.forEach(friend => {
        Object.assign(friend.style, {
          left: '-999px',
          top: '-999px'
        })
      })
      
      guestRooms.forEach((friendRoom, index) => {
        const friendElement = friends[index]
        const { x, y } = calculatePosition(friendRoom.x, friendRoom.y)
        friendElement.style.left = `${x}px`
        friendElement.style.top = `${y}px`
      })
    }

    let currentRadarScale = 'mini'
    const scaleRadar = (level: 'hide' | 'mini' | 'full') => {
      if (window.floor < 2) return
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
          maya.style.height = '5%';

          ([mayaImg, jimmyImg].forEach(img => {
            Object.assign(img.style, {
              width: 'auto',
              height: '100%'
            })
          }));

          ([mayaDirImg, jimmyDirImg]).forEach(element => {
            Object.assign(element.style, {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 'auto',
              height: '200%',
              transform: 'translate(-50%, -50%)'
            })
          })

          jimmy.style.width = 'auto'
          jimmy.style.height = '5%'

          friends.forEach(friend => {
            Object.assign(friend.style, {
              width: 'auto',
              height: '5%'
            })
          })

          moveMaya(true)
          moveJimmy(true)
          moveFriends()
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
          maya.style.height = 'auto';

          ([mayaImg, jimmyImg].forEach(img => {
            Object.assign(img.style, {
              width: '100%',
              height: 'auto'
            })
          }));

          ([mayaDirImg, jimmyDirImg]).forEach(element => {
            Object.assign(element.style, {
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '200%',
              height: 'auto',
              transform: 'translate(-50%, -50%)'
            })
          })

          jimmy.style.width = '5%'
          jimmy.style.height = 'auto'

          friends.forEach(friend => {
            Object.assign(friend.style, {
              width: '5%',
              height: 'auto'
            })
          })

          moveMaya(true)
          moveJimmy(true)
          moveFriends()
        } else if(level === 'hide') {
          radar.style.display = 'none'
        }
      }, 1)
    }
    
    const checkIfJimmyInRoomWithMaya = () => {
      if (window.inroom !== 0 && window.jhinroom === window.inroom) {
        maya.style.opacity = '0.1'
      } else {
        maya.style.opacity = '1'
      }
    }

    onPropertyChange('menon', () => {
      if(window.menon === 0) {
        scaleRadar('mini')
      } else {
        scaleRadar('hide')
      }
    })

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

    onPropertyChange('jhfloor', () => {
      changeFloors()
    })

    onPropertyChange('inroom', () => {
      moveMaya()
      checkIfJimmyInRoomWithMaya()
    })

    onPropertyChange('jhinroom', () => {
      moveJimmy()
      checkIfJimmyInRoomWithMaya()
    })

    onPropertyChange('pos', () => {
      moveMaya()
    })

    onPropertyChange('jmop', () => {
      moveJimmy()
    })

    onPropertyChange('stairs', () => {
      moveMaya()
    })

    changeFloors()

    document.addEventListener('keydown', (event) => {
      if(event.code === 'Equals') {
        if(currentRadarScale === 'hide') {
          scaleRadar('mini')
        } else if(currentRadarScale === 'mini') {
          scaleRadar('full')
        }
      } else if (event.code === 'Minus') {
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