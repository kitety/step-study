const paginationBev = Behavior({
  data: {
    dataArray: []
  },
  methods: {
    setMoreData (newDataArray) {
      const { dataArray } = this.data
      this.setMoreData({ dataArray: [...dataArray, ...newDataArray] })
    },
    getCurrentStart () {
      const { dataArray } = this.data
      return dataArray.length
    },
    hasMore(){
      
    }
  }
})
