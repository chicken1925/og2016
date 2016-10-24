<!--

var student_data;
var user_data;

//初期処理
window.addEventListener("load", function(){
    user_data = window.parent.back_user_data();
    student_data = window.parent.back_stu_data();
    var hh= window.parent.box_size();
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
    str+='<div id="quest_num" class="quest_s">ID:'+document.forms["join_f"].elements["quest_id_f"].value+'</div>';
    str+='<div id="quest_star" class="quest_s">Number: '+quest_search_val.quest_num+'</div>';
    str+='<div id="quest_title" class="quest_s">参加者-> ';
            for(var j=0;j<quest_search_val.userIDs.length;j++){
                str+= quest_search_val.userIDs[j]+'-'+quest_search_val.user_stuIDs[j]+' ';
            }
    str+='</div>';
    str+='</div>';

    //参加者一覧カッコよく出す

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

    str+='<div id="in_float_quest" class="quest_list in_float page_container">';
    str+='<div id="quest_num" class="quest_s">ID:'+document.forms["join_f"].elements["quest_id_f"].value+'</div>';
    str+='<div id="quest_star" class="quest_s">Number: '+quest_search_val.quest_num+'</div>';
    str+='<div id="quest_title" class="quest_s">参加者-> ';
            for(var j=0;j<quest_search_val.userIDs.length;j++){
                str+= quest_search_val.userIDs[j]+'-'+quest_search_val.user_stuIDs[j]+' ';
            }
    str+='</div>';
    str+='</div>';

    str+='<form id="gi_form3">';
    str+='<div class="mem_ratio">';
    for(var i=0;i<student_data.students.length;i++){
        str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" >';
        str+='<label id="sel_label'+i+'" for="select'+i+'">';
        str+='<img src="'+student_data.students[i].pic+'" width=60 height=60 style="top:5px; position:relative;"></img>';
        str+='<div style="top:10px; position:relative;">'+student_data.students[i].name+'</div>';
        str+='</label>';
    }
    str+='</div>';
    str+='</form>';

    str+="<a href='#' onclick='join_request(\""+document.forms["join_f"].elements["quest_id_f"].value+"\"); return false;'>";
    //str+='<a href="#" onclick="join_request('+document.forms["join_f"].elements["quest_id_f"].value+'); return false;">';
    str+='<div id="float_choice" class="page_container">';
    str+='送り込む！';
    str+='</div>';
    str+='</a>';

    $("#float_body").append(str);
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
