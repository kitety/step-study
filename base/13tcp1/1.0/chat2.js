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
