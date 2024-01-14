interface Window {
  floor: number
  inroom: number
  pos: [number, number, 'W' | 'S' | 'E' | 'N']
  jmop: [string, 'W' | 'S' | 'E' | 'N']
  jhfloor: number
  jhinroom: number
  menon: 0 | 1
  stairs: number
  guestrooms: [number, number, number, number, number]
  guestsin: [(0 | 1), (0 | 1), (0 | 1), (0 | 1), (0 | 1)]
  itemlist: (number | string | object)[]
}