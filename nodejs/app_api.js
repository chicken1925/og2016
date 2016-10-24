// server.js


//sql設定

var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'kgog2016',
  //port : 3306,
  database: 'og2016'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

//connection.connect();



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


//共同研究リストjsonデータ
//var quest_lists={};
//テストデータ
var quest_lists={ '32c967d3ab': { quest_num: '0', userIDs: [ '0001' ], user_stuIDs: [ '2' ] ,"time":new Date().getTime(),"state":0,"checked":[]},
'32c967d3ac': { quest_num: '0', userIDs: [ '0001','0002' ], user_stuIDs: [ '3','22'] ,"time":new Date().getTime(),"state":1,"checked":[]},
'32c967d3ad': { quest_num: '1', userIDs: [ '0001','0004' ], user_stuIDs: [ '10','22'] ,"time":new Date().getTime(),"state":0,"checked":[]},
'1234567890': { quest_num: '1', userIDs: [ '0003','0002' ], user_stuIDs: [ '2','3' ] ,"time":new Date().getTime(),"state":0,"checked":[]},
'2345678901': { quest_num: '0', userIDs: [ '0002' ], user_stuIDs: [ '4' ] ,"time":new Date().getTime(),"state":0,"checked":[]}
}


//ユニーク文字列生成
function getUniqueStr(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    var tt = new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16);
    var tt_=tt.slice(-10);
    //console.log(tt_);
    return tt_;
}

//json読み込み
var fs = require('fs');
var gen_student = JSON.parse(fs.readFileSync('student_data.json', 'utf8'));




//報酬計算式
function calc_reward(quest_id_){
  var reward_money=0;
  var reward_item=0;

  //計算式
  //Databaseから呼び出す or そもそもquest_listsにステータスや得意分野などを登録しておく
  if(quest_lists[quest_id_].quest_num==0){

  }

  reward_money=100000;
  reward_item=1;

  return [reward_money,reward_item];
}



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




// /hold というルートを作成する．
//全返答
router.route('/hold')
// (GET http://localhost:8080/api/hold)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/hold)
    .post(function(req, res) {
        //console.log(req.body.uid);
        //console.log(req.body.quest_num);
        //console.log(req.body.stu_num);

        var key=getUniqueStr();
        quest_lists[key]={"quest_num":req.body.quest_num,"userIDs":[req.body.uid],"user_stuIDs":[req.body.stu_num],"time":new Date().getTime(),"state":0,"checked":[]};
        //quest_lists[key].user_stuIDs.push("100");

        //console.log(quest_lists);

        res.jsonp({ message: key});

    });



// /questlist/:user_id というルートを作成する．
router.route('/questlist/:user_id')
// (GET http://localhost:8080/api/questlist)
    .get(function(req, res) {
      //console.log(req.params.user_id);
      var c=0;
      var ret_quest={};

      //自分のuidのquestを検索
      for(var i in quest_lists){
        //console.log(quest_lists[i].userIDs);
        for(var j=0;j<quest_lists[i].userIDs.length;j++){
          //console.log(quest_lists[i].userIDs[j]);
          if(quest_lists[i].userIDs[j]==req.params.user_id){
            /*経過時間関係はここ*/
            if(quest_lists[i].state==1&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >60){
              //2はコミュ力による合否判定失敗、作るならここ
              quest_lists[i].state=3;
            }

            //結果を見れるようにする
            if(quest_lists[i].state==3&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >120){
              //2はコミュ力による合否判定失敗
              quest_lists[i].state=4;
            }

            //console.log(req.params.user_id);

            //一度確認したあとは出ない
            var chohuku=false;
            for(var k=0;k<quest_lists[i].checked.length;k++){
              if(quest_lists[i].checked[k]==req.params.user_id){
                chohuku=true;
              }
            }
            if(chohuku==false){
              ret_quest[i]=quest_lists[i];
            }
            //ret_quest[i]=quest_lists[i];
          }
        }
          c++;
      }
        //console.log(quest_lists);
        res.jsonp(ret_quest);

    })
// (POST http://localhost:8080/api/questlist)
    .post(function(req, res) {

    });


// /lohin というルートを作成する．
//全返答
router.route('/login')
// (GET http://localhost:8080/api/hold)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/hold)
    .post(function(req, res) {
        //console.log(req.body.uid);
        //console.log(req.body.password);

        //SQL文を書く
        var sql = "SELECT * FROM user_M where cast(uid as unsigned)='"+req.body.uid+"';";
        var query = connection.query(sql);
        var jsonstr=[];

        query
        //結果用
        .on('result', function(rows) {
          //console.log(rows['password'].replace(/\s+/g, "")+','+req.body.password);
          if(rows['password'].replace(/\s+/g, "")==req.body.password){
            jsonstr.push({
              id : rows['id'],
              uid : rows['uid'],
              name : rows['name'],
              password : rows['password'],
              faculty : rows['faculty'],
              department : rows['department'],
              money : rows['money'],
              students : [rows['student1'],rows['student2'],rows['student3'],rows['student4'],rows['student5'],rows['student6']]
            });
          }else{
            jsonstr.push({
              message : "error"
            });
          }


        })
        //終
        .on('end', function() {
          //connection.destroy(); //終了
          //console.log(jsonstr.length);
          if(jsonstr.length==0){jsonstr.push({ message : "error"});}
          //console.log(jsonstr);
          res.jsonp(jsonstr);
        });



    });




// /questsearch/:user_id というルートを作成する．
router.route('/questsearch/:questid')
// (GET http://localhost:8080/api/questsearch/:questnum)
    .get(function(req, res) {
      //console.log(req.params.questid);

      var c=0;
      var ret_quest={ message : "noquest"};

      //questnumのquestを検索
      for(var i in quest_lists){
        //console.log(quest_lists[i].userIDs);
        if(i==req.params.questid){
          ret_quest=quest_lists[i];
        }
        c++;
      }
      //console.log(ret_quest.length);
      //if(ret_quest.length==0){console.log("hoge");ret_quest={ message : "noquest"};}
      //console.log(ret_quest);
      res.jsonp(ret_quest);

    })
// (POST http://localhost:8080/api/questlist)
    .post(function(req, res) {

    });



// /join_request というルートを作成する．
//全返答
router.route('/join_request')
// (GET http://localhost:8080/api/join_request)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/join_request)
    .post(function(req, res) {
      //console.log(req.body.uid);
      //console.log(req.body.join_stu);
      //console.log(req.body.quest_id);


      //questnumのquestを検索+足す
      var c=0;
      for(var i in quest_lists){
        //console.log(quest_lists[i].userIDs);
        if(i==req.body.quest_id){
          //console.log('!!'+quest_lists[i].userIDs);
          quest_lists[i].userIDs.push(req.body.uid);
          quest_lists[i].user_stuIDs.push(req.body.join_stu);
          //参加人数条件
          if(quest_lists[i].quest_num==0&&quest_lists[i].userIDs.length>=2){
            quest_lists[i].state=1;
            quest_lists[i].time=new Date().getTime();
          }
          if(quest_lists[i].quest_num==1&&quest_lists[i].userIDs.length>=3){
            quest_lists[i].state=1;
            quest_lists[i].time=new Date().getTime();
          }
        }
        c++;
      }

      //console.log(quest_lists);
      res.jsonp({ message: 'done'});

    });



// /check_quest というルートを作成する．
//全返答
router.route('/check_quest')
// (GET http://localhost:8080/api/check_quest)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/check_quest)
    .post(function(req, res) {
      //console.log(req.body.quest_id);
      //console.log(quest_lists);

      var ret_reward={ message : "error"};
      //questnumのquestを検索+足す
      var c=0;
      for(var i in quest_lists){
        //console.log(quest_lists[i].userIDs);
        if(i==req.body.quest_id){
          //console.log('!!'+quest_lists[i].userIDs);
          var cr=calc_reward(req.body.quest_id);
          ret_reward={ "reward_money": cr[0] , "reward_item": cr[1]}
          quest_lists[i].checked.push(req.body.uid);
          if(quest_lists[i].quest_num==0&&quest_lists[i].checked.length>=2){delete quest_lists[i];}
        }
        c++;
      }

      //console.log(quest_lists);
      res.jsonp(ret_reward);

    });


// /add_stu というルートを作成する．
//全返答
router.route('/add_stu')
// (GET http://localhost:8080/api/add_stu)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/add_stu)
    .post(function(req, res) {
      //console.log(req.body.uid);
      //console.log(req.body.history);
      //console.log(quest_lists);
      var normal=0;
      for(var i=0;i<gen_student.length;i++){
        if(gen_student[i]==0||gen_student[i]==1){
          normal++;
        }
      }
      var rare_p=40;
      rare_p=rare_p+normal*15;
      var rand = Math.floor( Math.random() * 100 ) ;

      var rare=false;
      if(rand<rare_p){
        rare=true;
      }


      res.jsonp({
            "id":40, //db追加
            "name":"輿水", //random
            "grade":0,
            "personality":0, //random
            "speciality":0, //random
            "skill":[1,0,0], //random
            "journal_pos":0,
            "journal_pub":0,
            "status":[10,10,10], //random
            "pic":"images/member_a.png", //idより
            "course_t":0,
            "collabo_t":0,
            "stu_type":1 //random?
        });

    });








// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);


