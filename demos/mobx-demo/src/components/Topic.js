import React, { Component } from 'react'
import { observer, inject } from "mobx-react"

@inject('topicStore')
@observer
class Topic extends Component {
  render () {
    console.log(this.props);
    let data = this.props.topicStore
    let content=null
    if(data.error){
      content = data.error
    }else if(data.loading){
      content='loading...'
    }else{
      content =data.topics.length
    }
    return (
      <div>
        Topic
        <button onClick={() => { this.props.topicStore.loadTopics() }}>Get Topic</button>
        <p>{content}</p>
      </div>
    )
  }
}
export default Topic
