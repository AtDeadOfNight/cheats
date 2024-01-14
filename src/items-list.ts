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

    let itemsListVisible = false
    let showing: 'items' | 'keys' = 'items'

    const updateItemsList = () => {
      const items = getItemsList()
        .filter(item => showing === 'items' ? (
          item.type === 'item' || item.type === 'scrying_mirror' || item.type === 'compass'
        ) : (
          item.type === 'key' && !item.code.startsWith('GUEST') && item.locatedIn?.[0] && item.locatedIn[0] > 0
        ))
      
      const leftTableRows = createTable(items.slice(0, 19))
      const hint1 = document.createElement('div')
      const hintStyle = {
        fontWeight: 'bold',
        marginTop: '4px',
        padding: '4px 6px',
        background: '#fff',
        color: '#000',
        textShadow: 'none'
      }
      Object.assign(hint1.style, hintStyle)
      hint1.innerHTML = '<td colspan="3">Press E to hide this list</td>'
      const hint2 = document.createElement('div')
      Object.assign(hint2.style, hintStyle)
      hint2.innerHTML = `<td colspan="3">Press K to ${showing === 'items' ? 'show keys' : 'show items'}</td>`
      const hints = document.createElement('tr')
      Object.assign(hints.style, {
        display: 'flex',
        flexDirection: 'row',
        gap: '4px'
      })
      hints.append(hint1, hint2)

      const leftTable = document.createElement('table')
      leftTable.style.borderCollapse = 'collapse'
      leftTable.append(...leftTableRows, hints)

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
        if(item.type === 'key') itemImg = 'media/gfx/IP/I-KEY.png'
        else if (item.type === 'compass') itemImg = 'media/gfx/ColCompA.png'
        else if (item.type === 'scrying_mirror') itemImg = 'media/gfx/ColMirror.png'
        
        const itemStyles = 'vertical-align: middle; margin-right: 6px;'
        const spanStyle = item.obtained ? 'text-decoration: line-through;' : ''
        listItem.innerHTML = `<td><img src="${itemImg}" width="32" style="${itemStyles}" /><span style="${spanStyle}">${item.name ?? `Key for room №${item.keyForRoom}`}</span?</td><td>${item.obtained ? '-' : (item.locatedIn?.[0] ?? '')}</td>`
        rows.push(listItem)
      }

      const placeholderRows = rows.length < 19 
        ? new Array(19 - rows.length).fill(null).map(() => {
          const placeholderRow = document.createElement('tr')
          placeholderRow.innerHTML = '<td>&nbsp;</td><td>&nbsp;</td>'
          placeholderRow.style.height = '34px'
          return placeholderRow
        }) : []
      return rows.concat(...placeholderRows)
    }

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
      } else if(event.which === Key.K && itemsListVisible) {
        showing = showing === 'items' ? 'keys' : 'items'
        list.innerHTML = ''
        updateItemsList()
      }
    })
  } catch (e) {
    console.error(e)
  }
}