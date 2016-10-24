<!--

var bachelor=1000,master=100,doctor=10;

var myID=0;					//自分のID
var collage=0;				//所属
var laboratory=0;			//研究室
var time=0;					//経過時間
var money=10000;				//所持金
var persec=0;				//毎秒増加数
var key=0;					//鍵の数
var rate=10;				//進学率
var releaseID=[];			//解放済みID

var users_jsonval="";
var money_jsonval="";
var students_jsonval="";


//一番早い
$(document).ready( function(){
loginform();
});

//初期処理
window.addEventListener("load", function(){
	
	
	
	//document.getElementById("bachelor_n").textContent=bachelor+"人";
	//document.getElementById("master_n").textContent=master+"人";
	//document.getElementById("doctor_n").textContent=doctor+"人";
	
	persec=bachelor+master*20+doctor*50;
	document.getElementById("min_m").textContent="¥"+persec+"/秒";
	document.getElementById("all_m").textContent="¥"+money;
	
	document.getElementById("bachelor_n").textContent=bachelor+"人";
	document.getElementById("master_n").textContent=master+"人";
	document.getElementById("doctor_n").textContent=doctor+"人";
	
	//get_api('students','0003');
	
}, false);




setInterval(function (){
	
	//1秒に1人学士増やす
	if(time%10==0){
		calc_student(1,0,0);
	}
	
	//1秒あたりの増加数計算
	
	persec=bachelor+master*8+doctor*70;
	//document.getElementById("min_m").textContent="¥"+persec+"/秒";
	
	
	//money増加(0.1秒毎に増加させるため、persec/10している)
	money+=Math.round(persec/10);
	//document.getElementById("all_m").textContent="¥"+money;
	
	//これを数分毎にすると思う
	/*
	if(money_jsonval!=""){
		money=money_jsonval.all_m;
		persec=money_jsonval.per_m;
	}
	if(students_jsonval!=""){
		bachelor=students_jsonval.bachelor;
		master=students_jsonval.master;
		doctor=students_jsonval.doctor;
	}
	*/
	
	document.getElementById("all_m").textContent="¥"+money;
	document.getElementById("min_m").textContent="¥"+persec+"/秒";
	
	document.getElementById("bachelor_n").textContent=bachelor+"人";
	document.getElementById("master_n").textContent=master+"人";
	document.getElementById("doctor_n").textContent=doctor+"人";
	
	time++;
},100)


//ログインフォーム
function loginform(){
	$("#all_contents").append("<div id='loginbox' class='page_container'></div>");
	$("#loginbox").append("<div id='loginbox_' class='page_container'></div>");
	
	var str="";
	str+='<form id="login_f">';
	str+='<div id="logintitle">-Login-</div>';
	str+='<div class="loginbody" id="l1">ID:</div>';
	str+='<div class="loginbody" id="l2">PASS:</div>';
	str+='<input type="text" value="0003" name="id_n" class="logintext" id="id_t" size="40">';
	str+='<input type="text" value="3333" name="pass_n" class="logintext" id="pass_t" size="40">';
	str+='<input type="button" id="login_button" value="submit!" onclick="loginInit()">';
	str+='</form>';
	$("#loginbox_").append(str);
	
}
function loginInit(){
	//console.log(document.forms["login_f"].elements["id_n"].value);
	
	var login_id = document.forms["login_f"].elements["id_n"].value;
	var login_password = document.forms["login_f"].elements["pass_n"].value;
	//console.log(login_password);
	
	//ログイン後初期処理!!
	get_api('users',login_id);
	get_api('money',login_id);
	get_api('students',login_id);
	//console.log(hogehoge);
	setTimeout(function(){
		loginCheck(login_id,login_password);
		
		if(money_jsonval!=""){
			money=money_jsonval.all_m;
			persec=money_jsonval.per_m;
		}
		if(students_jsonval!=""){
			bachelor=students_jsonval.bachelor;
			master=students_jsonval.master;
			doctor=students_jsonval.doctor;
		}
		
		
	}, 500);
	
	
}

function loginCheck(id_,pass_){
	if(pass_==users_jsonval.password){
		$("#loginbox").fadeOut(200,function(){
		$(this).remove();
		//float_open_flag = 0;
		});
	}else{
		$("#loginbox_").append('<div style="position: absolute;top:250;width:100%;text-align:center;font-size:10px;color:red;">wrong password</div>');
	}
}









//iframe切り替え
function transition(no){
	var doc = document.getElementsByTagName("iframe")[0].contentWindow.document;
	//console.log(doc.title);
	
	if(doc.title=="og2016_home"){
		if(no==1){
			document.getElementById('ifr').src = "info.html";
			document.getElementById("pagetitle").textContent="情報";
		}else if(no==2){
			document.getElementById('ifr').src = "collabo.html";
			document.getElementById("pagetitle").textContent="共同研究";
		}
	}
	if(doc.title=="og2016_collabo"){
		if(no==1){
			document.getElementById('ifr').src = "home.html";
			document.getElementById("pagetitle").textContent="マイページ";
		}else if(no==2){
			document.getElementById('ifr').src = "info.html";
			document.getElementById("pagetitle").textContent="情報";
		}
	}
	if(doc.title=="og2016_info"){
		if(no==1){
			document.getElementById('ifr').src = "collabo.html";
			document.getElementById("pagetitle").textContent="共同研究";
		}else if(no==2){
			document.getElementById('ifr').src = "home.html";
			document.getElementById("pagetitle").textContent="マイページ";
		}
	}
	
	
	
}


//注意書き表示
function float_open(p,n){
	$("#controlPanel").append("<div id='floating' class='page_container'></div>");
	$("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");
	
	var n_str="";
	if(n==0){n_str="学士";
	}else if(n==1){n_str="修士";
	}else if(n==2){n_str="博士";}
	
	$("#float_body").append("<p id='float_text'>"+n_str+"を"+p+"人卒業させます<br><font size='1'>(この表示はSkipにチェックすると飛ばせます)</font></p>");
	
	var str="";
	str+='<a class="btn1" href="#" onclick="ns_calc('+p+','+n+'); return false;">はい</a>';
	str+='<a class="btn2" href="#">いいえ</a>'
	
	$("#float_body").append(str);
	
/*	if(ie_version <= 6) {
		float_back_ie6(window);
	}
*/
	$("#float_back").css({
		"opacity":"0.7"
	});
	$("#floating").delay(50).fadeIn(200);
	float_open_flag = 1;
	$("#float_body .btn1,#float_body .btn2,#float_back").click(float_close);
}
var float_close = function(){
	$("#floating").fadeOut(200,function(){
		$(this).remove();
		float_open_flag = 0;
	});
};





//info表示
var show_val=999;
function showInfo(n){
	
	if(n!=show_val){
		$("#box").append("<div id='info_floating"+n+"' class='page_container'></div>");
		$("#info_floating"+n).append("<div id='info_float_body"+n+"' class='info_float_bodyclass'></div><div id='info_float_back"+n+"'  class='info_float_backclass'></div>");
		
		var str="";
		if(n==0){//学士テキスト(hue:150 緑)
		str+='<div id="info_stu" class="info_stu1">学士</div>';
		str+='<div id="info_circle" class="info_cir1"></div>';
		str+='<div id="info_pic" class="info_pic1"></div>';
		str+='<div id="info_ratio">進学率:<font color="red">10%</font></div>';
		str+='<div id="info_stuval"><font color="green">'+bachelor+'</font>人</div>';
		str+='<div id="info_context">博士の学位、修士の学位および専門職学位に準ずる。学士の学位は「学士（専攻分野）」と表記される。</div>';
		str+='<div id="info_calc"><div id="info_calc_t1">人数</div><div id="info_calc_val"><font color="green">'+bachelor+'</font></div><div id="info_calc_batu1">×</div><div id="info_calc_mag"><font color="salmon">1</font></div><div id="info_calc_batu2">×</div><div id="info_calc_t2">モチベ</div><div id="info_calc_moti"><font color="orange">1.00</font></div></div>';
		str+='<div id="info_bonus'+n+'" class="scrollbox info_bo"></div>';
		str+='<div id="info_stupermintitle">獲得資金</div>';
		str+='<div id="info_stupermin">¥xxxxxx/秒</div>';
		}else if(n==1){//修士テキスト(hue:240 青)
		str+='<div id="info_stu" class="info_stu2">修士</div>';
		str+='<div id="info_circle" class="info_cir2"></div>';
		str+='<div id="info_pic" class="info_pic2"></div>';
		str+='<div id="info_ratio">進学率:<font color="red">10%</font></div>';
		str+='<div id="info_stuval"><font color="blue">'+master+'</font>人</div>';
		str+='<div id="info_context">修士（しゅうし）とは、下位の学士と上位の博士の中間に位置する学位で、学士又はそれと同等の学力を認められた者が高等教育...</div>';
		str+='<div id="info_calc"><div id="info_calc_t1">人数</div><div id="info_calc_val"><font color="blue">'+master+'</font></div><div id="info_calc_batu1">×</div><div id="info_calc_mag"><font color="salmon">8</font></div><div id="info_calc_batu2">×</div><div id="info_calc_t2">モチベ</div><div id="info_calc_moti"><font color="orange">1.00</font></div></div>';
		str+='<div id="info_bonus'+n+'" class="scrollbox info_bo"></div>';
		str+='<div id="info_stupermintitle">獲得資金</div>';
		str+='<div id="info_stupermin">¥xxxxxx/秒</div>';
		}else if(n==2){//博士テキスト(hue:0 赤)
		str+='<div id="info_stu" class="info_stu3">博士</div>';
		str+='<div id="info_circle" class="info_cir3"></div>';
		str+='<div id="info_pic" class="info_pic3"></div>';
		str+='<div id="info_stuval"><font color="red">'+doctor+'</font>人</div>';
		str+='<div id="info_context">博士 (Doctor) の学位は、国によって多少の差異はあるものの基本的に最上位の学位として位置づけられている。</div>';
		str+='<div id="info_calc"><div id="info_calc_t1">人数</div><div id="info_calc_val"><font color="red">'+doctor+'</font></div><div id="info_calc_batu1">×</div><div id="info_calc_mag"><font color="salmon">70</font></div><div id="info_calc_batu2">×</div><div id="info_calc_t2">モチベ</div><div id="info_calc_moti"><font color="orange">1.00</font></div></div>';
		str+='<div id="info_bonus'+n+'" class="scrollbox info_bo"></div>';
		str+='<div id="info_stupermintitle">獲得資金</div>';
		str+='<div id="info_stupermin">¥xxxxxx/秒</div>';
		}
		
		$("#info_float_body"+n).append(str);
		$("#info_bonus"+n).append("<div class='info_li1'>◯◯教授ボーナス！</div>");
		$("#info_bonus"+n).append("<div class='info_li2'>△△教授ボーナス！</div>");
		$("#info_bonus"+n).append("<div class='info_li1'>☆☆教授ボーナス！</div>");
		$("#info_bonus"+n).append("<div class='info_li2'>□□教授ボーナス！</div>");
		
		
		$("#info_floating"+n).append("<a href='#' id='info_batu'></a>");
		
		if(n==0){
			$("#Frames .frame2,#Frames .frame3").click(info_float_close0);
		}else if(n==1){
			$("#Frames .frame1,#Frames .frame3").click(info_float_close1);
		}else if(n==2){
			$("#Frames .frame1,#Frames .frame2").click(info_float_close2);
			
		}
	}
	
	$("#info_float_back"+n+",#info_batu").click(info_float_closeall);
	show_val=n;
}

	
	
var info_float_closeall = function(){
	$("#info_floating0, #info_floating1, #info_floating2").fadeOut(200,function(){
	$(this).remove();
	//float_open_flag = 0;
	});
	show_val=999;
};
var info_float_close0 = function(){
	$("#info_floating0").fadeOut(200,function(){
	$(this).remove();
	//float_open_flag = 0;
	//console.log("c0");
	});
};
var info_float_close1 = function(){
	$("#info_floating1").fadeOut(200,function(){
	$(this).remove();
	//float_open_flag = 0;
	//console.log("c1");
	});
};
var info_float_close2 = function(){
	$("#info_floating2").fadeOut(200,function(){
	$(this).remove();
	//float_open_flag = 0;
	//console.log("c2");
	});
};





//進学
function nextStage(n){
	var now=n;
	var future;
	var p_value;
	//var check=0;
	
	//人数
	var frm=document.forms["gi_form3"];
	var idx=frm.elements["p1"].selectedIndex;
	// 選択されたインデックス番号 
	//s="インデックス番号="+idx+"\n";
	// 選択された値 
	//s+="p_value="+frm.elements["p1"].options[idx].value+"\n";
	// 選択されたテキスト 
	//s+="テキスト="+frm.elements["one"].options[idx].text;
	//console.log(s);
	p_value=Number(frm.elements["p1"].options[idx].value);
	
	
	
	//チェック
	var ch=frm.elements["c1"].checked;
	//console.log(idx);
	
	//(now)学士=0,修士=1,博士=2
	//(future)進学=0,進学=1
	//console.log("p_value="+p_value+",now="+now+",check="+ch);
	
	if(ch==true){
		ns_calc(p_value,now);
	}else{
		float_open(p_value,now);
	}
	
}

//卒業、進学時の計算(金)
function ns_calc(p_value,now){
	if(now==0&&(bachelor-p_value)>=0){
		calc_student(-p_value,p_value/10,0);
		persec=bachelor+master*8+doctor*70;
		document.getElementById("min_m").textContent="¥"+persec+"/秒";
	}
	if(now==1&&(master-p_value)>=0){
		calc_student(0,-p_value,p_value/10);
		persec=bachelor+master*8+doctor*70;
		document.getElementById("min_m").textContent="¥"+persec+"/秒";
	}
}


//進学計算
function calc_student(b,m,d){
	if(b!=0){
		bachelor=bachelor+b;
		document.getElementById("bachelor_n").textContent=bachelor+"人";
	}
	if(m!=0){
		master=master+m;
		document.getElementById("master_n").textContent=master+"人";
	}
	if(d!=0){
		doctor=doctor+d;
		document.getElementById("doctor_n").textContent=doctor+"人";
	}
}


//総額計算
function calc_money(m){
	money+=Math.round(m);
	document.getElementById("all_m").textContent="¥"+money;
}


//info.htmlから呼ばれる
function from_info(){
	//console.log("hoge");
	get_api('money','0002');
	//document.getElementById("all_m").textContent="¥"+jsonval.all_m+"/秒";
}






//-->