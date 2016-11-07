

var hh;
var st_data;
var us_data;

//参加中生徒
var regi_stu_num;



var mystate_=0;
//ステート(仮)
//0 = 最初、1 = 一回目結果発表後、2 = 2回目結果発表後、3 = 3回目結果発表後
var event_state_kari=1;

var spe_data={};
$(function() {
    $.getJSON("speciality_data.json" , function(data) {
    spe_data=data;
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
    window.parent.frame_num(3);
    $("#all_contents").css("height", hh+"px");

    var d = new $.Deferred();
    event_check_api(us_data.uid,d);
    $("#all_contents").append("wait...");

    d.promise().then(function() {
        if(event_check_val!="ng"){
            $("#all_contents").empty();
            show_event();
            window.parent.SetState(event_check_val.now_state);
            mystate_=event_check_val.now_state;
            /* event_state_kariの計算 */


            for(var i=0;i<event_check_val.reward_m.length;i++){
                if(Object.keys(event_check_val.reward_m[i]).length!=0){
                    if(event_check_val.reward_m[i].checked==0){ show_history(true); get_reward(i);}
                }
            }
        }
    });


}, false);

function show_event(){
    str="";
    str+='<div id="event" class="quest_list page_container">';
    str+='<div id="e_1" class="quest_s page_container">'+event_check_val.event_name[event_state_kari]+'</div>';
    str+='<div id="e_2" class="quest_s page_container">様々なジャンルの研究が集い、世界でその名前を知らない人はいない程の超有名な学会。Awardの賞金も非常に高額!!</div>';
    str+='<div id="e_3" class="quest_s page_container">参加〆切: 11/12(金) ~16:30</div>';
    str+='<div id="e_4" class="quest_s page_container">結果発表: イベントラボ・ステージにて、16:50~</div>';
    str+='<hr id="e_border1" class="e_bd1 quest_s page_container">';
    str+='<hr id="e_border2" class="e_bd1 quest_s page_container">';
    str+='<div id="award_box" class="quest_s page_container">';
    str+='<div id="aw_t" class="quest_s page_container">&nbsp;賞金 (各分野ごと)</div>';
    str+='<div id="aw_1" class="aw_s quest_s page_container"><span id="aw_11">Gold Award('+event_check_val.reward_num[event_state_kari][0]+'名)</span><span id="aw_12">-></span><span id="aw_13">¥'+event_check_val.reward_money[event_state_kari][0]+'</span></div>';
    str+='<div id="aw_2" class="aw_s quest_s page_container"><span id="aw_11">Silver Award('+event_check_val.reward_num[event_state_kari][1]+'名)</span><span id="aw_12">-></span><span id="aw_13">¥'+event_check_val.reward_money[event_state_kari][1]+'</span></div>';
    str+='<div id="aw_3" class="aw_s quest_s page_container"><span id="aw_11">Bronze Award('+event_check_val.reward_num[event_state_kari][2]+'名)</span><span id="aw_12">-></span><span id="aw_13">¥'+event_check_val.reward_money[event_state_kari][2]+'</span></div>';
    str+='</div>';
    str+='</div>';

    $("#all_contents").append(str);

    //いるかどうか
    regi_stu_num=-1;
    for(var i=0;i<st_data.students.length;i++){
        if(st_data.students[i].collabo==2){
            regi_stu_num=i;
        }
    }


    if(regi_stu_num==-1){ //いない
        show_registration();
    }else{ //いる
        //statusアップデート
        var d = new $.Deferred();
        join_event_api(us_data.uid,us_data.name,us_data.faculty,-1,st_data.students[regi_stu_num].id,st_data.students[regi_stu_num].name,window.parent.calc_param(regi_stu_num),d);
        d.promise().then(function() {
            registu(join_event_val.regi_n);
        });
    }


}


//生徒選択してない
function show_registration(){
    str="";
    str+="<a href='#' onclick='regi_ch(0); return false;'>";
    str+='<div id="regi_ch1" class="regi page_container">';
    str+='<div id="re_1" class="quest_s page_container"></div>';
    str+='<div id="re_2" class="quest_s page_container">ロングペーパー</div>';
    str+='<div id="re_3" class="quest_s page_container">で参加</div>';
    str+='</div></a>';
    str+="<a href='#' onclick='regi_ch(1); return false;'>";
    str+='<div id="regi_ch2" class="regi page_container">';
    str+='<div id="re_1" class="quest_s page_container"></div>';
    str+='<div id="re_2" class="quest_s page_container">ショートペーパー</div>';
    str+='<div id="re_3" class="quest_s page_container">で参加</div>';
    str+='</div></a>';
    str+="<a href='#' onclick='regi_ch(2); return false;'>";
    str+='<div id="regi_ch3" class="regi page_container">';
    str+='<div id="re_1" class="quest_s page_container"></div>';
    str+='<div id="re_2" class="quest_s page_container">デモ展示</div>';
    str+='<div id="re_3" class="quest_s page_container">で参加</div>';
    str+='</div></a>';


    $("#all_contents").append(str);
    registu(-1);
}
//生徒選択済み
function registu(regi_n){
    var str="";
    if(regi_n==-1){
        str+='<div id="box_1" class="regi page_container">参加中の生徒</div>';
    }else{
        str+="<a href='#' onclick='regi_ch("+regi_n+"); return false;'>";
        str+='<div id="box_1" class="regi page_container" style="background-image: url(images/button_correct_30147.png);">参加中の生徒</div>';
        str+='</a>';
    }

    str+="<a href='#' onclick='show_history(false); return false;'>";
    str+='<div id="box_2" class="regi page_container">受賞履歴</div>';
    str+='</a>';

    $("#all_contents").append(str);
}







function regi_ch(n){
    no_scroll();
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    //$("#float_body").css("top", (hh/2)+"px");

    var str="";

    str+='<div id="in_float_quest" class="quest_list2 in_float page_container">';

    /*
    str+='<div id="q_1" class="quest_s" style="background-image: url(images/icon_quest'+(n+1)+'.png);"></div>';
    str+='<div id="q_2" class="quest_s">'+qtitle_+'</div>';
    str+='<div id="q_3_" class="quest_s"></div>';
    str+='<div id="q_3" class="quest_s">所要時間&nbsp;'+que_data.quests[n].time+'分</div>';
    str+='<div id="q_4_" class="quest_s"></div>';
    str+='<div id="q_4" class="quest_s">'+que_data.quests[n].person_num+'人</div>';
    str+='<hr id="q_border1" class="quest_s page_container" style="width:220px;">';
    */

    str+='<div id="q_2" class="quest_s page_container">'+event_check_val.event_name[event_state_kari]+'</div>';
    if(n==0){str+='<div id="q_3" class="quest_s page_container" style="color:#FCABB1">ロングペーパー 部門</div>';}
    if(n==1){str+='<div id="q_3" class="quest_s page_container" style="color:#939FD5">ショートペーパー 部門</div>';}
    if(n==2){str+='<div id="q_3" class="quest_s page_container" style="color:#FFE1B2">デモ展示 部門</div>';}
    str+='<hr id="q_border1" class="quest_s page_container">';
    str+='</div>';


    if(regi_stu_num==-1){
        str+='<div id="q_mbox" class="quest_s page_container">';
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

        str+='<a href="#" onclick="float_ch('+n+'); return false;">';
        str+='<div id="float_choice" class="page_container">';
        str+='実行！';
        str+='</div>';
        str+='</a>';
    }else{

        str+='<div id="q_mbox" class="quest_s page_container" style="top:91px;">';
        str+='</div>';
        setTimeout(function(){
            selfunc(regi_stu_num);
        }, 100);
        str+='<div id="cansel_t" class="quest_s page_container">-参加予定者-</div>';

        str+='<a href="#" onclick="cansel_regi('+regi_stu_num+'); return false;">';
        str+='<div id="float_choice" class="page_container" style="background-image:url(images/button_incorrect_3590.png);">';
        str+='キャンセル';
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




function float_ch(n){
    var val;
    var radioList = document.getElementsByName("s3");
    for(var i=0; i<radioList.length; i++){
        if (radioList[i].checked) {
            val=radioList[i].value;
            break;
        }
    }

    if(val!=undefined){
        $("#float_body").empty();
        $("#float_body").append("wait...");
        var d = new $.Deferred();
        join_event_api(us_data.uid,us_data.name,us_data.faculty,n,st_data.students[val].id,st_data.students[val].name,window.parent.calc_param(val),d);
        d.promise().then(function() {
            show_key(val);
        });

    }

    //console.log(val);
}

function show_key(vl){
    //console.log(hold_val);

    if(join_event_val.message!="ng"){
        window.parent.collabo_st(st_data.students[vl].id,2);
        float_close();
        $("#all_contents").empty();
        show_event();
    }else{
        $("#float_body").append("失敗しました<br>接続や設定を確認してください");
        setTimeout(function(){
            location.href = "collabo.html";
        }, 2000);
    }
}


//キャンセル
function cansel_regi(s_num){
    $("#all_contents").append("<div id='floating2' class='page_container'></div>");
    $("#floating2").hide().append("<div id='float_body2'></div><div id='float_back2'></div>");

    var str="";
    //console.log(st_data.students[s_num].name);
    str+='<div id="can_1" class="cansels in_float page_container">'+st_data.students[s_num].name+' 君の学会参加をキャンセルします</div>';
    str+='<a href="#" onclick="cansel_run('+s_num+'); return false;">';
    str+='<div id="can_2" class="cansels in_float page_container">はい</div>';
    str+='</a>';
    str+='<div id="can_3" class="cansels in_float page_container">いいえ</div>';
    str+='</form>';


    $("#float_body2").append(str);

    $("#float_back2").css({
        "opacity":"0.7"
    });
    $("#floating2").delay(0).fadeIn(0);
    $("#float_back2, #can_3").click(float_close2);

}
var float_close2 = function(){
    $("#floating2").remove();
};

function cansel_run(c_val){
    var d = new $.Deferred();
    join_event_api(us_data.uid,us_data.name,us_data.faculty,-2,st_data.students[c_val].id,st_data.students[c_val].name,window.parent.calc_param(c_val),d);
    $("#float_body2").empty();
    $("#float_body2").append("wait...");
    d.promise().then(function() {
        cansel_run2(c_val);
    });
}
function cansel_run2(c_val){
    if(join_event_val.message!="ng"){
        window.parent.collabo_st(st_data.students[c_val].id,0);
        float_close();
        float_close2();
        $("#all_contents").empty();
        show_event();
    }else{
        $("#float_body").append("失敗しました<br>接続や設定を確認してください");
        setTimeout(function(){
            location.href = "collabo.html";
        }, 2000);
    }
}












function show_history(vv){
    no_scroll();
    $("#all_contents").append("<div id='floating3' class='page_container'></div>");
    $("#floating3").hide().append("<div id='float_body3'></div><div id='float_back3'></div>");

    var str3="";
    //$("#float_body").css("top", (hh/2)+"px");
    str3+='<div id="sh_1" class="shs page_container">受賞履歴</div>';
    str3+='<hr id="sh_border" class="shs page_container">';

    str3+='<div id="sh_box" class="shs page_container">';
    for(var i=0;i<event_state_kari;i++){
        str3+='<div id="sh_line'+i+'" class="sh_lines shs page_container" style="top:'+(65*i)+'px;">';
        str3+='<div id="sh_l1" class="shs page_container">'+event_check_val.event_name[i]+'</div>';
        if(Object.keys(event_check_val.reward_m[i]).length!=0){
            str3+='<div id="sh_l2" class="shs page_container">'+event_check_val.reward_m[i].uname+'&nbsp;研&nbsp;&nbsp;'+event_check_val.reward_m[i].sname+'&nbsp;君</div>';
            var st1="";
            var st2="";
            var st_="";
            if(parseInt(event_check_val.reward_m[i].regi_n,10)==0){
                st1+="ロングペーパー部門&nbsp;";
                st_="#FCABB1";
            }else if(parseInt(event_check_val.reward_m[i].regi_n,10)==1){
                st1+="ショートペーパー部門&nbsp;";
                st_="#939FD5";
            }else if(parseInt(event_check_val.reward_m[i].regi_n,10)==2){
                st1+="デモ展示部門&nbsp;";
                st_="#FFE1B2";
            }else{
            }
            if(parseInt(event_check_val.reward_m[i].rank,10)==1){
                st2+="Gold Award受賞";
            }else if(parseInt(event_check_val.reward_m[i].rank,10)==2){
                st2+="Silver Award受賞";
            }else if(parseInt(event_check_val.reward_m[i].rank,10)==3){
                st2+="Bronze Award受賞";
            }else{
                st2+="参加賞";
            }
            str3+='<div id="sh_l3" class="shs page_container" style="color:'+st_+'">'+st1+'</div>';
            str3+='<div id="sh_l4" class="shs page_container">'+st2+'</div>';
            str3+='<div id="sh_li1" class="shs sh_lis page_container"><span style="position: absolute;  left:19px;">'+window.parent.calc_rank(event_check_val.reward_m[i].status[0],true)+'</span></div>';
            str3+='<div id="sh_li2" class="shs sh_lis page_container"><span style="position: absolute;  left:19px;">'+window.parent.calc_rank(event_check_val.reward_m[i].status[1],true)+'</span></div>';
            str3+='<div id="sh_li3" class="shs sh_lis page_container"><span style="position: absolute;  left:19px;">'+window.parent.calc_rank(event_check_val.reward_m[i].status[2],true)+'</span></div>';

            str3+='<hr id="sh_lborder2" class="sh_lborders shs page_container">';


        }else{
            str3+='<div id="sh_l5" class="shs page_container">参加していません</div>';

        }
        str3+='<hr id="sh_lborder1" class="sh_lborders shs page_container">';
        str3+='</div>';
    }

    str3+='</div>';

    if(vv==true){
        str3+='<div id="sh_l6" class="shs page_container">報酬を受け取りました</div>';
    }


    $("#float_body3").append(str3);
    $("#floating3").append("<a href='#' id='info_batu3'></a>");

    $("#float_back3").css({
        "opacity":"0.7"
    });
    $("#floating3").delay(50).fadeIn(200);
    float_open_flag3 = 1;
    $("#float_back3,#info_batu3").click(float_close3);
}
var float_close3 = function(){
    $("#floating3").fadeOut(200,function(){
        $(this).remove();
        float_open_flag3 = 0;
        return_scroll();
    });
};

function get_reward(val){
    console.log(event_check_val.reward_money[val][(event_check_val.reward_m[val].rank-1)]);
    if(event_check_val.reward_m[val].rank!=-1){
        window.parent.SetValue(event_check_val.reward_money[val][(event_check_val.reward_m[val].rank-1)]);
    }
    window.parent.SetItem(10,10,10);
}






//-->
