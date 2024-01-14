import { Item, getItemsList } from '@/utils/items-list.js'
import { Key } from 'ts-keycode-enum'

export function initItemsList() {
  try {
    const itemsListContainer = document.createElement('div')
    const list = document.createElement('div')
    list.id = 'items-list'
    Object.assign(list.style, {
      display: 'flex',
      flexDirection: 'row',
      gap: '8px'
    })
    Object.assign(itemsListContainer.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '75vw',
      height: '75vh',
      background: 'rgba(0, 0, 0, 0.65)',
      padding: '32px',
      color: '#fff',
      font: '18px subs',
      zIndex: 1001,
      letterSpacing: 'normal',
      display: 'none',
      pointerEvents: 'none'
    })
    itemsListContainer.id = 'items-list-container'
    itemsListContainer.appendChild(list)
    document.body.appendChild(itemsListContainer)

    const updateItemsList = () => {
      const items = getItemsList()
        .filter(item => item.type === 'item' || item.type === 'scrying_mirror' || item.type === 'compass')
        // .filter(item => !item.obtained)
        // .filter(item => item.locatedIn?.[0] && item.locatedIn[0] > 0)
      
      const leftTableRows = createTable(items.slice(0, 18))
      const hint = document.createElement('tr')
      hint.style.fontWeight = 'bold'
      hint.style.paddingTop = '8px'
      hint.innerHTML = '<td colspan="3">Press E to hide this list</td>'
      const leftTable = document.createElement('table')
      leftTable.append(...leftTableRows, hint)

      const rightTableRows = createTable(items.slice(18))
      const rightTable = document.createElement('table')
      rightTable.append(...rightTableRows)
      
      const divider = document.createElement('div')
      Object.assign(divider.style, {
        height: '100%',
        width: '1px',
        background: '#fff',
      })

      list.append(leftTable, divider, rightTable)
    }

    const createTable = (rowsData: Item[]) => {
      const rows: HTMLTableRowElement[] = []

      const header = document.createElement('tr')
      header.innerHTML = '<th align="left">Item</th><th align="left">Type</th><th align="left">Location room №</th>'
      header.style.paddingBottom = '8px'
      header.style.border = '1px solid #fff'
      header.style.borderWidth = '0px'
      header.style.borderBottomWidth = '1px'
      rows.push(header)

      for (const item of rowsData) {
        const listItem = document.createElement('tr')
        if(item.obtained) {
          listItem.style.color = '#9c9c9c'
        }
        const itemImg = `media/gfx/IP/I-${item.index}.png`
        const itemStyles = 'vertical-align: middle; margin-right: 4px;'
        listItem.innerHTML = `<td><img src="${itemImg}" width="32" style="${itemStyles}" />${item.name}</td><td>${item.type}</td><td>${item.obtained ? '-' : item.locatedIn?.[0]}</td>`
        rows.push(listItem)
      }

      return rows
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
      if (event.which === Key.E) {
        showHideItemsList()
      }
    })
  } catch (e) {
    console.error(e)
  }
}