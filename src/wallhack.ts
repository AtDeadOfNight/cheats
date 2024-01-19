/* eslint-disable no-inner-declarations */
import { Point, floors } from '@/data.js'
import { onPropertyChange } from '@/utils/index.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const mapSizes = { floor1: [1600, 1204], floor2: [1600, 1240], floor3: [730, 773] } as const

const cameraMode: 'top' | 'first-person' = 'first-person'

export function initWallHack() {
  try {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000)
    
    if (cameraMode === 'top') {
      camera.position.y = 1000
      camera.rotation.x = - (90 * Math.PI / 180)
    }

    camera.rotation.order = 'YXZ'
    camera.rotation.x = -10 * Math.PI / 180
    
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
      width: '100%',
      height: '100%',
      opacity: '0.5',
      pointerEvents: 'none'
    })
    document.body.appendChild(renderer.domElement)
    
    // const liftsGeometry = new THREE.BoxGeometry(75, 10, 75)
    // const liftsMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // const lifts = new THREE.Mesh(liftsGeometry, liftsMaterial)
    // scene.add(lifts)
    
    // lifts.position.x = 630 + 75 / 2
    // lifts.position.y = 25
    // lifts.position.z = 537 + 75 / 2

    const playerGeometry = new THREE.BoxGeometry(25, 25, 25)
    const playerMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    const player = new THREE.Mesh(playerGeometry, playerMaterial)
    scene.add(player)
    
    let jimmy: THREE.Object3D
    const loader = new GLTFLoader()
    loader.load('cheats/assets/jimmy-model.glb', function (gltf) {
      const jimmyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
      jimmy = gltf.scene
      jimmy.position.y = 25 / 2
      jimmy.scale.set(10, 10, 10)
      jimmy.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = jimmyMaterial
        }
      })
      scene.add(jimmy)
    })

    let floor: 1 | 2 | 3 | null = null

    // const scenePlaneGeometry = new THREE.BoxGeometry(1, 1, 1)
    // const scenePlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    // const scenePlane = new THREE.Mesh(scenePlaneGeometry, scenePlaneMaterial)
    // scene.add(scenePlane)
    
    player.position.y = 50
    window.wallhack = { camera: camera, player }

    function animate() {
      requestAnimationFrame(animate)
      if(cameraMode === 'first-person') {
        camera.position.x = player.position.x
        camera.position.y = player.position.y
        camera.position.z = player.position.z
      }
      renderer.render(scene, camera)
    }

    animate()

    function changeFloors() {
      if (window.floor - 1 < 1 || window.floor - 1 > 3) floor = null
      else floor = window.floor - 1
      
      if(cameraMode === 'top') {
        camera.position.x = mapSizes[`floor${floor}`][0] / 2
        camera.position.z = mapSizes[`floor${floor}`][0] / 2
      }
      // scenePlane.position.x = mapSizes[`floor${floor}`][0] / 2
      // scenePlane.position.z = mapSizes[`floor${floor}`][0] / 2
      // scenePlane.scale.x = mapSizes[`floor${floor}`][0]
      // scenePlane.scale.z = mapSizes[`floor${floor}`][1]
    }

    function getFloorPoint(xpos: number | 'stairs', ypos: number | 'stairs') {
      if (floor === null) return
      const floorMap = floors[floor - 1]
      if (!floorMap) {
        return
      }

      const point = xpos === 'stairs' || ypos === 'stairs'
        ? floorMap.stairs
        : floorMap.points.find(point => point.xpos === xpos && point.ypos === ypos)

      return point
    }

    function moveMaya() {
      const xpos = window.pos[0]
      const ypos = window.pos[1]
      const dir = window.pos[2]
      const point = getFloorPoint(xpos, ypos)
      if (!point) return

      transition(player.position, 'x', point.x)
      transition(player.position, 'z', point.y)
      const rotationDir = { 'N': 180, 'E': 90, 'W': 270, 'S': 0 }
      const currentAngle = player.rotation.y
      const viewAngle = 'rotation' in point
        ? ((point as Point).rotation?.[dir] ?? rotationDir[dir])
        : rotationDir[dir]
      const targetAngle = viewAngle * Math.PI / 180
      const angleDiff = shortestAngleDiff(targetAngle, currentAngle)
      transition(player.rotation, 'y', currentAngle + angleDiff)
      transition(camera.rotation, 'y', currentAngle + angleDiff)
    }

    function moveJimmy() {
      const xpos = Number(window.jmop[0].slice(0, 2))
      const ypos = Number(window.jmop[0].slice(2, 4))
      const dir = window.jmop[1]
      const point = getFloorPoint(xpos, ypos)
      if (!point) return

      transition(jimmy.position, 'x', point.x, 500)
      transition(jimmy.position, 'z', point.y, 500)
      const rotationDir = { 'N': 180, 'E': 90, 'W': 270, 'S': 0 }
      const currentAngle = jimmy.rotation.y
      const targetAngle = rotationDir[dir] * Math.PI / 180
      const angleDiff = shortestAngleDiff(targetAngle, currentAngle)
      transition(jimmy.rotation, 'y', currentAngle + angleDiff, 500)
    }

    onPropertyChange('pos', () => {
      moveMaya()
    })

    onPropertyChange('floor', () => {
      changeFloors()
    })

    onPropertyChange('jmop', () => {
      moveJimmy()
    })
  } catch(e) {
    console.error(e.message)
  }
}

function transition(object: object, property: string, to: number, duration = 1000) {
  const initialValue = object[property]
  const startTime = Date.now()
  const play = () => {
    const position = (Date.now() - startTime) / duration
    if (position <= 1) {
      requestAnimationFrame(play)
      object[property] = initialValue + (to - initialValue) * easeInOutCubic(position)
    }
  }

  play()
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function shortestAngleDiff(targetAngle, currentAngle) {
  let diff = targetAngle - currentAngle
  while (diff < -Math.PI) diff += 2 * Math.PI
  while (diff > Math.PI) diff -= 2 * Math.PI
  return diff
}