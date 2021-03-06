import { observable, computed, action } from 'mobx'

export default class TodoStore {
  id = Math.random();
  @observable title;
  @observable finished = false
  constructor(title) {
    this.title = title
  }
}
