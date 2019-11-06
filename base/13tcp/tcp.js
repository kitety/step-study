const net = require('net')
const path = require('path')
let file = require('fs').createWriteStream(path.join(__dirname, 'msg.txt'))
let server = net.createServer(socket => {
  console.log('客户端已连接')
  socket.pause()
  socket.setTimeout(5000)
  socket.on('timeout',()=>{
    console.log('timeout')
    socket.pipe(file)
  })
})
server.listen(8080, () => {
  console.log('开始监听在8080')
})
