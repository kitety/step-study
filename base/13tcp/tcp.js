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