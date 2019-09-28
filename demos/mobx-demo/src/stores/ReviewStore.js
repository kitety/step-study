import { decorate, observable, action, computed } from 'mobx'
class ReviewStore {
  reviewList = []
  addReview (item) {
    this.reviewList.push(item)
  }
  get allReviewsCount () {
    return this.reviewList.length
  }
  get averageScores () {
    let avr = 0;
    this.reviewList.map(e => avr += e.stars)
    console.log(avr)
    return this.reviewList.length === 0 ? 0 : Math.round(avr * 100 / this.reviewList.length) / 100
  }
}
decorate(ReviewStore, {
  reviewList: observable,
  addReview: action,
  allReviewsCount: computed,
  averageScores: computed
})
export default new ReviewStore()
