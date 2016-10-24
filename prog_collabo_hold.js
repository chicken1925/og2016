<!--

var hh;
var student_data;
var user_data;

//初期処理
window.addEventListener("load", function(){
    student_data = window.parent.back_stu_data();
    user_data = window.parent.back_user_data();
    hh= window.parent.box_size();
    $("#all_contents").css("height", hh+"px");

    //console.log(student_data.students[0].name);

}, false);

function show_info(n){
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list in_float page_container">';
    str+='<div id="quest_num" class="quest_s">共同研究1</div>';
    str+='<div id="quest_star" class="quest_s">★★★☆☆</div>';
    str+='<div id="quest_title" class="quest_s">◯◯△△の開発と実現 (必要人数:4人)</div>';
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



function float_ch(n){
    var val;
    var radioList = document.getElementsByName("s3");
    for(var i=0; i<radioList.length; i++){
        if (radioList[i].checked) {
            val=radioList[i].value;
            break;
        }
    }

    //とりあえずquest0
    hold_quest_api(user_data.uid,n,student_data.students[val].id);

    $("#float_body").empty();
    $("#float_body").append("wait...");

    setTimeout(function(){
        show_key();
    }, 800);
    //console.log(val);
}

function show_key(){
    //console.log(hold_val);
    $("#float_body").empty();

    if(hold_val!="ng"){
        var str="";

        str+='<div id="f_text1" class="float_text in_float page_container">共同研究を開催しました！</div>';
        str+='<div id="f_text2" class="float_text in_float page_container">ID: '+hold_val+'</div>';
        str+='<div id="f_text3" class="float_text in_float page_container">IDを教えて共同研究者を募ろう！</div>';
	str+='<div id="tweet_button" class="float_text in_float page_container"><a href="https://twitter.com/intent/tweet?button_hashtag=og2016_research&text=%E4%B8%80%E7%B7%92%E3%81%AB%E7%A0%94%E7%A9%B6%E3%81%97%E3%82%88%E3%81%86%EF%BC%81 ID:'+hold_val+'" class="twitter-hashtag-button">Tweet #og2016_research</a></div> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script>';


        $("#float_body").append(str);
    }else{
        $("#float_body").append("失敗しました<br>接続や設定を確認してください");
        setTimeout(function(){
            location.href = "collabo.html";
        }, 2000);
    }
}



//-->
