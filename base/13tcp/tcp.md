# TCP

在 nodejs 中，提供了 net 模块来实现 TCP 服务器和客户端的通信

## 1.1TCP 服务器

```js
net.createServer([options][, connectionListener])
```

- options <Object>
  - allowHalfOpen <boolean> 表明是否允许半开的 TCP 连接。默认值: false。 单方面链接
  - pauseOnConnect <boolean> 表明是否应在传入连接上暂停套接字。默认值: false。
- connectionListener <Function> 自动设置为 'connection' 事件的监听器。 connection：当一个新的连接建立的时候触发。 socket 是一个 net.Socket 实例。可以通过监听此事件来指定监听函数

```js
server.on('connection', function(socket) {})
```

### 1.1.1 启动 TCP 服务器

可以用 listen 的方式通知服务器开始监听客户端的链接

```js
server.listen(port, [host], [backlog], [callback])
```

- port 必须指定的端口号
- host 指定需要监听的 IP 地址或主机名，如果省略的话服务器将监听来自于任何客户端的连接
- backlog 指定位于等待队列中的客户端连接的最大数量，默认值为 511

```js
server.on('listening', function() {})
```

### 1.1.2 使用 TCP 服务器

```js
let net = require('net')
let server = net.createServer(function(socket) {
  console.log('客户端已连接')
})
server.listen(8080, 'localhost', function() {
  console.log('服务端开始监听')
})
```

### 1.1.3 address

```js
server.address()
```

返回一个包含 socket 地址信息的对象。 对于 UDP socket，该对象将包含 address、 family 和 port 属性。

- port 端口号
- address TCP 服务器监听的地址
- family 协议的版本

### 1.1.4 getConnections

查看当前与 TCP 服务器建立连接的客户端的连接数量以及设置最大连接数

```js
server.getConnections(callback)
server.maxConnections = 2
```

### 1.1.5 close

close 方式可以显示拒绝所有的客户端的连接请求，当所有的已连接的客户端关闭之后服务器会自动关闭

```js
server.close()
server.on('close', callback)
```

## 1.2 socket

### 1.2.1 address

net.Socket 代表一个 socket 对象，他是一个可读可写流

```js
let net = require('net')
let util = require('util')
let server = net.createServer(function(socket) {
  console.log('客户端已连接')
  server.getConnections((err, count) => {
    server.maxConnections = 1
    console.log('最大连接数量%d,当前的连接数量%d', server.maxConnections, count)
  })
  let address = server.address()
  console.log('客户端地址%s', util.inspect(address))
})
server.listen(8080, 'localhost', function() {
  console.log('服务端开始监听')
})
```

### 1.2.2 读取数据

```js
let net = require('net')
let util = require('util')
let server = net.createServer(function(socket) {
  socket.setEncoding('utf8')
  socket.on('data', data => {
    console.log(
      '本次接收到的内容是%s，累计接收到的字节数是%d',
      data,
      socket.bytesRead
    )
  })
})
server.listen(8080, 'localhost', function() {
  console.log('服务端开始监听')
})
```

### 1.2.3 监听关闭事件

```js
socket.on('end', data => {
  console.log('客户端已经关闭')
})
```

### 1.2.4 pipe

pipe 方法可以将客户端发送的数据写到文件或者其他目标中

```js
socket.pipe(
  destinatin,
  [options]
)
```

options.end 设置为 false 的时候，当客户端结束写操作或者关闭后并不会关闭目标对象，还可以继续写入数据

```js
let net = require('net')
let path = require('path')
let ws = require('fs').createWriteStream(path.resolve(__dirname, 'msg.txt'))
let server = net.createServer(socket => {
  socket.on('data', data => {
    console.log(data)
  })
  socket.pipe(
    ws,
    { end: false }
  )
  socket.on('end', () => {
    ws.on('over', () => {
      ws.unpipe(ws)
    })
  })
})
server.listen(8080, 'localhost', function() {
  console.log('服务端开始监听')
})
```

### 1.2.5 unpipe

```js
const net = require('net')
const path = require('path')
let file = require('fs').createWriteStream(path.join(__dirname, 'msg.txt'))
let server = net.createServer(socket => {
  console.log('客户端已连接')
  socket.pipe(
    file,
    { end: false }
  )
  setTimeout(() => {
    file.end('bye bye')
    socket.unpipe()
    console.log('退出')
    server.close()
  }, 5000)
  // socket.on('end', function() {
  //   console.log('退出')
  //   file.end('bye bye')
  //   server.close()
  // })
})
server.listen(8080, () => {
  console.log('开始监听在8080')
})
```

### 1.2.6 pause&resume

pause 可以暂停 data 事件的触发，服务器会把客户端的数据暂存在缓存区里面

```js
const net = require('net')
const path = require('path')
let file = require('fs').createWriteStream(path.join(__dirname, 'msg.txt'))
let server = net.createServer(socket => {
  console.log('客户端已连接')
  socket.pause()
  setTimeout(() => {
    socket.resume()
    socket.pipe(file)
    console.log('退出')
    server.close()
  }, 10000)
})
server.listen(8080, () => {
  console.log('开始监听在8080')
})
```

### 1.2.7 setTimeout

当 socket 在 timeout 毫秒不活动之后将其设置为超时状态。默认 net.Socket 没有超时

```js
const net = require('net')
const path = require('path')
let file = require('fs').createWriteStream(path.join(__dirname, 'msg.txt'))
let server = net.createServer(socket => {
  console.log('客户端已连接')
  socket.pause()
  socket.setTimeout(5000)
  socket.on('timeout', () => {
    console.log('timeout')
    socket.pipe(file)
  })
})
server.listen(8080, () => {
  console.log('开始监听在8080')
})
```
## 1.3 TCP客户端
### 1.3.1 创建TCP
```js
let socket = new net.Socket([options])
```
- options <Object> 可用选项有
  - fd <number> 如果指定了该参数，则使用一个给定的文件描述符包装一个已存在的 socket，否则将创建一个新的 socket。
  - allowHalfOpen <boolean> 指示是否允许半打开的 TCP 连接。服务器收到FIN包时不回发FIN包，可以使服务器可以继续向客户端发数据。详情查看 net.createServer() 和 'end' 事件。默认值: false。
  - readable <boolean> 当传递了 fd 时允许读取 socket，否则忽略。默认值: false。
  - writable <boolean> 当传递了 fd 时允许写入 socket，否则忽略。默认值: false。
```js
socket.connect(port,host,callback)
socket.on('connect,.callback)
```
### 1.3.2
向服务端写入数据、end、error、destroy、close
- write表示向服务器写入数据
- end 用于结束连接
- error 连接发生错误
- **destroy** 销毁流
- close 表示连接关闭成功，hasError=true代表有可能有错误
```js
//在 socket 上发送数据。第二个参数制定了字符串的编码 - 默认是 UTF8 编码。
socket.write(data,[encoding],[callback]);
```
