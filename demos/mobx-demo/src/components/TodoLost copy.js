import React, { Component } from 'react'
import { extendObservable,action } from 'mobx'
import { observer } from 'mobx-react'

@observer
class TodoList extends Component {
  constructor(props) {
    super(props);
    // 为这个class添加可观察对象
    extendObservable(this, {
      newTodoTitle: '',
      // 开启强制之后必须加action，否则 不加都可以
      handleInputchange: action((e) => {
        this.newTodoTitle = e.target.value
      })
    })
  }
  // handleInputchange = e => {
  //   this.newTodoTitle = e.target.value
  // }

  render () {
    return (
      <div>
        <form>
          <span>New Todo:</span>
          <input type="text" value={this.newTodoTitle} onChange={this.handleInputchange} />
          <hr />
        </form>
      </div>
    )
  }
}
export default TodoList
