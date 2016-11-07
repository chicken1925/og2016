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
    st_data = window.parent.back_stu_data();
    us_data = window.parent.back_us_data();
    var hh= window.parent.box_size();
    window.parent.frame_num(2);
    $("#all_contents").css("height", hh+"px");
    $("#collabo_list").css("height", (hh-90)+"px");

    //console.log(st_data.students[0].name);
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

// 正規表現でセパレート(金額)
function separate(num){
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

function quest_request(){
    $("#collabo_list").empty();
    $("#collabo_list").append("wait...");

    var d = new $.Deferred();
    quest_list_api(us_data.uid,d);

    d.promise().then(function() {
        show_quest_list();

        //現在のデータ送信
        var sdata_list=[];
        for(var i in quest_list_val){
            for(var k=0;k<st_data.students.length;k++){
                for(var j=0;j<quest_list_val[i].users.length;j++){
                    if(quest_list_val[i].users[j].stu_id==st_data.students[k].id){
                        sdata_list.push(create_sdata_c(i,k));
                    }
                }
            }

        }

        alter_stu_api(sdata_list);
    });


}

function show_quest_list(){
    $("#collabo_list").empty();

    var str="";

    if(quest_list_val!="ng"){
        var c=0;
        for(var i in quest_list_val){
            str+="<a href='#' onclick='quest_detail(\""+i+"\"); return false;'>";
            str+='<div id="in_quest'+c+'" class="quest_list in_float page_container" style="top:'+(65*c)+'px">';
            //'+quest_list_val[i].quest_num+'
            str+='<div id="q_1" class="quest_s" style="background-image: url(images/icon_quest'+(parseInt(quest_list_val[i].quest_num,10)+1)+'.png);"></div>';
            str+='<div id="q_2" class="quest_s">'+quest_list_val[i].qtitle+'</div>';
            str+='<div id="q_4_" class="quest_s"></div>';
            str+='<div id="q_4" class="quest_s">'+quest_list_val[i].users.length+'&nbsp;/&nbsp;'+que_data.quests[quest_list_val[i].quest_num].person_num+'</div>';
            str+='<div id="q_7_" class="quest_s"></div>';

            var lab_stu_name="";
            for(var k=0;k<quest_list_val[i].users.length;k++){
                for(var j=0;j<st_data.students.length;j++){
                    if(st_data.students[j].id==quest_list_val[i].users[k].stu_id){
                        lab_stu_name=st_data.students[j].name;
                    }
                }
            }
            str+='<div id="q_6" class="quest_s">'+lab_stu_name+'&nbsp;君が参加中!</div>';

            var st="";
            if(quest_list_val[i].state==0){
                if(Math.round((new Date().getTime()-quest_list_val[i].time)/1000)>1800){
                    st="メンバー待ち (残り 0:00)";
                }else {
                    st="メンバー待ち (残り "+toHms(1800-Math.round((new Date().getTime()-quest_list_val[i].time)/1000))+")";
                }
            }else if(quest_list_val[i].state==1){
                if(Math.round((new Date().getTime()-quest_list_val[i].time)/1000)>30){
                    st="打ち合わせ中 (残り 0:00)";
                }else {
                    st="打ち合わせ中 (残り "+toHms(30-Math.round((new Date().getTime()-quest_list_val[i].time)/1000))+")";
                }
            }
            else if(quest_list_val[i].state==3){ //実行時間+60
                if(Math.round((new Date().getTime()-quest_list_val[i].time)/1000)>((que_data.quests[quest_list_val[i].quest_num].time*60)+30)){
                    st="実行中 (残り 0:00)";
                }else{
                    st="実行中 (残り "+toHms(((que_data.quests[quest_list_val[i].quest_num].time*60)+30)-Math.round((new Date().getTime()-quest_list_val[i].time)/1000))+")";
                }
            }
            else if(quest_list_val[i].state==2||quest_list_val[i].state==4||quest_list_val[i].state==5){st="結果確認待ち";}
            str+='<div id="q_5" class="quest_s">'+st+'</div>';


            str+='<hr id="q_border1" class="bd1 member_n page_container">';
            str+='<hr id="q_border2" class="bd1 member_n page_container">';

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
    str+='<div id="q_1" class="quest_s" style="background-image: url(images/icon_quest'+(parseInt(quest_list_val[qid].quest_num,10)+1)+'.png);"></div>';
    str+='<div id="q_2" class="quest_s">'+quest_list_val[qid].qtitle+'</div>';
    str+='<div id="q_3_" class="quest_s"></div>';
    str+='<div id="q_5" class="quest_s">所要時間&nbsp;'+que_data.quests[quest_list_val[qid].quest_num].time+'分</div>';
    str+='<div id="q_4_" class="quest_s"></div>';
    str+='<div id="q_4" class="quest_s">'+quest_list_val[qid].users.length+'&nbsp;/&nbsp;'+que_data.quests[quest_list_val[qid].quest_num].person_num+'</div>';
    str+='<div id="q_3" class="quest_s" style="margin-top:2px;">'+qid+'</div>';
    str+='<div id="q_7_" class="quest_s"></div>';
    str+='<hr id="q_border1" class="bd1 member_n page_container" style="width:222px;">';
    str+='<hr id="q_border2" class="bd1 member_n page_container" style="width:222px;">';
    str+='</div>';

    str+='<div id="q_box" class="quest_s">';
    str+='<div id="q_box_t" class="quest_s">&nbsp;参加メンバー</div>';
    str+='<div id="q_box_m" class="quest_s scrollbox">';

    var my_stu=0;
    for(var i=0;i<quest_list_val[qid].users.length;i++){
        if(i%2==0){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px;">';}
        else if(i%2==1){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px; background:#0A4A8D;">';}
        var my_hantei=-1;
        for(var j=0;j<st_data.students.length;j++){
            if(st_data.students[j].id==quest_list_val[qid].users[i].stu_id){
                my_hantei=j;
            }
        }
        if(my_hantei!=-1){

            str+='<div id="q_i1" class="quest_s" style="color:pink;">'+us_data.name+'研<span style="position: absolute;  left:62px;">'+st_data.students[my_hantei].name+'君</span></div>';
            str+='<div id="q_i21" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(st_data.students[my_hantei].status[0],true)+'</span></div>';
            str+='<div id="q_i22" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(st_data.students[my_hantei].status[1],true)+'</span></div>';
            str+='<div id="q_i23" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(st_data.students[my_hantei].status[2],true)+'</span></div>';
            str+='<hr id="q_iborder" class="member_n page_container">';
            str+='<div id="q_i2" class="quest_s"></div>';
            str+='<div id="q_i3_" class="quest_s"></div>';
            str+='<div id="q_i3" class="quest_s">'+spe_data.spes[st_data.students[my_hantei].speciality].name+'</div>';
            }else{
            str+='<div id="q_i1" class="quest_s">'+quest_list_val[qid].users[i].u_name+'研<span style="position: absolute;  left:62px;">'+quest_list_val[qid].users[i].stu_name+'君</span></div>';
            str+='<div id="q_i21" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(quest_list_val[qid].users[i].status[0],true)+'</span></div>';
            str+='<div id="q_i22" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(quest_list_val[qid].users[i].status[1],true)+'</span></div>';
            str+='<div id="q_i23" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(quest_list_val[qid].users[i].status[2],true)+'</span></div>';
            str+='<hr id="q_iborder" class="member_n page_container">';
            str+='<div id="q_i2" class="quest_s"></div>';
            str+='<div id="q_i3_" class="quest_s"></div>';
            str+='<div id="q_i3" class="quest_s">'+spe_data.spes[quest_list_val[qid].users[i].speciality].name+'</div>';
            
            /*
            str+='<div id="q_i2" class="quest_s">得意分野:&nbsp;'+spe_data.spes[quest_list_val[qid].users[i].speciality].name+'</div>';
            str+='<div id="q_i3" class="quest_s">ランク:&nbsp;論-'+quest_list_val[qid].users[i].status[0]+'&nbsp;&nbsp;開-'+quest_list_val[qid].users[i].status[1]+'&nbsp;&nbsp;コ-'+quest_list_val[qid].users[i].status[2]+'</div>';
            */
        }

        str+='</div>';
        if(quest_list_val[qid].users[i].id==us_data.uid){
            my_stu=quest_list_val[qid].users[i].stu_id;
        }
    }
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
    var d = new $.Deferred();
    check_quest_api(us_data.uid,qid,d);

    $("#float_body").empty();
    $("#float_body").append("wait...");

    d.promise().then(function() {
        quest_result(st_n);
    });

    //console.log(val);
}


function quest_result(st_n){
    //console.log(hold_val);
    $("#float_body").empty();

    if(check_quest_val!="ng"){
        window.parent.collabo_st(st_n,0);

        show_quest_result(true);

        //お金、アイテム追加
        window.parent.SetValue(check_quest_val.cr.g_reward_m+check_quest_val.cr.b_reward_m+check_quest_val.cr.s_reward_m);
        window.parent.SetItem(parseInt(check_quest_val.cr.b_reward_i[0],10)+parseInt(check_quest_val.cr.s_reward_i[0],10),parseInt(check_quest_val.cr.b_reward_i[1],10)+parseInt(check_quest_val.cr.s_reward_i[1],10),parseInt(check_quest_val.cr.b_reward_i[2],10)+parseInt(check_quest_val.cr.s_reward_i[2],10));

    }else{
        $("#float_body").append("失敗しました<br>接続や設定を確認してください");
        setTimeout(function(){
            location.href = "collabo.html";
        }, 2000);
    }
}
function show_quest_result(rt){
        $("#float_body").empty();
        var str="";
        str+='<div id="ff_1" class="float_text in_float page_container">共同研究結果</div>';
        if(check_quest_val.cr.b_reward_m!=0){
            if(rt==true){
                str+='<div id="ff_3tab1" class="in_float page_container" style="background-image: url(images/tab_s1.png);"></div>';
                str+='<a href="#" onclick="show_quest_result(true); return false;">';
                str+='<div id="ff_3tab_s1" class="page_container"></div></a>';
                str+='<a href="#" onclick="show_quest_result(false);return false;">';
                str+='<div id="ff_3tab_s2" class="page_container"></div></a>';

                str+='<div id="ff_31" class="rewards in_float page_container">基礎報酬金:<span style="position:absolute; left:110px; margin-top:1px;">¥'+separate(check_quest_val.cr.b_reward_m)+'</span></div>';
                str+='<div id="ff_32" class="rewards in_float page_container">能力報酬金:<span style="position:absolute; left:110px; margin-top:1px;">¥'+separate(check_quest_val.cr.s_reward_m)+'</span></div>';
                str+='<div id="ff_331" class="ff_33s in_float page_container">×'+(parseInt(check_quest_val.cr.b_reward_i[0],10)+parseInt(check_quest_val.cr.s_reward_i[0],10))+'</div>';
                str+='<div id="ff_332" class="ff_33s in_float page_container">×'+(parseInt(check_quest_val.cr.b_reward_i[1],10)+parseInt(check_quest_val.cr.s_reward_i[1],10))+'</div>';
                str+='<div id="ff_333" class="ff_33s in_float page_container">×'+(parseInt(check_quest_val.cr.b_reward_i[2],10)+parseInt(check_quest_val.cr.s_reward_i[2],10))+'</div>';
                str+='<div id="ff_331_" class="ff_33s_ in_float page_container"></div>';
                str+='<div id="ff_332_" class="ff_33s_ in_float page_container"></div>';
                str+='<div id="ff_333_" class="ff_33s_ in_float page_container"></div>';
            }else{
                str+='<div id="ff_3tab1" class="in_float page_container" style="background-image: url(images/tab_s2.png);"></div>';
                str+='<a href="#" onclick="show_quest_result(true); return false;">';
                str+='<div id="ff_3tab_s1" class="page_container"></div></a>';
                str+='<a href="#" onclick="show_quest_result(false);return false;">';
                str+='<div id="ff_3tab_s2" class="page_container"></div></a>';

                str+='<div id="q_box2" class="quest_s">';
                str+='<div id="q_box_m2" class="quest_s scrollbox">';
                for(var i=0;i<check_quest_val.users.length;i++){
                    if(i%2==0){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px;">';}
                    else if(i%2==1){str+='<div id="q_b'+i+'" class="q_inbox quest_s" style="top:'+i*50+'px; background:#0A4A8D;">';}
                    var my_hantei=-1;
                    for(var j=0;j<st_data.students.length;j++){
                        if(st_data.students[j].id==check_quest_val.users[i].stu_id){
                            my_hantei=j;
                        }
                    }
                    if(my_hantei!=-1){
                        str+='<div id="q_i1" class="quest_s" style="color:red;">'+us_data.name+'研<span style="position: absolute;  left:62px;">'+st_data.students[my_hantei].name+'君</span></div>';
                        str+='<div id="q_i21" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(st_data.students[my_hantei].status[0],true)+'</span></div>';
                        str+='<div id="q_i22" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(st_data.students[my_hantei].status[1],true)+'</span></div>';
                        str+='<div id="q_i23" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(st_data.students[my_hantei].status[2],true)+'</span></div>';
                        str+='<hr id="q_iborder" class="member_n page_container">';
                        str+='<div id="q_i2" class="quest_s"></div>';
                        str+='<div id="q_i3_" class="quest_s"></div>';
                        str+='<div id="q_i3" class="quest_s">'+spe_data.spes[st_data.students[my_hantei].speciality].name+'</div>';
                        }else{
                        str+='<div id="q_i1" class="quest_s">'+check_quest_val.users[i].u_name+'研<span style="position: absolute;  left:62px;">'+check_quest_val.users[i].stu_name+'君</span></div>';
                        str+='<div id="q_i21" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(check_quest_val.users[i].status[0],true)+'</span></div>';
                        str+='<div id="q_i22" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(check_quest_val.users[i].status[1],true)+'</span></div>';
                        str+='<div id="q_i23" class="quest_s q_i2s page_container"><span style="position: absolute;  left:22px;">'+window.parent.calc_rank(check_quest_val.users[i].status[2],true)+'</span></div>';
                        str+='<hr id="q_iborder" class="member_n page_container">';
                        str+='<div id="q_i2" class="quest_s"></div>';
                        str+='<div id="q_i3_" class="quest_s"></div>';
                        str+='<div id="q_i3" class="quest_s">'+spe_data.spes[check_quest_val.users[i].speciality].name+'</div>';
                    }

                    str+='</div>';
                }
                str+='</div>';
                str+='</div>';

            }
            if(check_quest_val.cr.g_reward_m!=0){
            str+='<div id="ff_2" class="float_text in_float page_container" style="color:orange;">大成功!</div>';
            if(rt==true){str+='<div id="ff_34" class="rewards in_float page_container">大成功報酬:<span style="position:absolute; left:110px; margin-top:1px;">¥'+separate(check_quest_val.cr.g_reward_m)+'</span></div>';}
            }else{
                str+='<div id="ff_2" class="float_text in_float page_container" style="color:red;">成功!</div>';
            }
            str+='<hr id="ff_border" class="in_float page_container"></hr>';
            str+='<div id="ff_2_" class="in_float page_container"></div>';

        }else{
            str+='<div id="ff_2" class="float_text in_float page_container" style="color:lightblue;">失敗…</div>';
            str+='<hr id="ff_border" class="in_float page_container"></hr>';
            str+='<div id="ff_2_2" class="in_float page_container"></div>';
            if(check_quest_val.state==2){
                str+='<div id="ff_32" class="rewards in_float page_container" style="text-align:center;left:45px;">うまく話し合いができなかったみたいだ…</div>';
            }else if(check_quest_val.state==5){
                str+='<div id="ff_32" class="rewards in_float page_container" style="text-align:center;left:45px;">時間が足りなかったみたいだ…</div>';
            }
        }
        $("#float_body").append(str);

}









function cancel_quest(qid,st_n){
    //console.log(qid+','+st_n);
    $("float_choice_n").empty();

    var d = new $.Deferred();
    cancel_quest_api(us_data.uid,qid,d);

    d.promise().then(function() {
        if(cancel_quest_val.message=="success"){window.parent.collabo_st(st_n,0);}
        location.href = "collabo.html";
    });

    //console.log(val);
}


//送る用データ作成
function create_sdata_c(qid,s_num){
    var s_skill=[];
    for(var i=0;i<st_data.students[s_num].skill.length;i++){
        if(Math.floor(st_data.students[s_num].skill[i]/100)==5){
            s_skill.push(Math.floor((st_data.students[s_num].skill[i]-500)/10));
            //console.log(Math.floor((st_data.students[s_num].skill[i]-500)/10));
        }
    }
    var sdata_={
        "qid": qid,
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



function oya(){
    //show_quest_list();

    //$('#member_1 #member_n1').text('a');
}



//-->
