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
