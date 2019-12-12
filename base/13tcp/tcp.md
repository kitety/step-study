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
server.on("connection", function(socket) {});
```

### 1.1.1 启动 TCP 服务器

可以用 listen 的方式通知服务器开始监听客户端的链接

```js
server.listen(port, [host], [backlog], [callback]);
```

- port 必须指定的端口号
- host 指定需要监听的 IP 地址或主机名，如果省略的话服务器将监听来自于任何客户端的连接
- backlog 指定位于等待队列中的客户端连接的最大数量，默认值为 511

```js
server.on("listening", function() {});
```

### 1.1.2 使用 TCP 服务器

```js
let net = require("net");
let server = net.createServer(function(socket) {
  console.log("客户端已连接");
});
server.listen(8080, "localhost", function() {
  console.log("服务端开始监听");
});
```

### 1.1.3 address

```js
server.address();
```

返回一个包含 socket 地址信息的对象。 对于 UDP socket，该对象将包含 address、 family 和 port 属性。

- port 端口号
- address TCP 服务器监听的地址
- family 协议的版本

### 1.1.4 getConnections

查看当前与 TCP 服务器建立连接的客户端的连接数量以及设置最大连接数

```js
server.getConnections(callback);
server.maxConnections = 2;
```

### 1.1.5 close

close 方式可以显示拒绝所有的客户端的连接请求，当所有的已连接的客户端关闭之后服务器会自动关闭

```js
server.close();
server.on("close", callback);
```

## 1.2 socket

### 1.2.1 address

net.Socket 代表一个 socket 对象，他是一个可读可写流

```js
let net = require("net");
let util = require("util");
let server = net.createServer(function(socket) {
  console.log("客户端已连接");
  server.getConnections((err, count) => {
    server.maxConnections = 1;
    console.log(
      "最大连接数量%d,当前的连接数量%d",
      server.maxConnections,
      count
    );
  });
  let address = server.address();
  console.log("客户端地址%s", util.inspect(address));
});
server.listen(8080, "localhost", function() {
  console.log("服务端开始监听");
});
```

### 1.2.2 读取数据

```js
let net = require("net");
let util = require("util");
let server = net.createServer(function(socket) {
  socket.setEncoding("utf8");
  socket.on("data", data => {
    console.log(
      "本次接收到的内容是%s，累计接收到的字节数是%d",
      data,
      socket.bytesRead
    );
  });
});
server.listen(8080, "localhost", function() {
  console.log("服务端开始监听");
});
```

### 1.2.3 监听关闭事件

```js
socket.on("end", data => {
  console.log("客户端已经关闭");
});
```

### 1.2.4 pipe

pipe 方法可以将客户端发送的数据写到文件或者其他目标中

```js
socket.pipe(destinatin, [options]);
```

options.end 设置为 false 的时候，当客户端结束写操作或者关闭后并不会关闭目标对象，还可以继续写入数据

```js
let net = require("net");
let path = require("path");
let ws = require("fs").createWriteStream(path.resolve(__dirname, "msg.txt"));
let server = net.createServer(socket => {
  socket.on("data", data => {
    console.log(data);
  });
  socket.pipe(ws, { end: false });
  socket.on("end", () => {
    ws.on("over", () => {
      ws.unpipe(ws);
    });
  });
});
server.listen(8080, "localhost", function() {
  console.log("服务端开始监听");
});
```

### 1.2.5 unpipe

```js
const net = require("net");
const path = require("path");
let file = require("fs").createWriteStream(path.join(__dirname, "msg.txt"));
let server = net.createServer(socket => {
  console.log("客户端已连接");
  socket.pipe(file, { end: false });
  setTimeout(() => {
    file.end("bye bye");
    socket.unpipe();
    console.log("退出");
    server.close();
  }, 5000);
  // socket.on('end', function() {
  //   console.log('退出')
  //   file.end('bye bye')
  //   server.close()
  // })
});
server.listen(8080, () => {
  console.log("开始监听在8080");
});
```

### 1.2.6 pause&resume

pause 可以暂停 data 事件的触发，服务器会把客户端的数据暂存在缓存区里面

```js
const net = require("net");
const path = require("path");
let file = require("fs").createWriteStream(path.join(__dirname, "msg.txt"));
let server = net.createServer(socket => {
  console.log("客户端已连接");
  socket.pause();
  setTimeout(() => {
    socket.resume();
    socket.pipe(file);
    console.log("退出");
    server.close();
  }, 10000);
});
server.listen(8080, () => {
  console.log("开始监听在8080");
});
```

### 1.2.7 setTimeout

当 socket 在 timeout 毫秒不活动之后将其设置为超时状态。默认 net.Socket 没有超时

```js
const net = require("net");
const path = require("path");
let file = require("fs").createWriteStream(path.join(__dirname, "msg.txt"));
let server = net.createServer(socket => {
  console.log("客户端已连接");
  socket.pause();
  socket.setTimeout(5000);
  socket.on("timeout", () => {
    console.log("timeout");
    socket.pipe(file);
  });
});
server.listen(8080, () => {
  console.log("开始监听在8080");
});
```

## 1.3 TCP 客户端

### 1.3.1 创建 TCP

```js
let socket = new net.Socket([options]);
```

- options <Object> 可用选项有
  - fd <number> 如果指定了该参数，则使用一个给定的文件描述符包装一个已存在的 socket，否则将创建一个新的 socket。
  - allowHalfOpen <boolean> 指示是否允许半打开的 TCP 连接。服务器收到 FIN 包时不回发 FIN 包，可以使服务器可以继续向客户端发数据。详情查看 net.createServer() 和 'end' 事件。默认值: false。
  - readable <boolean> 当传递了 fd 时允许读取 socket，否则忽略。默认值: false。
  - writable <boolean> 当传递了 fd 时允许写入 socket，否则忽略。默认值: false。

```js
socket.connect(port,host,callback)
socket.on('connect,.callback)
```

### 1.3.2

向服务端写入数据、end、error、destroy、close

- write 表示向服务器写入数据
- end 用于结束连接
- error 连接发生错误
- destroy 销毁流
- close 表示连接关闭成功，hasError=true 代表有可能有错误

```js
//在 socket 上发送数据。第二个参数制定了字符串的编码 - 默认是 UTF8 编码。
socket.write(data, [encoding], [callback]);
```

```js
const net = require("net");
let server = net.createServer(socket => {
  console.log("客户端已经连接了");
  socket.setEncoding("utf8");
  socket.on("data", data => {
    console.log("已经接收到客户端发送的数据:%s", data);
    socket.write("服务器：" + data);
  });
  socket.on("error", error => {
    console.log("与客户端通信的过程中发生错误", error);
    socket.destroy();
  });
  socket.on("end", () => {
    console.log("客户端关闭连接");
    socket.destroy();
  });
  socket.on("close", function(hasError) {
    console.log(hasError ? "异常关闭" : "正常关闭");
  });
});
server.listen(8080, () => {
  let client = new net.Socket();
  client.setEncoding("utf8");
  client.connect(8080, "127.0.0.1", () => {
    console.log("已经连接到服务端");
    client.write("hello,this is client");
    setTimeout(() => {
      client.end("bye");
    }, 5000);
  });
  client.on("data", data => {
    console.log("接收到服务端的信息:%s", data);
  });
  client.on("error", error => {
    console.log("发生错误%s", error);
    client.destroy();
  });
});
```

### 1.3.3

停止 server 接受建立新的 connection 并保持已经存在的 connections

```js
server.getConnections((err, count) => {
  if (count == 2) server.close();
});
```

### 1.3.4

如果这个 server 在事件系统中是唯一有效的，那么对 server 调用 unref() 将允许程序退出。 如果这个 server 已经调用过 unref 那么再次调用 unref() 将不会再有效果。

unref 方法指定客户端连接全部关闭的时候退出程序。如果将 allowHalfOpen 方法，必须使用与客户端连接的 socket 端口对象的 end 方法主动关闭服务器端连接

```js
socket.on("close", function(hasError) {
  if (hasError) {
    console.log("由于错误导致socket关闭");
    server.unref();
  } else {
    console.log("端口正常关闭");
  }
});
```

### 1.3.5

write 的返回值和 bufferSize 属性值
http://nodejs.cn/api/net.html#net_socket_buffersize

```js
let net = require("net");
let fs = require("fs");
let path = require("path");
let server = net.createServer({ allowHalfOpen: true }, function(socket) {
  console.log("客户端已经连接");
  socket.setEncoding("utf8");
  let rs = fs.createReadStream(path.resolve(__dirname, "msg.txt"), {
    highWaterMark: 10
  });
  rs.on("data", function(data) {
    let flag = socket.write(data);
    console.log("flag:", flag);
    console.log("缓存字节:" + socket.bufferSize);
    console.log("已发送字节:" + socket.bytesWritten);
    console.log("");
  });
  rs.on("end", () => {
    socket.end("end,那就关闭了");
    server.unref();
  });
  socket.on("data", function(data) {
    console.log("data", data);
  });
  socket.on("drain", function(err) {
    "缓存区已全部发送";
  });
});
server.listen(8080, () => {
  let client = new net.Socket();
  client.setEncoding("utf8");
  client.connect(8080, "127.0.0.1", () => {
    console.log("已经连接到服务端");
    // setTimeout(() => {
    //   client.write("hello,this is client");
    // }, 100);
  });
  client.on("data", data => {
    console.log("接收到服务端的信息:%s", data);
  });
  client.on("error", error => {
    console.log("发生错误%s", error);
    client.destroy();
  });
  client.on("end", error => {
    console.log("客户端关闭");
    client.destroy();
  });
});
```

### 1.3.6 keepAlive

当服务器和客户端建立连接后，当一方主机突然断电、重启、系统崩溃等意外情况时，将来不及向另一方发送 FIN 包，这样另一方将永远处于连接状态。 可以使用 setKeepAlive 方法来解决这一个问题

```js
socket.setKeepAlive([enaable], [initialDelay]);
```

enable 是否启用嗅探，为 true 时会不向对方发送探测包，没有响应则认为对方已经关闭连接，自己则关闭连接

initialDelay 多久发送一次探测包，单位是毫秒

## demo

```js
let net = require("net");
let server = net.createServer({ allowHalfOpen: true }, function(socket) {
  console.log("客户端已经连接");
  socket.setEncoding("utf8");
  socket.on("data", function(data) {
    console.log("已接收客户端发送的数据:%s", data);
    socket.write("服务器确认数据:" + data);
  });
  socket.on("error", function(err) {
    console.log("与客户端通信过程中发生了错误，错误编码为%s", err.code);
    socket.destroy();
  });
  socket.on("end", function(err) {
    console.log("客户端已经关闭连接");
    socket.end();
    server.unref();
  });
  socket.on("close", function(hasError) {
    if (hasError) {
      console.log("由于错误导致socket关闭");
      server.unref();
    } else {
      console.log("端口正常关闭");
    }
  });
  server.getConnections((err, count) => {
    if (count == 2) server.close();
  });
});
server.listen(8080, function() {});
server.on("close", function() {
  console.log("服务器关闭");
});
```

## 2.UDP

### 2.1 创建 socket

```js
let socket = dgram.createSocket(type, [callback]);
socket.on("messsage", function(msg, rinfo) {});
```

type：ipv4/ipv6
callback:接收到数据的回调函数
msg 接收到输数据
rinfo 信息对象
address 发送者的地址
family ipv4 还是 ipv6
port 发送者的 socket 端口号
size 发送者所发送的数据字节数

```js
socket.bind([port][, address][, callback])
socket.on('listening',callabck)
```

- port 绑定的端口号
- address 监听的地址
- callback 监听成功后的回调函数

### 2.2 向外发送数据

如果发送数据前还没有绑定过地址和端口号，操作系统将为其分配一个随机的端口，并可以接受任何数据的地址

```js
socket.send(msg[, offset, length][, port][, address][, callback])
```

- msg <Buffer> | <Uint8Array> | <string> | <Array> 要发送的消息。
- offset <integer> 指定消息的开头在 buffer 中的偏移量,从第几个字节开始发
- length <integer> 消息的字节数。
- port <integer> 目标端口。
- address <string> 目标主机名或 IP 地址。
- callback <Function> 当消息被发送时会被调用。
  - 错误对象
  - bytes 实际发送的字节数

### 2.3 address

获取此 socket 的相关信息

```js
let address = socket.address();
```

返回一个包含 socket 地址信息的对象。 对于 UDP socket，该对象将包含 address、 family 和 port 属性。

### 2.4 UDP 服务器

```js
var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
socket.on("message", (msg, info) => {
  console.log(msg.toString());
  console.log(info);
  socket.send(msg, 0, msg.length, info.port, info.address);
});
socket.bind(41234, "localhost");
```

### 2.5 udp 客户端

-socket.setTTL(ttl) : 设置 IP_TTL 套接字选项。 一般来说，TTL 表示"生存时间"，这里特指一个 IP 数据包传输时允许的最大跳步数。 当 IP 数据包每向前经过一个路由或网关时，TTL 值减 1，若经过某个路由时，TTL 值被减至 0，便不再继续向前传输。 比较有代表性的是，为了进行网络情况嗅探或者多播而修改 TTL 值。

```js
var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
socket.on("message", (msg, rinfo) => {
  console.log(msg.toString());
  console.log(rinfo);
});
let buf = new Buffer(``);
socket.send(buf, 0, buf.length, 41234, "localhost", (err, bytes) => {
  console.log("发送了s%个字节", bytes);
});
socket.on("err", err => {
  console.log(err);
});
```

### 2.6 广播

创建一个 UDP 服务器并且通过该服务器进行数据的广播

#### 2.6.1 服务器

- socket.setBroadcast(flag) 设置或清除 SO_BROADCAST socket 选项。 当设置为 true, UDP 包可能会被发送到一个本地接口的广播地址

```js
let dgram = require("dgram");
let server = dgram.createSocket("udp4");
server.on("message", msg => {
  console.log("来自客户端的数据", msg.toString());
  let buf = new Buffer.from("已经接受客户端的数据" + msg);
  server.setBroadcast(true);
  server.send(buf, 0, buf.length, 41235, "10.23.101.42");
});
server.bind(41234, "10.23.101.42");
```

### 2.6.2 客户端

```js
let dgram = require("dgram");
let client = dgram.createSocket("udp4");
client.bind(41235, "10.23.101.42");
// setInterval(()=>{
let buf = new Buffer.from("hello: " + new Date().getUTCSeconds());
client.send(buf, 0, buf.length, 41234, "10.23.101.42");
// },1000)
let a = new Date().getTime();
client.on("message", (msg, info) => {
  let b = new Date().getTime();
  console.log(b, a);
  console.log("received，延迟：" + (b - a) + "ms");
});
```

## 2.7

组播

- 所谓的组播，就是将网络中同一业务类型进行逻辑上的分组，从某个 socket 端口上发送的数据只能被该组中的其他主机所接收，不被组外的任何主机接收。
- 实现组播时，并不直接把数据发送给目标地址，而是将数据发送到**组播主机**，操作系统将把该数据组播给组内的其他所有成员。
- 在网络中，使用 D 类地址作为组播地址。范围是指 224.0.0.0 ~ 239.255.255.255,分为三类
  - 局部组播地址: 224.0.0.0 ~ 224.0.0.255 为路由协议和其他用途保留
  - 预留组播地址: 224.0.1.0 ~ 238.255.255.255 可用于全球范围或网络协议
  - 管理权限组播地址 ： 239.0.0.0 ～ 239.255.255.255 组织内部使用，不可用于 Internet

把该 socket 端口对象添加到组播组中。

```js
socket.addMembership(multicastAddress, [multicastInterface]);
```

- multicastAddress 必须指定，需要加入的组播组地址
- multicastInterface 可选参数，需要加入的组播组地址

```js
socket.dropMembership(multicastAddress, [multicastInterface]);
socket.setMulticastTTL(ttl);
socket.setMulticastLoopback(flag);
```

### 服务端

```js
let dgram = require("dgram");
let server = dgram.createSocket("udp4");
server.on('listening',()=>{
  server.setMulticastTTL(128)
  server.setMulticastLoopback(true)
  server.addMembership('230.185.192.108');
})
setInterval(broadcast,1000);
function broadcast(){
  let buffer=Buffer.from(new Date().toLocaleDateString())
  server.send(buffer, 0, buffer.length, 8080, "10.23.101.42");
}
```

### 客户端
```js
let dgram = require("dgram");
let client = dgram.createSocket("udp4");
client.on('listening',()=>{
  client.addMembership("10.23.101.42");
})
client.on('message',(msg,remote)=>{
  console.log(msg.toString());
})
client.bind(8080, "10.23.101.42");
```
