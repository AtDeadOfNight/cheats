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
      gap: '16px'
    })
    Object.assign(itemsListContainer.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '1152px',
      height: '750px',
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '32px',
      color: '#fff',
      font: '19px subs',
      zIndex: 1001,
      letterSpacing: 'normal',
      display: 'none',
      pointerEvents: 'none',
      overflow: 'hidden',
      boxSizing: 'border-box',
    })
    itemsListContainer.id = 'items-list-container'
    itemsListContainer.appendChild(list)
    document.body.appendChild(itemsListContainer)

    const updateItemsList = () => {
      const items = getItemsList()
        .filter(item => item.type === 'item' || item.type === 'scrying_mirror' || item.type === 'compass')
        // .filter(item => !item.obtained)
        // .filter(item => item.locatedIn?.[0] && item.locatedIn[0] > 0)
      
      const leftTableRows = createTable(items.slice(0, 19))
      const hint = document.createElement('tr')
      Object.assign(hint.style, {
        fontWeight: 'bold',
        marginTop: '16px',
        padding: '4px 6px',
        background: '#fff',
        color: '#000',
        textShadow: 'none'
      })
      hint.innerHTML = '<td colspan="3">Press E to hide this list</td>'
      const leftTable = document.createElement('table')
      leftTable.style.borderCollapse = 'collapse'
      leftTable.append(...leftTableRows, hint)

      const rightTableRows = createTable(items.slice(19))
      const rightTable = document.createElement('table')
      rightTable.style.borderCollapse = 'collapse'
      rightTable.append(...rightTableRows)
      
      const divider = document.createElement('div')
      Object.assign(divider.style, {
        height: '690px',
        width: '1px',
        background: '#ccc',
      })

      list.append(leftTable, divider, rightTable)
    }

    const createTable = (rowsData: Item[]) => {
      const rows: HTMLTableRowElement[] = []

      const header = document.createElement('tr')
      header.innerHTML = '<th align="left">Item</th><th align="left">Location room №</th>'
      Object.assign(header.style, {
        paddingBottom: '8px',
        borderBottom: '1px solid #fff',

      })
      rows.push(header)

      for (const item of rowsData) {
        const listItem = document.createElement('tr')
        if(item.obtained) {
          listItem.style.color = '#9c9c9c'
        }

        let itemImg
        if(item.type === 'item') itemImg = `media/gfx/IP/I-${item.index}.png`
        else if (item.type === 'compass') itemImg = 'media/gfx/ColCompA.png'
        else if (item.type === 'scrying_mirror') itemImg = 'media/gfx/ColMirror.png'
        
        const itemStyles = 'vertical-align: middle; margin-right: 6px;'
        const spanStyle = item.obtained ? 'text-decoration: line-through;' : ''
        listItem.innerHTML = `<td><img src="${itemImg}" width="32" style="${itemStyles}" /><span style="${spanStyle}">${item.name}</span?</td><td>${item.obtained ? '-' : item.locatedIn?.[0]}</td>`
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