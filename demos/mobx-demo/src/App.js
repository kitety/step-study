import React from 'react';
import './App.css';
import { observer } from "mobx-react"
import DevTools from 'mobx-react-devtools';

@observer
class App extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    // this.props.store.birds[0] = this.bird.value
    // 用action来操作数据
    this.props.store.birdStore.addBird(this.bird.value)

    this.bird.value = ''
  }
  render () {
    // 注入式 引用了才会执行
    // this.props.store.birdStore.birds[0] 取下表的时候不会运行
    console.log('render')
    return (
      <div className="App">
        <DevTools />
        <header className="App-header">
          <p>第一只鸟的名字 {this.props.store.birdStore.firstBird}</p>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" placeholder="Enter you bird name" ref={input => this.bird = input} />
            <button>Add bird</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
