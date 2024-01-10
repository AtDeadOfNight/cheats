function deepArrayEquals(a, b) {
  if (a === b) {
    return true
  }

  if (a == null || b == null || a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!deepArrayEquals(a[i], b[i])) {
        return false
      }
    } else if (typeof a[i] === 'object' && typeof b[i] === 'object') {
      if (!deepObjectEquals(a[i], b[i])) {
        return false
      }
    } else if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}

function deepObjectEquals(obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = obj1[key]
    const val2 = obj2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      areObjects && !deepObjectEquals(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false
    }
  }

  return true
}

function isObject(object) {
  return object != null && typeof object === 'object'
}

export function isEqual(a, b) {
  if(!Array.isArray(a) && !Array.isArray(b) && typeof a !== 'object' && typeof b !== 'object') {
    return a === b
  } else {
    return deepArrayEquals(a, b)
  }
}