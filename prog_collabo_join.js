<!--

var st_data;
var us_data;

var spe_data={};
var que_data={};
$(function() {
    $.getJSON("speciality_data.json" , function(data) {
    spe_data=data;
  });
    $.getJSON("quest_data.json" , function(data) {
    que_data=data;
  });
});

//初期処理
window.addEventListener("load", function(){
    us_data = window.parent.back_us_data();
    st_data = window.parent.back_stu_data();
    var hh= window.parent.box_size();
    window.parent.frame_num(6);
    $("#all_contents").css("height", hh+"px");

    //console.log(st_data.students[0].name);

}, false);

function search_quest(){
    //console.log(document.forms["join_f"].elements["quest_id_f"].value);
    $("#join_text2").remove();
    $("#all_contents").append('<div id="join_text2" class="j_texts page_container">検索中</div>');
    if(document.forms["join_f"].elements["quest_id_f"].value!=""){
        var d = new $.Deferred();
        quest_search_api(us_data.uid,document.forms["join_f"].elements["quest_id_f"].value,d);

        d.promise().then(function() {
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
        });
    }else{
        $("#join_text2").remove();
        $("#all_contents").append('<div id="join_text2" class="j_texts page_container">IDを入力してください</div>');
    }
}
function show_quest_result(){
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list in_float page_container">';
    str+='<div id="q_f1" class="quest_s" style="background-image: url(images/icon_quest'+(parseInt(quest_search_val.quest_num,10)+1)+'.png);"></div>';
    str+='<div id="q_f2" class="quest_s">'+quest_search_val.qtitle+'</div>';
    str+='<div id="q_f3_" class="quest_s"></div>';
    str+='<div id="q_f5" class="quest_s">所要時間&nbsp;'+que_data.quests[quest_search_val.quest_num].time+'分</div>';
    str+='<div id="q_f4_" class="quest_s"></div>';
    str+='<div id="q_f4" class="quest_s">'+quest_search_val.users.length+'&nbsp;/&nbsp;'+que_data.quests[quest_search_val.quest_num].person_num+'</div>';
    str+='<div id="q_f3" class="quest_s" style="margin-top:2px;">'+document.forms["join_f"].elements["quest_id_f"].value+'</div>';
    str+='<div id="q_f7_" class="quest_s"></div>';
    str+='<hr id="q_fborder1" class="bd1 member_n page_container" style="width:222px;">';
    str+='<hr id="q_fborder2" class="bd1 member_n page_container" style="width:222px;">';
    str+='</div>';

    str+='<div id="q_box" class="quest_s">';
    str+='<div id="q_box_t" class="quest_s">&nbsp;参加メンバー</div>';
    str+='<div id="q_box_m" class="quest_s scrollbox">';

    for(var i=0;i<quest_search_val.users.length;i++){
        if(i%2==0){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px;">';}
        else if(i%2==1){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px; background:#0A4A8D;">';}

        str+='<div id="q_i1" class="quest_s">'+quest_search_val.users[i].u_name+'研<span style="position: absolute;  left:62px;">'+quest_search_val.users[i].stu_name+'君</span></div>';
        str+='<div id="q_i21" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(quest_search_val.users[i].status[0],true)+'</span></div>';
        str+='<div id="q_i22" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(quest_search_val.users[i].status[1],true)+'</span></div>';
        str+='<div id="q_i23" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(quest_search_val.users[i].status[2],true)+'</span></div>';
        str+='<hr id="q_iborder" class="member_n page_container">';
        str+='<div id="q_i2" class="quest_s"></div>';
        str+='<div id="q_i3_" class="quest_s"></div>';
        str+='<div id="q_i3" class="quest_s">'+spe_data.spes[quest_search_val.users[i].speciality].name+'</div>';
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

    str+='<div id="in_float_quest2" class="quest_list in_float page_container">';

    str+='<div id="q_1" class="quest_s" style="background-image: url(images/icon_quest'+(parseInt(quest_search_val.quest_num,10)+1)+'.png);"></div>';
    str+='<div id="q_2" class="quest_s">'+quest_search_val.qtitle+'</div>';
    str+='<div id="q_3_" class="quest_s"></div>';
    str+='<div id="q_3" class="quest_s">所要時間&nbsp;'+que_data.quests[quest_search_val.quest_num].time+'分</div>';
    str+='<div id="q_4_" class="quest_s"></div>';
    str+='<div id="q_4" class="quest_s">'+que_data.quests[quest_search_val.quest_num].person_num+'人</div>';
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



function join_request(req_join_id){
    var val;
    var radioList = document.getElementsByName("s3");
    for(var i=0; i<radioList.length; i++){
        if (radioList[i].checked) {
            val=radioList[i].value;
            break;
        }
    }
    var sdata=create_sdata(val);
    var d = new $.Deferred();
    join_request_api(req_join_id,sdata,d);
    $('#float_choice').remove();

    d.promise().then(function() {
        if(join_request_val.message=="done"){
            window.parent.collabo_st(st_data.students[val].id,1);
            $("#float_body").empty();
            $("#float_body").append('<div id="f_text1" class="float_text in_float page_container">共同研究に参加しました！</div>');
            $("#float_body").append('<div id="f_text1_" class="in_float page_container"></div>');
            $("#float_body").append('<div id="f_textborder" class="page_container"></div>');
        }else{
            $("#float_body").empty();
            $("#float_body").append('<div id="f_text1" class="float_text in_float page_container">失敗しました</div>');
        }
    });


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
