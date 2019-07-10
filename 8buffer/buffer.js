/* 1.什么是buffer */
/**
 * 缓冲区Buffer是暂时存放输入输出数据的一段内存
 * js语言没有二进制数据类型，但是在处理TCP和文件流的时候，必须要处理二进制数据
 * nodejs提供了一个buffer对象来提供二进制的数据操作
 * 是一个固定内存分配的全局对象，也就是说要放到缓冲区的字节数需要提前确定
 * buffer好比有一个8位字节元素组成的数组，可以有效的在js中表示二进制数据
 */

/* 2.什么是字节
最小存储是bit，8bit一个字节。具体可以查看encoding目录
*/

/* 3.进制 */
/**
 * 0b 二进制
 * 0x 十六进制
 * 0o 八进制
 */
//  3.1转换为十进制parseInt
console.log(parseInt('11', 2))

// 3.2 转换为其他进制 toSting
console.log((33).toString(2))

/* 4.定义buffer的三种方式 */
// 4.1 通过长度定义buffer
// 长度为10，用0填充
const buf1 = Buffer.alloc(10)
// 长度为10，用1填充
const buf2 = Buffer.alloc(10, 10)
// 打印是0a 十六进制，但是在vsc debug的时候是10 十进制
// console.log(buf2);
// 长度为10，未初始化
const buf3 = Buffer.allocUnsafe(10)

// 4.2通过数组定义buffer
// 创建一个包含[0x1,0x2,0x3]de Buffer,正常情况下为0-255
const buf4 = Buffer.from([1, 2, 3])

// 4.3 字符串创建
const buf5 = Buffer.from('string')

/* 5.Buffer常用方法 */
// 5.1 fill用指定的 value 填充 buf。 如果没有指定 offset 与 end，则填充整个 buf：
buf3.fill(0)

// 5.2 write 根据 encoding 指定的字符编码将 string 写入到 buf 中的 offset 位置。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分
let buffer = Buffer.allocUnsafe(6);
buffer.write('h', 0, 2, 'utf8');

// 5.3 writeInt8 将 value 写入到 buf 中指定的 offset 位置。 value 必须是有符号的 8 位整数。
let buf6 = Buffer.alloc(4);
buf6.writeInt8()
buf6.writeInt8(0, 0)
buf6.writeInt8(100, 1)
buf6.writeInt8(2, 2)
console.log(buf6.readInt8(0))
console.log(buf6.readInt8(1))
console.log(buf6.readInt8(2))

// 5.4 Little-Endian& Big-Endian
/**
 * 不同的CPU有不同的字节序类型，这些字节序是指整数在内存中保存的顺序
 * Big-endian 将高序字节储存在起始地址（高位编址）
 * Little-endian 将低序字节储存在起始地址（低位编址）
 */
// 用指定的字节序格式（writeInt16BE() 写入大端序， writeInt16LE() 写入小端序）将 value 写入到 buf 中指定的 offset 位置。 value 必须是有符号的 16 位整数。
let buf7 = Buffer.alloc(4);
buf7.writeInt16BE(2 ** 8, 0);//256
console.log(buf7)
console.log(buf7.readInt16BE(0))
buf7.writeInt16LE(2 ** 8, 2);
console.log(buf7)
console.log(buf7.readInt16LE(2))

// 5.5 toString 根据 encoding 指定的字符编码将 buf 解码成字符串。
let buf8 = Buffer.from('好好学习');
console.log(buf8.toString('utf8'))

// 5.6 slice
// 创建一个指向与原始 Buffer 同一内存的新 Buffer，但使用 start 和 end 进行了裁剪。修改新建的 Buffer 切片，也会同时修改原始的 Buffer，因为两个对象所分配的内存是重叠的
let buf9 = Buffer.from('好好学习');
let subBuffer = buf9.slice(0, 6);
console.log(subBuffer.toString())

// 5.6.1截取乱码问题
// let { StringDecoder } = require('string_decoder');
// let sd = new StringDecoder();
// let buffer = Buffer.from('好好学习');
// console.log(sd.write(buffer.slice(0, 4)));
// console.log(sd.write(buffer.slice(4)));

// 5.7 copy 拷贝 buf 中某个区域的数据到 target 中的某个区域，即使 target 的内存区域与 buf 的重叠。

{
    let buffer = Buffer.from('好好学习');
    let subBuffer = Buffer.alloc(6);
    buffer.copy(subBuffer, 0, 0, 4)
    buffer.copy(subBuffer, 3, 3, 6)
    console.log('copy')
    console.log(subBuffer.toString())
    // Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
    //     for (let i = sourceStart; i < sourceEnd; i++) {
    //         targetBuffer[targetStart++] = this[i]
    //     }
    // }
}

// 5.8 concat方法,返回一个合并了 list 中所有 Buffer 的新 Buffer
{
    let buffer1 = Buffer.from('好好');
    let buffer2 = Buffer.from('学习');
    let buffer3 = Buffer.concat([buffer1, buffer2]);
    console.log(buffer3.toString());
    // Buffer.prototype.concat = function (list) {
    //     let totalLength = list.reduce((len, item) => len + item.length, 0)
    //     let newBuffer = Buffer.alloc(totalLength);
    //     let pos = 0;
    //     for (let buffer of list) {
    //         for (const byte of buffer) {
    //             newBuffer[pos++] = byte
    //         }
    //     }
    //     return newBuffer;
    // }
}

// 5.9 isBuffer 如果 obj 是一个 Buffer，则返回 true，否则返回 false。
let testObj = {};
console.log(Buffer.isBuffer(testObj))

// 5.10 length 获取字节长度
{
    let str = '好好学习'
    let buffer = Buffer.from(str);
    // 一个汉字三个字节
    console.log(str.length, buffer.length)
}

/* 6.base64 */
/**
 * base64是网络上常见的传输8bit字节码的编码方式之一
 * base64就是一种基于64个可打印字符来表示二进制数据的方法
 * base64要求把每三个8bit的字节转换为四个6bit的字节（3*8=4*6=24），然后再把6bit添加两位高位0，组成8bit的字节
 */
{
    const charts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    function transfer(str) {
        let buf = Buffer.from(str);
        let result = '';
        for(let b of buf){
            //转换为二进制
            result+=b.toString(2);
        }
        return result.match(/(\d{6})/g).map(val=>parseInt(val,2)).map(val=>charts[val]).join('')
    }
    let r=transfer('好好学习');
    console.log(r)
}
