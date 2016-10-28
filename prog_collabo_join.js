<!--

var st_data;
var user_data;

//初期処理
window.addEventListener("load", function(){
    user_data = window.parent.back_user_data();
    st_data = window.parent.back_stu_data();
    var hh= window.parent.box_size();
    $("#all_contents").css("height", hh+"px");

    //console.log(st_data.students[0].name);

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
    str+='<div id="q_2" class="quest_s" style="width:245px;">野草のとり方の研究 (必要人数n人)</div>';
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
    str+='<div id="q_2_" class="quest_s" style="width:245px;">野草のとり方の研究 (必要人数n人)</div>';
    str+='<div id="q_3_" class="quest_s" style="width:115px;">所要時間n分</div>';
    str+='</div>';

    str+='<form id="gi_form3">';
    str+='<div class="mem_ratio">';
    for(var i=0;i<st_data.students.length;i++){
        if(st_data.students[i].collabo==0){str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" onclick="selfunc('+i+')">';}
        else{str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" disabled="disabled">';}
        str+='<label id="sel_label'+i+'" for="select'+i+'">';
        str+='<img src="'+st_data.students[i].pic+'" width=28 height=28 style="top:5px; position:relative;"></img>';
        str+='<div style="top:10px; position:relative;">'+st_data.students[i].name+'</div>';
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
    str+='<div id="q_m1" class="quest_s" style="background-image:url('+st_data.students[n].pic+');"></div>';
    str+='<div id="q_m2" class="quest_s">'+st_data.students[n].name+'</div>';
    var gra="";
    if(st_data.students[n].grade==0){gra="学士3年"}
    else if(st_data.students[n].grade==1){gra="学士4年"}
    else if(st_data.students[n].grade==2){gra="修士1年"}
    else if(st_data.students[n].grade==3){gra="修士2年"}
    else if(st_data.students[n].grade==4){gra="博士1年"}
    else if(st_data.students[n].grade==5){gra="博士2年"}
    else if(st_data.students[n].grade==6){gra="博士3年"}
    str+='<div id="q_m3" class="quest_s">/'+gra+'</div>';
    str+='<div id="q_m4" class="quest_s">性格:&nbsp;num'+st_data.students[n].personality+'</div>';
    str+='<div id="q_m5" class="quest_s">得意分野:&nbsp;num'+st_data.students[n].speciality+'</div>';
    var mr,mk,mc;
    for(var j=0;j<st_data.students[n].status.length;j++){
        if(st_data.students[n].status[j]<25){
            if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
        }else if(st_data.students[n].status[j]>=25&&st_data.students[n].status[j]<45){
            if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
        }else if(st_data.students[n].status[j]>=45&&st_data.students[n].status[j]<65){
            if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
        }else if(st_data.students[n].status[j]>=65&&st_data.students[n].status[j]<85){
            if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
        }else if(st_data.students[n].status[j]>=85&&st_data.students[n].status[j]<105){
            if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
        }else if(st_data.students[n].status[j]>=105&&st_data.students[n].status[j]<120){
            if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
        }else if(st_data.students[n].status[j]>=120){
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

    join_request_api(user_data.uid,st_data.students[val].id,req_join_id);

    setTimeout(function(){
        if(join_request_val.message=="done"){
            $("#float_body").empty();
            $("#float_body").append('<div id="f_text1" class="float_text in_float page_container">共同研究に<br>参加しました！</div>');
        }else{
            $("#float_body").empty();
            $("#float_body").append('<div id="f_text2" class="float_text in_float page_container">失敗しました</div>');
        }
    }, 800);

}




//-->
