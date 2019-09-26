import React from 'react'
import { observer, inject } from "mobx-react"
// 注入两个
const Fun = inject('todoListStore','birdStore')(
  observer ((props) => {
    // 调用的元素修改才会运行  props.todoListStore.firstTodo
    console.log('fun', props)
    return (
      <div>
        {props.todoListStore.firstTodo}
    </div>
    )
  })
)
// const Fun = inject('birdStore')(
//   observer ((props) => {
//     console.log('fun', props)
//     return (
//       <div>
//         {props.birdStore.birdCount}
//     </div>
//     )
//   })
// )

export default Fun

