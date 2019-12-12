## 1.HTTP 服务器

HTTP 全称是超文本传输协议，构建于 TCP 之上，属于应用层协议。

### 1.1 创建 HTTP 服务器

```js
let server = http.createServer([requestListener]);
server.on("request", requestListener);
```

- requestListener 当服务器收到客户端的连接后执行的处理
  - http.IncomingMessage 请求对象
  - http.ServerResponse 对象 服务器端响应对象

### 1.2 启动 HTTP 服务器

```js
server.listen([port[, host[, backlog]]][, callback])
server.on('listening',callback);
```

- port 监听的端口号
- host 监听的地址
- backlog 指定位于等待队列中的客户端连接数

```js
let http = require("http");
let server = http.createServer((req, res) => {});
server.listen(8080, "127.0.0.1", () => {
  console.log("服务监听ing...");
});
```

### 1.3 关闭 HTTP 服务器

```js
server.close();
server.on("close", callback);
```

```js
let http = require("http");
let server = http.createServer((req, res) => {});
server.listen(8080, "127.0.0.1", () => {
  console.log("服务监听ing...");
  server.close();
});
server.on("close", () => {
  console.log("服务器关闭。");
});
```

### 1.4 监听服务器错误

```js
server.on("error", e => {
  console.log(e.code);
});
```

### 1.5 connection

```js
server.on("connection", () => {
  console.log("客户端连接已经建立");
});
```

### 1.6 setTimeout

设置超时时间，超时后不可再复用已经建立的连接，发送请求需要重新建立连接。默认设置超时时间两分钟

```js
socket.setTimeout(timeout[, callback])
server.on("timeout", () => {
  console.log("链接超时");
});
```

### 1.7 获取客户端请求信息

- request
  - method 请求的方法
  - url 请求的路径
  - headers 请求头对象
  - httpVersion 客户端的 http 版本
  - socket 监听客户端请求的 socket 对象

```js
let http = require("http");
let fs = require("fs");
let path = require("path");
let server = http
  .createServer((req, res) => {
    console.log(req.url);
    if (req.url !== "/favicon.ico") {
      let out = fs.createWriteStream(path.join(__dirname, "result.log"));
      out.write("method=" + req.method + "\r\n");
      out.write("url=" + req.url + "\r\n");
      out.write("headers=" + JSON.stringify(req.headers) + "\r\n");
      out.write("httpVersion=" + req.httpVersion + "\r\n");
    }
  })
  .listen(8080, "127.0.0.1");
```

```js
let http = require("http");
let fs = require("fs");
let server = http
  .createServer(function(req, res) {
    let body = [];
    req.on("data", function(data) {
      body.push(data);
    });
    req.on("end", function() {
      let result = Buffer.concat(body);
      console.log(result.toString());
    });
  })
  .listen(8080, "127.0.0.1");
```

### 1.8 queryString

queryString 模块用来转换 URL 字符串和 URL 中的查询字符串

#### 1.8.1 parse 把字符串转换为对象

```js
querystring.parse(str[, sep[, eq[, options]]])
```

#### 1.8.2 stringfy 方法把对象转换为字符串

```js
querystring.stringify(obj[, sep[, eq[, options]]])
```

### 1.9 querystring

```js
url.parse(urlStr, [parseQueryString]);
```

- href 被转换的原 URL 字符串
- protocal 客户端发出请求时使用的协议
- slashes 在协议与路径之间是否使用了//分隔符
- host URL 字符串中的完整地址和端口号
- auth URL 字符串中的认证部分
- hostname URL 字符串中的完整地址
- port URL 字符串中的端口号
- pathname URL 字符串的路径，不包含查询字符串
- search 查询字符串，包含?
- path 路径，包含查询字符串
- query 查询字符串，不包含起始字符串?
- hash 散列字符串，包含#
