<!--

//接続に時間がかかるため、returnしても値がnullのまま返されてしまう
//waitを設けるか、値がセットされてから返す方法があればいいのだが、わからん




function request_api(uid_,req_id_){
	var url_='http://153.126.164.52:3330/api/request/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:1000,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					from_id: uid,
					req_id: req_id_
				},
				success: function(data) {
					var str="";
					console.log(data);
					
					
				},
				error: function(data) {
					console.log("ng");
					console.log(data);
				}
			});
		
		
}


function request_list_api(){
	var url_='http://153.126.164.52:3330/api/request/';
		$.ajax({
				url: url_,
				type:'get',
				dataType: 'json',
				timeout:1000,
				success: function(data) {
					var str="";
					//console.log(data);
					req_jsonval=data;
					
				},
				error: function(data) {
					console.log("ng");
					console.log(data);
				}
			});
		
}


function accept_api(uid_,req_id_){
	var url_='http://153.126.164.52:3330/api/accept/';
	//console.log(uid_+","+req_id_);
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:1000,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					from_id: uid_,
					req_id: req_id_
				},
				success: function(data) {
					var str="";
					//console.log(data);
					acc_jsonval=data;
				},
				error: function(data) {
					console.log("ng");
					console.log(data);
				}
			});
		
		
}


function obtain_api(uid_,req_id_){
	var url_='http://153.126.164.52:3330/api/obtain/';
		$.ajax({
				url: url_,
				type:'post',
				dataType: 'json',
				timeout:1000,
				data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
					from_id: uid_,
					req_id: req_id_
				},
				success: function(data) {
					var str="";
					//console.log(data);
					obt_jsonval=data;
				},
				error: function(data) {
					console.log("ng");
					console.log(data);
				}
			});
		
		
}

//-->