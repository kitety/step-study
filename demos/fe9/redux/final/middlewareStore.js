// 中间件可以拿到完整store，可以修改很多方法。最小开放策略，只需要把getState给中间件

// const chain = middlewares.map(middleware => middleware(store))
const simpleStore = { getState: store.getState }
const chain = middlewares.map(middleware => middleware(simpleStore))
