const monitoring = new Map<string, Set<() => void>>()
const cache = new Map<string, any>()

setInterval(() => {
  for (const [name, callbacks] of monitoring) {
    const value = window[name]
    if (value !== cache.get(name)) {
      cache.set(name, value)
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