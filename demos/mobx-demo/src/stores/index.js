import BirdStore from './BirdStore'
import TodoListStore from './TodoListStore'

class Store {
  constructor(props) {
    // 注意有没有new
    this.birdStore =  BirdStore
    this.todoListStore = TodoListStore
  }
}

export default new Store()
