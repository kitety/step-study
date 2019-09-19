/* 1.Nodejs中有四种流的模式 */
/**
 * Readable 可读流 fs.createReadStream
 * Writeble 可写流 fs.createWriteStream
 * Duplex 可读写的流 net.Socket
 * Transform 在读写的过程中可以修改和变换数据的Duplex流，如zlib。createDeflate()
 */
/* 2.流中的数据有两种模式，二进制模式和对象模式 */
/**
 * 二进制模式：每个分块都是buffer或者string对象
 * 对象模式：流内部处理的是一系列普通实习对象
 *  所有使用nodejs api创建的流对象都只能操作string和buffer对象。但是，通过一些第三方流的实现，你依然可以处理其他类型的JavaScript值（除了null，它在流处理中有特殊的意义）。这些流被认为是工作在“对象模式”（object mode）。在创建流的实例时，可以通过objectMode选项使流的实例切换到对象模式。试图将已存在的流切换到对象模式是不安全的。
 */

/* 3.可读流的两种模式 */
/**
 * 可读流事实上工作在下面两种模式之一:flowing和paused
 *   在flowing模式下，可读流自动从系统底层读取数据，并且通过EventEmitter接口的事件尽快将数据提供给应用
 *   在paused模式下，必须显式调用stream.read()方法来从流中读取数据片段
 * 所有初始工作模式为paused的Readable流，可以通过下面的三种途径切换到flowing模式
 *   监听'data'事件
 *   调用stream.resume()方法
 *   调用stream.pipe()方法将数据发送到Writable
 * 可读流可以通过下面途径切换到paused模式
 *   如果不存在管道目标（pipe destination）,可以通过调用stream.pause()方式实现
 *   如果存在管道目标，可以通过取消"data"事件的监听，并且调用stream.unpipe()方法移除所有的管道目标来实现
 * 如果Readable切换到flowing模式，且没有消费者处理中间的数据，这些数据将会丢失。比如，调用了readable.resume()方法却没有监听'data'事件，或者是取消了'data'事件监听，就有可能会出现这种情况。
 */

/* 4.缓存区 */
/**
 * Writable和Readable流都会将数据存储到内部的缓冲器buffer中，这些缓冲器可以通过相应的writable._WritableSatte.getBuffer()或readable._readableState.buffer来获取
 * 缓冲器的大小取决于传递给构造函数的highWaterMark选项。
 *   对于普通的流，highWaterMark选项制定了总共的字节数。
 *   对于工作在对象模式的流，highWaterMark指定了对象的总数。
 * 当可读流的实现调用stream.push(chunk)方法时，数据被放到缓冲器中。如果流的消费者没有调用stream.read()方法，这些数据会始终存在于内部队列中，直到被消费。
 * 当内部的可读缓冲器大小达到highWaterMark指定的阈值时，流会暂停从底层资源读取数据，知道当前缓冲器的数据被消费（也就是说，流会在内部停止调用readable._read()来填充可读缓冲器）
 * 可写流通过反复调用writable.write(chunk)方法将数据放到缓冲器。
 *   当内部可写缓冲器的总大小小于highWaterMark注定的阈值时，调用writable.write()将返回true。
 *   一旦内部缓冲器的大小达到或者超过highWaterMark，调用writable.write()将返回false
 * stream API的关键目标，尤其对于stream.pipe()方法，就是现实缓冲器数据的大小，以达到可接受的程度。这样，对于读写速度不匹配的源头和目标，就不会超出可用的内存大小。
 * Duplex和transform都是可读写的。在内部，他们维护了两个互相独立的缓冲器便于读和写。在维持了合理高效的数据流的同时，也使得对于度和写可以独立游戏而互不影响。
 */

/* 5.可读流的三种状态 */
/**
 * 任意时刻，任意可读的流应确切处于下面的三种状态之一：
 *  readable._readableState.flowing=null
 *  readable._readableState.flowing=false
 *  readable._readableState.flowing=true
 * 当readable._readableState.flowing为null时，由于不存在数据消费者，可读流将不会生产数据。在这个状态下，监听'data'事件，调用readabele.pipe()方法或者调用readable.resume()方法，readable._readableState.flowing的值将会变为true。随着数据生成，可读流开始频繁触发事件。
 * 
 * 调用readable.pause()方法，readable.unpipe()方法，或者接受“背压”（back pressure）,将导致readable._readableState.flowing的值变为false。这将暂停事件流，但是不会暂停数据的生成，在这种情况下，为'data'事件设置监听函数不会导致readable._readableState.flowing变为true
 * 
 * 当readable._readableState.flowing值为false的时候，数据可能堆积到流的内部缓存中。
 */

/* 6.readable */
// 'readable'事件将在流中有数据可读取时触发。在某些情况下，为'readable'事件添加回调函数将会导致一些数据被读取到内部缓存中。
// const readable = getReadableStreamhow();
// readable.on('readable', () => {
//   // 有一些数据可读了
// })

// 当到达数据流的尾部时，'readable'事件也会触发。触发顺序在'end'事件之前。
// 事实上,'readable'事件表明了有新的动态：要么是有了新的数据，要么是到了流的尾部。对于前者，stream.read()将返回可用的数据；对于后者，stream.end()将返回null
const fs = require('fs');
let rs = fs.createReadStream('./11stream2/1.txt', {
  start: 3,
  end: 8,
  encoding: 'utf8',
  highWaterMark: 6
});
rs.on('readable', () => {
  console.log('readable');
  console.log('rs._readableState.buffer.length', rs._readableState.length);
  let d = rs.read(1)
  console.log('rs._readableState.buffer.length', rs._readableState.length);
  console.log(d);
  setTimeout(() => {
    console.log('rs._readableState.buffer.length', rs._readableState.length);
  }, 500);
})

/* 7.流的经典应用 */
// 7.1行读取器
/**
 *  7.1.1 换行和回车
 * 以前的打印每秒可以打印10个字符，换行要0.2s
 * 研制人员就是在每行后面加两个表示换行的字符，一个是“回车”，告诉打字机把打印头定位在左边界；另一个是“换行”,告诉打字机把纸向下移一行。
 *  unix系统里，每行结尾只有换行“line feed” \n
 *  win系统里，每行的结尾是“<回车><换行>” \r\n
 *  mac系统里，每行的结尾是回车“carriage return” \r
 *  在ascii里面，换行\n 10 0A 回车 \r 13 0D
 */

//  7.1.2 代码
{
  const fs = require('fs');
  const EventEmitter = require('events');
  const util = require('util');
  // let LineReader;
  util.inherits(LineReader, EventEmitter)
  // fs.readFile('./11stream2/1.txt', (err, data) => {
  //   console.log(data.toString());
  // })
  function LineReader (path) {
    EventEmitter.call(this);
    this._rs = fs.createReadStream(path);
    this.RETURN = 0x0D;// \r 13
    this.NEW_LINE = 0x0A;// \n 10
    // EventEmitter 实例在新的监听器被添加到其内部监听器数组之前，会触发自身的 'newListener' 事件。
    this.on('newListener', (type, listener) => {
      if (type === 'newLine') {
        let buffer = [];
        this._rs.on('readable', () => {
          let bytes;
          while (null !== (bytes = this._rs.read(1))) {
            let ch = bytes[0];
            switch (ch) {
              case this.RETURN:
                this.emit('newLine', Buffer.from(buffer))
                buffer.length = 0;
                let nByte = this._rs.read(1);
                if (nByte && nByte[0] !== this.NEW_LINE) {
                  buffer.push(nByte[0])
                }
                break;
              case this.NEW_LINE:
                this.emit('newLine', Buffer.from(buffer))
                buffer.length = 0;
                break;
              default:
                buffer.push(bytes[0])
                break;
            }
          }
        })
        this._rs.on('end', () => {
          if (buffer.length > 0) {
            this.emit('newLine', Buffer.from(buffer))
            buffer.length = 0;
            this.emit('end')
          }
        })
      }
    })
  }
  var lineReader = new LineReader('./11stream2/1.txt')
  lineReader.on('newLine', data => {
    console.log(data.toString(),12222);
  }).on('end', () => console.log('end'))
}
