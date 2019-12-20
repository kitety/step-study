let http = require("http");
let options = {
  hostname: "localhost",
  port: 8080,
  path: "/",
  method: "GET"
};
let req = http.request(options, function(res) {
  console.log("状态吗:" + res.statusCode);
  console.log("响应头:" + JSON.stringify(res.headers));
  res.setEncoding("utf8");
  res.on("data", function(chunk) {
    console.log("响应内容", chunk);
  });
  res.on("end", function() {
    console.log("trailer", res.trailers);
  });
});
req.end();
