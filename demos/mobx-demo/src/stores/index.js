import BirdStore from './BirdStore'
import TodoListStore from './TodoListStore'
import TopicStore from './TopicStore'
import ReviewStore from './ReviewStore'

class Store {
  constructor(props) {
    // 注意有没有new
    this.birdStore =  BirdStore
    this.todoListStore = TodoListStore
    this.topicStore = TopicStore
    this.reviewStore = ReviewStore
  }
}

export default new Store()
