import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import StarRatingComponent from 'react-star-rating-component';

function Review ({item}) {
  return (
    <li className="list-group-item">
      <div className="float-left">{item.review}</div>
      <div className="float-right">
        <StarRatingComponent
          name="rate1"
          starCount={item.stars}
          value={item.stars}
        />
      </div>
    </li>
  )
}
function Reviews (props) {
  console.log(props)
  return (
    <div className="reviewWrapper">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <i className="fa fa-comments"></i> Reviews
            </div>
            <ul className="list-group list-group-flush">
              {
                props.reviewStore.reviewList.map(item => <Review key={item.id} item={item} />)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default inject('reviewStore')(observer(Reviews))
