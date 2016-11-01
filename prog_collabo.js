<!--

var student_data;
var user_data;

//初期処理
window.addEventListener("load", function(){
    student_data = window.parent.back_stu_data();
    user_data = window.parent.back_user_data();
    var hh= window.parent.box_size();
    window.parent.frame_num(2);
    $("#all_contents").css("height", hh+"px");
    $("#collabo_list").css("height", (hh-75)+"px");

    //console.log(student_data.students[0].name);
    quest_request();

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
        hms ="0:"+ padZero(s) + "";
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
            str+='<div id="in_quest'+c+'" class="quest_list in_float page_container" style="top:'+(65*c)+'px">';
            str+='<div id="q_1" class="quest_s">'+quest_list_val[i].quest_num+'</div>';
            var qn=0;
            if(quest_list_val[i].quest_num==0){qn=2;}
            else if(quest_list_val[i].quest_num==1){qn=3;}
            else if(quest_list_val[i].quest_num==2||quest_list_val[i].quest_num==3||quest_list_val[i].quest_num==4){qn=4;}
            else if(quest_list_val[i].quest_num==5){qn=6;}
            else if(quest_list_val[i].quest_num==6){qn=10;}
            else if(quest_list_val[i].quest_num==7){qn=100;}
            str+='<div id="q_2" class="quest_s">野草のとり方の研究 (必要人数'+qn+'人)</div>';
            str+='<div id="q_3" class="quest_s">ID: '+i+'</div>';
            str+='<div id="q_4" class="quest_s">参加人数: '+quest_list_val[i].userIDs.length+'人</div>';
            var st="";
            if(quest_list_val[i].state==0){
                if(Math.round((new Date().getTime()-quest_list_val[i].time)/1000)>1800){
                    st="メンバー待ち (残り 0:00)";
                }else {
                    st="メンバー待ち (残り "+toHms(1800-Math.round((new Date().getTime()-quest_list_val[i].time)/1000))+")";
                }
            }else if(quest_list_val[i].state==1){
                if(Math.round((new Date().getTime()-quest_list_val[i].time)/1000)>60){
                    st="打ち合わせ中 (残り 0:00)";
                }else {
                    st="打ち合わせ中 (残り "+toHms(60-Math.round((new Date().getTime()-quest_list_val[i].time)/1000))+")";
                }
            }
            else if(quest_list_val[i].state==3){ //実行時間+60
                if(Math.round((new Date().getTime()-quest_list_val[i].time)/1000)>180){
                    st="実行中 (残り 0:00)";
                }else{
                    st="実行中 (残り "+toHms(180-Math.round((new Date().getTime()-quest_list_val[i].time)/1000))+")";
                }
            }
            else if(quest_list_val[i].state==2||quest_list_val[i].state==4||quest_list_val[i].state==5){st="結果確認待ち";}
            str+='<div id="q_5" class="quest_s">'+st+'</div>';

            /*
            str+='<div id="q_1" class="quest_s">ID: '+i+' '+ Math.round((new Date().getTime()-quest_list_val[i].time)/1000) +'秒経過</div>';
            str+='<div id="q_2" class="quest_s">Number: '+quest_list_val[i].quest_num+'</div>';
            str+='<div id="q_3" class="quest_s">参加者-> ';
            for(var j=0;j<quest_list_val[i].userIDs.length;j++){
                str+= quest_list_val[i].userIDs[j]+'-'+quest_list_val[i].user_stuIDs[j]+' ';
            }
            str+='</div>';
            */
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
    str+='<div id="q_1" class="quest_s">'+quest_list_val[qid].quest_num+'</div>';
    var qn=0;
    if(quest_list_val[qid].quest_num==0){qn=2;}
    else if(quest_list_val[qid].quest_num==1){qn=3;}
    else if(quest_list_val[qid].quest_num==2||quest_list_val[qid].quest_num==3||quest_list_val[qid].quest_num==4){qn=4;}
    else if(quest_list_val[qid].quest_num==5){qn=6;}
    else if(quest_list_val[qid].quest_num==6){qn=10;}
    else if(quest_list_val[qid].quest_num==7){qn=100;}
    str+='<div id="q_2" class="quest_s">野草のとり方の研究 (必要人数'+qn+'人)</div>';
    str+='<div id="q_3" class="quest_s">ID: '+qid+'</div>';
    str+='<div id="q_4" class="quest_s" style="width:245px;">参加人数: '+quest_list_val[qid].userIDs.length+'人</div>';
    str+='<div id="q_5" class="quest_s" style="width:120px;">所要時間n分</div>';
    str+='</div>';

    str+='<div id="q_box" class="quest_s">';
    str+='<div id="q_box_t" class="quest_s">&nbsp;参加メンバー</div>';
    str+='<div id="q_box_m" class="quest_s scrollbox">';

    var my_stu=0;
    for(var i=0;i<quest_list_val[qid].userIDs.length;i++){
        if(i%2==0){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px;">';}
        else if(i%2==1){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px; background:#bbb;">';}
        str+='<div id="q_i1" class="quest_s">'+quest_list_val[qid].userIDs[i]+'研&nbsp;'+quest_list_val[qid].user_stuIDs[i]+'君</div>';
        str+='<div id="q_i2" class="quest_s">得意分野:&nbsp;△△△△△</div>';
        str+='<div id="q_i3" class="quest_s">ランク:&nbsp;論-F&nbsp;&nbsp;開-D&nbsp;&nbsp;コ-E</div>';
        str+='</div>';
        if(quest_list_val[qid].userIDs[i]==user_data.uid){
            my_stu=quest_list_val[qid].user_stuIDs[i];
        }
    }
    str+='<div id="q_b2" class="q_inbox quest_s" style="top:100px;">';
    str+='<div id="q_i1" class="quest_s">??研&nbsp;??君</div>';
    str+='<div id="q_i2" class="quest_s">得意分野:&nbsp;△△△△△</div>';
    str+='<div id="q_i3" class="quest_s">ランク:&nbsp;論-F&nbsp;&nbsp;開-D&nbsp;&nbsp;コ-E</div>';
    str+='</div>';
    str+='</div>';
    str+='</div>';


    if(quest_list_val[qid].state==0){ //募集中
        str+="<a href='#' onclick='cancel_quest(\""+qid+"\","+my_stu+"); return false;'>";
        str+='<div id="float_choice_n" class="float_choice page_container">';
        str+='キャンセル';
        str+='</div>';
        str+='</a>';
    }else if(quest_list_val[qid].state==1){
        str+='<div id="float_choice_n" class="float_choice page_container">';
        str+='打ち合わせ中';
        str+='</div>';
    }else if(quest_list_val[qid].state==2){ //確認(失敗)
        str+="<a href='#' onclick='check_quest(\""+qid+"\","+my_stu+"); return false;'>";
        str+='<div id="float_choice" class="float_choice page_container">';
        str+='確認!';
        str+='</div>';
        str+='</a>';
    }else if(quest_list_val[qid].state==3){
        str+='<div id="float_choice_n" class="float_choice page_container">';
        str+='作業中';
        str+='</div>';
    }else if(quest_list_val[qid].state==4){ //確認(成功)
        str+="<a href='#' onclick='check_quest(\""+qid+"\","+my_stu+"); return false;'>";
        str+='<div id="float_choice" class="float_choice page_container">';
        str+='確認!';
        str+='</div>';
        str+='</a>';
    }else if(quest_list_val[qid].state==5){ //時間切れ
        str+="<a href='#' onclick='check_quest(\""+qid+"\","+my_stu+"); return false;'>";
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

function check_quest(qid,st_n){
    check_quest_api(user_data.uid,qid);

    $("#float_body").empty();
    $("#float_body").append("wait...");

    setTimeout(function(){
        quest_result(st_n);
    }, 800);
    //console.log(val);
}

function quest_result(st_n){
    //console.log(hold_val);
    $("#float_body").empty();

    if(check_quest_val!="ng"){
        window.parent.collabo_st(st_n,0);
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

var cancel_now=false;
function cancel_quest(qid,st_n){
    console.log(qid+','+st_n);
    if(cancel_now==false){
        cancel_quest_api(user_data.uid,qid);
    }
    cancel_now=true;

    setTimeout(function(){
        if(cancel_quest_val.message=="success"){window.parent.collabo_st(st_n,0);}
        location.href = "collabo.html";
        cancel_now=false;
    }, 800);
    //console.log(val);
}



function oya(){
    show_quest_list();

    //$('#member_1 #member_n1').text('a');
}



//-->
