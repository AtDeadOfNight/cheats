type Item = {
  // Technical internal code for this item
  code: string
  obtained: boolean
  // Number of slot in inventory, starting from 1
  inventorySlot?: number
  name: string
  type: 'item' | 'event' | 'ghost_answer' | 'key' | 'scrying_mirror' | 'compass'
  // Only for type === 'key'
  keyForRoom?: number
  // Which ghosts answered about this item
  answers: {
    Amy: boolean
    DrBose: boolean
    Harvey: boolean
    Rose: boolean
  }
  // Where it is located. Array is: room number or 0, drawer code or 'X'
  locatedIn?: [number, string]
}

export function getItemsList() {
  return Array(Math.ceil(window.itemlist.length / 3)).fill(null).map((_, index) => index * 3)
    .map(begin => window.itemlist.slice(begin, begin + 3))
    .map(itemListItem => {
      const [inventorySlot, code, item] = itemListItem as [number, string, object]
      return {
        code,
        obtained: inventorySlot > 0,
        ...(inventorySlot > 0 && { inventorySlot }),
        type: { 1: 'item', 2: 'event', 3: 'ghost_answer', 4: 'key', 5: 'scrying_mirror', 6: 'compass' }[item['t']],
        name: item['n']?.[0],
        ...(item['t'] === 4 && { keyForRoom: item['o'] }),
        answers: { Amy: item['a']?.[0] === 1, DrBose: item['a']?.[0] === 1, Harvey: item['a']?.[0] === 1, Rose: item['a']?.[0] === 1 },
        ...(item['rp'] && { locatedIn: item['rp'] }),
      }
    }) as Item[]
}