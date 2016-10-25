<!--

var uid=0;
var req_id=0;
var req_jsonval="";
var acc_jsonval="";
var obt_jsonval="";

//初期処理
window.addEventListener("load", function(){
	uid=window.parent.users_jsonval.uid;
	//console.log(uid);
	
	request_List(500);
}, false);


setInterval(function (){
},100)



function test(){
	//サーバーにあげると動く
	console.log(window.parent.money);
	window.parent.money=0;
}

function friend_Request(){
	//console.log(document.forms["req_form"].elements["f_id"].value);
	req_id=document.forms["req_form"].elements["f_id"].value;
	request_api(uid,req_id);
	
	setTimeout(function(){
		request_List(500);
		
	}, 500);
}


function request_List(delay){
	request_list_api();
	$("#req_list").empty();
	$("#req_table").empty();
	$("#req_list").append("wait...");
	
	setTimeout(function(){
		show_request_List();
		
	}, delay);
}
function show_request_List(){
	$("#req_list").empty();
	$("#req_table").empty();
	$("#req_table").append("<tr><th bgcolor=lightpink>状態</th><th bgcolor=lightpink>申請元</th><th bgcolor=lightpink>申請先</th><th bgcolor=lightpink>確認</th></tr>");
	
	//console.log(req_jsonval[1]);
	for(var i=1;i<req_jsonval.length;i++){
		if(req_jsonval[i].from_id_l==window.parent.users_jsonval.uid){
			if(req_jsonval[i].state==0){
				//申請中
				$("#req_table").append("<tr><th bgcolor='#FFFFFF'>申請中</th><th bgcolor='#FFFFFF'>"+req_jsonval[i].from_id_l+"</th><th bgcolor='#ffffff'>"+req_jsonval[i].req_id_l+"</th><th bgcolor='#ffffff'></th></tr>");
			}else if(req_jsonval[i].state==1){
				//受け取り
				$("#req_table").append("<tr><th bgcolor='#FFFFFF'>確認待ち</th><th bgcolor='#FFFFFF'>"+req_jsonval[i].from_id_l+"</th><th bgcolor='#ffffff'>"+req_jsonval[i].req_id_l+"</th><th bgcolor='#ffffff'><input type='button' value='Obtain!' onclick='Obtain_request("+i+")'></th></tr>");
			}
			
		
		}
		if(req_jsonval[i].req_id_l==window.parent.users_jsonval.uid){
			if(req_jsonval[i].state==0){
				//認証待ち
				$("#req_table").append("<tr><th bgcolor='#FFFFFF'>認証待ち</th><th bgcolor='#FFFFFF'>"+req_jsonval[i].from_id_l+"</th><th bgcolor='#ffffff'>"+req_jsonval[i].req_id_l+"</th><th bgcolor='#ffffff'><input type='button' value='Accept!' onclick='Accept_request("+i+")'></th></tr>");
			}else if(req_jsonval[i].state==1){
				//何もなし
				
			}
		}
	}
	
}


function Accept_request(value){
	accept_api(req_jsonval[value].from_id_l,req_jsonval[value].req_id_l);
	setTimeout(function(){
		calc_accept();
	}, 500);
}
function calc_accept(){
	console.log(acc_jsonval);
	//console.log(acc_jsonval.value);
	window.parent.money+=acc_jsonval.value;
	request_List(500);
}


function Obtain_request(value){
	obtain_api(req_jsonval[value].from_id_l,req_jsonval[value].req_id_l);
	setTimeout(function(){
		calc_obtain();
	}, 500);
}
function calc_obtain(){
	console.log(obt_jsonval);
	//console.log(obt_jsonval.value);
	window.parent.money+=obt_jsonval.value;
	request_List(500);
}




//-->