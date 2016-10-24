<!--

var student_data;
var user_data;

//初期処理
window.addEventListener("load", function(){
    student_data = window.parent.back_stu_data();
    user_data = window.parent.back_user_data();
    var hh= window.parent.box_size();
    $("#all_contents").css("height", hh+"px");
    $("#collabo_list").css("height", (hh-75)+"px");

    //console.log(student_data.students[0].name);
    quest_request();

}, false);

function quest_request(){
    $("#collabo_list").empty();
    $("#collabo_list").append("wait...");

    quest_list_api(user_data.uid);

    setTimeout(function(){
        show_quest_list()
    }, 800);

}

function show_quest_list(){
    $("#collabo_list").empty();

    var str="";

    if(quest_list_val!="ng"){
        var c=0;
        for(var i in quest_list_val){
            str+="<a href='#' onclick='quest_detail(\""+i+"\"); return false;'>";
            str+='<div id="in_quest" class="quest_list in_float page_container" style="top:'+(65*c)+'px">';
            str+='<div id="quest_num" class="quest_s">ID: '+i+' '+ Math.round((new Date().getTime()-quest_list_val[i].time)/1000) +'秒経過</div>';
            str+='<div id="quest_star" class="quest_s">Number: '+quest_list_val[i].quest_num+'</div>';
            str+='<div id="quest_title" class="quest_s">参加者-> ';
            for(var j=0;j<quest_list_val[i].userIDs.length;j++){
                str+= quest_list_val[i].userIDs[j]+'-'+quest_list_val[i].user_stuIDs[j]+' ';
            }
            str+='</div>';
            str+='</div>';
            str+='</a>';
            c++;
        }
    }else{
        str+="失敗しました。<br>ページを更新してください。"
    }

    $("#collabo_list").append(str);

}

function quest_detail(qid){
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list in_float page_container">';
    str+='<div id="quest_num" class="quest_s">ID: '+qid+'</div>';
    str+='<div id="quest_star" class="quest_s">Number: '+quest_list_val[qid].quest_num+'</div>';
    str+='<div id="quest_title" class="quest_s">参加者-> ';
    for(var j=0;j<quest_list_val[qid].userIDs.length;j++){
        str+= quest_list_val[qid].userIDs[j]+'-'+quest_list_val[qid].user_stuIDs[j]+' ';
    }
    str+='</div>';
    str+='</div>';

    //参加者とかカッコよく出すならここ

    //クエスト終了条件
    /*
    if(quest_list_val[qid].quest_num==0){if(quest_list_val[qid].userIDs.length>=2){questcheck=true;}}
    else if(quest_list_val[qid].quest_num==1){if(quest_list_val[qid].userIDs.length>=3){questcheck=true;}}
    else if(quest_list_val[qid].quest_num==2){if(quest_list_val[qid].userIDs.length>=3){questcheck=true;}}
    else if(quest_list_val[qid].quest_num==3){if(quest_list_val[qid].userIDs.length>=3){questcheck=true;}}
    else if(quest_list_val[qid].quest_num==4){if(quest_list_val[qid].userIDs.length>=4){questcheck=true;}}
    else if(quest_list_val[qid].quest_num==5){if(quest_list_val[qid].userIDs.length>=6){questcheck=true;}}
    */

    if(quest_list_val[qid].state==0){ //募集中
        str+='<div id="float_choice_n" class="float_choice page_container">';
        str+='募集中';
        str+='</div>';
    }else if(quest_list_val[qid].state==1){
        str+='<div id="float_choice_n" class="float_choice page_container">';
        str+='打ち合わせ中';
        str+='</div>';
    }else if(quest_list_val[qid].state==2){ //確認(失敗)
        str+="<a href='#' onclick='check_quest(\""+qid+"\"); return false;'>";
        str+='<div id="float_choice" class="float_choice page_container">';
        str+='確認!';
        str+='</div>';
        str+='</a>';
    }else if(quest_list_val[qid].state==3){
        str+='<div id="float_choice_n" class="float_choice page_container">';
        str+='作業中';
        str+='</div>';
    }else if(quest_list_val[qid].state==4){ //確認(成功)
        str+="<a href='#' onclick='check_quest(\""+qid+"\"); return false;'>";
        str+='<div id="float_choice" class="float_choice page_container">';
        str+='確認!';
        str+='</div>';
        str+='</a>';
    }


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
        quest_request();
        float_open_flag = 0;
    });
};

function check_quest(qid){
    check_quest_api(user_data.uid,qid);

    $("#float_body").empty();
    $("#float_body").append("wait...");

    setTimeout(function(){
        quest_result();
    }, 800);
    //console.log(val);
}

function quest_result(){
    //console.log(hold_val);
    $("#float_body").empty();

    if(check_quest_val!="ng"){
        var str="";

        str+='<div id="f_text1" class="float_text in_float page_container">共同研究が成功しました！</div>';
        str+='<div id="f_text2" class="float_text in_float page_container">報酬金: '+check_quest_val.reward_money+'</div>';
        str+='<div id="f_text3" class="float_text in_float page_container">報酬アイテム: '+check_quest_val.reward_item+'</div>';

        $("#float_body").append(str);
    }else{
        $("#float_body").append("失敗しました<br>接続や設定を確認してください");
        setTimeout(function(){
            location.href = "collabo.html";
        }, 2000);
    }
}




//-->
