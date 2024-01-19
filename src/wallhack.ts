/* eslint-disable no-inner-declarations */
import { floors } from '@/data.js'
import { onPropertyChange } from '@/utils/index.js'
import * as THREE from 'three'

const mapSizes = { floor1: [1600, 1204], floor2: [1600, 1240], floor3: [730, 773] } as const

export function initWallHack() {
  try {
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    cam.position.y = 1000
    cam.rotation.x = - (90 * Math.PI / 180)
    
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
    
    const geometry = new THREE.BoxGeometry(75, 50, 75)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const cameraGeometry = new THREE.BoxGeometry(25, 25, 25)
    const cameraMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const camera = new THREE.Mesh(cameraGeometry, cameraMaterial)
    scene.add(camera)
    
    cube.position.x = 630
    cube.position.y = 25
    cube.position.z = 537

    let floor: 1 | 2 | 3 | null = null

    const scenePlaneGeometry = new THREE.BoxGeometry(1, 1, 1)
    const scenePlaneMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const scenePlane = new THREE.Mesh(scenePlaneGeometry, scenePlaneMaterial)
    scene.add(scenePlane)
    
    camera.position.y = 25
    window.wallhack = { camera: cam }

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, cam)
    }

    animate()

    function changeFloors() {
      if (window.floor - 1 < 1 || window.floor - 1 > 3) floor = null
      else floor = window.floor - 1
      
      scenePlane.position.x = mapSizes[`floor${floor}`][0] / 2
      scenePlane.position.z = mapSizes[`floor${floor}`][0] / 2
      cam.position.x = mapSizes[`floor${floor}`][0] / 2
      cam.position.z = mapSizes[`floor${floor}`][0] / 2
      scenePlane.scale.x = mapSizes[`floor${floor}`][0]
      scenePlane.scale.z = mapSizes[`floor${floor}`][1]
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
      console.log('point', point, xpos, ypos, floor)
      if (!point) return

      camera.position.x = point.x
      camera.position.z = point.y
      // convert degrees to radians
      camera.rotation.y = { 'N': 90, 'E': 180, 'W': 0, 'S': -90 }[dir] * Math.PI / 180
    }

    onPropertyChange('pos', () => {
      moveMaya()
    })

    onPropertyChange('floor', () => {
      changeFloors()
    })
  } catch(e) {
    console.error(e.message)
  }
}
