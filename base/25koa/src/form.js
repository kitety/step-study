const Koa = require('koa');
const views = require('koa-views');
const fs = require('fs');
let querystring = require('querystring');
let path = require('path');
let uuid = require('uuid');
const app = new Koa();
app.use(async (ctx, next) => {
 if (ctx.method == 'GET') {
 ctx.set('Content-Type', 'text/html;charset=utf8');
 ctx.body = (
 `
 <form id="userform" method="POST" enctype="multipa
 用户名:<input type="text" name="username">
密码<input type="text" name="password">
头像<input type="file" name="avatar">
 <input type="submit">
 </form>
 `
 );
 } else if (ctx.method == 'POST') {
 let buffers = [];
 ctx.req.on('data', function (data) {
 buffers.push(data);
 });
 ctx.req.on('end', function () {
 let result = Buffer.concat(buffers);
 let type = ctx.headers['content-type'];
 let matched = type.match(/\bboundary=(.+)\b/);
 if (matched) {
 let seperator = '--' + matched[1];
 let body = process(seperator, result);
 ctx.body = body;
 } else {
 next();
 }
 });
 ctx.body = 'hello';
 } else {
 next();
 }
});
app.listen(3000);
Buffer.prototype.split = Buffer.prototype.split || function (sep)
 let len = Buffer.byteLength(sep);
 let parts = [];
 let offset = 0;
 let pos = -1;
 while (-1 != (pos = this.indexOf(sep, offset))) {
 parts.push(this.slice(offset, pos));
 offset = pos + len;
 }
 parts.push(this.slice(offset));
 return parts;
}
function process(seperator, result) {
 let lines = result.split(seperator);
 lines = lines.slice(1, -1);
 let body = {};
 let files = [];
 lines.forEach(function (line) {
 let [desc, val] = line.split('\r\n\r\n');
 desc = desc.toString();
 val = val.slice(0, -2);
 if (desc.includes('filename')) {//如果是文件的话
 let [, line1, line2] = desc.split('\r\n');
 let obj1 = querystring.parse(line1, '; ');
 let obj2 = querystring.parse(line2, '; ');
 let filepath = path.join(__dirname, 'uploads', uuid.v4
 fs.writeFileSync(filepath, val);
 files.push({
 ...obj1, filepath
 });
 } else {
 let matched = desc.match(/\bname=(.+)\b/);
 if (matched)
 body[matched[1]] = val.toString();
 }
 });
 return { body, files };
}