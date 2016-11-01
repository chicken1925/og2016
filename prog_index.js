//<!--

var time=0;

var deltaDispValue=0;

var sumPaper=0;
var sumValue=0;
var dispValue=0

//変えるように！！！！
var disp_ifr=2;


// スクロール禁止
$(window).on('touchmove.noScroll', function(e) {
    e.preventDefault();
});


function sizing_box() {
	var lab_h = document.getElementById("lab").clientHeight;
	var money_h = document.getElementById("money").clientHeight;
	var notice_h = document.getElementById("notice").clientHeight;
	var u_buttons_h = document.getElementById("u_buttons").clientHeight;
	var sh= $(window).height() - lab_h - money_h - notice_h - u_buttons_h;
	$("#box").css("height", sh+"px");
	$("#ifr").css("height", sh+"px");
}



//一番早い処理(多分)
$(document).ready( function(){
	sizing_box();
	//loginform();
});
window.addEventListener('resize', function() {
    sizing_box();
});

//初期処理
window.addEventListener("load", function(){
	sumValue=test_user.money;

}, false);




setInterval(function (){
	document.getElementById("min_m").textContent="論文数:"+sumPaper +"編";
    document.getElementById("all_m").textContent="¥"+parseInt(sumValue,0);
	time++;

	//test_user.money+=100*test_user.level/30;
	//document.getElementById("all_m").textContent="¥"+parseInt(test_user.money,0);
	//console.log("a");
},33)


//1秒進める
setInterval(function (){
	for(var i=0;i<test_students.students.length;i++){
		test_students.students[i].course_t++;
	}
	next_grade();
	if(disp_ifr==1&&add_flag==false){
		document.getElementById( 'ifr' ).contentWindow.oya();
	}else if(disp_ifr==2){
		document.getElementById( 'ifr' ).contentWindow.oya();
	}
	MakeJournal();
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
	str+='<input type="text" value="0001" name="id_n" class="logintext" id="id_t" size="40">';
	str+='<input type="text" value="1111" name="pass_n" class="logintext" id="pass_t" size="40">';
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
	login_api(login_id,login_password);
	//console.log(hogehoge);

	setTimeout(function(){
		loginCheck(login_id,login_password);
	}, 800);


}

function loginCheck(id_,pass_){
	if(login_val=="ok"){
		document.ifr.location.href = "home.html";
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
	}else if(btnno==2){
		document.ifr.location.href = "member.html";
	}else if(btnno==3){
		document.ifr.location.href = "collabo.html";
	}else if(btnno==4){
		document.ifr.location.href = "event.html";
	}

}


//とりあえず
window.onload = function(){
	window.document.onkeydown = function(evt){
		if(evt.keyCode==81){ //'q',時を5分進める
			for(var i=0;i<test_students.students.length;i++){
				test_students.students[i].course_t+=300;
				test_students.students[i].journal_t+=300;
			}
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
		//進学
		//学部3年
		if(test_students.students[i].grade==0){
			if(test_students.students[i].course_t>=600){
				//成長小
				add_status(i,5);
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//学部4年
		if(test_students.students[i].grade==1){
			if(test_students.students[i].course_t==600){
				//成長小
				add_status(i,5);
			}else if(test_students.students[i].course_t>=600){
				test_students.students[i].course_t=601;
			}
		}
		//修士1年
		if(test_students.students[i].grade==2){
			if(test_students.students[i].course_t>=900){
				//成長小
				add_status(i,7);
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//修士2年
		if(test_students.students[i].grade==3){
			if(test_students.students[i].course_t==900){
				//成長小
				add_status(i,7);
			}else if(test_students.students[i].course_t>=900){
				test_students.students[i].course_t=901;
			}
		}
		//博士1年
		if(test_students.students[i].grade==4){
			if(test_students.students[i].course_t>=1200){
				//成長小
				add_status(i,9);
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//博士2年
		if(test_students.students[i].grade==5){
			if(test_students.students[i].course_t>=1200){
				//成長小
				add_status(i,9);
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//博士3年
		if(test_students.students[i].grade==6){
			if(test_students.students[i].course_t>=1200){
				//成長小
				add_status(i,9);
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}


		//test_students.students[i].grade++;
		if(test_students.students[i].grade>=7){
			test_students.students.splice(i,1);
			console.log("!");
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
        var genTime=15;
		if(student.status[1]<15){
            genTime=45;
        }else if(student.status[1]<30){
            genTime=40;
        }else if(student.status[1]<45){
            genTime=35;
        }else if(student.status[1]<60){
            genTime=30;
        }else if(student.status[1]<75){
            genTime=25;
        }else if(student.status[1]<100){
            genTime=20;
        }else{
            genTime=15;
        }
        if(genTime<student.journal_t){
            for(var j in student.journal_pos){
                var journal = student.journal_pos[j];
                
                if(journal==0){
                    //ここでジャーナルの判定
                    
                    journal=1;
                    student.journal_t=0;
                    break;
                }
            }
            student.journal_pos[j]=journal;
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
	add_stu_api(test_user.uid,stu_history,test_user.level);
	add_flag=true;

	setTimeout(function(){
		if(add_stu_val!="ng"){
			test_students.students.push(add_stu_val);
	        document.ifr.location.href = "member.html";
	        stu_history.shift();
	        stu_history.push(add_stu_val.stu_type);
			add_flag=false;
			//console.log(stu_history);
		}else{
			document.ifr.location.href = "member.html";
			add_flag=false;
		}
    }, 800);
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
    if(test_user.level<=5){st1="無名";st2=10000;}
	else if(test_user.level>5&&test_user.level<=10){st1="駆け出し";st2=50000;}
	else if(test_user.level>10&&test_user.level<=15){st1="そこそこ";st2=100000;}
	else if(test_user.level>15&&test_user.level<=20){st1="有名";st2=500000;}
	else if(test_user.level>20&&test_user.level<=25){st1="超有名";st2=1000000;}
	else if(test_user.level>25&&test_user.level<=30){st1="精鋭の集う";st2=5000000;}

    var str="";
	str+='<div id="l_1" class="page_container">現在の'+test_user.name+'研究室</div>';
	str+='<div id="l_2" class="page_container">'+st1+'研究室</div>';
	str+='<div id="l_3" class="page_container">(¥'+(100*test_user.level)+'/秒)</div>';
	str+='<div id="l_4" class="page_container">';
	if(test_user.level<30){
		str+='<div id="l_5" class="page_container">研究費を¥'+st2+'消費して</div>';
		str+='<div id="l_6" class="page_container">研究室Lvを1あげますか？</div>';
		str+='<a href="#" onclick="levelup(); return false;">';
		str+='<div id="l_7" class="page_container">はい</div>';
		str+='</a>';
		str+='<div id="l_8" class="page_container">いいえ</div>';
	}else{
		str+='<div id="l_6" class="page_container">これ以上あげられません！</div>';
	}
	str+='</div>';

    $("#float_body").append(str);
    $("#l_8,#float_back,#info_batu").click(float_close);
}
function levelup(){
	var buy=false;
	if(test_user.level<=5&&test_user.money>=10000){test_user.money-=10000;buy=true;}
	else if(test_user.level>5&&test_user.level<=10&&test_user.money>=50000){test_user.money-=50000;buy=true;}
	else if(test_user.level>10&&test_user.level<=15&&test_user.money>=100000){test_user.money-=100000;buy=true;}
	else if(test_user.level>15&&test_user.level<=20&&test_user.money>=500000){test_user.money-=500000;buy=true;}
	else if(test_user.level>20&&test_user.level<=25&&test_user.money>=1000000){test_user.money-=1000000;buy=true;}
	else if(test_user.level>25&&test_user.level<=30&&test_user.money>=5000000){test_user.money-=5000000;buy=true;}

	if(buy==true){
		sumValue=test_user.money;
		test_user.level++;
		$('#level_m').text('研究室Lv: Lv.'+test_user.level);
		document.getElementById("all_m").textContent="¥"+parseInt(test_user.money,0);
		$("#float_body").empty();
		show_lab_info();
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
	//console.log("hoge");
	return test_students;
}
function back_user_data(){
	//console.log("hoge");
	return test_user;
}

//boxのサイズを返す
function box_size(){
	//console.log("hoge");
	return $("#box").height();
}
function GetHomeData(){
    var homeData=[sumValue,sumPaper];
    return homeData;
    
}


function SetValue(_addValue){
    sumValue+=_addValue;
	test_user.money+=_addValue;
	
}
function SetDispValue(_addValue){
	deltaDispValue+=_addValue;

	
}
function SetPaper(_studentID,_paperID){
    test_students.students[_studentID].journal_pos[_paperID]=0;
    sumPaper++;
	
}

function career_m(s_num,c){
	//console.log(s_num+','+c);
	if(c==0){ //進学
		test_students.students[s_num].grade++;
		test_students.students[s_num].course_t=0;
	}else if(c==1){ //卒業
		test_students.students.splice(s_num,1);
	}
}
function frame_num(n){
	disp_ifr=n;
}
function collabo_st(st_n,state){
	for(var i=0;i<test_students.students.length;i++){
		if(test_students.students[i].id==st_n){
			test_students.students[i].collabo=state;
		}
	}
}

//-->
