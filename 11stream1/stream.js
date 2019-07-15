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
