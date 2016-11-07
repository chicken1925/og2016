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
var quest_lists={};
//テストデータ
/*
var quest_lists={ '32c967d3ab': { quest_num: '0', userIDs: [ '0001' ], user_stuIDs: [ '2' ] ,"time":new Date().getTime(),"state":0,"checked":[]},
'32c967d3ac': { quest_num: '0', userIDs: [ '0001','0002' ], user_stuIDs: [ '3','22'] ,"time":new Date().getTime(),"state":1,"checked":[]},
'32c967d3ad': { quest_num: '1', userIDs: [ '0001','0004' ], user_stuIDs: [ '10','22'] ,"time":new Date().getTime(),"state":0,"checked":[]},
'1234567890': { quest_num: '1', userIDs: [ '0003','0002' ], user_stuIDs: [ '2','3' ] ,"time":new Date().getTime(),"state":0,"checked":[]},
'2345678901': { quest_num: '0', userIDs: [ '0002' ], user_stuIDs: [ '4' ] ,"time":new Date().getTime(),"state":0,"checked":[]}
}
*/

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
var skill_data = JSON.parse(fs.readFileSync('skill_data.json', 'utf8'));



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


//今の時間
function nowtime(){
  var d = new Date();
  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var day   = d.getDate();
  var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec ;
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
      //state= 0:メンバー待ち、1:打ち合わせ中、2:結果確認(失敗)、3:実行中、4、結果確認(成功)、5:メンバー待ち時間切れ
      for(var i in quest_lists){
        //console.log(quest_lists[i].userIDs);
        for(var j=0;j<quest_lists[i].userIDs.length;j++){
          //console.log(quest_lists[i].userIDs[j]);
          if(quest_lists[i].userIDs[j]==req.params.user_id){
            /*経過時間関係はここ*/
            if(quest_lists[i].state==0&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >1800){
              quest_lists[i].state=5;
            }
            if(quest_lists[i].state==1&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >60){
              //2はコミュ力による合否判定失敗、作るならここ
              quest_lists[i].state=3;
            }

            //結果を見れるようにする
            if(quest_lists[i].state==3&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >120){
              quest_lists[i].state=4;
            }



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
        var sendjson={};

        //SQL文を書く
        var sql = "SELECT * FROM user_M where cast(uid as unsigned)='"+req.body.uid+"';";
        var query = connection.query(sql);
        var jsonstr=[];
        var students=[];

        query
        //結果用
        .on('result', function(rows) {
          //console.log(rows['password'].replace(/\s+/g, "")+','+req.body.password);
          if(rows['password'].replace(/\s+/g, "")==req.body.password){
            var ip=[];
            var is=[];
            //console.log(rows['item_param']);
            if(rows['item_param']!=null){
              ip=rows['item_param'].split(',');
            }else{
              ip=[0,0,0];
            }
            if(rows['item_skill']!=null){
              is=rows['item_skill'].split(',');
            }else{
              is=[0];
            }

            sendjson={
              id : rows['id'],
              uid : rows['uid'],
              name : rows['name'],
              password : rows['password'],
              faculty : rows['faculty'],
              department : rows['department'],
              money : rows['money'],
              level : rows['level'],
              item_param : ip,
              item_skill : is,
              students : []
            };
            students=[rows['student1'],rows['student2'],rows['student3'],rows['student4'],rows['student5'],rows['student6']];

            jsonstr.push(sendjson);

          }else{
            jsonstr.push({
              message : "error"
            });
          }
        })
        //終
        .on('end', function() {
          //console.log("aaa");
          if(students.length!=0){call_mem();}
        });

        var tt=0;
        function call_mem(){
          students=students.sort();
          for(var i=0;i<6;i++){
                //SQL文を書く
                var sql2 = "SELECT * FROM student_M where id="+students[i]+";";
                //console.log(sql2);
                var query2 = connection.query(sql2);
                query2.on('result', function(rows2) {
                  //console.log(rows2['name']);
                  //console.log(sendjson);
                  sendjson.students.push(
                  {"id":rows2['id'],
                    "name":rows2['name'],
                    "grade":rows2['grade'],
                    "personality":rows2['personality'],
                    "speciality":rows2['speciality'],
                    "skill":[rows2['skill1'],rows2['skill2'],rows2['skill3']],
                    "status":[rows2['logic'],rows2['develop'],rows2['communicate']],
                    "stu_type":rows2['stu_type'],
                  })
                })
                .on('end', function(rows2) {
                  tt++;
                  if(tt==6){
                    res.jsonp(jsonstr);
                  }
                });
            }

            //res.jsonp(jsonstr);
        }





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
          if(quest_lists[i].state==4){
            var cr=calc_reward(req.body.quest_id);
            ret_reward={ "reward_money": cr[0] , "reward_item": cr[1]}
          }else{
            ret_reward={ "reward_money": 0 , "reward_item": 0}
          }
          quest_lists[i].checked.push(req.body.uid);
          if(quest_lists[i].quest_num==0&&quest_lists[i].checked.length>=2){delete quest_lists[i];}
          else if(quest_lists[i].quest_num==1&&quest_lists[i].checked.length>=3){delete quest_lists[i];}
          else if(quest_lists[i].quest_num==2&&quest_lists[i].checked.length>=4){delete quest_lists[i];}
          else if(quest_lists[i].quest_num==3&&quest_lists[i].checked.length>=4){delete quest_lists[i];}
          else if(quest_lists[i].quest_num==4&&quest_lists[i].checked.length>=4){delete quest_lists[i];}
          else if(quest_lists[i].quest_num==5&&quest_lists[i].checked.length>=6){delete quest_lists[i];}
          else if(quest_lists[i].quest_num==6&&quest_lists[i].checked.length>=10){delete quest_lists[i];}
          else if(quest_lists[i].quest_num==7&&quest_lists[i].checked.length>=100){delete quest_lists[i];}
        }
        c++;
      }

      //console.log(quest_lists);
      res.jsonp(ret_reward);

    });



// /cancel_quest というルートを作成する．
//全返答
router.route('/cancel_quest')
// (GET http://localhost:8080/api/cancel_quest)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/cancel_quest)
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
          if(quest_lists[i].state==0){
            //console.log('!!'+quest_lists[i].userIDs.length);
            for(var j=0;j<quest_lists[i].userIDs.length;j++){
              if(quest_lists[i].userIDs[j]==req.body.uid){
                quest_lists[i].userIDs.splice(i,1);
                quest_lists[i].user_stuIDs.splice(i,1);
                ret_reward={ message : "success"};
                break;
              }
            }
            //残り誰もいなかったら削除
            if(quest_lists[i].userIDs.length==0){
              delete quest_lists[i];
            }
          }else{ret_reward={ message : "error_done"};}
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
      for(var i=0;i<req.body.history.length;i++){
        if(req.body.history[i]==0||req.body.history[i]==1){
          normal++;
        }
      }
      var rare_p=30;
      rare_p=rare_p+normal*15;
      var rand = Math.floor( Math.random() * 100 ) ;

      var rare=false;
      if(rand<rare_p){
        rare=true;
      }
      //console.log(rare+','+rare_p+','+rand);
      //console.log(gen_student);

      var add_type,add_name,add_skill,add_personality,add_speciality;
      if(rare==true){
        add_type=Math.floor( Math.random() * 21 ) + 2;
        add_name=gen_student.gen[add_type].name;
        add_skill=gen_student.gen[add_type].skill;
        add_personality=6;
      }else{
        add_type=Math.floor( Math.random() * 2 );
        add_name=gen_student.gen[add_type].name[Math.floor( Math.random() * 50 )];
        add_skill=skill_data.skills[Math.floor( Math.random() * 34 )].id;
        add_personality=Math.floor( Math.random() * 6 );
      }
      if(req.body.faculty=='宇宙'){
        add_speciality=Math.floor( Math.random() * 9 );
      }else if(req.body.faculty=='バイオ'){
        add_speciality=Math.floor( Math.random() * 9 );
        if(add_speciality>=6){add_speciality+=3}
      }else if(req.body.faculty=='ロボ'){
        add_speciality=Math.floor( Math.random() * 9 );
        if(add_speciality>=6){add_speciality+=6}
      }else{
        add_speciality=Math.floor( Math.random() * 15 );
      }
      //console.log(add_type+','+add_name+','+add_skill+','+add_personality);



      //SQL文を書く
      connection.query('insert into student_M set ?',
                       {name:add_name,
                       grade:0,
                       personality:add_personality,
                       speciality:add_speciality,
                       logic:Math.ceil(gen_student.gen[add_type].status[0]*((req.body.level/10)+1)),
                       develop:Math.ceil(gen_student.gen[add_type].status[1]*((req.body.level/10)+1)),
                       communicate:Math.ceil(gen_student.gen[add_type].status[2]*((req.body.level/10)+1)),
                       skill1:add_skill,
                       skill2:0,
                       skill3:0,
                       history_lab:req.body.uid,
                       stu_type:add_type,
                       insertDate:nowtime(),
                       updateDate:nowtime(),
                       deleteFlag:0
                       },
        function(error,results,fields){
          if (error) throw error;
          var n=parseInt(req.body.s_num, 10)+1;
          //console.log(n);
          var insertable=[];
          var tt=0;

          var sql2 = "SELECT * FROM user_M where cast(uid as unsigned)='"+req.body.uid+"';";
          //console.log(sql2);
          var query2 = connection.query(sql2);
          query2.on('result', function(rows2) {
            for(var i=1;i<=6;i++){
              if(rows2['student'+i]==0){insertable.push(i);}
              //console.log(rows2['student'+i]);
            }
          })
          .on('end', function(rows2) {
              if(insertable.length!=0){
                //console.log(Math.min.apply(null,insertable));
                query_='update user_M set student'+Math.min.apply(null,insertable)+' = '+results.insertId+' where uid='+req.body.uid;
                //console.log(query_);
                connection.query(query_);
              }
          });


          //console.log(gen_student.gen[add_type].info);

          res.jsonp({
            "id":results.insertId, //db追加
            "name":add_name, //random
            "grade":0,
            "personality":add_personality, //random
            "speciality":add_speciality, //random
            "skill":[add_skill,0,0], //random
            "journal_pos":[0,0,0,0,0,0,0,0],//所持している論文の種類
            "journal_pub":0,
            "journal_t":0,//ジャーナル生成時間
            "status":[Math.ceil(gen_student.gen[add_type].status[0]*((req.body.level/10)+1)),Math.ceil(gen_student.gen[add_type].status[1]*((req.body.level/10)+1)),Math.ceil(gen_student.gen[add_type].status[2]*((req.body.level/10)+1))], //random
            "pic":gen_student.gen[add_type].pic, //idより
            "course_t":0,
            "collabo":0,
            "stu_type":add_type, //random?
            "info":gen_student.gen[add_type].info //生徒info
        });
      });

    });




// /gradu というルートを作成する．
//全返答
router.route('/gradu')
// (GET http://localhost:8080/api/gradu)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/gradu)
    .post(function(req, res) {
      //console.log(req.body.uid);
      //console.log(req.body.sid);

      var nn=0;
      var sql2 = "SELECT * FROM user_M where cast(uid as unsigned)='"+req.body.uid+"';";
      //console.log(sql2);
      var query2 = connection.query(sql2);
      query2.on('result', function(rows2) {
        for(var i=1;i<=6;i++){
          if(rows2['student'+i]==req.body.sid){nn=i}
          //console.log(rows2['student'+i]);
        }
      })
      .on('end', function(rows2) {
        //console.log(nn);
        query_='update user_M set student'+nn+'=0 where uid='+req.body.uid;
        //console.log(query_);
        connection.query(query_);
      });

      for(var i=1;i<=6;i++){
        query_='update user_M set student'+i+' = 0 where uid='+req.body.uid+' and student'+i+'='+req.body.sid;
        //console.log(query_);
        connection.query(query_);
      }

      //console.log(quest_lists);
      res.jsonp({message:"ok"});

    });




// /save というルートを作成する．
//全返答
router.route('/save')
// (GET http://localhost:8080/api/save)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/save)
    .post(function(req, res) {
      //console.log(req.body);
      var sql="";
      sql="UPDATE user_M SET ";
      sql+="money= "+req.body.money+",";
      sql+="level= "+req.body.level+",";
      sql+="save_t= "+req.body.save_t+",";
      sql+="item_param= '"+req.body.item_param.join()+"',";
      sql+="item_skill= '"+req.body.item_skill.join()+"',";
      sql+="updateDate=NOW() ";
      sql+="where uid= "+req.body.uid+";";
      //console.log(sql);

      //SQL文を書く
      connection.query(sql,
        function(error,results,fields){
          if (error) throw error;
        });

      for(var i=0;i<req.body.students.length;i++){
        var sql2="";
        sql2="UPDATE student_M SET ";
        sql2+="grade= "+req.body.students[i].grade+",";
        sql2+="skill1= "+req.body.students[i].skill[0]+",";
        sql2+="skill2= "+req.body.students[i].skill[1]+",";
        sql2+="skill3= "+req.body.students[i].skill[2]+",";
        sql2+="logic= "+req.body.students[i].status[0]+",";
        sql2+="develop= "+req.body.students[i].status[1]+",";
        sql2+="communicate= "+req.body.students[i].status[2]+",";
        sql2+="updateDate=NOW() ";
        sql2+="where id= "+req.body.students[i].id+";";
        //console.log(sql);
        //SQL文を書く
        connection.query(sql2,
          function(error,results,fields){
            if (error) throw error;
          });
      }


      //console.log(quest_lists);
      res.jsonp({message:"ok"});

    });







// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);


