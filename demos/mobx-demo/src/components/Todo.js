import React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'

const Todo = observer(({ item }) => {
  return (
    <li>
      <input type="checkbox" checked={item.finished} onChange={action(() => { item.finished = !item.finished })} />
      {item.title}
    </li>
  )
})

export default Todo

