var key = scoket.remoteAddress+':'+socket.remotePort;
users[key] = {name:'匿名',socket};

socket.on('data',function(data){
    parse(data);
});
function parse(msg){
  swtich(msg.type){
   case 'secret':
     secret(msg.user,msg.text);
     break;
  }
  case 'boardcast':
     boardcast(message.text);
     break;
  case 'cname':
     cname(messsage.text);
     break;
  case 'list':
     list();
     break;   
  default:
     socket.write('不能识别命令');
     break;
}
function secret(user,text){

}
function boardcast(text){

}
function cname(text){

}
function list(){

}
/**
 * 类方法
 * net.isIP(input)
net.isIPv4(input)
net.isIPv6(input)
 */