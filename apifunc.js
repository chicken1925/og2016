<!--

//接続に時間がかかるため、returnしても値がnullのまま返されてしまう
//waitを設けるか、値がセットされてから返す方法があればいいのだが、わからん

//共同研究リスト
var quest_list_val; //値を返す時用の変数
function quest_list_api(uid){
	var url_='http://153.126.164.52:8080/api/questlist/'+uid;
		$.ajax({
			url: url_,
			type:'GET',
			dataType: 'jsonp',
			timeout:800,
			success: function(data) {
				quest_list_val=data;

				//senddata=data;
				//console.log(data);
				//return data;
			},
			error: function(data) {
				quest_list_val="ng";
				console.log(data);
			}
		});

}

//共同研究開催
var hold_val; //値を返す時用の変数
function hold_quest_api(uid,quest_num_,stu_num_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/hold/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid,
					quest_num: quest_num_,
					stu_num: stu_num_
				},
				success: function(data) {
					hold_val=data.message;
					//console.log(data);

				},
				error: function(data) {
					hold_val="ng"
					//console.log(data);
				}
			});
}


//ログイン
var login_val; //値を返す時用の変数
function login_api(uid_,password_){
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
						test_user.uid=data[0].uid.replace(/\s+/g, "");
						test_user.name=data[0].name.replace(/\s+/g, "");
						test_user.password=data[0].password.replace(/\s+/g, "");
						test_user.faculty=data[0].faculty.replace(/\s+/g, "");
						test_user.department=data[0].department.replace(/\s+/g, "");
						test_user.money=data[0].money;
						login_val="ok";
					}else{
						login_val="ng";
					}

					console.log(data);
					//hold_val=data.message;

				},
				error: function(data) {
					login_val="ng"
					console.log(data);
				}
			});
}


//共同研究検索
var quest_search_val; //値を返す時用の変数
function quest_search_api(uid,quest_id){
	if(quest_id!=""){
		var url_='http://153.126.164.52:8080/api/questsearch/'+quest_id;
		$.ajax({
			url: url_,
			type:'GET',
			dataType: 'jsonp',
			timeout:800,
			success: function(data) {
				console.log(data);
				if(data.message!="noquest"){
					var hantei=false;
					for(var i=0;i<data.userIDs.length;i++){
						if(data.userIDs[i]==uid){
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

				//senddata=data;
				//console.log(data);
				//return data;
			},
			error: function(data) {
				quest_search_val="ng";
				//console.log(data);
			}
		});
	}else{
		quest_search_val={ message : "noquest"};
	}

}


//クエスト参加
var join_request_val; //値を返す時用の変数
function join_request_api(uid_,join_stu_,quest_id_){
	//console.log(uid,quest_num_,stu_num_);
	var url_='http://153.126.164.52:8080/api/join_request/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:800,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					uid: uid_,
					join_stu: join_stu_,
					quest_id: quest_id_
				},
				success: function(data) {

					console.log(data);
					join_request_val=data;

				},
				error: function(data) {
					join_request_val="ng"
					console.log(data);
				}
			});
}



//クエスト確認
var check_quest_val; //値を返す時用の変数
function check_quest_api(uid_,quest_id_){
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

					console.log(data);
					check_quest_val=data;

				},
				error: function(data) {
					check_quest_val="ng"
					console.log(data);
				}
			});
}


//クエストキャンセル
var cancel_quest_val; //値を返す時用の変数
function cancel_quest_api(uid_,quest_id_){
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

					console.log(data);
					cancel_quest_val=data;

				},
				error: function(data) {
					cancel_quest_val="ng"
					console.log(data);
				}
			});
}


//生徒ガチャ
var add_stu_val; //値を返す時用の変数
function add_stu_api(uid_,history_,level_){
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
					level: level_
				},
				success: function(data) {

					console.log(data);
					add_stu_val=data;

				},
				error: function(data) {
					add_stu_val="ng"
					console.log(data);
				}
			});
}



