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

// 3030番を指定
var port = process.env.PORT || 3030;

// expressでAPIサーバを使うための準備
var router = express.Router();

router.use(function(req, res, next) {
    //console.log('Something is happening.');
    next();
});




// 正しく実行出来るか左記にアクセスしてテストする (GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.jsonp({ message: 'Successfully Posted a test message.' });
});



// /users というルートを作成する．
//全返答
router.route('/users')
// (GET http://localhost:3030/api/users)
	.get(function(req, res) {
		//res.jsonp({ message: 'GET users' });
		//SQL文を書く
		var sql = 'SELECT * FROM user_M;';
		var query = connection.query(sql);
		var jsonstr=[];
		
		query
		//結果用
		.on('result', function(rows) {
			var str="";
			str+="{";
			
			str+="id: "+rows['id']+", ";
			str+="uid: "+rows['uid']+", ";
			str+="name: "+rows['name']+", ";
			str+="password: "+rows['password']+", ";
			str+="lab: "+rows['lab'];
			str+="}";
			
			jsonstr.push({
				id : rows['id'],
				uid : rows['uid'],
				name : rows['name'],
				password : rows['password'],
				campus : rows['campus'],
				department : rows['department'],
			});
		})
		//終
		.on('end', function() {
			//connection.destroy(); //終了
			res.jsonp(jsonstr);
		});
		
		
	})
// (POST http://localhost:3030/api/users)
	.post(function(req, res) {
		res.jsonp({ message: 'POST users' });
	});





// /users/:usrs_id というルートを作成する．
router.route('/users/:user_id')
// (GET http://localhost:3030/api/users/[user_id])
	.get(function(req, res) {
		//res.jsonp({ message: 'GET users '+req.params.user_id});
		
		//SQL文を書く
		var sql = 'SELECT * FROM user_M where uid = "'+req.params.user_id+'" LIMIT 1;';
		var query = connection.query(sql);
		query
		//結果用
		.on('result', function(rows) {
			//console.log('The res is: ', rows );
			res.jsonp({ id: rows['id'] ,
						uid: rows['uid'] ,
						name: rows['name'],
						password: rows['password'],
						campus: rows['campus'],
						department: rows['department'],
					}
					);
		})
		//終
		.on('end', function() {
			//console.log('end');
			//connection.destroy(); //終了
		});
		
		
	})
// (POST http://localhost:3030/api/users/[user_id])
	.post(function(req, res) {
		res.jsonp({ message: 'POST users '+req.params.user_id });
	});





// /money/:usrs_id というルートを作成する．
router.route('/money/:user_id')
// (GET http://localhost:3030/api/money/[user_id])
	.get(function(req, res) {
		//res.jsonp({ message: 'GET users '+req.params.user_id});
		
		//SQL文を書く
		var sql = 'SELECT * FROM user_money_M where uid = "'+req.params.user_id+'" LIMIT 1;';
		var query = connection.query(sql);
		query
		//結果用
		.on('result', function(rows) {
			//console.log('The res is: ', rows );
			//console.log('get_money');
			res.jsonp({ id: rows['id'] ,
						uid: rows['uid'] ,
						all_m: rows['all_m'] ,
						per_m: rows['per_m'] }
					);
		})
		//終
		.on('end', function() {
			//console.log('end');
			//connection.destroy(); //終了
		});
		
		
	})
// (POST http://localhost:3030/api/money/[user_id])
	.post(function(req, res) {
		//console.log('post_money');
		//console.log(req.body.all_m);
		
		var sql = 'SELECT * FROM user_money_M where uid = "'+req.params.user_id+'" LIMIT 1;';
		var sql = "update user_money_M set	all_m = '"+req.body.all_m+"',updateDate=NOW()	where uid="+req.params.user_id+";";
		var query = connection.query(sql);
		query
		//結果用
		.on('result', function(rows) {
			//console.log('The res is: ', rows );
			//console.log('get_money');
			res.jsonp({ message: 'correct'});
		})
		//終
		.on('end', function() {
			//console.log('end');
			//connection.destroy(); //終了
		});
		
	});





// /students/:usrs_id というルートを作成する．
router.route('/students/:user_id')
// (GET http://localhost:3030/api/students/[user_id])
	.get(function(req, res) {
		//res.jsonp({ message: 'GET users '+req.params.user_id});
		
		//SQL文を書く
		var sql = 'SELECT * FROM user_student_M where uid = "'+req.params.user_id+'" LIMIT 1;';
		var query = connection.query(sql);
		query
		//結果用
		.on('result', function(rows) {
			//console.log('The res is: ', rows );
			//console.log('get_money');
			res.jsonp({ id: rows['id'] ,
						uid: rows['uid'] ,
						bachelor: rows['bachelor'] ,
						master: rows['master'] ,
						doctor: rows['doctor'] }
					);
		})
		//終
		.on('end', function() {
			//console.log('end');
			//connection.destroy(); //終了
		});
		
		
	})
// (POST http://localhost:3030/api/students/[user_id])
	.post(function(req, res) {
		//console.log('post_money');
		//console.log(req.body.all_m);
		/*
		var sql = 'SELECT * FROM user_money_M where uid = "'+req.params.user_id+'" LIMIT 1;';
		var sql = "update user_money_M set	all_m = '"+req.body.all_m+"',updateDate=NOW()	where uid="+req.params.user_id+";";
		var query = connection.query(sql);
		query
		//結果用
		.on('result', function(rows) {
			//console.log('The res is: ', rows );
			//console.log('get_money');
			res.jsonp({ message: 'correct'});
		})
		//終
		.on('end', function() {
			//console.log('end');
			//connection.destroy(); //終了
		});
		*/
		res.jsonp({ message: 'POST students '+req.params.user_id });
	});






// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);


/*

//SQL文を書く
var sql = 'SELECT * FROM user_M LIMIT 10;';
//プレースホルダに差し込むデータ
var userId = '012345678';

var query = connection.query(sql);

query
  //結果用
  .on('result', function(rows) {
    console.log('The res is: ', rows );
	console.log(rows['id']);
	console.log(rows['uid']);
	console.log(rows['name']);
	
  })
  //終わったよう～
  .on('end', function() {
    //console.log('end');
    connection.destroy(); //終了
  });

*/


