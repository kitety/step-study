import { observable, computed, action, toJS } from 'mobx'
import TodoStore from './TodoStore'

class TodoListStore {
  @observable todos = []
  @computed get unfinishedTodoCount () {
    return this.todos.filter(todo => !todo.finished).length
  }
  @action addTodo (title) {
    this.todos.push(new TodoStore(title))
  }
  @computed get firstTodo () {
    return toJS(this.todos)[0]
  }
}
const store = window.store = new TodoListStore()

export default store
