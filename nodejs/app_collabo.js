// server.js


//sql設定
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'password',
  //port : 3306,
  database: 'og2016'
});

connection.connect();



//api設定
// 必要なパッケージの読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

//Access-Control-Allow-Originエラー回避
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '86400');
  next();
});


// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3330番を指定
var port = process.env.PORT || 3330;

// expressでAPIサーバを使うための準備
var router = express.Router();

router.use(function(req, res, next) {
    //console.log('Something is happening.');
    next();
});


//友達申請用
var requestIDs=[];
var num=0;




// 正しく実行出来るか左記にアクセスしてテストする (GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.jsonp({ message: 'Successfully Posted a test message.' });
});



// /request というルートを作成する．
//全返答
router.route('/request')
// (GET http://localhost:3330/api/users)
	.get(function(req, res) {
		//res.jsonp({ message: 'GET users' });
		var jsonstr=[];
		jsonstr.push({
				mes : 'lists'
			});
		for(var i=0;i<num;i++){
			jsonstr.push({
				from_id_l : requestIDs[i].fr,
				req_id_l : requestIDs[i].rq,
				state : requestIDs[i].state
			});
			//console.log(requestIDs[i].fr+","+requestIDs[i].rq+","+requestIDs[i].state);
		}
		
		res.jsonp(jsonstr);
		
	})
// (POST http://localhost:3330/api/users)
	.post(function(req, res) {
		
		//console.log(req.body.from_id);
		//console.log(req.body.req_id);
		
		var hantei=false;
		if(req.body.from_id==req.body.req_id){hantei=true;}
		for(var i=0;i<num;i++){
			if(requestIDs[i].fr==req.body.from_id && requestIDs[i].rq==req.body.req_id){hantei=true;}
		}
		
		var hantei2=false;
		
		var sql = 'SELECT * FROM user_M;';
		var query = connection.query(sql);
		query
		//結果用
		.on('result', function(rows) {
			if(rows['uid']==req.body.req_id){
				hantei2=true;
			}
			//console.log(rows['uid']+","+req.body.req_id);
			//if(hantei2==false){console.log(rows['uid']+",aaaa")};
		})
		//終
		.on('end', function() {
			if(hantei2==true){
				if(hantei==false){
					var requestID =new Object();
					requestID.fr = req.body.from_id;	//申請元
					requestID.rq = req.body.req_id;		//申請先
					requestID.state = 0;				//状態(0=申請中)
					requestIDs[num] = requestID;
					num++;
					res.jsonp({ message: 'ok' });
				}else{
					res.jsonp({ message: 'same' });
				}
			}else{
				res.jsonp({ message: 'Noone' });
			}
		});
		
		
		
		
		
		
		
		
		
	});



// accept というルートを作成する．
//全返答
router.route('/accept')
// (GET http://localhost:3330/api/accept)
	.get(function(req, res) {
		//res.jsonp({ message: 'GET users' });
		/*
		var jsonstr=[];
		jsonstr.push({
				mes : 'lists'
			});
		for(var i=0;i<num;i++){
			jsonstr.push({
				from_id_l : requestIDs[i].fr,
				req_id_l : requestIDs[i].rq,
				state : requestIDs[i].state
			});
		}
		
		res.jsonp(jsonstr);
		*/
	})
// (POST http://localhost:3330/api/accept)
	.post(function(req, res) {
		
		//console.log(req.body.from_id);
		//console.log(req.body.req_id);
		
		var hantei=false;

		for(var i=0;i<num;i++){
			//console.log(req.body.from_id+","+req.body.req_id);
			//console.log(requestIDs[i].fr+","+requestIDs[i].rq+","+requestIDs[i].state);
			if(requestIDs[i].fr==req.body.from_id && requestIDs[i].rq==req.body.req_id && requestIDs[i].state==0){
				/*
				requestIDs.splice(i,i);
				num--;
				*/
				requestIDs[i].state=1;
				hantei=true;
			}
		}
		
		
		
		
		if(hantei==true){
			//ここで共同作業の計算(申請側)
			res.jsonp({ value: 1000000 });
		}else{
			res.jsonp({ value: 0 });
		}
		
		
		
	});




// obtain というルートを作成する．
//全返答
router.route('/obtain')
// (GET http://localhost:3330/api/obtain)
	.get(function(req, res) {
	})
// (POST http://localhost:3330/api/obtain)
	.post(function(req, res) {
		
		//console.log(req.body.from_id);
		//console.log(req.body.req_id);
		
		var hantei=false;
		
		for(var i=0;i<num;i++){
			if(requestIDs[i].fr==req.body.from_id && requestIDs[i].rq==req.body.req_id && requestIDs[i].state==1){
				
				requestIDs.splice(i,1);
				num--;
				
				hantei=true;
			}
		}
		
		
		if(hantei==true){
			//ここで共同作業の計算(受領側)
			res.jsonp({ value: 1500000 });
		}else{
			res.jsonp({ value: 0 });
		}
		
		
		
	});








/*
// /users/:usrs_id というルートを作成する．
router.route('/users/:user_id')
// (GET http://localhost:3330/api/users/[user_id])
	.get(function(req, res) {
		//res.jsonp({ message: 'GET users '+req.params.user_id});
		
		
		
	})
// (POST http://localhost:3330/api/users/[user_id])
	.post(function(req, res) {
		res.jsonp({ message: 'POST users '+req.params.user_id });
	});
*/







// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);


