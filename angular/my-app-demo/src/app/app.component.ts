import { Component } from '@angular/core';

const todos = [{
  id: 1, title: '吃饭', done: true
}]
// 在ng，组件就是一个类
// 装饰器
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  // title = 'my-app-demo';
  // count = 0
  // increment() {
  //   this.count++
  // }
  get toggleAll() {
    return this.todos.every((t) => t.done)
  }
  set toggleAll(value: boolean) {
    this.todos.forEach(e => {
      e.done = value
    });
  }
  get undosLen() {
    return this.todos.filter(t => !t.done).length
  }
  public todos: typeof todos = todos
  public currentEditing: {
    id: number;
    title: string;
    done: boolean;
  } = null
  /**
   * addTodo 添加一个todo
   */
  public addTodo(event: KeyboardEvent): void {
    const target = event.target as HTMLTextAreaElement;
    const title = target.value
    if (title.length) {
      this.todos.push({
        id: this.todos.length + 1, title, done: false
      })
    }
    target.value = '';
  }
  /**
   * remove todo
   */
  public remove(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
  /**
   * saveTodo
   */
  public saveTodo(todo, value) {
    todo.title = value
    this.currentEditing = null
  }
  /**
   * escEdit
   */
  public escEdit(event: KeyboardEvent) {
    const target = event.target as HTMLTextAreaElement;
    const code = event.keyCode
    if (27 === code) {
      target.value = this.currentEditing.title
      this.currentEditing = null
    }
  }
}
