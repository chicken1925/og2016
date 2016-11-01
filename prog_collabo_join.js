<!--

var student_data;
var user_data;

//初期処理
window.addEventListener("load", function(){
    user_data = window.parent.back_user_data();
    student_data = window.parent.back_stu_data();
    var hh= window.parent.box_size();
    window.parent.frame_num(6);
    $("#all_contents").css("height", hh+"px");

    //console.log(student_data.students[0].name);

}, false);

function search_quest(){
    //console.log(document.forms["join_f"].elements["quest_id_f"].value);
    $("#join_text2").remove();
    $("#all_contents").append('<div id="join_text2" class="j_texts page_container">検索中</div>');
    quest_search_api(user_data.uid,document.forms["join_f"].elements["quest_id_f"].value);
    setTimeout(function(){
        if(quest_search_val.message=="noquest"){
            $("#join_text2").remove();
            $("#all_contents").append('<div id="join_text2" class="j_texts page_container">共同研究が存在しません</div>');
        }else if(quest_search_val.message=="mine"){
            $("#join_text2").remove();
            $("#all_contents").append('<div id="join_text2" class="j_texts page_container">すでに参加済みです</div>');
        }else if(quest_search_val.message=="over"){
            $("#join_text2").remove();
            $("#all_contents").append('<div id="join_text2" class="j_texts page_container">参加人数が条件を満たしています</div>');
        }else{
            show_quest_result();
        }
    }, 800);
}
function show_quest_result(){
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list in_float page_container">';
    str+='<div id="q_1" class="quest_s">'+quest_search_val.quest_num+'</div>';
    var qn=0;
    if(quest_search_val.quest_num==0){qn=2;}
    else if(quest_search_val.quest_num==1){qn=3;}
    else if(quest_search_val.quest_num==2||quest_search_val.quest_num==3||quest_search_val.quest_num==4){qn=4;}
    else if(quest_search_val.quest_num==5){qn=6;}
    else if(quest_search_val.quest_num==6){qn=10;}
    else if(quest_search_val.quest_num==7){qn=100;}
    str+='<div id="q_2" class="quest_s">野草のとり方の研究 (必要人数'+qn+'人)</div>';
    str+='<div id="q_3" class="quest_s">ID: '+document.forms["join_f"].elements["quest_id_f"].value+'</div>';
    str+='<div id="q_4" class="quest_s" style="width:245px;">参加人数: '+quest_search_val.userIDs.length+'人</div>';
    str+='<div id="q_5" class="quest_s" style="width:120px;">所要時間n分</div>';
    str+='</div>';

    str+='<div id="q_box" class="quest_s">';
    str+='<div id="q_box_t" class="quest_s">&nbsp;参加メンバー</div>';
    str+='<div id="q_box_m" class="quest_s scrollbox">';
    for(var i=0;i<quest_search_val.userIDs.length;i++){
        if(i%2==0){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px;">';}
        else if(i%2==1){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px; background:#bbb;">';}
        str+='<div id="q_i1" class="quest_s">'+quest_search_val.userIDs[i]+'研&nbsp;'+quest_search_val.user_stuIDs[i]+'君</div>';
        str+='<div id="q_i2" class="quest_s">得意分野:&nbsp;△△△△△</div>';
        str+='<div id="q_i3" class="quest_s">ランク:&nbsp;論-F&nbsp;&nbsp;開-D&nbsp;&nbsp;コ-E</div>';
        str+='</div>';
    }
    str+='</div>';
    str+='</div>';

    str+="<a href='#' onclick='quest_join(\""+document.forms["join_f"].elements["quest_id_f"].value+"\"); return false;'>";
    str+='<div id="float_choice" class="page_container">';
    str+='参加する';
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
        $("#join_text2").remove();
        float_open_flag = 0;
    });
};


function quest_join(){
    $("#float_body").empty();

    var str="";

    str+='<div id="in_float_quest" class="quest_list_ in_float page_container">';
    str+='<div id="q_1_" class="quest_s">'+quest_search_val.quest_num+'</div>';
    var qn=0;
    if(quest_search_val.quest_num==0){qn=2;}
    else if(quest_search_val.quest_num==1){qn=3;}
    else if(quest_search_val.quest_num==2||quest_search_val.quest_num==3||quest_search_val.quest_num==4){qn=4;}
    else if(quest_search_val.quest_num==5){qn=6;}
    else if(quest_search_val.quest_num==6){qn=10;}
    else if(quest_search_val.quest_num==7){qn=100;}
    str+='<div id="q_2" class="quest_s">野草のとり方の研究 (必要人数'+qn+'人)</div>';
    str+='<div id="q_3_" class="quest_s" style="width:115px;">所要時間n分</div>';
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

    str+='<div id="q_mbox" class="quest_s">';
    str+='</div>';

    str+="<a href='#' onclick='join_request(\""+document.forms["join_f"].elements["quest_id_f"].value+"\"); return false;'>";
    //str+='<a href="#" onclick="join_request('+document.forms["join_f"].elements["quest_id_f"].value+'); return false;">';
    str+='<div id="float_choice" class="page_container">';
    str+='送り込む！';
    str+='</div>';
    str+='</a>';

    $("#float_body").append(str);
}
function selfunc(n){
    $("#q_mbox").empty();
    var str="";
    str+='<div id="q_m1" class="quest_s" style="background-image:url('+student_data.students[n].pic+');"></div>';
    str+='<div id="q_m2" class="quest_s">'+student_data.students[n].name+'</div>';
    var gra="";
    if(student_data.students[n].grade==0){gra="学士3年"}
    else if(student_data.students[n].grade==1){gra="学士4年"}
    else if(student_data.students[n].grade==2){gra="修士1年"}
    else if(student_data.students[n].grade==3){gra="修士2年"}
    else if(student_data.students[n].grade==4){gra="博士1年"}
    else if(student_data.students[n].grade==5){gra="博士2年"}
    else if(student_data.students[n].grade==6){gra="博士3年"}
    str+='<div id="q_m3" class="quest_s">/'+gra+'</div>';

    var per="";
    if(student_data.students[n].personality==0){per="慎重"}
    else if(student_data.students[n].personality==1){per="大人しい"}
    else if(student_data.students[n].personality==2){per="せっかち"}
    else if(student_data.students[n].personality==3){per="臆病"}
    else if(student_data.students[n].personality==4){per="やんちゃ"}
    else if(student_data.students[n].personality==5){per="勇敢"}
    else if(student_data.students[n].personality==6){per="天才肌"}
    str+='<div id="q_m4" class="quest_s">性格:&nbsp;'+per+'</div>';
    str+='<div id="q_m5" class="quest_s">得意分野:&nbsp;num'+student_data.students[n].speciality+'</div>';
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
    str+='<div id="q_m6" class="quest_s">論:&nbsp;'+mr+'</div>';
    str+='<div id="q_m7" class="quest_s">開:&nbsp;'+mk+'</div>';
    str+='<div id="q_m8" class="quest_s">コ:&nbsp;'+mc+'</div>';
    $("#q_mbox").append(str);
}



function join_request(req_join_id){
    var val;
    var radioList = document.getElementsByName("s3");
    for(var i=0; i<radioList.length; i++){
        if (radioList[i].checked) {
            val=radioList[i].value;
            break;
        }
    }

    join_request_api(user_data.uid,student_data.students[val].id,req_join_id);
    $('#float_choice').remove();

    setTimeout(function(){
        if(join_request_val.message=="done"){
            window.parent.collabo_st(student_data.students[val].id,1);
            $("#float_body").empty();
            $("#float_body").append('<div id="f_text1" class="float_text in_float page_container">共同研究に<br>参加しました！</div>');
        }else{
            $("#float_body").empty();
            $("#float_body").append('<div id="f_text2" class="float_text in_float page_container">失敗しました</div>');
        }
    }, 800);

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
