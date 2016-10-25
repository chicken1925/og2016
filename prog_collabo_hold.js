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

    show_questlist();

}, false);

function show_questlist(){
    str="";
    str+='<a href="#" onclick="show_info(0); return false;">';
    str+='<div id="quest0" class="quest_list page_container">';
    str+='<div id="q_1" class="quest_s">0</div>';
    str+='<div id="q_2" class="quest_s">野草のとり方の研究 (必要人数n人)</div>';
    str+='<div id="q_3" class="quest_s">所要時間n分</div>';
    str+='</div></a>';

    str+='<a href="#" onclick="show_info(1); return false;">';
    str+='<div id="quest0" class="quest_list page_container" style="top:60px;">';
    str+='<div id="q_1" class="quest_s">1</div>';
    str+='<div id="q_2" class="quest_s">野草のとり方の研究2 (必要人数n人)</div>';
    str+='<div id="q_3" class="quest_s">所要時間n分</div>';
    str+='</div></a>';

    $("#all_contents").append(str);
}


function show_info(n){
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list in_float page_container">';
    str+='<div id="q_1" class="quest_s">'+n+'</div>';
    str+='<div id="q_2" class="quest_s" style="width:245px;">野草のとり方の研究 (必要人数n人)</div>';
    str+='<div id="q_3" class="quest_s" style="width:115px;">所要時間n分</div>';
    str+='</div>';

    str+='<form id="gi_form3">';
    str+='<div class="mem_ratio">';
    for(var i=0;i<student_data.students.length;i++){
        if(student_data.students[i].collabo==0){str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" onclick="selfunc('+i+')">';}
        else{str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" disabled="disabled">';}
        str+='<label id="sel_label'+i+'" for="select'+i+'">';
        str+='<img src="'+student_data.students[i].pic+'" width=28 height=28 style="top:5px; position:relative;"></img>';
        str+='<div style="top:10px; position:relative;">'+student_data.students[i].name+'</div>';
        str+='</label>';
    }
    str+='</div>';
    str+='</form>';

    str+='<div id="q_mbox" class="quest_s">';
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
    str+='<div id="q_m4" class="quest_s">性格:&nbsp;num'+student_data.students[n].personality+'</div>';
    str+='<div id="q_m5" class="quest_s">得意分野:&nbsp;num'+student_data.students[n].speciality+'</div>';
    var mr,mk,mc;
    for(var j=0;j<student_data.students[n].status.length;j++){
        if(student_data.students[n].status[j]<25){
            if(j==0){mr="F";}else if(j==1){mk="F";}else if(j==2){mc="F";}
        }else if(student_data.students[n].status[j]>=25&&student_data.students[n].status[j]<45){
            if(j==0){mr="E";}else if(j==1){mk="E";}else if(j==2){mc="E";}
        }else if(student_data.students[n].status[j]>=45&&student_data.students[n].status[j]<65){
            if(j==0){mr="D";}else if(j==1){mk="D";}else if(j==2){mc="D";}
        }else if(student_data.students[n].status[j]>=65&&student_data.students[n].status[j]<85){
            if(j==0){mr="C";}else if(j==1){mk="C";}else if(j==2){mc="C";}
        }else if(student_data.students[n].status[j]>=85&&student_data.students[n].status[j]<105){
            if(j==0){mr="B";}else if(j==1){mk="B";}else if(j==2){mc="B";}
        }else if(student_data.students[n].status[j]>=105&&student_data.students[n].status[j]<120){
            if(j==0){mr="A";}else if(j==1){mk="A";}else if(j==2){mc="A";}
        }else if(student_data.students[n].status[j]>=120){
            if(j==0){mr="S";}else if(j==1){mk="S";}else if(j==2){mc="S";}
        }
    }
    str+='<div id="q_m6" class="quest_s">論:&nbsp;'+mr+'</div>';
    str+='<div id="q_m7" class="quest_s">開:&nbsp;'+mk+'</div>';
    str+='<div id="q_m8" class="quest_s">コ:&nbsp;'+mc+'</div>';
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
