// server.js


//sql設定
/*
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'password',
  //port : 3306,
  database: 'og2016'
});

connection.connect();
*/


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

// 8080番を指定
var port = process.env.PORT || 8080;

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
router.route('/users')
// (GET http://localhost:3330/api/users)
	.get(function(req, res) {
		res.jsonp({ message: 'GET users' });

	})
// (POST http://localhost:3330/api/users)
	.post(function(req, res) {

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


