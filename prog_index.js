//<!--

var time=0;

var deltaDispValue=0;

var sumPaper=0;
var sumValue=0;
var dispValue=0

var disp_ifr=2;

var login_checkTF=false;

var labskill_add=0;
var labskill_cheep=0;

var mystate;


// スクロール禁止
$(window).on('touchmove.noScroll', function(e) {
    e.preventDefault();
});

/***ダブルタップ禁止(要議論)
let lastTouch = 0;
document.addEventListener('touchend', event => {
  const now = window.performance.now();
  if (now - lastTouch <= 500) {
    event.preventDefault();
  }
  lastTouch = now;
}, true);
*/





// 正規表現でセパレート(金額)
function separate(num){
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}


function sizing_box() {
	/*
	var lab_h = document.getElementById("lab").clientHeight;
	var money_h = document.getElementById("money").clientHeight;
	var notice_h = document.getElementById("notice").clientHeight;
	*/
	var header_h = document.getElementById("header").clientHeight;
	var u_buttons_h = document.getElementById("u_buttons").clientHeight;

	var sh= $(window).height() - header_h - u_buttons_h;
	$("#box").css("height", sh+"px");
	$("#ifr").css("height", sh+"px");
}



//一番早い処理(多分)
$(document).ready( function(){
	$.cookie.json = true;
	sizing_box();

	console.log($.cookie('test_user_c'));
	console.log($.cookie('test_students_c'));
	if($.cookie('test_user_c')==undefined){
		loginform();
	}else{
		test_user=$.cookie('test_user_c');
		test_students=$.cookie('test_students_c');
		save_db();
		save_cookie();
		//以下要検証
		login_checkTF=true;
		login_val="ok";
		loginCheck(test_user.uid,test_user.passward);
	}

	//現在状態確認
	var d = new $.Deferred();
	now_state_api(d);

	d.promise().then(function() {
		mystate=now_state_val.now_state;
	});


});
window.addEventListener('resize', function() {
    sizing_box();
});






setInterval(function (){
	//document.getElementById("min_m").textContent="論文数:"+sumPaper +"編";
    //document.getElementById("all_m").textContent="¥a"+parseInt(sumValue,0);
    if(login_checkTF==true){
		test_user.money+=Math.round((100*test_user.level*labskill_add)/30);
		document.getElementById("all_m").textContent="¥"+separate(parseInt(test_user.money,0));
    }
	//console.log("a");
},33)


//1秒進める
setInterval(function (){

	if(login_checkTF==true){
		next_grade();
		MakeJournal();
		if(disp_ifr==1&&add_flag==false){
			document.getElementById( 'ifr' ).contentWindow.oya();
		}else if(disp_ifr==2){
			document.getElementById( 'ifr' ).contentWindow.oya();
		}
		//console.log("n: "+parseInt(new Date().getTime(),10));
		//console.log(parseInt(test_user.save_t,10));
		//console.log(parseInt(new Date().getTime(),10)-parseInt(test_user.save_t,10));
	}

	//console.log(save_time());

},1000)





//ログインフォーム
function loginform(){
	$("#all_contents").append("<div id='loginbox' class='page_container'></div>");
	$("#loginbox").append("<div id='loginbox_' class='page_container'></div>");

	var str="";
	str+='<form id="login_f">';
	str+='<div id="logintitle">-Login-</div>';
	str+='<div class="loginbody" id="l1">ID:</div>';
	str+='<div class="loginbody" id="l2">PASS:</div>';
	str+='<input type="text" value="u001" name="id_n" class="logintext" id="id_t" size="40">';
	str+='<input type="text" value="p001" name="pass_n" class="logintext" id="pass_t" size="40">';
	str+='<input type="button" id="login_button" value="submit!" onclick="loginInit()">';
	str+='</form>';
	$("#loginbox_").append(str);

}
function loginInit(){
	//console.log(document.forms["login_f"].elements["id_n"].value);

	var login_id = document.forms["login_f"].elements["id_n"].value;
	var login_password = document.forms["login_f"].elements["pass_n"].value;
	//console.log(login_password);

	//login_api(login_id,login_password);
	//console.log(login_api_val);

	var d = new $.Deferred();
	login_api(login_id,login_password,d);

	d.promise().then(function() {
		loginCheck(login_id,login_password);
	});





}

function loginCheck(id_,pass_){
	if(login_val=="ok"){
		document.ifr.location.href = "home.html";
		$("#lab").html(test_user.name+"&nbsp;研究室 ["+test_user.faculty+"学科]");
		if(test_user.faculty=="宇宙"){$("#icon_m").css("background-image", "url(images/icon_space.png)");}
		else if(test_user.faculty=="バイオ"){$("#icon_m").css("background-image", "url(images/icon_baio.png)");}
		else if(test_user.faculty=="ロボ"){$("#icon_m").css("background-image", "url(images/icon_machine.png)");}
		else{$("#icon_m").css("background-image:", "url(images/trans_none.png)");}
		//console.log(test_user.money);
		//document.getElementById("all_m").textContent="¥"+parseInt(test_user.money,0);
		sumValue=test_user.money;


		//自然増加分追加
		if(test_user.save_t!=0){
			//console.log(Math.ceil((parseInt(new Date().getTime(),10)-parseInt(test_user.save_t,10))/1000));
			test_user.money+=Math.ceil((parseInt(new Date().getTime(),10)-parseInt(test_user.save_t,10))/1000)*(test_user.level*100);
			//console.log(test_user.money);
			document.getElementById("all_m").textContent="¥"+separate(parseInt(test_user.money,0));
		}

		//初回起動(時間関係)
		for(var i=0;i<test_students.students.length;i++){
			if(test_students.students[i].course_t==0){
				test_students.students[i].course_t=new Date().getTime();
			}
		}
		if(test_user.respawn_t==0){
			test_user.respawn_t=new Date().getTime();
		}
		save_db();
		save_cookie();


		var d = new $.Deferred();
		quest_list_api(test_user.uid,d);
		join_event_api(test_user.uid,test_user.name,test_user.faculty,-3,0,'',[0,0,0],d);

		//生徒の状態(研、共、etc...)
		setTimeout(function(){
			for(var i in quest_list_val){
				for(var j=0;j<quest_list_val[i].users.length;j++){
					//console.log(quest_list_val[i].user_stuIDs[j]);
					for(var k=0;k<test_students.students.length;k++){
						if(test_students.students[k].id==quest_list_val[i].users[j].stu_id){
							test_students.students[k].collabo=1;
						}
					}
				}
			}
			for(var k=0;k<test_students.students.length;k++){
				if(test_students.students[k].id==join_event_val.sid){
					test_students.students[k].collabo=2;
				}
				if(test_students.students[k].collabo==-1){
					test_students.students[k].collabo=0;
				}
			}
		}, 800);

		labskill_check();
		login_checkTF=true;

		$("#loginbox").fadeOut(200,function(){
		$(this).remove();
		//float_open_flag = 0;
		});
	}else{
		$("#loginbox_").append('<div style="position: absolute;top:250;width:100%;text-align:center;font-size:10px;color:red;">wrong password</div>');
	}
}


//下のボタン押した時
function u_button(btnno){
    btnno;
    dispValue= sumValue;
    deltaDispValue=dispValue;
	if(btnno==1){
		document.ifr.location.href = "home.html";
		$('#now_m').text("ホーム");
	}else if(btnno==2){
		document.ifr.location.href = "member.html";
		$('#now_m').text("メンバー");
	}else if(btnno==3){
		document.ifr.location.href = "collabo.html";
		$('#now_m').text("共同研究");
	}else if(btnno==4){
		document.ifr.location.href = "event.html";
		$('#now_m').text("学会発表");
	}else if(btnno==5){
		document.ifr.location.href = "info.html";
		$('#now_m').text("情報");
	}

}


//とりあえず
window.onload = function(){
	window.document.onkeydown = function(evt){
		if(evt.keyCode==81){ //'q',時を5分進める
			for(var i=0;i<test_students.students.length;i++){
				test_students.students[i].course_t-=180000;
				test_students.students[i].journal_t+=300;
			}
			test_user.respawn_t-=180000;
			next_grade();
			MakeJournal();
		}
		if(evt.keyCode==65){ //'a'
			console.log(test_students.students);
		}
	}
}



function next_grade(){
	var i=0;
	while(i<test_students.students.length){
		//console.log(test_students.students[i].course_t);
		var tt=Math.ceil((new Date().getTime()-test_students.students[i].course_t)/1000);
		//console.log(tt);
		//進学
		//学部3年
		if(test_students.students[i].grade==0){
			if(tt>=600){add_status(i,5); test_students.students[i].grade++;}
		}
		//学部4年
		if(test_students.students[i].grade==1){
			if(tt>=1200){add_status(i,5); test_students.students[i].grade++;
			}
		}

		//修士1年
		if(test_students.students[i].grade==3){
			if(tt>=900){add_status(i,7); test_students.students[i].grade++;
			}
		}
		//修士2年
		if(test_students.students[i].grade==4){
			if(tt>=1800){add_status(i,7); test_students.students[i].grade++;
			}
		}

		//博士1年
		if(test_students.students[i].grade==6){
			if(tt>=1200){add_status(i,9); test_students.students[i].grade++;
			}
		}
		//修士2年
		if(test_students.students[i].grade==7){
			if(tt>=2400){add_status(i,9); test_students.students[i].grade++;
			}
		}
		//修士3年
		if(test_students.students[i].grade==8){
			if(tt>=3600){add_status(i,9); test_students.students[i].grade++;
			}
		}

		//卒業(時限)
		if(test_students.students[i].grade>=9){
			gradu_api(test_user.uid,test_students.students[i].id);
			test_user.item_skill.push(test_students.students[i].skill[0]);
			test_students.students.splice(i,1);
			save_db();
			save_cookie();
			i--;
		}

		//console.log(i);
		i++;
	}
}




function add_status(s_num,param){
	if(test_students.students[s_num].personality==0){
		test_students.students[s_num].status[0]+=Math.ceil(param*1.2);
		test_students.students[s_num].status[1]+=Math.ceil(param*0.8);
		test_students.students[s_num].status[2]+=Math.ceil(param);
	}else if(test_students.students[s_num].personality==1){
		test_students.students[s_num].status[0]+=Math.ceil(param*1.2);
		test_students.students[s_num].status[1]+=Math.ceil(param);
		test_students.students[s_num].status[2]+=Math.ceil(param*0.8);
	}else if(test_students.students[s_num].personality==2){
		test_students.students[s_num].status[0]+=Math.ceil(param*0.8);
		test_students.students[s_num].status[1]+=Math.ceil(param*1.2);
		test_students.students[s_num].status[2]+=Math.ceil(param);
	}else if(test_students.students[s_num].personality==3){
		test_students.students[s_num].status[0]+=Math.ceil(param);
		test_students.students[s_num].status[1]+=Math.ceil(param*1.2);
		test_students.students[s_num].status[2]+=Math.ceil(param*0.8);
	}else if(test_students.students[s_num].personality==4){
		test_students.students[s_num].status[0]+=Math.ceil(param*0.8);
		test_students.students[s_num].status[1]+=Math.ceil(param);
		test_students.students[s_num].status[2]+=Math.ceil(param*1.2);
	}else if(test_students.students[s_num].personality==5){
		test_students.students[s_num].status[0]+=Math.ceil(param);
		test_students.students[s_num].status[1]+=Math.ceil(param*0.8);
		test_students.students[s_num].status[2]+=Math.ceil(param*1.2);
	}else if(test_students.students[s_num].personality==6){
		test_students.students[s_num].status[0]+=Math.ceil(param*1.2);
		test_students.students[s_num].status[1]+=Math.ceil(param*1.2);
		test_students.students[s_num].status[2]+=Math.ceil(param*1.2);
	}
}






//ペーパーの管理関数
function MakeJournal(){
	
    for(var i in test_students.students){
        var student = test_students.students[i];
		var status=calc_param(i);   
        var rank= calc_rank(status[1],false);
		var genTime=15;
		if(rank==0){
            genTime=45;
        }else if(rank==1){
            genTime=40;
        }else if(rank==2){
            genTime=35;
        }else if(rank==3){
            genTime=30;
        }else if(rank==4){
            genTime=25;
        }else if(rank==5){
            genTime=20;
        }else{
            genTime=15;
        }
		
        if(genTime<student.journal_t&&student.collabo==0){
            for(var j in student.journal_pos){
                var journal = student.journal_pos[j];
                
                if(journal==0){
                    //ここでジャーナルの判定
					var rank_j= calc_rank(status[0],false);
					
					
					if(rank_j==0){
						journal=1;
					}else if(rank_j==1){
						journal=2;
					}else if(rank_j==2){
						journal=3;
					}else if(rank_j==3){
						journal=4;
					}else if(rank_j==4){
						journal=5;
					}else if(rank_j==5){
						journal=6;
					}else{
						journal=6;
					}
                    student.journal_pos[j]=journal;
                    student.journal_t=0;
                    break;
                }
            }
            //student.journal_pos[j]=journal;
        }else{        
            student.journal_t++;
        }
        test_students.students[i]=student;
    }
}







//生徒追加
var stu_history=[-1,-1,-1,-1,-1];
var add_flag=false;
function add_stu(){
	var d = new $.Deferred();
	add_stu_api(test_user.uid,stu_history,test_user.level,test_user.faculty,d);
	add_flag=true;
	d.promise().then(function() {
	if(add_stu_val!="ng"){
			test_students.students.push(add_stu_val);
	        document.ifr.location.href = "member.html";
	        stu_history.shift();
	        stu_history.push(add_stu_val.stu_type);
			add_flag=false;
			test_user.respawn_t=new Date().getTime();
			//console.log(stu_history);
			save_db();
			save_cookie();
		}else{
			document.ifr.location.href = "member.html";
			add_flag=false;
		}
    });

}


var float_open_flag=0;
function lab_info(){
	$("#box").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    show_lab_info();

    $("#floating").append("<a href='#' id='info_batu'></a>");

    $("#float_back").css({
        "opacity":"0.7"
    });
    $("#floating").delay(50).fadeIn(200);
    float_open_flag = 1;
    $("#l_8,#float_back,#info_batu").click(float_close);
}
var float_close = function(){
    $("#floating").fadeOut(200,function(){
        $(this).remove();
        float_open_flag = 0;
    });
};
function show_lab_info(){
	var st1="";
    var st2="";
    if(test_user.level<=5){st1="無名";st2=Math.floor(100000*labskill_cheep);}
	else if(test_user.level>5&&test_user.level<=10){st1="駆け出し";st2=Math.floor(500000*labskill_cheep);}
	else if(test_user.level>10&&test_user.level<=15){st1="そこそこ";st2=Math.floor(1000000*labskill_cheep);}
	else if(test_user.level>15&&test_user.level<=20){st1="有名";st2=Math.floor(5000000*labskill_cheep);}
	else if(test_user.level>20&&test_user.level<=25){st1="超有名";st2=Math.floor(10000000*labskill_cheep);}
	else if(test_user.level>25&&test_user.level<=30){st1="精鋭の集う";st2=Math.floor(20000000*labskill_cheep);}

    var str="";
	str+='<div id="l_1" class="ls page_container">現在の&nbsp;'+test_user.name+'&nbsp;研究室</div>';
	str+='<div id="l_2" class="ls page_container">'+st1+'研究室</div>';
	str+='<div id="l_3" class="ls page_container">(¥'+Math.round(100*test_user.level*labskill_add)+'/秒)</div>';
	str+='<div id="l_4" class="ls page_container">';
	if(test_user.level<30){
		str+='<div id="l_5" class="ls page_container">研究費を¥'+st2+'消費して</div>';
		str+='<div id="l_6" class="ls page_container">研究室Lvを1あげますか？</div>';
		str+='<a href="#" onclick="levelup(); return false;">';
		str+='<div id="l_7" class="ls page_container">はい</div>';
		str+='</a>';
		str+='<div id="l_8" class="ls page_container">いいえ</div>';
	}else{
		str+='<div id="l_6" class="ls page_container">これ以上あげられません！</div>';
	}
	str+='</div>';


    str+='<hr id="l_border" class="ls page_container">';

    $("#float_body").append(str);
    $("#l_8,#float_back,#info_batu").click(float_close);
}
function levelup(){
	var buy=false;
	if(test_user.level<=5&&test_user.money>=Math.floor(100000*labskill_cheep)){test_user.money-=Math.floor(100000*labskill_cheep);buy=true;}
	else if(test_user.level>5&&test_user.level<=10&&test_user.money>=Math.floor(500000*labskill_cheep)){test_user.money-=Math.floor(500000*labskill_cheep);buy=true;}
	else if(test_user.level>10&&test_user.level<=15&&test_user.money>=Math.floor(1000000*labskill_cheep)){test_user.money-=Math.floor(1000000*labskill_cheep);buy=true;}
	else if(test_user.level>15&&test_user.level<=20&&test_user.money>=Math.floor(5000000*labskill_cheep)){test_user.money-=Math.floor(5000000*labskill_cheep);buy=true;}
	else if(test_user.level>20&&test_user.level<=25&&test_user.money>=Math.floor(10000000*labskill_cheep)){test_user.money-=Math.floor(10000000*labskill_cheep);buy=true;}
	else if(test_user.level>25&&test_user.level<=30&&test_user.money>=Math.floor(20000000*labskill_cheep)){test_user.money-=Math.floor(20000000*labskill_cheep);buy=true;}

	if(buy==true){
		sumValue=test_user.money;
		test_user.level++;
		$('#level_m').text(test_user.level);
		document.getElementById("all_m").textContent="¥"+separate(parseInt(test_user.money,0));
		$("#float_body").empty();
		show_lab_info();
		save_cookie();
	}
}








//info.htmlから呼ばれる
function from_info(){
	//console.log("hoge");
	get_api('money','0002');
	//document.getElementById("all_m").textContent="¥"+jsonval.all_m+"/秒";
}

//memberから呼ばれる
function back_stu_data(){
	return test_students;
}
function back_us_data(){
	//console.log("hoge");
	return test_user;
}
//boxのサイズを返す
function box_size(){
	//console.log("hoge");
	return $("#box").height();
}




//セーブ(DBへ)
function save_db(){
	save_api(test_user,test_students);
}
//セーブ(cookieへ)
function save_cookie(){
	$.cookie('test_user_c', test_user);
	$.cookie('test_students_c', test_students);
	//console.log("save_cookie");
}
//cookie削除
function delete_cookie(){
	//日付データを作成する
	var date1 = new Date();
	//1970年1月1日00:00:00の日付データをセットする
	date1.setTime(0);
	//有効期限を過去にして書き込む
	document.cookie = "test_user_c=;expires="+date1.toGMTString();
	document.cookie = "test_students_c=;expires="+date1.toGMTString();
	console.log("delete_cookie");

}



//進路相談から
function career_m(s_num,c){
	//console.log(s_num+','+c);
	if(c==0){ //進学
		test_students.students[s_num].grade++;
		test_students.students[s_num].course_t=new Date().getTime();
		save_cookie();
		save_db();
	}else if(c==1){ //卒業(進路相談)
		gradu_api(test_user.uid,test_students.students[s_num].id);
		test_students.students.splice(s_num,1);
		save_cookie();
		save_db();
	}
}

//現在フレーム確認
function frame_num(n){
	disp_ifr=n;
}

//collaboステータス変更
function collabo_st(st_n,state){
	for(var i=0;i<test_students.students.length;i++){
		if(test_students.students[i].id==st_n){
			test_students.students[i].collabo=state;
		}
	}
}



//スキルパラメータ計算
function calc_param(s_num){
    //↓最高に謎
    var nstatus=[test_students.students[s_num].status[0],test_students.students[s_num].status[1],test_students.students[s_num].status[2]];

    for(var i=0;i<test_students.students[s_num].skill.length;i++){
        if(Math.floor(test_students.students[s_num].skill[i]/10)==11){nstatus[0]=nstatus[0]*1.2;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==12){nstatus[0]=nstatus[0]*1.3; nstatus[1]=nstatus[1]*0.8;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==13){nstatus[0]=nstatus[0]*1.3; nstatus[2]=nstatus[2]*0.8;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==21){nstatus[1]=nstatus[1]*1.2;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==22){nstatus[1]=nstatus[1]*1.3; nstatus[0]=nstatus[0]*0.8;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==23){nstatus[1]=nstatus[1]*1.3; nstatus[2]=nstatus[2]*0.8;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==31){nstatus[2]=nstatus[2]*1.2;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==32){nstatus[2]=nstatus[2]*1.3; nstatus[0]=nstatus[0]*0.8;}
        if(Math.floor(test_students.students[s_num].skill[i]/10)==33){nstatus[2]=nstatus[2]*1.3; nstatus[1]=nstatus[1]*0.8;}
    }


    for(var i=0;i<test_students.students.length;i++){
        for(var j=0;j<test_students.students[i].skill.length;j++){
            if(Math.floor(test_students.students[i].skill[j]/10)==14){nstatus[0]=nstatus[0]*1.1;}
            if(Math.floor(test_students.students[i].skill[j]/10)==24){nstatus[1]=nstatus[1]*1.1;}
            if(Math.floor(test_students.students[i].skill[j]/10)==34){nstatus[2]=nstatus[2]*1.1;}
        }
    }

    nstatus=[Math.ceil(nstatus[0]),Math.ceil(nstatus[1]),Math.ceil(nstatus[2])]

    return nstatus;
}


//ランク計算
//eng=trueでF~S,falseで0~6
function calc_rank(param_,eng){
	var ret_rank=0;
	var ret_rank_e="";
	if(param_<25){
        ret_rank=0; //F
        ret_rank_e='F';
    }else if(param_>=25&&param_<45){
        ret_rank=1; //E
        ret_rank_e='E';
    }else if(param_>=45&&param_<65){
        ret_rank=2; //D
        ret_rank_e='D';
    }else if(param_>=65&&param_<85){
        ret_rank=3; //C
        ret_rank_e='C';
    }else if(param_>=85&&param_<105){
        ret_rank=4; //B
        ret_rank_e='B';
    }else if(param_>=105&&param_<120){
        ret_rank=5; //A
        ret_rank_e='A';
    }else if(param_>=120){
        ret_rank=6; //S
        ret_rank_e='S';
    }

    var final_ret;
    if(eng==true){
    	final_ret=ret_rank_e;
    }else{
    	final_ret=ret_rank;
    }

    return final_ret;
}


//研究室Lv関連のスキルチェック
function labskill_check(){
	var add_value=1;
	var cheep_value=1;
	for(var j=0;j<test_students.students.length;j++){
		for(var i=0;i<test_students.students[j].skill.length;i++){
	        if(Math.floor(test_students.students[j].skill[i]/10)==41){add_value*=1.2;}
	        if(Math.floor(test_students.students[j].skill[i]/10)==42){cheep_value*=0.8;}
	    }
	}

	labskill_add=add_value;
	labskill_cheep=cheep_value;
	//console.log(labskill_add+','+labskill_cheep);
}




function SetItem(i0,i1,i2){
	//console.log(i0+","+i1+","+i2);
    test_user.item_param[0]=parseInt(test_user.item_param[0],10)+parseInt(i0,10);
    test_user.item_param[1]=parseInt(test_user.item_param[1],10)+parseInt(i1,10);
    test_user.item_param[2]=parseInt(test_user.item_param[2],10)+parseInt(i2,10);
}
function SetState(v){
	mystate=v;
}
function useitem_index(s_num_,num_,input_num_){
    test_students.students[s_num_].status[num_]=parseInt(test_students.students[s_num_].status[num_],10)+parseInt(input_num_,10);
    test_user.item_param[num_]=parseInt(test_user.item_param[num_],10)-parseInt(input_num_,10);
}
function useskill_index(s_num_,input_num_s_){
    var use_c=false;
    for(var i=0;test_students.students[s_num_].skill.length;i++){
        if(test_students.students[s_num_].skill[i]==0){
            test_students.students[s_num_].skill[i]=input_num_s_;
            use_c=true;
            break;
        }
    }
    if(use_c==true){
        for(var i=0;i<test_user.item_skill.length;i++){
            if(input_num_s_==test_user.item_skill[i]){
                test_user.item_skill.splice(i, 1);
                break;
            }
        }
    }
}



function GetHomeData(){
    var homeData=[sumValue,sumPaper];
    return homeData;
    
}
function SetValue(_addValue){
    sumValue+=_addValue;
	test_user.money=parseInt(test_user.money,10)+parseInt(_addValue,10);
}
function SetDispValue(_addValue){
	deltaDispValue+=_addValue;

}
function SetPaper(_studentID,_paperID){
    test_students.students[_studentID].journal_pos[_paperID]=0;
    sumPaper++;
	
}




//-->
