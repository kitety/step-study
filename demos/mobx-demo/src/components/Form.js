import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('reviewStore')
@observer
class Form extends Component {
  submit = (e) => {
    e.preventDefault()
    alert('请输入名称')
    if (this.inp.value === '') return
    let item = { review: this.inp.value, stars: Number(this.select.value), id: Math.random() }
    console.log(item)
    this.props.reviewStore.addReview(item)
    this.inp.value = ''
    this.select.value = 1
  }
  render () {
    return (
      <div className="formSelect">
        <div className="form-group">
          <p>Submit a Review</p>
          <form onSubmit={this.submit}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <input type="text" placeholder="write a review" className="form-control" ref={inp => this.inp = inp} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <select id="stars" name="stars" className="form-control" ref={select => this.select = select} >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">SUBMIT REVIEW</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Form
