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
// 实现双工流，我们可以在同一个对象上实现可读和可写，就好像同时继承着两个接口。重要的是双工流的可读性和可写性是完全独立与此于彼此。这仅仅是将两个特性组合成一个对象。
{
  const { Duplex } = require('stream');
  const inoutStream = new Duplex({
    write (chunk, encoding, callback) {
      console.log(chunk.toString(), 666);
      callback()
    },
    read (size) {
      this.push((++this.index) + '')
      if (this.index > 3) {
        this.push(null)
      }
    }
  })
  inoutStream.index = 0;
  // process.stdin.pipe(inoutStream).pipe(process.stdout)
}

// 5.实现转换流
// 转换流的输出是从输入中计算出来的
// 对于转换流，我们不必实现read或者write方法，我们只需要一个transform方法，将两者结合起来。他有write方法的意思，我们也可以用他来push数据
{
  const { Transform } = require('stream');
  const upperCase = new Transform({
    transform (chunk, encoding, callback) {
      this.push(chunk.toString().upperCase());
      callback()
    }
  })
  // process.stdin.pipe(upperCase).pipe(process.stdout)
}

// 对象流
// 默认情况下，流处理的数据是Buffer/String类型的值。有一个ObjectMode标志，我们可以设置它让流可以接受任何JS对象。
{
  const { Transform } = require('stream');
  let fs = require('fs')
  let rs = fs.createReadStream('./user.json');
  rs.setEncoding('utf8');
  let toJson = Transform({
    readableObjectMode: true,
    transform (chunk, encoding, callback) {
      this.push(JSON.parse(chunk));
      callback()
    }
  })
  let jsonOut = Transform({
    writeableObjectMode: true,
    transform (chunk, encoding, callback) {
      this.push(JSON.parse(chunk));
      callback()
    }
  })
  // rs.pipe(toJson).pipe(jsonOut)
}

// 7.unshift
// readable.unshift()方法会把一块数据压回Buffer内部，这在如下的特定情形有用：代码正在消费一个数据流，已经"乐观的"拉取了数据。又需要“反悔-消费”一些数据，以便这些数据可以传给其他人用。
{
  const { Transform } = require('stream');
  const { StringDecoder } = require('string_decoder');
  let decoder = new StringDecoder('utf8');
  const fs = require('fs');
  // let rs = fs.createReadStream('./req.txt');
  function parseHeader (stream, callback) {
    let header = '';
    rs.on('readable', onReadable);
    function onReadable () {
      let chunk;
      while (null != (chunk = rs.read())) {
        const str = decoder.write(chunk);
        if (str.match(/\r\n\r\n/)) {
          const spilit = str.split(/\r\n\r\n/);
          console.log(split);
          header += split.shift();
          const remaining = split.join('/\r\n\r\n/');
          const buf = Buffer.from(remaining, 'utf8');
          if (buf.length) {
            stream.unshift(buf)
          }
          callback(null, header, rs)
        }
        else {
          header += str
        }
      }
    }
  }
  parseHeader(rs, function (err, header, stream) {
    console.log(header);
    stream.setEncoding('utf8');
    stream.on('data', data => {
      console.log(data);
    })
  })
}
