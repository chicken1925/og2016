//<!--

var time=0;

var deltaDispValue=0;

var sumPaper=0;
var sumValue=0;
var dispValue=0

//変えるように！！！！
var disp_ifr=0;


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


}, false);




setInterval(function (){
	document.getElementById("min_m").textContent="論文数:"+sumPaper +"編";
        
    if(dispValue!=deltaDispValue){
        dispValue+=deltaDispValue/360;
        if(dispValue>deltaDispValue){
            dispValue=deltaDispValue;
        }
    }
    document.getElementById("all_m").textContent="¥"+parseInt(dispValue,0);
	time++;
},33)


//1秒進める
setInterval(function (){
	for(var i=0;i<test_students.students.length;i++){
		test_students.students[i].course_t++;
	}
	next_grade();
	if(disp_ifr==1&&add_flag==false){
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
		disp_ifr=0;
	}else if(btnno==2){
		document.ifr.location.href = "member.html";
		disp_ifr=1;
	}else if(btnno==3){
		document.ifr.location.href = "collabo.html";
		disp_ifr=2;
	}

}


//とりあえず
window.onload = function(){
	window.document.onkeydown = function(evt){
		if(evt.keyCode==81){ //'q',時を5分進める
			for(var i=0;i<test_students.students.length;i++){
				test_students.students[i].course_t+=300;
			}
			next_grade();
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
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//学部4年
		if(test_students.students[i].grade==1){
			if(test_students.students[i].course_t==600){
				//成長小
			}else if(test_students.students[i].course_t>=600){
				test_students.students[i].course_t=601;
			}
		}
		//修士1年
		if(test_students.students[i].grade==2){
			if(test_students.students[i].course_t>=900){
				//成長小
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//修士2年
		if(test_students.students[i].grade==3){
			if(test_students.students[i].course_t==900){
				//成長小
			}else if(test_students.students[i].course_t>=900){
				test_students.students[i].course_t=901;
			}
		}
		//博士1年
		if(test_students.students[i].grade==4){
			if(test_students.students[i].course_t>=1200){
				//成長小
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//博士2年
		if(test_students.students[i].grade==5){
			if(test_students.students[i].course_t>=1200){
				//成長小
				test_students.students[i].grade++;
				test_students.students[i].course_t=0;
			}
		}
		//博士3年
		if(test_students.students[i].grade==6){
			if(test_students.students[i].course_t>=1200){
				//成長小
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


//ペーパーの管理関数
function MakeJournal(){
    for(var i in test_students.students){
        
        var student = test_students.students[i];   
        var journal_spd=(100-student.status[2]);
        
        if(journal_spd<student.journal_t){
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
	add_stu_api(test_user.uid,stu_history);
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


function levelup(){
	$("#box").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    var str="";
	str+='研究費を¥10000消費して研究室レベルを1あげます';

    $("#float_body").append(str);
    $("#floating").append("<a href='#' id='info_batu'></a>");

    $("#float_back").css({
        "opacity":"0.7"
    });
    $("#floating").delay(50).fadeIn(200);
    float_open_flag = 1;
    $("#float_body .btn1,#float_back,#info_batu").click(float_close);
}
var float_close = function(){
    $("#floating").fadeOut(200,function(){
        $(this).remove();
        float_open_flag = 0;
    });
};









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

	
}
function SetDispValue(_addValue){
	deltaDispValue+=_addValue;

	
}
function SetPaper(_studentID,_paperID){
    test_students.students[_studentID].journal_pos[_paperID]=0;
    sumPaper++;
	
}




//-->
