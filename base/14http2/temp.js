let http = require("http");
let option = {
  hostname: "localhost",
  port: 8080,
  path: "/",
  method: "GET"
};
let req = http.request(option, res => {
  console.log("code：" + res.statusCode);
  console.log("headers: " + JSON.stringify(res.headers));
  res.setEncoding("utf8");
  res.on("data", chunk => {
    console.log("content", chunk);
  });
});
req.end()