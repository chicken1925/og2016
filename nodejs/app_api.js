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

// サーバー実装の前に、エラーハンドリングを記載します。
// とりあえず落ちなくなるらしい
process.on('uncaughtException', function(err) {
    console.log(err+"!!!");
});



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



//現在状態
var now_state_num=0;
var now_message='none';


//共同研究リストjsonデータ
var quest_lists={};
//テストデータ
/*
quest_lists={ '32c967d3ab': {
  quest_num: '1',
  qtitle: 'アポロ計画について調べよう!',
  users:
   [ { id: '  0002    ',
       u_name: 'user02',
       stu_id: '109',
       stu_name: '片寄18',
       status: [12,12,30],
       speciality: '7',
       skill: undefined },
     { id: '  0004    ',
       u_name: 'user04',
       stu_id: '10',
       stu_name: '  木村  ',
       status: [12,12,22],
       speciality: '10',
       skill: [2] },
     { id: '  0007    ',
       u_name: 'user07',
       stu_id: '19',
       stu_name: '  藤田  ',
       status: [12,12,12],
       speciality: '14',
       skill: [3] } ],
  time: 1477845186375,
  state: 1,
  checked: [] }
};
*/

//大成功リストjsonデータ
var great_data={
  "q1": [[0],[0],[0],[0]],
  "q2": [[0],[0],[0],[0],[0],[0]],
  "q3": [[0],[0],[0],[0],[0],[0]],
  "q4": [[0],[0],[0],[0],[0],[0]],
  "q5": [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],
};
var great_data_json=[];


//イベント参加者jsonデータ
var participants_list=[];
//イベントjsonデータ
var event_data={
  "event0":{
    "event_name":"第1回 Enterteinment Computing",
    "reward_num":[3,5,10],
    "reward_money":[10000000,5000000,1000000],
    "reward_member":{}
  },
  "event1":{
    "event_name":"第2回 Enterteinment Computing",
    "reward_num":[3,5,10],
    "reward_money":[10000000,5000000,1000000],
    "reward_member":{}
  },
  "event2":{
    "event_name":"第3回 Enterteinment Computing",
    "reward_num":[3,5,10],
    "reward_money":[10000000,5000000,1000000],
    "reward_member":{}
  }
};





//ユニーク文字列生成
function getUniqueStr(myStrong){
    var strong = 1000;
    if (myStrong) strong = myStrong;
    var tt = new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16);
    var tt_=tt.slice(-8);
    //console.log(tt_);
    return tt_;
}

//json読み込み
var fs = require('fs');
var gen_student = JSON.parse(fs.readFileSync('gen_student.json', 'utf8'));
var skill_data = JSON.parse(fs.readFileSync('skill_data.json', 'utf8'));
var que_data = JSON.parse(fs.readFileSync('quest_data.json', 'utf8'));


//報酬計算式
function calc_reward(quest,id){
  //console.log(quest);
  var basic_reward_money=0;
  var basic_reward_item=[0,0,0];
  var status_reward_money=0;
  var status_reward_item=[0,0,0];
  var great_reward_money=0;

  //基礎報酬
  basic_reward_money=que_data.quests[quest.quest_num].money;
  if(quest.quest_num==2){
    var rr=Math.floor( Math.random() * 3 );
    basic_reward_item[rr]=1;
  }else{
    basic_reward_item=que_data.quests[quest.quest_num].item;
  }

  //準備
  var st_all=[0,0,0];
  var sk_all=[0,0]; //お金UP,アイテムUP
  var spe_list=[];

  for(var i=0;i<quest.users.length;i++){
    st_all[0]+=parseInt(quest.users[i].status[0],10);
    st_all[1]+=parseInt(quest.users[i].status[1],10);
    st_all[2]+=parseInt(quest.users[i].status[2],10);
    if(quest.users[i].skill!=undefined){
      for(var j=0;j<quest.users[i].skill.length;j++){
        if(quest.users[i].skill[j]==2){sk_all[0]++;}
        if(quest.users[i].skill[j]==3){sk_all[1]++;}
      }
    }
    spe_list.push(parseInt(Math.floor(quest.users[i].speciality/3),10))
  }


  //ステ報酬
  var tt=st_all[0]+st_all[1]+st_all[2];
  status_reward_money=Math.ceil(basic_reward_money*(tt/250)*(1+(sk_all[0]*0.2)));
  for(var i=0;i<sk_all[1];i++){
    var tt2=Math.floor( Math.random() * 3 );
    basic_reward_item[tt2]++;
  }

  //大成功報酬
  spe_list.sort();
  //console.log(spe_list);
  for(var i=0;i<que_data.quests[quest.quest_num].combination.length;i++){
    if(que_data.quests[quest.quest_num].combination[i].toString()==spe_list.toString()){
      var check=false;
      for(var j=0;j<great_data.q1[i].length;j++){
        if(great_data.q1[i][j]==id){check=true;}
      }

      if(quest.quest_num==1){if(check==false){great_data.q1[i].push(id); great_data_json.push(quest);} great_reward_money=1000000*(1/(great_data.q1[i].length-1));}
      if(quest.quest_num==2){if(check==false){great_data.q2[i].push(id); great_data_json.push(quest);} great_reward_money=5000000*(1/(great_data.q2[i].length-1));}
      if(quest.quest_num==3){if(check==false){great_data.q3[i].push(id); great_data_json.push(quest);} great_reward_money=5000000*(1/(great_data.q3[i].length-1));}
      if(quest.quest_num==4){if(check==false){great_data.q4[i].push(id); great_data_json.push(quest);} great_reward_money=5000000*(1/(great_data.q4[i].length-1));}
      if(quest.quest_num==5){if(check==false){great_data.q5[i].push(id); great_data_json.push(quest);} great_reward_money=10000000*(1/(great_data.q5[i].length-1));}

    }
  }
  great_reward_money=Math.ceil(great_reward_money);
  //console.log(great_data);



  var reword_json={
              "b_reward_m": basic_reward_money,
              "b_reward_i": basic_reward_item,
              "s_reward_m": status_reward_money,
              "s_reward_i": status_reward_item,
              "g_reward_m": great_reward_money
            };

  return [reword_json];
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
        //console.log(req.body.sdata);

        var key=getUniqueStr();
        quest_lists[key]={"quest_num":req.body.quest_num,"qtitle":req.body.qtitle,"users":[req.body.sdata],"time":new Date().getTime(),"state":0,"checked":[]};
        //quest_lists[key].user_stuIDs.push("100");

        //console.log(quest_lists);
        //console.log(req.body.sdata);

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
        //console.log(quest_lists[i]);
        for(var j=0;j<quest_lists[i].users.length;j++){
          //console.log(quest_lists[i].users[j]);
          if(quest_lists[i].users[j].id==req.params.user_id){
            /*経過時間関係はここ*/
            if(quest_lists[i].state==0&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >1800){
              quest_lists[i].state=5;
            }
            if(quest_lists[i].state==1&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >=30){
              //2はコミュ力による合否判定失敗(state=2)
              var sum_com=0;
              for(var k=0;k<quest_lists[i].users.length;k++){
                sum_com+=parseInt(quest_lists[i].users[k].status[2],10);
              }
              if(sum_com<que_data.quests[quest_lists[i].quest_num].need_com){
                quest_lists[i].state=2;
              }else{
                quest_lists[i].state=3;
              }
            }
            //結果を見れるようにする
            if(quest_lists[i].state==3&&Math.round((new Date().getTime()-quest_lists[i].time)/1000) >=((que_data.quests[quest_lists[i].quest_num].time*60)+30)){
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
        res.jsonp(ret_quest);

    })
// (POST http://localhost:8080/api/questlist)
    .post(function(req, res) {

    });


// /login というルートを作成する．
//全返答
router.route('/login')
// (GET http://localhost:8080/api/login)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/login)
    .post(function(req, res) {
        //console.log(req.body.uid);
        //console.log(req.body.password);
        var sendjson={};

        //SQL文を書く
        //var sql = "SELECT * FROM user_M where cast(uid as unsigned)='"+req.body.uid+"';";
        var sql = "SELECT * FROM user_M where uid='"+req.body.uid+"';";
        var query = connection.query(sql);
        var jsonstr=[];
        var students=[];

        query
        //結果用
        .on('result', function(rows) {
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
              save_t : rows['save_t'],
              respawn_t : rows['respawn_t'],
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
          students.sort(function(a,b){
                  if( a < b ) return -1;
                  if( a > b ) return 1;
                  return 0;
          });
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
                    "course_t" : rows2['course_t'],
                    "respawn_t" : rows2['respawn_t']
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
        if(quest_lists[i].state==0){
          if(Math.round((new Date().getTime()-quest_lists[i].time)/1000) <=1800){
            if(i==req.params.questid){
              ret_quest=quest_lists[i];
            }
          }
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
      //console.log(req.body.sdata);
      //console.log(req.body.join_stu);
      //console.log(req.body.quest_id);


      //questnumのquestを検索+足す
      var c=0;
      for(var i in quest_lists){
        //console.log(quest_lists[i].userIDs);
        var ret_ms="done";
        if(i==req.body.quest_id){
          //console.log(req.body.sdata);
          /*参加人数関係はここ*/
          for(var j=0;j<que_data.quests.length;j++){
            if(quest_lists[i].quest_num==j){
              if(quest_lists[i].users.length<que_data.quests[j].person_num){
                quest_lists[i].users.push(req.body.sdata);
                if(quest_lists[i].users.length>=que_data.quests[j].person_num){
                  quest_lists[i].state=1;
                  quest_lists[i].time=new Date().getTime();
                }
                break;
              }else{
                ret_ms="over";
              }
            }
          }

        }
        c++;
      }

      //console.log(quest_lists);
      res.jsonp({ message: ret_ms});

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
          /*報酬関係はここ*/
          if(quest_lists[i].state==4){
            //console.log("!!");
            ret_reward=quest_lists[i];
            ret_reward = JSON.stringify(quest_lists[i]); // JSON文字列化
            ret_reward = JSON.parse(ret_reward); // JSON文字列化したものを戻す
            ret_reward.cr=calc_reward(quest_lists[i],i)[0];
            //ret_reward=calc_reward(quest_lists[i],i)[0];
          }else{
            ret_reward=quest_lists[i];
            ret_reward = JSON.stringify(quest_lists[i]); // JSON文字列化
            ret_reward = JSON.parse(ret_reward); // JSON文字列化したものを戻す
            ret_reward.cr={
              "b_reward_m": 0,
              "b_reward_i": [0,0,0],
              "s_reward_m": 0,
              "s_reward_i": [0,0,0],
              "g_reward_m": 0
            };
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

          if(quest_lists[i].state==2&&quest_lists[i].checked.length>=quest_lists[i].users.length){delete quest_lists[i];}
          if(quest_lists[i].state==5&&quest_lists[i].checked.length>=quest_lists[i].users.length){delete quest_lists[i];}

        }
        c++;
      }
      //console.log("aaaa");
      //console.log(ret_reward);
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
            for(var j=0;j<quest_lists[i].users.length;j++){
              if(quest_lists[i].users[j].id==req.body.uid){
                quest_lists[i].users.splice(j,1);
                ret_reward={ message : "success"};
                break;
              }
            }
            //残り誰もいなかったら削除
            if(quest_lists[i].users.length==0){
              delete quest_lists[i];
            }
          }else{ret_reward={ message : "error_done"};}
        }
        c++;
      }

      //console.log(quest_lists);
      res.jsonp(ret_reward);

    });



// /alter_stu というルートを作成する．
//全返答
router.route('/alter_stu')
// (GET http://localhost:8080/api/alter_stu)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/alter_stu)
    .post(function(req, res) {
      //console.log(req.body.sdata_l);
      var ret_reward={ message : "ok"};
      if(req.body.sdata_l!=undefined){
        for(var j=0;j<req.body.sdata_l.length;j++){
          for(var i in quest_lists){
            if(i==req.body.sdata_l[j].qid){
              for(var k=0; k<quest_lists[i].users.length;k++){
                if(quest_lists[i].users[k].stu_id==req.body.sdata_l[j].stu_id){
                  quest_lists[i].users[k].status=req.body.sdata_l[j].status;
                  quest_lists[i].users[k].skill=req.body.sdata_l[j].skill;
                }
              }
            }
          }
        }

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
        add_type=Math.floor( Math.random() * 19 ) + 2;
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
                       course_t:new Date().getTime(),
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

          var sql2 = "SELECT student1,student2,student3,student4,student5,student6 FROM user_M where uid='"+req.body.uid+"';";
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
                query_='update user_M set student'+Math.min.apply(null,insertable)+' = '+results.insertId+' where uid="'+req.body.uid+'"';
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
            "course_t":new Date().getTime(),
            "collabo":0,
            "stu_type":add_type, //random?
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
      var sql2 = "SELECT student1,student2,student3,student4,student5,student6 FROM user_M where uid='"+req.body.uid+"';";
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
        query_='update user_M set student'+nn+'=0 where uid="'+req.body.uid+'"';
        //console.log(query_);
        connection.query(query_);
      });

      for(var i=1;i<=6;i++){
        query_='update user_M set student'+i+' = 0 where uid="'+req.body.uid+'" and student'+i+'='+req.body.sid;
        //console.log(query_);
        connection.query(query_);
      }

      //console.log(quest_lists);
      res.jsonp({message:"ok"});

    });












// /join_event というルートを作成する．
//全返答
router.route('/join_event')
// (GET http://localhost:8080/api/join_event)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/join_event)
    .post(function(req, res) {
      //console.log(req.body.uid);

      var regi_n_=req.body.regi_n;
      var ret_message={ message : "ng"};
      var find_id='';
      var found=false;
      //console.log(regi_n_);

      if(regi_n_==-2){ //削除
        for(var i=0;i<participants_list.length;i++){
          if(participants_list[i].uid==req.body.uid){
            participants_list.splice(i,1);
          }
        }
        ret_message={"regi_n":regi_n_,"sid":sid_};
      }else if(regi_n_==-3){ //login時確認
        var sid_=0;
        for(var i=0;i<participants_list.length;i++){
          if(participants_list[i].uid==req.body.uid){
            sid_=participants_list[i].sid;
            regi_n_=participants_list[i].regi_n;
          }
        }
        ret_message={"regi_n":regi_n_,"sid":sid_};
      }else{
        for(var i=0;i<participants_list.length;i++){
          if(participants_list[i].uid==req.body.uid){
            find_id=i;
            found=true;
          }
        }
        if(found==false){
          //追加
          participants_list.push({"uid":req.body.uid,"uname":req.body.uname,"faculty":req.body.faculty,"regi_n":req.body.regi_n,"sid":req.body.sid,"sname":req.body.sname,"status":req.body.status});
        }else{
          if(regi_n_==-1){
            //確認
            participants_list[find_id].status=req.body.status;
            regi_n_=participants_list[find_id].regi_n;
          }else{
            //更新
            participants_list[find_id].regi_n=regi_n_;
            participants_list[find_id].sid=req.body.sid;
            participants_list[find_id].sname=req.body.sname;
            participants_list[find_id].status=req.body.status;
          }
        }
        ret_message={"regi_n":regi_n_,"sid":sid_};
      }
      

      //console.log(quest_lists);
      res.jsonp(ret_message);

    });


// /event_check というルートを作成する．
//全返答
router.route('/event_check')
// (GET http://localhost:8080/api/event_check)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/join_event)
    .post(function(req, res) {
      //console.log(req.body.uid);
      //console.log(req.body.sid);
      var rw_datas=[{},{},{}];

      var c=0;
      for(var i in event_data){
        if(event_data[i].reward_member.length!=0){
          for(var j=0;j<event_data[i].reward_member.length;j++){
            if(event_data[i].reward_member[j].uid.replace(/\s+/g, "")==req.body.uid.replace(/\s+/g, "")){
              var r= JSON.stringify(event_data[i].reward_member[j]); // JSON文字列化
              r = JSON.parse(r); // JSON文字列化したものを戻す
              rw_datas.splice(c,1,r);
              event_data[i].reward_member[j].checked=1;
            }
          }
        }
        c++;
      }
      //console.log(rw_datas);

      var ret_message={
        "event_name":[event_data.event0.event_name,event_data.event1.event_name,event_data.event2.event_name],
        "reward_num":[event_data.event0.reward_num,event_data.event1.reward_num,event_data.event2.reward_num],
        "reward_money":[event_data.event0.reward_money,event_data.event1.reward_money,event_data.event2.reward_money],
        "reward_m":rw_datas,
        "now_state":now_state_num
      }

      res.jsonp(ret_message);

    });















// /save というルートを作成する．
//全返答
router.route('/save')
// (GET http://localhost:8080/api/save)
    .get(function(req, res) {

    })
// (POST http://localhost:8080/api/save)
    .post(function(req, res) {
      //console.log(req.body.save_t);
      var sql="";
      sql="UPDATE user_M SET ";
      sql+="money= "+req.body.money+",";
      sql+="level= "+req.body.level+",";
      sql+="save_t= "+req.body.save_t+",";
      sql+="item_param= '"+req.body.item_param.join()+"',";
      sql+="item_skill= '"+req.body.item_skill.join()+"',";
      sql+="respawn_t= '"+req.body.respawn_t+"',";
      sql+="updateDate=NOW() ";
      sql+="where uid= '"+req.body.uid+"';";
      //console.log(sql);

      //SQL文を書く
      connection.query(sql,
        function(error,results,fields){
          if (error) throw error;
        });

      if(req.body.students!=undefined){
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
          sql2+="course_t= "+req.body.students[i].course_t+",";
          sql2+="updateDate=NOW() ";
          sql2+="where id= "+req.body.students[i].id+";";
          //SQL文を書く
          connection.query(sql2,
            function(error,results,fields){
              if (error) throw error;
            });
        }
      }


      //console.log(quest_lists);
      res.jsonp({message:"ok"});

    });




// /now_state というルートを作成する．
//全返答
router.route('/now_state')
// (GET http://localhost:8080/api/hold)
    .get(function(req, res) {
      ret_json={
        now_state: now_state_num,
        message: now_message
      };

      res.jsonp(ret_json);
    })
// (POST http://localhost:8080/api/hold)
    .post(function(req, res) {
        //console.log(req.body.uid);
        //console.log(req.body.quest_num);
        //console.log(req.body.sdata);
      now_state_num=req.body.set_now_state;
      now_message=req.body.set_now_message;

      ret_json={
        now_state: now_state_num,
        message: now_message
      };

      res.jsonp(ret_json);

    });









//以下、マスタ画面用
// /m_questlist というルートを作成する．
router.route('/m_questlist')
// (GET http://localhost:8080/api/m_questlist)
    .get(function(req, res) {
      res.jsonp(quest_lists);
    })
// (POST http://localhost:8080/api/m_questlist)
    .post(function(req, res) {
    });

// /m_questlist というルートを作成する．
router.route('/m_greatdata')
// (GET http://localhost:8080/api/m_greatdata)
    .get(function(req, res) {
      res.jsonp(great_data);
    })
// (POST http://localhost:8080/api/m_greatdata)
    .post(function(req, res) {
    });

// /m_partisipantlist というルートを作成する．
router.route('/m_participantlist')
// (GET http://localhost:8080/api/m_participantlist)
    .get(function(req, res) {
      res.jsonp(participants_list);
    })
// (POST http://localhost:8080/api/m_participantlist)
    .post(function(req, res) {
    });

// /m_setevent というルートを作成する．
router.route('/m_setevent')
// (GET http://localhost:8080/api/m_questlist)
    .get(function(req, res) {
      res.jsonp(event_data);
    })
// (POST http://localhost:8080/api/m_questlist)
    .post(function(req, res) {
      ret_json={};
      if(req.body.set_num==0){ //イベント情報セット
        if(req.body.event_num==0){
          event_data.event0.event_name=req.body.event_name;
          event_data.event0.reward_num=req.body.reward_num;
          event_data.event0.reward_money=req.body.reward_money;
          ret_json=event_data.event0;
        }else if(req.body.event_num==1){
          event_data.event1.event_name=req.body.event_name;
          event_data.event1.reward_num=req.body.reward_num;
          event_data.event1.reward_money=req.body.reward_money;
          ret_json=event_data.event1;
        }else if(req.body.event_num==2){
          event_data.event2.event_name=req.body.event_name;
          event_data.event2.reward_num=req.body.reward_num;
          event_data.event2.reward_money=req.body.reward_money;
          ret_json=event_data.event2;
        }

      }else if(req.body.set_num==1){ //報酬者セット
        if(req.body.event_num==0){
          event_data.event0.reward_member=req.body.reward_member;
          ret_json=event_data.event0;
        }else if(req.body.event_num==1){
          event_data.event1.reward_member=req.body.reward_member;
          ret_json=event_data.event1;
        }else if(req.body.event_num==2){
          event_data.event2.reward_member=req.body.reward_member;
          ret_json=event_data.event2;
        }
      }

      res.jsonp(ret_json);
    });

// /m_partisipantlist というルートを作成する．
router.route('/m_greatdatajson/:val')
// (GET http://localhost:8080/api/m_participantlist)
    .get(function(req, res) {
      res.jsonp(great_data_json);
      if(req.params.val==1){
        great_data_json=[];
      }
    })
// (POST http://localhost:8080/api/m_participantlist)
    .post(function(req, res) {
    });

// /m_partisipantlist というルートを作成する．
router.route('/m_delete_participantlist')
// (GET http://localhost:8080/api/m_participantlist)
    .get(function(req, res) {
      participants_list=[];
      res.jsonp(participants_list);
    })
// (POST http://localhost:8080/api/m_participantlist)
    .post(function(req, res) {
    });

// /m_partisipantlist というルートを作成する．
router.route('/m_delete_questdata')
// (GET http://localhost:8080/api/m_participantlist)
    .get(function(req, res) {
    })
// (POST http://localhost:8080/api/m_participantlist)
    .post(function(req, res) {
      for(var i in quest_lists){
        //console.log(i+','+req.body.d_qid);
        if(i==req.body.d_qid){
          delete quest_lists[i];
        }
      }
      res.jsonp(quest_lists);
    });






// /sum_money というルートを作成する．
router.route('/sum_money')
// (GET http://localhost:8080/api/m_questlist)
    .get(function(req, res) {
      //SQL文を書く
        var sql = "SELECT faculty,money FROM user_M;";
        var query = connection.query(sql);
        var sum=[0,0,0];

        query
        //結果用
        .on('result', function(rows) {
          //console.log(rows['password'].replace(/\s+/g, "")+','+req.body.password);
          if(rows['faculty'].replace(/\s+/g, "")=='宇宙'){
            sum[0]+=rows['money'];
          }else if(rows['faculty'].replace(/\s+/g, "")=='バイオ'){
            sum[1]+=rows['money'];
          }else if(rows['faculty'].replace(/\s+/g, "")=='ロボ'){
            sum[2]+=rows['money'];
          }
        })
        //終
        .on('end', function() {
          //console.log("hoge");
        sum[0]=sum[0]+"";
        sum[1]=sum[1]+"";
        sum[2]=sum[2]+"";
          res.jsonp({"sum_money":sum});
        });
    })
// (POST http://localhost:8080/api/m_participantlist)
    .post(function(req, res) {
    });



// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);


