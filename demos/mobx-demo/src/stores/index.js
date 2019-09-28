import BirdStore from './BirdStore'
import TodoListStore from './TodoListStore'
import TopicStore from './TopicStore'

class Store {
  constructor(props) {
    // 注意有没有new
    this.birdStore =  BirdStore
    this.todoListStore = TodoListStore
    this.topicStore = TopicStore
  }
}

export default new Store()
