聊天室1
## 客户端
```js
let net = require("net");
let client = new net.Socket();
client.setEncoding("utf8");
client.connect(8080, "127.0.0.1", () => {
  console.log("已经连接到服务端");
  client.write("hello");
  setInterval(() => {
    client.write(new Date().getTime() + "");
  }, 1000);
});
client.on("data", data => {
  console.log("接收到服务端的信息:%s", data);
});
client.on("error", error => {
  console.log("发生错误%s", error);
  client.destroy();
});

```
## 服务端
```js
/**
 * 1.创建一个服务器
 * 2. 客户端可以连接服务器
 * 3.客户端可以发言，然后广播给大家
 * 4.客户端连接和退出后都要通知大家。
 * 5.显示当前的在线人数
 */
let net = require("net");
let clients = {};
let server = net.createServer(socket => {
  socket.setEncoding("utf8");
  server.getConnections((err, count) => {
    socket.write(
      `welcome,there is ${count} users now,pelease input your username\r\n`
    );
  });
  let nickname;
  socket.setEncoding("utf8");
  socket.on("data", data => {
    console.log("===========data", data,nickname);
    data = data.replace(/\r\n/, "");
    if (data === "byebye") {
      socket.end();
    } else {
      if (nickname) {
        boardcast(nickname, `  ${nickname} said:${data}`);
      } else {
        nickname = data;
        clients[nickname] = socket;
        boardcast(nickname, `welcome ${nickname} joined us!`);
      }
    }
  });
  socket.on("close", function() {
    // socket.destroy();
  });
});

server.listen(8080, () => {
  console.log("监听在8080端口上");
});
function boardcast(nickname, msg) {
  for (const key in clients) {
    console.log(key);
    if (clients.hasOwnProperty(key)) {
      // if (key != nickname) {
      clients[key].write(msg + "\r\n");
      // clients[nickname].destroy();
      // delete clients[nickname];
      // }
    }
  }
}

```