const net = require('net')
let server = net.createServer(socket => {
  console.log('客户端已经连接了')
  socket.setEncoding('utf8')
  socket.on('data', data => {
    console.log('已经接收到客户端发送的数据:%s', data)
    socket.write('服务器：' + data)
  })
  socket.on('error', error => {
    console.log('与客户端通信的过程中发生错误', error)
    socket.destroy()
  })
  socket.on('end', () => {
    console.log('客户端关闭连接')
    socket.destroy()
  })
  socket.on('close', function(hasError) {
    console.log(hasError ? '异常关闭' : '正常关闭')
  })
})
server.listen(8080, () => {
  let client = new net.Socket()
  client.setEncoding('utf8')
  client.connect(8080, '127.0.0.1', () => {
    console.log('已经连接到服务端')
    client.write('hello,this is client')
    setTimeout(() => {
      client.end('bye')
    }, 5000)
  })
  client.on('data', data => {
    console.log('接收到服务端的信息:%s', data)
  })
  client.on('error', error => {
    console.log('发生错误%s', error)
    client.destroy()
  })
})
