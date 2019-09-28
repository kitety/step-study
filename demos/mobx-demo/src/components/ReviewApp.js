import React, { Component } from 'react'
import Form from './Form'
import DashBoard from './DashBoard'
import Reviews from './Reviews'

class ReviewApp extends Component {
  render () {
    return (
      <div>
        <Form />
        <DashBoard />
        <Reviews />
      </div>
    )
  }
}
export default ReviewApp


