<!--

var st_data;
var user_data;


//初期処理
window.addEventListener("load", function(){
    user_data = window.parent.back_user_data();
	st_data = window.parent.back_stu_data();
	var hh= window.parent.box_size();
	$("#member_list").css("height", hh+"px");
	$("#all_contents").css("height", hh+"px");
	//console.log(st_data.students[0].name);

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
    for(var i=0;i<st_data.students.length;i++){
        var str="";

        str+='<a href="#" onclick="stu_detail('+i+'); return false;">';
        if(i%2==0){
            str+='<div id="member_'+i+'" class="members_box page_container" style="top:'+(6+Math.floor(i/2)*81)+';">';
        }else{
            str+='<div id="member_'+i+'" class="members_box page_container" style="top:'+(6+Math.floor(i/2)*81)+'; left:163;">';
        }

        str+='<div id="member_img'+i+'" class="member_img page_container" style="background-image:url('+st_data.students[i].pic+');"></div>';
        str+='<div id="member_n1" class="member_n page_container">'+st_data.students[i].name+'</div>';
        var gra="";
        if(st_data.students[i].grade==0){gra="学3"}
        else if(st_data.students[i].grade==1){gra="学4"}
        else if(st_data.students[i].grade==2){gra="修1"}
        else if(st_data.students[i].grade==3){gra="修2"}
        else if(st_data.students[i].grade==4){gra="博1"}
        else if(st_data.students[i].grade==5){gra="博2"}
        else if(st_data.students[i].grade==6){gra="博3"}
        str+='<div id="member_n2" class="member_n page_container">'+gra+'</div>';
        var remain;
        if(st_data.students[i].grade==0||st_data.students[i].grade==1){remain=600-st_data.students[i].course_t;}
        else if(st_data.students[i].grade==2||st_data.students[i].grade==3){remain=900-st_data.students[i].course_t;}
        else if(st_data.students[i].grade==4||st_data.students[i].grade==5||st_data.students[i].grade==6){remain=1200-st_data.students[i].course_t;}
        if(remain==-1){
            str+='<div id="member_n4" class="member_n page_container"style="font-size:8px;">相談待ち</div>';
        }else{
            str+='<div id="member_n4" class="member_n page_container">next: '+toHms(remain)+'</div>';
        }
        str+='<div id="member_border" class="member_n page_container"></div>';
        var mr,mk,mc;
        for(var j=0;j<st_data.students[i].status.length;j++){
            if(st_data.students[i].status[j]<25){
                if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
            }else if(st_data.students[i].status[j]>=25&&st_data.students[i].status[j]<45){
                if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
            }else if(st_data.students[i].status[j]>=45&&st_data.students[i].status[j]<65){
                if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
            }else if(st_data.students[i].status[j]>=65&&st_data.students[i].status[j]<85){
                if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
            }else if(st_data.students[i].status[j]>=85&&st_data.students[i].status[j]<105){
                if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
            }else if(st_data.students[i].status[j]>=105&&st_data.students[i].status[j]<120){
                if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
            }else if(st_data.students[i].status[j]>=120){
                if(j==0){mr="S";}else if(j==1){mk="S";}else if(j==2){mc="S";}
            }
        }

        str+='<div id="member_n31" class="member_n page_container">論: '+mr+'</div>';
        str+='<div id="member_n32" class="member_n page_container">開: '+mk+'</div>';
        str+='<div id="member_n33" class="member_n page_container">コ: '+mc+'</div>';
        str+='<div id="member_n5" class="member_n page_container">'+st_data.students[i].collabo+'</div>';
        str+='</div>';
        str+='</a>';
        $("#member_list").append(str);
    }

    if(st_data.students.length<6){
        var str2="";
        str2+='<a id="add_a"  href="#" onclick="add_stu_parent('+st_data.students.length+'); return false;">';
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


var effect_detail_num=0;
function stu_detail_(num){
    var str="";
    str+='<div id="f_1" class="page_container" style="background-image:url('+st_data.students[num].pic+');"></div>';
    str+='<div id="f_2" class="page_container">'+st_data.students[num].name+'</div>';
    str+='<div id="f_3" class="page_container">&nbsp;性格 num'+st_data.students[num].personality+'</div>';
    str+='<div id="f_4" class="page_container">&nbsp;得意分野 num'+st_data.students[num].speciality+'</div>';
    var gra="";
    if(st_data.students[num].grade==0){gra="学士3年"}
    else if(st_data.students[num].grade==1){gra="学士4年"}
    else if(st_data.students[num].grade==2){gra="修士1年"}
    else if(st_data.students[num].grade==3){gra="修士2年"}
    else if(st_data.students[num].grade==4){gra="博士1年"}
    else if(st_data.students[num].grade==5){gra="博士2年"}
    else if(st_data.students[num].grade==6){gra="博士3年"}
    str+='<div id="f_5" class="page_container">'+gra+'</div>';
    var mr,mk,mc;
    for(var j=0;j<st_data.students[num].status.length;j++){
        if(st_data.students[num].status[j]<25){
            if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
        }else if(st_data.students[num].status[j]>=25&&st_data.students[num].status[j]<45){
            if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
        }else if(st_data.students[num].status[j]>=45&&st_data.students[num].status[j]<65){
            if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
        }else if(st_data.students[num].status[j]>=65&&st_data.students[num].status[j]<85){
            if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
        }else if(st_data.students[num].status[j]>=85&&st_data.students[num].status[j]<105){
            if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
        }else if(st_data.students[num].status[j]>=105&&st_data.students[num].status[j]<120){
            if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
        }else if(st_data.students[num].status[j]>=120){
            if(j==0){mr="S";}else if(j==1){mk="S";}else if(j==2){mc="S";}
        }
    }
    str+='<div id="f_61" class="page_container">';
    str+='<div id="f_611" class="param1 page_container">&nbsp;論理力</div>';
    str+='<div id="f_612" class="param2 page_container">'+mr+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[0]+')</div></div>';
    str+='<div id="f_613" class="param3 page_container">&nbsp;作成する論文の質</div>';
    str+='<a href="#" onclick="use_item('+num+',0); return false;">';
    str+='<div id="use_item" class="use_button page_container">+</div>';
    str+='</a>';
    str+='</div>';
    str+='<div id="f_62" class="page_container">';
    str+='<div id="f_621" class="param1 page_container">&nbsp;開発力</div>';
    str+='<div id="f_622" class="param2 page_container">'+mk+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[1]+')</div></div>';
    str+='<div id="f_623" class="param3 page_container">&nbsp;論文を作成する速度</div>';
    str+='<a href="#" onclick="use_item('+num+',1); return false;">';
    str+='<div id="use_item" class="use_button page_container">+</div>';
    str+='</a>';
    str+='</div>';
    str+='<div id="f_63" class="page_container">';
    str+='<div id="f_631" class="param1 page_container">&nbsp;コミュ力</div>';
    str+='<div id="f_632" class="param2 page_container">'+mc+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[2]+')</div></div>';
    str+='<div id="f_633" class="param3 page_container">&nbsp;共同研究に関係</div>';
    str+='<a href="#" onclick="use_item('+num+',2); return false;">';
    str+='<div id="use_item" class="use_button page_container">+</div>';
    str+='</a>';
    str+='</div>';

    str+='<div id="f_7" class="page_container">';
    str+='<div id="f_71" class="param1 page_container">&nbsp;所持スキル</div>';

    str+='<a href="#" onclick="effect_detail('+num+',0); return false;">';
    str+='<div id="f_72" class="skills page_container">';
    str+='<div id="f_721" class="skills_1 page_container">&nbsp;スキル1:</div>';
    str+='<div id="f_722" class="skills_2 page_container">&nbsp;num '+st_data.students[num].skill[0]+'</div>';
    str+='</div>';
    str+='</a>';

    var skill_v=false;
    if(st_data.students[num].skill[1]==0){
        str+='<div id="f_73" class="skills page_container">';
        str+='<a href="#" onclick="use_item('+num+',3); return false;">';
        str+='<div id="use_item" class="use_button2 page_container">スキル追加</div>';
        str+='</a>';
        str+='</div>';
        skill_v=true;
    }else{
        str+='<a href="#" onclick="effect_detail('+num+',1); return false;">';
        str+='<div id="f_73" class="skills page_container">';
        str+='<div id="f_721" class="skills_1 page_container">&nbsp;スキル2:</div>';
        str+='<div id="f_722" class="skills_2 page_container">&nbsp;num '+st_data.students[num].skill[1]+'</div>';
        str+='</div>';
        str+='</a>';
    }

    if(st_data.students[num].skill[2]==0){
        if(skill_v==false){
            str+='<div id="f_74" class="skills page_container">';
            str+='<a href="#" onclick="use_item('+num+',3); return false;">';
            str+='<div id="use_item" class="use_button2 page_container">スキル追加</div>';
            str+='</a>';
            str+='</div>';
        }
    }else{
        str+='<a href="#" onclick="effect_detail('+num+',2); return false;">';
        str+='<div id="f_74" class="skills page_container">';
        str+='<div id="f_721" class="skills_1 page_container">&nbsp;スキル3:</div>';
        str+='<div id="f_722" class="skills_2 page_container">&nbsp;num '+st_data.students[num].skill[2]+'</div>';
        str+='</div>';
        str+='</a>';
    }
    //最初は0
    str+='<div id="f_75" class="skills page_container">効果: '+effect_detail_num+' '+st_data.students[num].skill[effect_detail_num]+'</div>';
    str+='</div>';



    var remain;
    if(st_data.students[num].grade==0||st_data.students[num].grade==1){remain=600-st_data.students[num].course_t;}
    else if(st_data.students[num].grade==2||st_data.students[num].grade==3){remain=900-st_data.students[num].course_t;}
    else if(st_data.students[num].grade==4||st_data.students[num].grade==5||st_data.students[num].grade==6){remain=1200-st_data.students[num].course_t;}
    if(remain==-1){
        str+='<a href="#" onclick="counseling('+num+'); return false;">';
        str+='<div id="f_8" class="page_container" style="background:yellow;">相談待ち</div>';
        str+='</a>';
    }else{
        str+='<div id="f_8" class="page_container">'+toHms(remain)+'</div>';
    }
    str+='<div id="f_81" class="page_container">次のレベルまで</div>';
    str+='<div id="f_9" class="page_container">/num '+st_data.students[num].collabo+'</div>';


    $("#float_body").append(str);
}

function effect_detail(s_num,num){
    effect_detail_num=num;
    $('#f_75').text('効果: '+num+' '+st_data.students[s_num].skill[num]);
}


var now_num=0;
function stu_detail(num){
    now_num=num;
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    stu_detail_(num);

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


var input_num=1;
var input_num_s=0;
//アイテム使用float
function use_item(s_num,num){
    $("#all_contents").append("<div id='floating2' class='page_container'></div>");
    $("#floating2").hide().append("<div id='float_body2'></div><div id='float_back2'></div>");

    var str="";

    //3種パラメータ
    if(num==0||num==1||num==2){
        if(user_data.item_param[num]==0){
            str+='<div id="use_i3" class="use_is in_float page_container">アイテムを持っていません！</div>';
        }else{
            str+='<form id="gi_form">';
            str+='<div id="use_i1" class="use_is in_float page_container">アイテム'+num+'を</div>';
            str+='<div id="item_value1" class="use_item_s page_container"><label><select name="p1" onchange="inputfunc('+s_num+','+num+')">';
            str+='<option value="1" selected>1コ</option>';
            if(user_data.item_param[num]<6){
                for(var i=2;i<=user_data.item_param[num];i++){
                    str+='<option value="'+i+'">'+i+'コ</option>';
                }
            }
            else if(user_data.item_param[num]>=6&&user_data.item_param[num]<=10){
                for(var i=2;i<=5;i++){
                    str+='<option value="'+i+'">'+i+'コ</option>';
                }
                str+='<option value="'+user_data.item_param[num]+'">'+user_data.item_param[num]+'コ</option>';
            }else if(user_data.item_param[num]>=11){
                for(var i=2;i<=5;i++){
                    str+='<option value="'+i+'">'+i+'コ</option>';
                }
                str+='<option value="10">10コ</option>';
                str+='<option value="'+user_data.item_param[num]+'">'+user_data.item_param[num]+'コ</option>';
            }
            str+='</select></label></div>';

            str+='<div id="use_i2" class="use_is in_float page_container">使います</div>';
            if(num==0){str+='<div id="use_i6" class="use_is in_float page_container">論理力:&nbsp;&nbsp;'+st_data.students[s_num].status[0]+'&nbsp;→&nbsp;<span id="how_item_val" style="color:red;margin:2px;">'+(st_data.students[s_num].status[0]+input_num)+'</div></div>';}
            if(num==1){str+='<div id="use_i6" class="use_is in_float page_container">開発力:&nbsp;&nbsp;'+st_data.students[s_num].status[1]+'&nbsp;→&nbsp;<span id="how_item_val" style="color:red;margin:2px;">'+(st_data.students[s_num].status[1]+input_num)+'</div></div>';}
            if(num==2){str+='<div id="use_i6" class="use_is in_float page_container">コミュ力:&nbsp;&nbsp;'+st_data.students[s_num].status[2]+'&nbsp;→&nbsp;<span id="how_item_val" style="color:red;margin:2px;">'+(st_data.students[s_num].status[2]+input_num)+'</div></div>';}
            str+='<a href="#" onclick="use_item_run1('+s_num+','+num+'); return false;">';
            str+='<div id="use_i4" class="use_is in_float page_container">はい</div>';
            str+='</a>';
            str+='<div id="use_i5" class="use_is in_float page_container">いいえ</div>';
            str+='</form>';
        }

    //スキル追加
    }else if(num==3){
        input_num_s=user_data.item_skill[0];
        str+='<form id="gi_form2">';
        str+='<div id="use_i7" class="use_is in_float page_container">スキル:</div>';
        str+='<div id="item_value2" class="use_item_s2 page_container"><label><select name="p2" onchange="inputfunc2()">';
        for(var i=0;i<user_data.item_skill.length;i++){
            str+='<option value="'+user_data.item_skill[i]+'">スキルスキルスキル'+user_data.item_skill[i]+'</option>';
        }
        str+='</select></label></div>';
        str+='<div id="use_i8" class="use_is in_float page_container">効果:&nbsp;<span id="how_skill_e">effect-effect-effect'+input_num_s+'</div></div>';
        str+='<div id="use_i9" class="use_is in_float page_container">を継承します</div>';

        str+='<a href="#" onclick="use_item_run2('+s_num+'); return false;">';
        str+='<div id="use_i4" class="use_is in_float page_container">はい</div>';
        str+='</a>';
        str+='<div id="use_i5" class="use_is in_float page_container">いいえ</div>';
        str+='</form>';
    }





    $("#float_body2").append(str);

    $("#float_back2").css({
        "opacity":"0.7"
    });
    $("#floating2").delay(0).fadeIn(0);
    float_open_flag = 1;
    $("#float_back2, #use_i5").click(float_close2);

}
var float_close2 = function(){
    $("#floating2").remove();
};
function inputfunc(s_num,num){
    var frm=document.forms["gi_form"];
    var idx=frm.elements["p1"].selectedIndex;
    input_num=Number(frm.elements["p1"].options[idx].value);
    $('#how_item_val').text(st_data.students[s_num].status[num]+input_num);
}
function use_item_run1(s_num,num){
    st_data.students[s_num].status[num]+=input_num;
    user_data.item_param[num]-=input_num;
    input_num=1;
    float_close2();
}
function inputfunc2(){
    var frm=document.forms["gi_form2"];
    var idx=frm.elements["p2"].selectedIndex;
    input_num_s=Number(frm.elements["p2"].options[idx].value);
    $('#how_skill_e').text("effect-effect-effect"+input_num_s);
}
function use_item_run2(s_num){
    var use_c=false;
    for(var i=0;st_data.students[s_num].skill.length;i++){
        if(st_data.students[s_num].skill[i]==0){
            st_data.students[s_num].skill[i]=input_num_s;
            use_c=true;
            break;
        }
    }
    if(use_c==true){
        for(var i=0;i<user_data.item_skill.length;i++){
            if(input_num_s==user_data.item_skill[i]){
                user_data.item_skill.splice(i, 1);
                break;
            }
        }
    }
    input_num_s=0;
    float_close2();
}

//進路相談
function counseling(s_num){
    $("#all_contents").append("<div id='floating2' class='page_container'></div>");
    $("#floating2").hide().append("<div id='float_body2'></div><div id='float_back2'></div>");

    var str="";

    str+='<div id="coun1" class="in_float page_container">'+st_data.students[s_num].name+' さんが進路相談に来ました</div>';
    str+='<a href="#" onclick="career('+s_num+',0); return false;">';
    str+='<div id="coun2" class="use_is in_float page_container">進学しなさい！</div>';
    str+='</a>';
    str+='<a href="#" onclick="career('+s_num+',1); return false;">';
    str+='<div id="coun3" class="use_is in_float page_container">卒業しなさい！</div>';
    str+='</a>';


    $("#float_body2").append(str);

    $("#floating2").append("<a href='#' id='info_batu2'></a>");

    $("#float_back2").css({
        "opacity":"0.7"
    });
    $("#floating2").delay(0).fadeIn(0);
    float_open_flag = 1;
    $("#float_back2, #info_batu2").click(float_close2);

}
var float_close2 = function(){
    $("#floating2").remove();
};
function career(s_num,c){
    var ca_name=st_data.students[s_num].name;
    window.parent.career_m(s_num,c);
    $("#float_body2").empty();

    var str="";
    if(c==0){ //進学
        if(st_data.students[s_num].grade==2){
            str+='<div id="coun4" class="in_float page_container">'+ca_name+' さんが修士過程に進学しました！</div>';
        }else if(st_data.students[s_num].grade==4){
            str+='<div id="coun4" class="in_float page_container">'+ca_name+' さんが博士過程に進学しました！</div>';
        }
        str+='<div id="coun5" class="use_is in_float page_container">確認</div>';
    }else if(c==1){ //卒業
        str+='<div id="coun4" class="in_float page_container">'+ca_name+' さんは卒業していきました…</div>';
        float_close();
    }

    $("#float_body2").append(str);
    $("#coun5").click(float_close2);

}




function oya(){
    $("#member_list").empty();
    show_students();
    $("#float_body").empty();
    stu_detail_(now_num);

    //$('#member_1 #member_n1').text('a');
}


//-->
