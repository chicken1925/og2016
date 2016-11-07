<!--

//接続に時間がかかるため、returnしても値がnullのまま返されてしまう
//waitを設けるか、値がセットされてから返す方法があればいいのだが、わからん

var gen_stu_data={};
$(function() {
  $.getJSON("gen_student.json" , function(data) {
    gen_stu_data=data;
  });
});

//共同研究リスト
var quest_list_val; //値を返す時用の変数
function quest_list_api(uid,d_){
	var url_='http://153.126.164.52:8080/api/questlist/'+uid;
		$.ajax({
			url: url_,
			type:'GET',
			dataType: 'jsonp',
			timeout:800,
			success: function(data) {
				quest_list_val=data;
				d_.resolve();
				//console.log(data);
			},
			error: function(data) {
				quest_list_val="ng";
				console.log(data);
				d_.resolve();
			}
		});

}

//共同研究開催
var hold_val; //値を返す時用の変数
function hold_quest_api(quest_num_,qtitle_,sdata_,d_){
	//console.log(sdata_);
	var url_='http://153.126.164.52:8080/api/hold/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					quest_num: quest_num_,
					qtitle: qtitle_,
					sdata: sdata_
				},
				success: function(data) {
					hold_val=data.message;
					//console.log(data);
					d_.resolve();

				},
				error: function(data) {
					hold_val="ng"
					console.log(data);
					d_.resolve();
				}
			});
}

//ログイン
var login_val; //値を返す時用の変数
function login_api(uid_,password_,d_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/login/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_,
					password: password_
				},
				success: function(data) {
					if(data[0].message!="error"){
						test_user.uid=data[0].uid;
						test_user.name=data[0].name.replace(/\s+/g, "");
						test_user.password=data[0].password.replace(/\s+/g, "");
						test_user.faculty=data[0].faculty.replace(/\s+/g, "");
						test_user.department=data[0].department.replace(/\s+/g, "");
						test_user.money=data[0].money;
						test_user.level=data[0].level;
						test_user.item_param=data[0].item_param;
						test_user.item_skill=data[0].item_skill;
						test_user.save_t=data[0].save_t;
						test_user.respawn_t=data[0].respawn_t;

						//test_user.item_param=[100,7,120];
						//test_user.item_skill=[111,522,241,521,412,131];

						test_students.students.splice(0,test_students.students.length);
						for(var i=0;i<data[0].students.length;i++){
							test_students.students.push(
							{
								"id":data[0].students[i].id,
					            "name":data[0].students[i].name,
					            "grade":data[0].students[i].grade,
					            "personality":data[0].students[i].personality,
					            "speciality":data[0].students[i].speciality,
					            "skill":data[0].students[i].skill,
					            "journal_pos":[0,0,0,0,0,0,0,0],//所持している論文の種類
					            "journal_pub":0, //論文出した数
					            "journal_t":0,//ジャーナル生成時間
					            "status":data[0].students[i].status,
					            "course_t":data[0].students[i].course_t,
					            "collabo":-1,
					            "stu_type":data[0].students[i].stu_type,
							});
						}
						login_val="ok";
					}else{
						login_val="ng";
					}

					console.log(data);
					//hold_val=data.message;
					d_.resolve();

				},
				error: function(data) {
					login_val="ng"
					console.log(data);
					d_.resolve();
				}
			});
}


//共同研究検索
var quest_search_val; //値を返す時用の変数
function quest_search_api(uid,quest_id,d_){
	if(quest_id!=""){
		var url_='http://153.126.164.52:8080/api/questsearch/'+quest_id;
		$.ajax({
			url: url_,
			type:'GET',
			dataType: 'jsonp',
			timeout:800,
			success: function(data) {
				if(data.message!="noquest"){
					var hantei=false;
					for(var i=0;i<data.users.length;i++){
						if(data.users[i].id==uid){
							hantei=true;
						}
					}
					if(hantei==false){
						if(data.state!=0){
							quest_search_val={ message : "over"};
						}else{
							quest_search_val=data;
						}
					}else{
						quest_search_val={ message : "mine"};
					}
				}else{
					quest_search_val=data;
				}
				d_.resolve();
				//senddata=data;
				//console.log(data);
				//return data;
			},
			error: function(data) {
				quest_search_val="ng";
				console.log(data);
				d_.resolve();
			}
		});
	}else{
		quest_search_val={ message : "noquest"};
	}

}


//クエスト参加
var join_request_val; //値を返す時用の変数
function join_request_api(quest_id_,sdata_,d_){
	//console.log(sdata_);
	var url_='http://153.126.164.52:8080/api/join_request/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					quest_id: quest_id_,
					sdata: sdata_
				},
				success: function(data) {

					//console.log(data);
					join_request_val=data;
					d_.resolve();

				},
				error: function(data) {
					join_request_val="ng"
					console.log(data);
					d_.resolve();

				}
			});
}



//クエスト確認
var check_quest_val; //値を返す時用の変数
function check_quest_api(uid_,quest_id_,d_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/check_quest/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_,
					quest_id: quest_id_
				},
				success: function(data) {
					//console.log(data);
					check_quest_val=data;
					d_.resolve();

				},
				error: function(data) {
					check_quest_val="ng"
					console.log(data);
					d_.resolve();
				}
			});
}


//クエストキャンセル
var cancel_quest_val; //値を返す時用の変数
function cancel_quest_api(uid_,quest_id_,d_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/cancel_quest/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_,
					quest_id: quest_id_
				},
				success: function(data) {

					//console.log(data);
					cancel_quest_val=data;
					d_.resolve();

				},
				error: function(data) {
					cancel_quest_val="ng"
					console.log(data);
					d_.resolve();
				}
			});
}


//クエスト生徒データ更新
var alter_stu_val; //値を返す時用の変数
function alter_stu_api(sdata_l_){
	//console.log(sdata_l_);
	var url_='http://153.126.164.52:8080/api/alter_stu/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					sdata_l: sdata_l_
				},
				success: function(data) {
					//console.log(data);
					alter_stu_val=data;

				},
				error: function(data) {
					alter_stu_val="ng"
					console.log(data);
				}
			});
}


//生徒ガチャ
var add_stu_val; //値を返す時用の変数
function add_stu_api(uid_,history_,level_,faculty_,d_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/add_stu/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_,
					history: history_,
					level: level_,
					s_num: test_students.students.length,
					faculty: faculty_
				},
				success: function(data) {

					//console.log(data);
					add_stu_val=data;
					d_.resolve();
				},
				error: function(data) {
					add_stu_val="ng"
					console.log(data);
					d_.resolve();
				}
			});
}


//卒業
var gradu_val; //値を返す時用の変数
function gradu_api(uid_,sid_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/gradu/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_,
					sid: sid_
				},
				success: function(data) {

					console.log(data);
					gradu_val=data;

				},
				error: function(data) {
					gradu_val="ng"
					console.log(data);
				}
			});
}


//イベント参加
var join_event_val; //値を返す時用の変数
function join_event_api(uid_,uname_,fac_,regi_n_,sid_,sname_,st_,d_){
	//console.log(dep_);
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/join_event/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_,
					uname: uname_,
					faculty: fac_,
					regi_n: regi_n_,
					sid: sid_,
					sname: sname_,
					status: st_
				},
				success: function(data) {

					join_event_val=data;
					d_.resolve();

				},
				error: function(data) {
					join_event_val="ng"
					console.log(data);
					d_.resolve();
				}
			});
}




//イベントチェック(GET)
var event_check_val; //値を返す時用の変数
function event_check_api(uid_,d_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/event_check/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_
				},
				success: function(data) {
					event_check_val=data;
					//console.log(data);
					d_.resolve();
				},
				error: function(data) {
					event_check_val="ng"
					console.log(data);
					d_.resolve();
				}
			});
}








//セーブ
var save_val; //値を返す時用の変数
function save_api(ud_,sd_){
	//console.log(sd_);
	sendjson={
		"id" : ud_.id,
	    "uid" : ud_.uid,
	    "money" : ud_.money,
	    "level" : ud_.level,
	    "save_t": new Date().getTime(),
	    "item_param": ud_.item_param,
	    "item_skill": ud_.item_skill,
	    "respawn_t": ud_.respawn_t,
	    "students" : []
	};
	for(var i=0;i<sd_.students.length;i++){
		sendjson.students.push({
			"id":sd_.students[i].id,
			"grade":sd_.students[i].grade,
			"skill":sd_.students[i].skill,
			"status":sd_.students[i].status,
	    	"course_t": sd_.students[i].course_t
		});
	}

	var url_='http://153.126.164.52:8080/api/save/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: sendjson,
				success: function(data) {
					console.log(data);
					gradu_val=data;
				},
				error: function(data) {
					gradu_val="ng"
					console.log(data);
				}
			});
}




//現在のステート
var now_state_val; //値を返す時用の変数
function now_state_api(d_){
	var url_='http://153.126.164.52:8080/api/now_state/';
		$.ajax({
			url: url_,
			type:'GET',
			dataType: 'jsonp',
			timeout:800,
			success: function(data) {
				now_state_val=data;
				console.log(data);
					d_.resolve();
			},
			error: function(data) {
				now_state_val="ng";
				console.log(data);
					d_.resolve();
			}
		});

}




