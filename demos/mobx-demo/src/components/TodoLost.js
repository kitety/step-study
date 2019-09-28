import React, { Component } from 'react'
import { extendObservable, action, observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import Todo from './Todo'

@inject('todoListStore')
@observer
class TodoList extends Component {
  // constructor(props) {
  //   super(props);
  //   // 为这个class添加可观察对象
  //   extendObservable(this, {
  //     newTodoTitle: '',
  //     // 开启强制之后必须加action，否则 不加都可以
  //     handleInputchange: action((e) => {
  //       this.newTodoTitle = e.target.value
  //     })
  //   })
  // }
  // 在component直接使用
  @action
  handleInputchange = e => {
    this.newTodoTitle = e.target.value
  }
  @action
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.todoListStore.addTodo(this.newTodoTitle)
    // console.log(this.props.todoListStore.todos)
    this.newTodoTitle = ''
  }

  @observable newTodoTitle = ''

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <span>New Todo:</span>
          <input type="text" value={this.newTodoTitle} onChange={this.handleInputchange} />
          <button >Add</button>
          <hr />
          Task Left:{this.props.todoListStore.unfinishedTodoCount}
          <ul>
            {
              this.props.todoListStore.todos.map(item => <Todo key={item.id} item={item}></Todo>)
            }
          </ul>
          
        </form>
      </div>
    )
  }
}
export default TodoList
