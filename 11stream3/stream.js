/* 1.自定义可读流 */
// 为了实现可读流，引用Readable接口并用它构造新对象
// 我们可以直接把供使用的数据push出去，当push一个null对象就意味着我们发出信号，这个流没有更多的数据了
{
  const stream = require('stream');
  const util = require('util');
  util.inherits(Counter, stream.Readable)
  function Counter (options) {
    stream.Readable.call(this, options)
    this._index = 0;
  }
  Counter.prototype._read = function () {
    if (this._index++ < 3) {
      this.push(this._index + '')
    } else {
      this.push(null)
    }
  }
  var counter = new Counter();
  counter.on('data', data => console.log('读到的数据：' + data.toString()))
  counter.on('end', data => console.log('读完了'))
}

/* 2.可写流 */
/**
 * 为实现可写流，我们需要使用流模块中的Writable构造函数。我们只需要给Writeable构造函数传递一些选项并且创建一个对象。唯一需要的选项使write函数，该函数定义数据块需要往哪里写。
 * chunk通过使一个buffer，除非我们配置不同的流
 * encoding在特定情况下需要的参数，通常我们可以忽略它
 * callback 在完成数据块处理后需要调用的函数。这是写入数据的成功一否的标志。如果发出错误的信号，请用错误对象回调函数。
 */
{
  const stream = require('stream');
  const util = require('util');
  util.inherits(Writer, stream.Writable)
  let stock = [];
  function Writer (opt) {
    stream.Writable.call(this, opt)
  }/**
   * 
   * @param {*} chunk chunk通过使一个buffer，除非我们配置不同的流
   * @param {*} encoding encoding在特定情况下需要的参数，通常我们可以忽略它
   * @param {*} callback callback 在完成数据块处理后需要调用的函数。这是写入数据的成功一否的标志。如果发出错误的信号，请用错误对象回调函数。
   */
  Writer.prototype._write = function (chunk, encoding, callback) {
    setTimeout(() => {
      stock.push(chunk.toString('utf8'))
      console.log('增加', chunk);
      callback && callback()
    }, 500);
  }
  let w = new Writer();
  for (let i = 0; i < 5; i++) {
    w._write('项目' + i, 'utf8')
  }
  w.on('end', () => console.log(stock))
}

/* 3.管道流 */
// http://taobaofed.org/blog/2017/08/31/nodejs-stream/
{
  const stream = require('stream');
  let index = 0;
  const readable = stream.Readable({
    highWaterMark: 2,
    read: function () {
      process.nextTick(() => {
        console.log('push', ++index);
        this.push(index + '')
      })
    }
  })
  const writable = stream.Writable({
    highWaterMark: 2,
    write: function (chunk, encoding, callback) {
      console.log('写入1', chunk.toString());
    }
  })
  readable.pipe(writable)
}
