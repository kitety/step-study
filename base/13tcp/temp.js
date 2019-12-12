let dgram = require("dgram");
let client = dgram.createSocket("udp4");
client.on('listening',()=>{
  client.addMembership("10.23.101.42");
})
client.on('message',(msg,remote)=>{
  console.log(msg.toString());
})
client.bind(8080, "10.23.101.42");