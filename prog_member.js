<!--

var student_data;
var user_data;


//初期処理
window.addEventListener("load", function(){
	student_data = window.parent.back_stu_data();
	var hh= window.parent.box_size();
	$("#member_list").css("height", hh+"px");
	$("#all_contents").css("height", hh+"px");
	//console.log(student_data.students[0].name);

    show_students();

}, false);



//秒を時分秒に変換する
function toHms(t) {
    var hms = "";
    var h = t / 3600 | 0;
    var m = t % 3600 / 60 | 0;
    var s = t % 60;
    if (h != 0) {
        hms = h + ":" + padZero(m) + ":" + padZero(s) + "";
    } else if (m != 0) {
        hms = m + ":" + padZero(s) + "";
    } else {
        hms ="0:"+ s + "";
    }
    return hms;
    function padZero(v) {
        if (v < 10) {
            return "0" + v;
        } else {
            return v;
        }
    }
}



function show_students(){
    //生徒リスト表示
    for(var i=0;i<student_data.students.length;i++){
        var str="";
        if(i%2==0){
            str+='<div id="member_'+i+'" class="members_box page_container" style="top:'+(6+Math.floor(i/2)*81)+';">';
        }else{
            str+='<div id="member_'+i+'" class="members_box page_container" style="top:'+(6+Math.floor(i/2)*81)+'; left:163;">';
        }

        str+='<a href="#" onclick="stu_detail('+i+'); return false;">';
        str+='<div id="member_img'+i+'" class="member_img page_container" style="background-image:url('+student_data.students[i].pic+');"></div>';
        str+='<div id="member_n1" class="hoge member_n page_container">'+student_data.students[i].name+'</div>';
        var gra="";
        if(student_data.students[i].grade==0){gra="学3"}
        else if(student_data.students[i].grade==1){gra="学4"}
        else if(student_data.students[i].grade==2){gra="修1"}
        else if(student_data.students[i].grade==3){gra="修2"}
        else if(student_data.students[i].grade==4){gra="博1"}
        else if(student_data.students[i].grade==5){gra="博2"}
        else if(student_data.students[i].grade==6){gra="博3"}
        str+='<div id="member_n2" class="member_n page_container">/'+gra+'</div>';
        var remain;
        if(student_data.students[i].grade==0||student_data.students[i].grade==1){remain=600-student_data.students[i].course_t;}
        else if(student_data.students[i].grade==2||student_data.students[i].grade==3){remain=900-student_data.students[i].course_t;}
        else if(student_data.students[i].grade==4||student_data.students[i].grade==5||student_data.students[i].grade==6){remain=1200-student_data.students[i].course_t;}
        if(remain==-1){
            str+='<div id="member_n4" class="member_n page_container"style="font-size:8px;">相談待ち</div>';
        }else{
            str+='<div id="member_n4" class="member_n page_container">'+toHms(remain)+'</div>';
        }
        str+='<div id="member_border" class="member_n page_container"></div>';
        var mr,mk,mc;
        for(var j=0;j<student_data.students[i].status.length;j++){
            if(student_data.students[i].status[j]<25){
                if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
            }else if(student_data.students[i].status[j]>=25&&student_data.students[i].status[j]<45){
                if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
            }else if(student_data.students[i].status[j]>=45&&student_data.students[i].status[j]<65){
                if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
            }else if(student_data.students[i].status[j]>=65&&student_data.students[i].status[j]<85){
                if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
            }else if(student_data.students[i].status[j]>=85&&student_data.students[i].status[j]<105){
                if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
            }else if(student_data.students[i].status[j]>=105&&student_data.students[i].status[j]<120){
                if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
            }else if(student_data.students[i].status[j]>=120){
                if(j==0){mr="S";}else if(j==1){mk="S";}else if(j==2){mc="S";}
            }
        }

        str+='<div id="member_n31" class="member_n page_container">論: '+mr+'</div>';
        str+='<div id="member_n32" class="member_n page_container">開: '+mk+'</div>';
        str+='<div id="member_n33" class="member_n page_container">コ: '+mc+'</div>';
        str+='</a>'
        str+='</div>'
        $("#member_list").append(str);
    }

    if(student_data.students.length<6){
        var str2="";
        str2+='<a id="add_a"  href="#" onclick="add_stu_parent('+student_data.students.length+'); return false;">';
        str2+='<div id="add_member" class="add_member page_container" >メンバー追加</div>';
        str2+='</a>';
        $("#member_list").append(str2);
    }
}



function add_stu_parent(val){
    $("#add_a").remove();
    var str2="";
    str2+='<div id="add_member2" class="add_member page_container">wait...</div>';
    $("#member_list").append(str2);
    window.parent.add_stu();
}




function stu_detail(num){
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    var str="";
	str+='<div id="f_1" class="page_container" style="background-image:url('+student_data.students[num].pic+');"></div>';
    str+='<div id="f_2" class="page_container">'+student_data.students[num].name+'</div>';
    str+='<div id="f_3" class="page_container">性格 num'+student_data.students[num].personality+'</div>';
    str+='<div id="f_4" class="page_container">得意分野 num'+student_data.students[num].speciality+'</div>';
    var gra="";
    if(student_data.students[num].grade==0){gra="学士3年"}
    else if(student_data.students[num].grade==1){gra="学士4年"}
    else if(student_data.students[num].grade==2){gra="修士1年"}
    else if(student_data.students[num].grade==3){gra="修士2年"}
    else if(student_data.students[num].grade==4){gra="博士1年"}
    else if(student_data.students[num].grade==5){gra="博士2年"}
    else if(student_data.students[num].grade==6){gra="博士3年"}
    str+='<div id="f_5" class="page_container">/'+gra+'</div>';
    var mr,mk,mc;
    for(var j=0;j<student_data.students[num].status.length;j++){
        if(student_data.students[num].status[j]<25){
            if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
        }else if(student_data.students[num].status[j]>=25&&student_data.students[num].status[j]<45){
            if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
        }else if(student_data.students[num].status[j]>=45&&student_data.students[num].status[j]<65){
            if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
        }else if(student_data.students[num].status[j]>=65&&student_data.students[num].status[j]<85){
            if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
        }else if(student_data.students[num].status[j]>=85&&student_data.students[num].status[j]<105){
            if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
        }else if(student_data.students[num].status[j]>=105&&student_data.students[num].status[j]<120){
            if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
        }else if(student_data.students[num].status[j]>=120){
            if(j==0){mr="S";}else if(j==1){mk="S";}else if(j==2){mc="S";}
        }
    }
    str+='<div id="f_61" class="page_container">';
    str+='<div id="f_611" class="param1 page_container">&nbsp;論理力</div>';
    str+='<div id="f_612" class="param2 page_container">'+mr+'&nbsp;<div style="font-size:10px;">('+student_data.students[num].status[0]+')</div></div>';
    str+='<div id="f_613" class="param3 page_container">&nbsp;作成する論文の質</div>';
    str+='<a href="#" onclick="use_item(0); return false;">';
    str+='<div id="use_item" class="use_button page_container">+</div>';
    str+='</a>';
    str+='</div>';
    str+='<div id="f_62" class="page_container">';
    str+='<div id="f_621" class="param1 page_container">&nbsp;開発力</div>';
    str+='<div id="f_622" class="param2 page_container">'+mk+'&nbsp;<div style="font-size:10px;">('+student_data.students[num].status[1]+')</div></div>';
    str+='<div id="f_623" class="param3 page_container">&nbsp;論文を作成する速度</div>';
    str+='<a href="#" onclick="use_item(1); return false;">';
    str+='<div id="use_item" class="use_button page_container">+</div>';
    str+='</a>';
    str+='</div>';
    str+='<div id="f_63" class="page_container">';
    str+='<div id="f_631" class="param1 page_container">&nbsp;コミュ力</div>';
    str+='<div id="f_632" class="param2 page_container">'+mc+'&nbsp;<div style="font-size:10px;">('+student_data.students[num].status[2]+')</div></div>';
    str+='<div id="f_633" class="param3 page_container">&nbsp;共同研究に関係</div>';
    str+='<a href="#" onclick="use_item(2); return false;">';
    str+='<div id="use_item" class="use_button page_container">+</div>';
    str+='</a>';
    str+='</div>';
    str+='<div id="f_7" class="page_container">';
    str+='<div id="f_71" class="param1 page_container">&nbsp;所持スキル</div>';
    str+='<div id="f_72" class="skills page_container">';
    str+='<div id="f_721" class="skills_1 page_container">スキル1:&nbsp;num'+student_data.students[num].skill[0]+'</div>';
    str+='<div id="f_722" class="skills_2 page_container">効果:&nbsp;</div>';
    str+='</div>';
    str+='<div id="f_73" class="skills page_container">';
    var skill_v=false;
    if(student_data.students[num].skill[1]==0){
        str+='<a href="#" onclick="use_item(3); return false;">';
        str+='<div id="use_item" class="use_button2 page_container">スキル追加</div>';
        str+='</a>';
        skill_v=true;
    }else{
        str+='<div id="f_721" class="skills_1 page_container">スキル2:&nbsp;num'+student_data.students[num].skill[1]+'</div>';
        str+='<div id="f_722" class="skills_2 page_container">効果:&nbsp;</div>';
    }
    str+='</div>';
    str+='<div id="f_74" class="skills page_container">';
    if(student_data.students[num].skill[2]==0){
        if(skill_v==false){
            str+='<a href="#" onclick="use_item(3); return false;">';
            str+='<div id="use_item" class="use_button2 page_container">スキル追加</div>';
            str+='</a>';
        }
    }else{
        str+='<div id="f_721" class="skills_1 page_container">スキル3:&nbsp;num'+student_data.students[num].skill[2]+'</div>';
        str+='<div id="f_722" class="skills_2 page_container">効果:&nbsp;</div>';
    }
    str+='</div>';
    str+='</div>';

    str+='<div id="f_8" class="page_container"></div>';
    str+='<div id="f_9" class="page_container"></div>';


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


//アイテム使用float
function use_item(num){
    $("#all_contents").append("<div id='floating2' class='page_container'></div>");
    $("#floating2").hide().append("<div id='float_body2'></div><div id='float_back2'></div>");

    var str="";
    str+='<div class="float_text in_float page_container">'+num+'を使いますか？</div>';


    $("#float_body2").append(str);

    $("#float_back2").css({
        "opacity":"0.7"
    });
    $("#floating2").delay(0).fadeIn(0);
    float_open_flag = 1;
    $("#float_back2").click(float_close2);

}
var float_close2 = function(){
    $("#floating2").remove();
};


function oya(){
    //$("#member_list").empty();
    //show_students();

    $('#member_n1 > .hoge').text('a');
}


//-->
