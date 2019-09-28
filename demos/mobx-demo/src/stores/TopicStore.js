import { observable, computed, action, runInAction, flow } from 'mobx'

class TopicStore {
  @observable topics = [];
  @observable loading = false;
  @observable error = false;
  // 第一种方式
  @action loadTopics = () => {
    runInAction(() => {
      this.loading = true
      this.error = null
    })
    fetch('https://cnodejs.org/api/v1/topics').then(res => res.json()).then(data => {
      console.log(data.data)
      // 或者单独抽出一个function
      this.topics = data.data
    }).catch(err => {
      console.log(err)
      runInAction(() => {
        this.error = err.message
      })
    }).finally(() => {
      runInAction(() => {
        this.loading = false
      })
    })
  }
  // 第二种方式
  loadTopicsInline = () => {
    fetch('https://cnodejs.org/api/v1/topics').then(res => res.json()).then(data => {
      console.log(data.data)
      runInAction(() => {
        this.topics = data.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
  // 第三种方式
  loadTopicsSync = async () => {
    // 需要用到返回的数据 一步步来
    let data = await fetch('https://cnodejs.org/api/v1/topics')
    const json = await data.json()
    runInAction(() => {
      this.topics = json.data
    })
  }
  // 第四种方式
  loadTopicsGen = flow(function* () {
    // 需要用到返回的数据 一步步来
    let data = yield fetch('https://cnodejs.org/api/v1/topics')
    const json = yield data.json()
    this.topics = json.data
  })
}

export default new TopicStore()
