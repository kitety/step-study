const fs = require('fs')
const path = require('path')
const util = require('util')
/* 1.流的概念 */
/**
 * 流是一组有序的，有起点和终点的字节数据传输手段
 * 他不关心文件的整体的内容，只关注是否从文件中读到了数据，以及读到数据之后的处理。
 * 流是一个抽象接口，被node中的很多对象所实现。比如http服务器request和response对象都是流
 */

/* 2.可读流 createReadStream */
//  实现了stream.Readable接口的对象，将对象数据读取为流数据，当监听到data事件后，开始发送数据
{
  // fs.createReadStream = function (path, options) {
  //   return new ReadStream(path, options)
  // }
  // util.inherits(ReadStream, Readable);
}

// 2.1 创建可读流
// var rs=fs.createReadStream(path[,options])
/**
 * path:读取文件的路径
 * options：
 *  flags打开文件是要做的操作，默认为'r'
 *  encoding默认为null
 *  start开始读取的索引位置
 *  end结束读取的索引位置
 *  highWaterMark读物缓存区默认的大小64kb(如果指定utf8编码，highWaterMark需要大于3字节)
 */
// 2.2监听data事件
// 流切换到流动模式，数据会被尽可能快地读出
{
  // rs.on('data', data => {
  //   console.log(data);
  // })
}
// 2.3 监听end事件，该事件会在读完数据的时候触发
{
  // rs.on('end', data => {
  //   console.log('读取完成');
  // })
}
// 2.4 监听error事件
{
  // rs.on('error', err => {
  //   console.log('err');
  // })
}
// 2.5 监听open事件
{
  // rs.on('open', () => {
  //   console.log('open');
  // })
}
// 2.6 监听close事件
{
  // rs.on('close', () => {
  //   console.log('close');
  // })
}
// 2.7 设置编码
// 与指定{encoding:'utf8'}效果相同，设置编码
{
  // rs.setEncoding('utf8')
}
// 2.8 暂停和恢复触发data
// 通过pause()和resume()方法
{
  // rs.on('data',data=>{
  //   rs.pause();
  //   console.log(data)
  // })
  // setTimeout(() => {
  //   rs.resume()
  // }, 2000);
}

/* 3.可写流createWriteStream */
// 实现了stream.Writable接口的对象来将流数据写入到对象中
{
  // fs.createWriteStream = function (path, options) {
  //   return new WriteStream(path, options)
  // }
  // util.inherits(WriteStream, Writable);
}
// 3.1 创建可写流
{
  // var ws=fs.createWriteStream(path[,options])
  /**
   * path 写入的文件路径
   * options
   *  flags 打开文件要做的操作，默认为'w'
   *  encoding默认为utf8
   *  highWaterMark写入缓存区的默认大小16kb
   */
}
// 3.2 write方法
{
  // ws.write(chunk[,encoding][,callback])
  /**
   * chunk 写入数据的buffer/string
   * encoding 编码格式chunk为字符串的时候有用，可选
   * callback 写入成功的回调
   * 返回值为布尔值，系统缓存u满时为false，未满时为true
   */
}
// 3.3 end方法
{
  // ws.end(chunk[,encoding][,callback])
  // 表明接下来没有数据要被写入writeable通过传入可选的chunk和encoding参数，可以在关闭流之前再写入一段数据，如果传入了可选的callback函数，它将作为'finish'事件的回调函数
}
// 3.4 drain方法
/**
 * 当一个流不处在drain的状态，对write()的调用会缓存数据块，并且返回false。一旦当前所有缓存的数据块都排空了（被操作系统接受来进行输出），那么'drain'事件就会被触发
 * 建议：一旦write()返回false，在'drain'事件触发之前，不要写入数据块
 */
{
  const fs = require('fs')
  let ws = fs.createWriteStream('./11stream1/2.txt', {
    flags: 'w',
    encoding: 'utf8'
  });
  let i = 20;
  function write () {
    let flag = true;
    while (i && flag) {
      flag = ws.write('1');
      i--;
      console.log(flag);
    }
  }
  write();
  ws.on('drain', () => {
    console.log('drain');
    write()
  })
}
// 3.5 finish方法
// 在调用了stream.end()方法，且缓冲区数据都已经传给底层系统之后，'finish'事件将会触发
{
  const fs = require('fs')
  let writer = fs.createWriteStream('./11stream1/2.txt', {
    flags: 'w',
    encoding: 'utf8'
  });
  // for (let i = 0; i < 100; i++) {
  //   writer.write(''+i)
  // }
  // writer.end('结束\n');
  // writer.on('finish',()=>{
  //   console.log('所有的写入工作完成');
  // })
}

/* 4.pipe 方法 */
// 4.1 pipe方法的原理
{
  const fs = require('fs')
  let ws = fs.createWriteStream('./11stream1/1.txt')
  let rs = fs.createReadStream('./11stream1/2.txt')
  // rs.on('data', data => {
  //   var flag = ws.write(data);
  //   console.log('flag', flag, data);
  //   if (!flag) rs.pause()
  // })
  // ws.on('data', () => rs.resume())
  // ws.on('end', () => ws.end())
}
// 4.2 pipe的使用方法
{
  // readStream.pipe(writeStream)
  let ws = fs.createWriteStream('./11stream1/1.txt')
  let rs = fs.createReadStream('./11stream1/2.txt')
  // rs.pipe(ws)
  // 将数据的滞留量限制到一个可接受的水平，以使得不同速度的来源和目标不会淹没可用内存
}
// 4.3 unpipe用法
// readable.unpipe()方法将之前通过stream.pipe()方法绑定的流分离
// 如果destination没有传入，则所有绑定的流都会分离
{
  const fs = require('fs')
  let to = fs.createWriteStream('./11stream1/1.txt')
  let from = fs.createReadStream('./11stream1/2.txt')
  from.pipe(to);
  setTimeout(() => {
    console.log('关闭1的写入');
    from.unpipe(to);
    console.log('工关闭文件流');
    to.end()
  }, 10);
}
// 4.4 cork 
// 调用writable.cork()方法将强制所有写入的数据都存放到内存的缓冲区里。直到调用stream.uncork()或者stream.end()方法时，缓冲区里面的数据才会被输出
// 4.5 uncork() 输出在stream.cork()方法调用之后缓冲在内存中的所有数据
{
  // stream.cork()
  // stream.write('1');
  // process.nextTick(()=>stream.uncrok())
}

