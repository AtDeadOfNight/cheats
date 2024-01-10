import { isEqual } from '@/utils/deep-compare.js'
import clone from 'just-clone'

const monitoring = new Map<string, Set<() => void>>()
const cache = new Map<string, any>()

setInterval(() => {
  for (const [name, callbacks] of monitoring) {
    const value = window[name]
    if (!isEqual(value, cache.get(name))) {
      cache.set(name, clone(value))
      for (const callback of callbacks) {
        callback()
      }
    }
  }
}, 10)

export function onPropertyChange(name: string, callback: () => void) {
  const callbacks = monitoring.get(name) || new Set()
  callbacks.add(callback)
  monitoring.set(name, callbacks)
}

// DISPLAY X/Y POSITION on screen:
const positionlabel = document.createElement('span')
positionlabel.id = 'position-label'
positionlabel.style.zIndex = '1000'
positionlabel.style.pointerEvents = 'none'
positionlabel.style.position = 'absolute'
positionlabel.style.top = '50%'
positionlabel.style.left = '50%'
positionlabel.style.transform = 'translate(-50%, -50%)'
positionlabel.style.font = 'bold 196px monospace'
positionlabel.style.color = 'white'
positionlabel.style.textShadow = '0 0 10px black'
document.body.appendChild(positionlabel)
setInterval(() => {
  positionlabel.innerText = `${window.pos[0]},${window.pos[1]}`
}, 100)