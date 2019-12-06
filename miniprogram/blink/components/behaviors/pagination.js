const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
    noResult: false,
    loading: false
  },
  methods: {
    setMoreData (newDataArray) {
      const { dataArray } = this.data
      this.setData({ dataArray: [...dataArray, ...newDataArray] })
    },
    getCurrentStart () {
      const { dataArray } = this.data
      return dataArray.length
    },
    hasMore () {
      const { dataArray, total } = this.data
      return dataArray.length < total
    },
    setToTal (total) {
      this.setData({ total, noResult: total === 0 })
    },
    init () {
      this.setData({
        dataArray: [],
        total: 0,
        noResult: false,
        loading: false
      })
    },
    locked () {
      this.setData({ loading: true })
    },
    unLocked () {
      this.setData({ loading: false })
    },
    isLocked () {
      return this.data.loading
    }
  }
})
export { paginationBev }
