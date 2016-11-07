<!--

var hh;
var st_data;
var us_data;

var spe_data={};
var que_data={};
var gen_stu_data={};
$(function() {
    $.getJSON("speciality_data.json" , function(data) {
    spe_data=data;
  });
    $.getJSON("gen_student.json" , function(data) {
    gen_stu_data=data;
  });
});



//スクロール禁止用関数
function no_scroll(){
    $("#all_contents").scrollTop(0);

    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).on(scroll_event,function(e){e.preventDefault();});
    //SP用
    $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
}
//スクロール復活用関数
function return_scroll(){
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).off(scroll_event);
    //SP用
    $(document).off('.noScroll');
}


//初期処理
window.addEventListener("load", function(){
    st_data = window.parent.back_stu_data();
    us_data = window.parent.back_us_data();
    hh= window.parent.box_size();
    window.parent.frame_num(5);
    $("#all_contents").css("height", hh+"px");

    $.when($.getJSON("quest_data.json"))
        .done(function(data) {
        que_data=data;
        show_questlist();
    });

}, false);

function show_questlist(){
    var show_n=8;
    var str="";
    for(var i=0;i<show_n;i++){
        var qtitle="";
        if(i<6){
            var fac=0;
            if(us_data.faculty=='宇宙'){fac=0;}
            else if(us_data.faculty=='バイオ'){fac=1;}
            else if(us_data.faculty=='ロボ'){fac=2;}
            qtitle=que_data.quests[i].name[fac][Math.floor( Math.random() * 3 )];
        }else {
            qtitle=que_data.quests[i].name;
        }
        str+='<a href="#" onclick="show_info(\''+qtitle+'\','+i+'); return false;">';
        str+='<div id="quest'+i+'" class="quest_list page_container" style="top:'+(10+(50*i))+'px;">';
        str+='<div id="q_1" class="quest_s" style="background-image: url(images/icon_quest'+(i+1)+'.png);"></div>';
        str+='<div id="q_2" class="quest_s">'+qtitle+'</div>';
        str+='<div id="q_3_" class="quest_s"></div>';
        str+='<div id="q_3" class="quest_s">所要時間&nbsp;'+que_data.quests[i].time+'分</div>';
        str+='<div id="q_4_" class="quest_s"></div>';
        str+='<div id="q_4" class="quest_s">'+que_data.quests[i].person_num+'人</div>';
        str+='<hr id="q_border1" class="quest_s page_container">';
        str+='</div></a>';
    }

    $("#all_contents").append(str);
}


function show_info(qtitle_,n){
    no_scroll();
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list in_float page_container">';

    str+='<div id="q_1" class="quest_s" style="background-image: url(images/icon_quest'+(n+1)+'.png);"></div>';
    str+='<div id="q_2" class="quest_s">'+qtitle_+'</div>';
    str+='<div id="q_3_" class="quest_s"></div>';
    str+='<div id="q_3" class="quest_s">所要時間&nbsp;'+que_data.quests[n].time+'分</div>';
    str+='<div id="q_4_" class="quest_s"></div>';
    str+='<div id="q_4" class="quest_s">'+que_data.quests[n].person_num+'人</div>';
    str+='<hr id="q_border1" class="quest_s page_container" style="width:220px;">';

    str+='</div>';

    str+='<form id="gi_form3">';
    str+='<div class="mem_ratio">';
    for(var i=0;i<st_data.students.length;i++){
        if(st_data.students[i].collabo==0){str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" onclick="selfunc('+i+')">'; str+='<label id="sel_label'+i+'" for="select'+i+'">';}
        else{str+='<input type="radio" name="s3" id="select'+i+'" value="'+i+'" disabled="disabled">'; str+='<label id="sel_label'+i+'" for="select'+i+'" style="background: #888;">';}
        str+='<img src="images/'+gen_stu_data.gen[st_data.students[i].stu_type].pic+'.png" width=28 height=28 style="top:5px; position:relative;"></img>';
        str+='<div style="top:10px; position:relative;">'+st_data.students[i].name+'</div>';
        str+='</label>';
    }
    str+='</div>';
    str+='</form>';

    str+='<div id="q_mbox" class="quest_s">';
    str+='</div>';

    str+='<a href="#" onclick="float_ch('+n+',\''+qtitle_+'\'); return false;">';
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
        return_scroll();
    });
};
function selfunc(n){
    $("#q_mbox").empty();
    var str="";
    if(st_data.students[n].grade==0||st_data.students[n].grade==1||st_data.students[n].grade==2){
        str+='<div id="q_m1" class="quest_s" style="border:solid 2px blue; background-image:url(images/'+gen_stu_data.gen[st_data.students[n].stu_type].pic+'.png);"></div>';
    }else if(st_data.students[n].grade==3||st_data.students[n].grade==4||st_data.students[n].grade==5){
        str+='<div id="q_m1" class="quest_s" style="border:solid 2px green; background-image:url(images/'+gen_stu_data.gen[st_data.students[n].stu_type].pic+'.png);"></div>';
    }else if(st_data.students[n].grade==6||st_data.students[n].grade==7||st_data.students[n].grade==8){
        str+='<div id="q_m1" class="quest_s" style="border:solid 2px red; background-image:url(images/'+gen_stu_data.gen[st_data.students[n].stu_type].pic+'.png);"></div>';
    }
    str+='<div id="q_m2" class="quest_s">'+st_data.students[n].name+'</div>';
    var gra="";
    if(st_data.students[n].grade==0){gra="学部３年"}
    else if(st_data.students[n].grade==1||st_data.students[n].grade==2){gra="学部４年"}
    else if(st_data.students[n].grade==3){gra="修士１年"}
    else if(st_data.students[n].grade==4||st_data.students[n].grade==5){gra="修士２年"}
    else if(st_data.students[n].grade==6){gra="博士１年"}
    else if(st_data.students[n].grade==7){gra="博士２年"}
    else if(st_data.students[n].grade==8){gra="博士３年"}
    str+='<div id="q_m3" class="quest_s">'+gra+'</div>';

    var per="";
    if(st_data.students[n].personality==0){per="慎重"}
    else if(st_data.students[n].personality==1){per="大人しい"}
    else if(st_data.students[n].personality==2){per="せっかち"}
    else if(st_data.students[n].personality==3){per="臆病"}
    else if(st_data.students[n].personality==4){per="やんちゃ"}
    else if(st_data.students[n].personality==5){per="勇敢"}
    else if(st_data.students[n].personality==6){per="天才肌"}
    str+='<div id="q_m4" class="quest_s">'+per+'</div>';
    str+='<div id="q_m4_" class="quest_s"></div>';

    str+='<div id="q_m5" class="quest_s">'+spe_data.spes[st_data.students[n].speciality].name+'</div>';
    str+='<div id="q_m5_" class="quest_s"></div>';

    str+='<div id="q_m6" class="quest_s page_container"><span style="position: absolute;  left:18px;">'+window.parent.calc_rank(window.parent.calc_param(n)[0],true)+'</span></div>';
    str+='<div id="q_m7" class="quest_s page_container"><span style="position: absolute;  left:18px;">'+window.parent.calc_rank(window.parent.calc_param(n)[1],true)+'</span></div>';
    str+='<div id="q_m8" class="quest_s page_container"><span style="position: absolute;  left:18px;">'+window.parent.calc_rank(window.parent.calc_param(n)[2],true)+'</span></div>';

    str+='<hr id="q_mborder1" class="q_mbd1 page_container">';
    str+='<hr id="q_mborder2" class="q_mbd1 page_container">';
    str+='<hr id="q_mborder3" class="q_mbd1 page_container">';

    $("#q_mbox").append(str);
}




function float_ch(n,qt){
    var val;
    var radioList = document.getElementsByName("s3");
    for(var i=0; i<radioList.length; i++){
        if (radioList[i].checked) {
            val=radioList[i].value;
            break;
        }
    }
    if(val!=undefined){
        var sdata=create_sdata(val);
        //console.log(sdata);
        var d = new $.Deferred();
        hold_quest_api(n,qt,sdata,d);

        $("#float_body").empty();
        $("#float_body").append("wait...");

        d.promise().then(function() {
            show_key(val);
        });

    }

    //console.log(val);
}
function show_key(vl){
    //console.log(hold_val);
    $("#float_body").empty();

    if(hold_val!="ng"){
        window.parent.collabo_st(st_data.students[vl].id,1);
        var str="";

        str+='<div id="f_text1" class="float_text page_container">共同研究を開催しました！</div>';
        str+='<div id="f_text2_" class="float_text page_container"></div>';
        str+='<div id="f_text2" class="float_text page_container">'+hold_val+'</div>';
        str+='<div id="f_text3" class="float_text page_container">IDを教えて共同研究者を募ろう！</div>';
	    str+='<div id="tweet_button" class="float_text page_container"><a href="https://twitter.com/intent/tweet?button_hashtag=og2016_research&text=%E4%B8%80%E7%B7%92%E3%81%AB%E7%A0%94%E7%A9%B6%E3%81%97%E3%82%88%E3%81%86%EF%BC%81 ID:'+hold_val+'" class="twitter-hashtag-button">Tweet #og2016_research</a></div> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script>';
        str+='<hr id="f_textborder" class="float_text page_container">';

        $("#float_body").append(str);
    }else{
        $("#float_body").append("失敗しました<br>接続や設定を確認してください");
        setTimeout(function(){
            location.href = "collabo.html";
        }, 2000);
    }
}



//送る用データ作成
function create_sdata(s_num){
    var s_skill=[];
    for(var i=0;i<st_data.students[s_num].skill.length;i++){
        if(Math.floor(st_data.students[s_num].skill[i]/100)==5){
            s_skill.push(Math.floor((st_data.students[s_num].skill[i]-500)/10));
            //console.log(Math.floor((st_data.students[s_num].skill[i]-500)/10));
        }
    }
    var sdata_={
        "id": us_data.uid,
        "u_name": us_data.name,
        "stu_id": st_data.students[s_num].id,
        "stu_name": st_data.students[s_num].name,
        "status": window.parent.calc_param(s_num),
        "speciality": st_data.students[s_num].speciality,
        "skill":s_skill
    };
    return sdata_;
}



//-->
