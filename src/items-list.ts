import { getItemsList } from '@/utils/items-list.js'
import { Key } from 'ts-keycode-enum'

export function initItemsList() {
  try {
    const itemsListContainer = document.createElement('div')
    const list = document.createElement('table')
    list.id = 'items-list'
    Object.assign(itemsListContainer.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50vw',
      height: '50vh',
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '32px',
      color: '#fff',
      font: 'normal 16px sans-serif',
      zIndex: 1
    })
    itemsListContainer.id = 'items-list-container'
    itemsListContainer.appendChild(list)
    document.body.appendChild(itemsListContainer)

    const updateItemsList = () => {
      const items = getItemsList()
        .filter(item => item.type === 'item' || item.type === 'scrying_mirror' || item.type === 'compass')
        .filter(item => !item.obtained)
        .filter(item => item.locatedIn?.[0] && item.locatedIn[0] > 0)
      
      const header = document.createElement('tr')
      header.innerHTML = '<th>Item</th><th>Type</th><th>Location room №</th>'
      list.append(header)

      for(const item of items) {
        const listItem = document.createElement('li')
        listItem.innerHTML = `<td>${item.name}</td><td>${item.type}</td><td>${item.locatedIn?.[0]}</td>`
        list.append(listItem)
      }
    }

    let itemsListVisible = false

    const showHideItemsList = () => {
      if (itemsListVisible) {
        itemsListContainer.style.display = 'none'
        list.innerHTML = ''
      } else {
        updateItemsList()
        itemsListContainer.style.display = 'block'
      }

      itemsListVisible = !itemsListVisible
    }

    document.addEventListener('keydown', (event) => {
      if (event.which === Key.I) {
        showHideItemsList()
      }
    })
  } catch (e) {
    console.error(e)
  }
}