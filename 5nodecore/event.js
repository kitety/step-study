function EventEmitter () {
  this.events = {};// 会把所有的事件监听函数都放在这个对象里面保存
  // 指定给一个事件类型增加的监听函数的最大值
  this._maxListeners = 10;
}
EventEmitter.prototype.setMaxListeners = function (maxListeners) {
  this._maxListeners = maxListeners;
}
EventEmitter.prototype.listeners = function (event) {
  return this.events[event]
}
// 给指定的事件添加事件处理函数，参数1是事件类型，参数2是事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, listen) {
  if (this.events[type]) {
    console.log(111,this.events)
    this.events[type].push(listen)
    if (this._maxListeners !== 0 && this.events.length > this._maxListeners) {
      console.error(`MaxListenersExceededWarning: Possible EventEmitter memory leak detected. ${this.events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`);
    }
  } else {
    console.log(111, this.events)
    this.events[type] = [listen]
  }
}
EventEmitter.prototype.once = function (type, listener) {
  // 用完即焚
  let wrapper = (...rest) => {
    listener.apply(this);//执行原始的监听函数
    this.removeListener(type, wrapper)
  }
  this.on(type, listener)
}
EventEmitter.prototype.removeListener = function (type, listener) {
  if (this.events[type]) {
    this.events[type] = this.events[type].filter(l => l !== listener)
  }
}
EventEmitter.prototype.removeAllListeners = function (type) {
  delete this.events[type]
}
EventEmitter.prototype.emit = function (type, ...rest) {
  this.events[type] && this.events[type].forEach(listener => {
    listener.apply(this, rest)
  });
}
module.exports = EventEmitter
