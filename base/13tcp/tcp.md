# TCP
在nodejs中，提供了net模块来实现TCP服务器和客户端的通信

## 1.1TCP服务器
```js
net.createServer([options][, connectionListener])
```
- options <Object>
  - allowHalfOpen <boolean> 表明是否允许半开的 TCP 连接。默认值: false。 单方面链接
  - pauseOnConnect <boolean> 表明是否应在传入连接上暂停套接字。默认值: false。
- connectionListener <Function> 自动设置为 'connection' 事件的监听器。 connection：当一个新的连接建立的时候触发。 socket 是一个 net.Socket 实例。可以通过监听此事件来指定监听函数
```js
server.on('connection',function(socket){})
```

### 1.1.1 启动TCP服务器
可以用listen的方式通知服务器开始监听客户端的链接
```js
server.listen(port,[host],[backlog],[callback])
```
- port 必须指定的端口号
- host 指定需要监听的IP地址或主机名，如果省略的话服务器将监听来自于任何客户端的连接
- backlog指定位于等待队列中的客户端连接的最大数量，默认值为511
```js
server.on('listening',function(){});
```
### 1.1.2 使用TCP服务器
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
- address TCP服务器监听的地址
- family 协议的版本

### 1.1.4 getConnections
查看当前与TCP服务器建立连接的客户端的连接数量以及设置最大连接数
```js
server.getConnections(callback);
server.maxConnections = 2;
```
### 1.1.5 close
close方式可以显示拒绝所有的客户端的连接请求，当所有的已连接的客户端关闭之后服务器会自动关闭
```js
server.close()
server.on('close',callback)
```

## 1.2 socket
### 1.2.1 address
net.Socket代表一个socket对象，他是一个可读可写流
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
  socket.on('data',data=>{
    console.log('本次接收到的内容是%s，累计接收到的字节数是%d',data,socket.bytesRead);
  })
})
server.listen(8080, 'localhost', function() {
  console.log('服务端开始监听')
})
```
### 1.2.3监听关闭事件
```js
socket.on('end', data => {
  console.log('客户端已经关闭')
})
```
### 1.2.4 pipe
pipe方法可以将客户端发送的数据写到文件或者其他目标中
```js
socket.pipe(destinatin,[options]);
```
options.end设置为false的时候，当客户端结束写操作或者关闭后并不会关闭目标对象，还可以继续写入数据
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
  socket.on('end',()=>{
    ws.on('over',()=>{
      ws.unpipe(ws)
    })
  })
})
server.listen(8080, 'localhost', function() {
  console.log('服务端开始监听')
})
```
