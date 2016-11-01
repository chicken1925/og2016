<!--

var hh;
var student_data;
var user_data;

//初期処理
window.addEventListener("load", function(){
    student_data = window.parent.back_stu_data();
    user_data = window.parent.back_user_data();
    hh= window.parent.box_size();
    window.parent.frame_num(3);
    $("#all_contents").css("height", hh+"px");

    show_event();

}, false);

function show_event(){
    str="";
    str+='<div id="event" class="quest_list page_container">';
    str+='<div id="e_1" class="quest_s page_container">第N回 Enterteinment Conputing</div>';
    str+='<div id="e_2" class="quest_s page_container">様々なジャンルの研究が集い、世界でその名前を知らない人はいない程の超有名な学会。Awardの賞金も非常に高額!!</div>';
    str+='<div id="e_3" class="quest_s page_container">参加〆切: 11/12(金) ~16:30</div>';
    str+='<div id="e_4" class="quest_s page_container">結果発表: イベントラボ・ステージにて、16:50~</div>';
    str+='<div id="award_box" class="quest_s page_container">';
    str+='<div id="aw_t" class="quest_s page_container">&nbsp;賞金 (各分野ごと)</div>';
    str+='<div id="aw_1" class="aw_s quest_s page_container"><span id="aw_11">Gold Award(3名)</span><span id="aw_12">-></span><span id="aw_13">¥100,000,000</span></div>';
    str+='<div id="aw_2" class="aw_s quest_s page_container"><span id="aw_11">Silver Award(5名)</span><span id="aw_12">-></span><span id="aw_13">¥50,000,000</span></div>';
    str+='<div id="aw_3" class="aw_s quest_s page_container"><span id="aw_11">Bronze Award(10名)</span><span id="aw_12">-></span><span id="aw_13">¥10,000,000</span></div>';
    str+='</div>';
    str+='</div>';

    $("#all_contents").append(str);

    //暫定
    var show_re=true;
    var re_n=0;
    for(var i=0;i<student_data.students.length;i++){
        if(student_data.students[i].collabo==2){
            show_re=false;
            re_n=i;
        }
    }
    if(show_re==true){
        show_registration();
    }else{
        show_registu(re_n);
    }
}
function show_registration(){
    str="";

    str+="<a href='#' onclick='regi_ch(0); return false;'>";
    str+='<div id="regi_ch1" class="regi quest_list page_container">';
    str+='<div id="re_1" class="quest_s page_container"></div>';
    str+='<div id="re_2" class="quest_s page_container">ロングペーパー</div>';
    str+='<div id="re_3" class="quest_s page_container">で参加</div>';
    str+='</div></a>';
    str+="<a href='#' onclick='regi_ch(1); return false;'>";
    str+='<div id="regi_ch2" class="regi quest_list page_container">';
    str+='<div id="re_1" class="quest_s page_container"></div>';
    str+='<div id="re_2" class="quest_s page_container">ショートペーパー</div>';
    str+='<div id="re_3" class="quest_s page_container">で参加</div>';
    str+='</div></a>';
    str+="<a href='#' onclick='regi_ch(2); return false;'>";
    str+='<div id="regi_ch3" class="regi quest_list page_container">';
    str+='<div id="re_1" class="quest_s page_container"></div>';
    str+='<div id="re_2" class="quest_s page_container">デモ展示</div>';
    str+='<div id="re_3" class="quest_s page_container">で参加</div>';
    str+='</div></a>';

    $("#all_contents").append(str);
}
function show_registu(n){
    var str="";
    str+='<div id="q_mbox_" class="quest_s page_container">';
    str+='<div id="q_m1" class="quest_s page_container" style="background-image:url('+student_data.students[n].pic+');"></div>';
    str+='<div id="q_m2" class="quest_s page_container">'+student_data.students[n].name+'</div>';
    var gra="";
    if(student_data.students[n].grade==0){gra="学士3年"}
    else if(student_data.students[n].grade==1){gra="学士4年"}
    else if(student_data.students[n].grade==2){gra="修士1年"}
    else if(student_data.students[n].grade==3){gra="修士2年"}
    else if(student_data.students[n].grade==4){gra="博士1年"}
    else if(student_data.students[n].grade==5){gra="博士2年"}
    else if(student_data.students[n].grade==6){gra="博士3年"}
    str+='<div id="q_m3" class="quest_s page_container">/'+gra+'</div>';

    var per="";
    if(student_data.students[n].personality==0){per="慎重"}
    else if(student_data.students[n].personality==1){per="大人しい"}
    else if(student_data.students[n].personality==2){per="せっかち"}
    else if(student_data.students[n].personality==3){per="臆病"}
    else if(student_data.students[n].personality==4){per="やんちゃ"}
    else if(student_data.students[n].personality==5){per="勇敢"}
    else if(student_data.students[n].personality==6){per="天才肌"}
    str+='<div id="q_m4" class="quest_s page_container">性格:&nbsp;'+per+'</div>';
    str+='<div id="q_m5" class="quest_s page_container">得意分野:&nbsp;num'+student_data.students[n].speciality+'</div>';
    var mr,mk,mc;
    for(var j=0;j<student_data.students[n].status.length;j++){
        if(calc_param(n)[j]<25){
            if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
        }else if(calc_param(n)[j]>=25&&calc_param(n)[j]<45){
            if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
        }else if(calc_param(n)[j]>=45&&calc_param(n)[j]<65){
            if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
        }else if(calc_param(n)[j]>=65&&calc_param(n)[j]<85){
            if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
        }else if(calc_param(n)[j]>=85&&calc_param(n)[j]<105){
            if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
        }else if(calc_param(n)[j]>=105&&calc_param(n)[j]<120){
            if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
        }else if(calc_param(n)[j]>=120){
            if(j==0){mr="S";}else if(j==1){mk="S";}else if(j==2){mc="S";}
        }
    }
    str+='<div id="q_m6" class="quest_s page_container">論:&nbsp;'+mr+'</div>';
    str+='<div id="q_m7" class="quest_s page_container">開:&nbsp;'+mk+'</div>';
    str+='<div id="q_m8" class="quest_s page_container">コ:&nbsp;'+mc+'</div>';
    str+='</div>';
    $("#all_contents").append(str);
}







function regi_ch(n){
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list2 in_float page_container">';
    str+='<div id="q_1" class="quest_s page_container">第N回 Enterteinment Conputing</div>';
    if(n==0){str+='<div id="q_3" class="quest_s page_container" style="color:#558888">ロングペーパー 部門</div>';}
    if(n==1){str+='<div id="q_3" class="quest_s page_container" style="color:#885588">ショートペーパー 部門</div>';}
    if(n==2){str+='<div id="q_3" class="quest_s page_container" style="color:#888855">デモ展示 部門</div>';}
    str+='</div>';

    str+='<form id="gi_form3">';
    str+='<div class="mem_ratio">';
    for(var i=0;i<student_data.students.length;i++){
        if(student_data.students[i].collabo==0){str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" onclick="selfunc('+i+')">'; str+='<label id="sel_label'+i+'" for="select'+i+'">';}
        else{str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" disabled="disabled">'; str+='<label id="sel_label'+i+'" for="select'+i+'" style="background: #888;">';}
        str+='<img src="'+student_data.students[i].pic+'" width=28 height=28 style="top:5px; position:relative;"></img>';
        str+='<div style="top:10px; position:relative;">'+student_data.students[i].name+'</div>';
        str+='</label>';
    }
    str+='</div>';
    str+='</form>';

    str+='<div id="q_mbox" class="quest_s page_container">';
    str+='</div>';

    str+='<a href="#" onclick="float_ch('+n+'); return false;">';
    str+='<div id="float_choice" class="page_container">';
    str+='実行！';
    str+='</div>';
    str+='</a>';



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
function selfunc(n){
    $("#q_mbox").empty();
    var str="";
    str+='<div id="q_m1" class="quest_s page_container" style="background-image:url('+student_data.students[n].pic+');"></div>';
    str+='<div id="q_m2" class="quest_s page_container">'+student_data.students[n].name+'</div>';
    var gra="";
    if(student_data.students[n].grade==0){gra="学士3年"}
    else if(student_data.students[n].grade==1){gra="学士4年"}
    else if(student_data.students[n].grade==2){gra="修士1年"}
    else if(student_data.students[n].grade==3){gra="修士2年"}
    else if(student_data.students[n].grade==4){gra="博士1年"}
    else if(student_data.students[n].grade==5){gra="博士2年"}
    else if(student_data.students[n].grade==6){gra="博士3年"}
    str+='<div id="q_m3" class="quest_s page_container">/'+gra+'</div>';
    var per="";
    if(student_data.students[n].personality==0){per="慎重"}
    else if(student_data.students[n].personality==1){per="大人しい"}
    else if(student_data.students[n].personality==2){per="せっかち"}
    else if(student_data.students[n].personality==3){per="臆病"}
    else if(student_data.students[n].personality==4){per="やんちゃ"}
    else if(student_data.students[n].personality==5){per="勇敢"}
    else if(student_data.students[n].personality==6){per="天才肌"}
    str+='<div id="q_m4" class="quest_s page_container">性格:&nbsp;'+per+'</div>';
    str+='<div id="q_m5" class="quest_s page_container">得意分野:&nbsp;num'+student_data.students[n].speciality+'</div>';
    var mr,mk,mc;
    for(var j=0;j<student_data.students[n].status.length;j++){
        if(calc_param(n)[j]<25){
            if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
        }else if(calc_param(n)[j]>=25&&calc_param(n)[j]<45){
            if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
        }else if(calc_param(n)[j]>=45&&calc_param(n)[j]<65){
            if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
        }else if(calc_param(n)[j]>=65&&calc_param(n)[j]<85){
            if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
        }else if(calc_param(n)[j]>=85&&calc_param(n)[j]<105){
            if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
        }else if(calc_param(n)[j]>=105&&calc_param(n)[j]<120){
            if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
        }else if(calc_param(n)[j]>=120){
            if(j==0){mr="S";}else if(j==1){mk="S";}else if(j==2){mc="S";}
        }
    }
    str+='<div id="q_m6" class="quest_s page_container">論:&nbsp;'+mr+'</div>';
    str+='<div id="q_m7" class="quest_s page_container">開:&nbsp;'+mk+'</div>';
    str+='<div id="q_m8" class="quest_s page_container">コ:&nbsp;'+mc+'</div>';
    $("#q_mbox").append(str);
}




function float_ch(n){
    var val;
    var radioList = document.getElementsByName("s3");
    for(var i=0; i<radioList.length; i++){
        if (radioList[i].checked) {
            val=radioList[i].value;
            break;
        }
    }
    //hold_quest_api(user_data.uid,n,student_data.students[val].id);
    if(val!=undefined){
        $("#float_body").empty();
        $("#float_body").append("wait...");

        setTimeout(function(){
            show_key(val);
        }, 800);
    }

    //console.log(val);
}

function show_key(vl){
    //console.log(hold_val);

    if(hold_val!="ng"){
        window.parent.collabo_st(student_data.students[vl].id,2);
        float_close();
        $("#all_contents").empty();
        show_event();
    }else{
        $("#float_body").append("失敗しました<br>接続や設定を確認してください");
        setTimeout(function(){
            location.href = "collabo.html";
        }, 2000);
    }
}



//スキルパラメータ計算
function calc_param(s_num){
    //↓最高に謎
    var nstatus=[student_data.students[s_num].status[0],student_data.students[s_num].status[1],student_data.students[s_num].status[2]];

    for(var i=0;i<student_data.students[s_num].skill.length;i++){
        if(Math.floor(student_data.students[s_num].skill[i]/10)==11){nstatus[0]=Math.ceil(nstatus[0]*1.2);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==12){nstatus[0]=Math.ceil(nstatus[0]*1.3); nstatus[1]=Math.ceil(nstatus[1]*0.8);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==13){nstatus[0]=Math.ceil(nstatus[0]*1.3); nstatus[2]=Math.ceil(nstatus[2]*0.8);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==21){nstatus[1]=Math.ceil(nstatus[1]*1.2);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==22){nstatus[1]=Math.ceil(nstatus[1]*1.3); nstatus[0]=Math.ceil(nstatus[0]*0.8);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==23){nstatus[1]=Math.ceil(nstatus[1]*1.3); nstatus[2]=Math.ceil(nstatus[2]*0.8);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==31){nstatus[2]=Math.ceil(nstatus[2]*1.2);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==32){nstatus[2]=Math.ceil(nstatus[2]*1.3); nstatus[0]=Math.ceil(nstatus[0]*0.8);}
        if(Math.floor(student_data.students[s_num].skill[i]/10)==33){nstatus[2]=Math.ceil(nstatus[2]*1.3); nstatus[1]=Math.ceil(nstatus[1]*0.8);}
    }


    for(var i=0;i<student_data.students.length;i++){
        for(var j=0;j<student_data.students[i].skill.length;j++){
            if(Math.floor(student_data.students[i].skill[j]/10)==14){nstatus[0]=Math.ceil(nstatus[0]*1.1);}
            if(Math.floor(student_data.students[i].skill[j]/10)==24){nstatus[1]=Math.ceil(nstatus[1]*1.1);}
            if(Math.floor(student_data.students[i].skill[j]/10)==34){nstatus[2]=Math.ceil(nstatus[2]*1.1);}
        }
    }

    return nstatus;
}


//-->
