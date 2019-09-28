import React from 'react';
import './App.css';
import { observer, inject } from "mobx-react"
import DevTools from 'mobx-react-devtools';
import Fun from './Fun'
import { compose } from 'recompose'
import TodoList from './components/TodoLost'
import Topic from './components/Topic'
import ReviewApp from './components/ReviewApp'

// @inject('birdStore')
// @observer
class App extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    // this.props.store.birds[0] = this.bird.value
    // 用action来操作数据
    this.store.addBird(this.bird.value)

    this.bird.value = ''
  }
  // store = () => {
  //   return this.props.birdStore
  // }
  get store () {
    return this.props.birdStore
  }
  render () {
    // 注入式 引用了才会执行
    // 调用观察的对象才会运行  computed
    // this.props.store.birdStore.birds[0] 下标的时候不会运行
    console.log(this.props)
    return (
      <div className="container">
        <ReviewApp />
        <DevTools />
        <header className="App-header">
          <Topic/>
          <TodoList/>
          <p>第一只鸟的名字 {this.props.birdStore.firstBird}</p>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" placeholder="Enter you bird name" ref={input => this.bird = input} />
            <button>Add bird</button>
          </form>
        </header>
      </div>
    );
  }
}

// export default App;
// export default inject('birdStore')(observer(App));
export default compose(inject('birdStore'),observer)(App);
