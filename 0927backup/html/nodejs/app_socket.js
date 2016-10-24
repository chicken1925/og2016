var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8");
     res.end(output);
}).listen(process.env.VMC_APP_PORT || 3330);
console.log('Server running　http://http://153.126.164.52:3330/');

var io = socketio.listen(server);

var mode = 0;

io.sockets.on("connection", function (socket) {
  // メッセージ送信（送信者にも送られる）
  socket.on("C_to_S_message", function (data) {
  //console.log('hoge2');
  /*
  if(data.color==null){
    //console.log('hoge');
	io.sockets.emit("S_to_C_message", {value:data.value});
  }else{
    io.sockets.emit("S_to_C_message", {value:data.value,color:data.color,size:data.size});
  }
  */
	//io2.sockets.emit("S_to_C_message", {value:data.value,color:data.color,size:data.size});
	//console.log('hoge');
  });
  // ブロードキャスト（送信者以外の全員に送信）
  socket.on("C_to_S_broadcast", function (data) {
    //socket.broadcast.emit("S_to_C_message", {value:data.value,color:data.color,size:data.size});
  });
  // 切断したときに送信
  socket.on("disconnect", function () {
//    io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
});

