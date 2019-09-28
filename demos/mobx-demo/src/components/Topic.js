import React, { Component } from 'react'
import { observer, inject } from "mobx-react"

@inject('topicStore')
@observer
class Topic extends Component {
  render () {
    console.log(this.props);
    return (
      <div>
        Topic
        <button onClick={() => { this.props.topicStore.loadTopicsGen() }}>Get Topic</button>
        <p>{this.props.topicStore.topics.length}</p>
      </div>
    )
  }
}
export default Topic
