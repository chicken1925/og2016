<!--

var st_data;
var us_data;

var skill_data={};
var spe_data={};
var gen_stu_data={};
$(function() {
  $.getJSON("skill_data.json" , function(data) {
    skill_data=data;
  });
    $.getJSON("speciality_data.json" , function(data) {
    spe_data=data;
  });
});




//初期処理
window.addEventListener("load", function(){
    us_data = window.parent.back_us_data();
	st_data = window.parent.back_stu_data();
	var hh= window.parent.box_size();
    window.parent.frame_num(1);
	$("#member_list").css("height", hh+"px");
	$("#all_contents").css("height", hh+"px");
    $.when($.getJSON("gen_student.json"))
        .done(function(data) {
        gen_stu_data=data;
        show_students();
    });


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



function show_students(){
    //生徒リスト表示
    for(var i=0;i<st_data.students.length;i++){
        var str="";

        str+='<a href="#" onclick="stu_detail('+i+'); return false;">';
        if(i%2==0){
            str+='<div id="member_'+i+'" class="members_box page_container" style="top:'+(6+Math.floor(i/2)*81)+';">';
        }else{
            str+='<div id="member_'+i+'" class="members_box page_container" style="top:'+(6+Math.floor(i/2)*81)+'; left:163;">';
        }
        if(st_data.students[i].grade==0||st_data.students[i].grade==1||st_data.students[i].grade==2){
            str+='<div id="member_img'+i+'" class="member_img page_container" style="border:solid 2px blue; background-image:url(images/'+gen_stu_data.gen[st_data.students[i].stu_type].pic+'.png);"></div>';
        }else if(st_data.students[i].grade==3||st_data.students[i].grade==4||st_data.students[i].grade==5){
            str+='<div id="member_img'+i+'" class="member_img page_container" style="border:solid 2px green; background-image:url(images/'+gen_stu_data.gen[st_data.students[i].stu_type].pic+'.png);"></div>';
        }else if(st_data.students[i].grade==6||st_data.students[i].grade==7||st_data.students[i].grade==8){
            str+='<div id="member_img'+i+'" class="member_img page_container" style="border:solid 2px red; background-image:url(images/'+gen_stu_data.gen[st_data.students[i].stu_type].pic+'.png);"></div>';
        }
        str+='<div id="member_n1" class="member_n page_container">'+st_data.students[i].name+'</div>';
        var gra="";
        if(st_data.students[i].grade==0){gra="学3"}
        else if(st_data.students[i].grade==1||st_data.students[i].grade==2){gra="学4"}
        else if(st_data.students[i].grade==3){gra="修1"}
        else if(st_data.students[i].grade==4||st_data.students[i].grade==5){gra="修2"}
        else if(st_data.students[i].grade==6){gra="博1"}
        else if(st_data.students[i].grade==7){gra="博2"}
        else if(st_data.students[i].grade==8){gra="博3"}
        str+='<div id="member_n2" class="member_n page_container">'+gra+'</div>';
        var remain;
        if(st_data.students[i].grade==0){remain=600-Math.ceil((new Date().getTime()-st_data.students[i].course_t)/1000);}
        else if(st_data.students[i].grade==1){remain=1200-Math.ceil((new Date().getTime()-st_data.students[i].course_t)/1000);}
        else if(st_data.students[i].grade==3){remain=900-Math.ceil((new Date().getTime()-st_data.students[i].course_t)/1000);}
        else if(st_data.students[i].grade==4){remain=1800-Math.ceil((new Date().getTime()-st_data.students[i].course_t)/1000);}
        else if(st_data.students[i].grade==6){remain=1200-Math.ceil((new Date().getTime()-st_data.students[i].course_t)/1000);}
        else if(st_data.students[i].grade==7){remain=2400-Math.ceil((new Date().getTime()-st_data.students[i].course_t)/1000);}
        else if(st_data.students[i].grade==8){remain=3600-Math.ceil((new Date().getTime()-st_data.students[i].course_t)/1000);}
        if(st_data.students[i].grade==2||st_data.students[i].grade==5){
            str+='<div id="member_n4" class="member_n page_container"style="font-size:11px; left:92px;">相談待ち</div>';
        }else{
            str+='<div id="member_n4" class="member_n page_container"style="font-size:10px; ">next: '+toHms(remain)+'</div>';
        }
        str+='<div id="member_border" class="member_n page_container"></div>';

        str+='<div id="member_n31" class="member_n page_container"><span style="position: absolute;  left:18px;">'+window.parent.calc_rank(window.parent.calc_param(i)[0],true)+'</span></div>';
        str+='<div id="member_n32" class="member_n page_container"><span style="position: absolute;  left:18px;">'+window.parent.calc_rank(window.parent.calc_param(i)[1],true)+'</span></div>';
        str+='<div id="member_n33" class="member_n page_container"><span style="position: absolute;  left:18px;">'+window.parent.calc_rank(window.parent.calc_param(i)[2],true)+'</span></div>';
        var cstr="";
        if(st_data.students[i].collabo==0){cstr="研";}
        else if(st_data.students[i].collabo==1){cstr="共";}
        else if(st_data.students[i].collabo==2){cstr="学";}
        str+='<div id="member_n5" class="member_n page_container">'+cstr+'</div>';
        str+='</div>';
        str+='</a>';
        $("#member_list").append(str);
    }

    if(st_data.students.length<6){
        var str2="";
        if(Math.ceil((new Date().getTime()-us_data.respawn_t)/1000)<=1800){
            str2+='<div id="add_member" class="add_member page_container" style="background:#999; background-image: url(images/button_incorrect_26130.png);background-size:cover;">追加可能まで&nbsp'+toHms(1800-Math.ceil((new Date().getTime()-us_data.respawn_t)/1000))+'</div>';
        }else{
            str2+='<a id="add_a"  href="#" onclick="add_stu_parent('+st_data.students.length+'); return false;">';
            str2+='<div id="add_member" class="add_member page_container" >メンバー追加</div>';
            str2+='</a>';
        }
        $("#member_list").append(str2);
    }
}



function add_stu_parent(val){
    $("#add_a").remove();
    var str2="";
    str2+='<div id="add_member2" class="add_member page_container">wait...</div>';
    $("#member_list").append(str2);
    window.parent.add_stu();
}


var effect_detail_num=0;
stu_detail_info=false;
function stu_detail_(num){
    var str="";
        if(st_data.students[num].grade==0||st_data.students[num].grade==1||st_data.students[num].grade==2){
        str+='<div id="f_1" class="page_container" style="border:solid 2px blue; background-image:url(images/'+gen_stu_data.gen[st_data.students[num].stu_type].pic+'.png);"></div>';
        }else if(st_data.students[num].grade==3||st_data.students[num].grade==4||st_data.students[num].grade==5){
        str+='<div id="f_1" class="page_container" style="border:solid 2px green; background-image:url(images/'+gen_stu_data.gen[st_data.students[num].stu_type].pic+'.png);"></div>';
        }else if(st_data.students[num].grade==6||st_data.students[num].grade==7||st_data.students[num].grade==8){
        str+='<div id="f_1" class="page_container" style="border:solid 2px red; background-image:url(images/'+gen_stu_data.gen[st_data.students[num].stu_type].pic+'.png);"></div>';
        }
        str+='<div id="f_2" class="page_container">'+st_data.students[num].name+'</div>';

        var per="";
        if(st_data.students[num].personality==0){per="慎重"}
        else if(st_data.students[num].personality==1){per="大人しい"}
        else if(st_data.students[num].personality==2){per="せっかち"}
        else if(st_data.students[num].personality==3){per="臆病"}
        else if(st_data.students[num].personality==4){per="やんちゃ"}
        else if(st_data.students[num].personality==5){per="勇敢"}
        else if(st_data.students[num].personality==6){per="天才肌"}
        str+='<div id="f_3" class="page_container"><span style="position:absolute; left:60px;">'+per+'</span></div>';
        str+='<div id="f_31" class="page_container"></div>';
        //console.log(spe_data.spes[1])
        str+='<div id="f_4" class="page_container"><span style="position:absolute; left:60px;">'+spe_data.spes[st_data.students[num].speciality].name+'</span></div>';
        str+='<div id="f_41" class="page_container"></div>';

        var gra="";
        if(st_data.students[num].grade==0){gra="学部<br>３年"}
        else if(st_data.students[num].grade==1||st_data.students[num].grade==2){gra="学部<br>４年"}
        else if(st_data.students[num].grade==3){gra="修士<br>１年"}
        else if(st_data.students[num].grade==4||st_data.students[num].grade==5){gra="修士<br>２年"}
        else if(st_data.students[num].grade==6){gra="博士<br>１年"}
        else if(st_data.students[num].grade==7){gra="博士<br>２年"}
        else if(st_data.students[num].grade==8){gra="博士<br>３年"}
        str+='<div id="f_5" class="page_container">'+gra+'</div>';
        var remain;
        if(st_data.students[num].grade==0){remain=600-Math.ceil((new Date().getTime()-st_data.students[num].course_t)/1000);}
        else if(st_data.students[num].grade==1){remain=1200-Math.ceil((new Date().getTime()-st_data.students[num].course_t)/1000);}
        else if(st_data.students[num].grade==3){remain=900-Math.ceil((new Date().getTime()-st_data.students[num].course_t)/1000);}
        else if(st_data.students[num].grade==4){remain=1800-Math.ceil((new Date().getTime()-st_data.students[num].course_t)/1000);}
        else if(st_data.students[num].grade==6){remain=1200-Math.ceil((new Date().getTime()-st_data.students[num].course_t)/1000);}
        else if(st_data.students[num].grade==7){remain=2400-Math.ceil((new Date().getTime()-st_data.students[num].course_t)/1000);}
        else if(st_data.students[num].grade==8){remain=3600-Math.ceil((new Date().getTime()-st_data.students[num].course_t)/1000);}
        if(st_data.students[num].grade==2||st_data.students[num].grade==5){
            str+='<a href="#" onclick="counseling('+num+'); return false;">';
            str+='<div id="f_8_" class="page_container blinking counsel" >相談待ち</div>';
            str+='</a>';
        }else{
            str+='<div id="f_8" class="page_container">'+toHms(remain)+'</div>';
        }
        str+='<div id="f_81" class="page_container">進学まで</div>';
        var cstr="";
        if(st_data.students[num].collabo==0){cstr="研究室内";}
        else if(st_data.students[num].collabo==1){cstr="共同研究中";}
        else if(st_data.students[num].collabo==2){cstr="学会参加中";}
        str+='<div id="f_9" class="page_container">'+cstr+'</div>';

        str+='<hr id="f_border1" class="bd1 member_n page_container">';
        str+='<hr id="f_border2" class="bd1 member_n page_container">';
        str+='<hr id="f_border3" class="bd1 member_n page_container">';


        if(stu_detail_info==false){str+='<div id="f_tab1" class="page_container">';}
        else if(stu_detail_info==true){str+='<div id="f_tab2" class="page_container">';}
        str+='<a href="#" onclick="stu_info(false); return false;">';
        str+='<div id="f_tab_t1" class="page_container"></div></a>';
        str+='<a href="#" onclick="stu_info(true); return false;">';
        str+='<div id="f_tab_t2" class="page_container"></div></a>';
        str+='</div>';

        //console.log(window.parent.calc_param(num));

    if(stu_detail_info==false){
        str+='<div id="f_61" class="page_container">';
        str+='<div id="f_611" class="param1 page_container"></div>';
        if((window.parent.calc_param(num)[0]-st_data.students[num].status[0])<0){str+='<div id="f_612" class="param2 page_container">'+window.parent.calc_rank(window.parent.calc_param(num)[0],true)+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[0]+''+(window.parent.calc_param(num)[0]-st_data.students[num].status[0])+')</div></div>';}
        else{str+='<div id="f_612" class="param2 page_container">'+window.parent.calc_rank(window.parent.calc_param(num)[0],true)+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[0]+'+'+(window.parent.calc_param(num)[0]-st_data.students[num].status[0])+')</div></div>';}
        str+='<div id="f_613" class="param3 page_container">&nbsp;作成する論文の質</div>';
        str+='<a href="#" onclick="use_item('+num+',0); return false;">';
        str+='<div id="use_item" class="use_button page_container"></div>';
        str+='</a>';
        str+='</div>';
        str+='<div id="f_62" class="page_container">';
        str+='<div id="f_621" class="param1 page_container"></div>';
        if(window.parent.calc_param(num)[1]-st_data.students[num].status[1]<0){str+='<div id="f_622" class="param2 page_container">'+window.parent.calc_rank(window.parent.calc_param(num)[1],true)+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[1]+''+(window.parent.calc_param(num)[1]-st_data.students[num].status[1])+')</div></div>';}
        else{str+='<div id="f_622" class="param2 page_container">'+window.parent.calc_rank(window.parent.calc_param(num)[1],true)+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[1]+'+'+(window.parent.calc_param(num)[1]-st_data.students[num].status[1])+')</div></div>';}
        str+='<div id="f_623" class="param3 page_container">&nbsp;論文を作成する速度</div>';
        str+='<a href="#" onclick="use_item('+num+',1); return false;">';
        str+='<div id="use_item" class="use_button page_container"></div>';
        str+='</a>';
        str+='</div>';
        str+='<div id="f_63" class="page_container">';
        str+='<div id="f_631" class="param1 page_container"></div>';
        if(window.parent.calc_param(num)[2]-st_data.students[num].status[2]<0){str+='<div id="f_632" class="param2 page_container">'+window.parent.calc_rank(window.parent.calc_param(num)[2],true)+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[2]+''+(window.parent.calc_param(num)[2]-st_data.students[num].status[2])+')</div></div>';}
        else{str+='<div id="f_632" class="param2 page_container">'+window.parent.calc_rank(window.parent.calc_param(num)[2],true)+'&nbsp;<div style="font-size:10px;">('+st_data.students[num].status[2]+'+'+(window.parent.calc_param(num)[2]-st_data.students[num].status[2])+')</div></div>';}
        str+='<div id="f_633" class="param3 page_container">&nbsp;共同研究に関係</div>';
        str+='<a href="#" onclick="use_item('+num+',2); return false;">';
        str+='<div id="use_item" class="use_button page_container"></div>';
        str+='</a>';
        str+='</div>';

        str+='<hr id="f_border4" class="bd1 member_n page_container">';
        str+='<hr id="f_border5" class="bd1 member_n page_container">';
        str+='<hr id="f_border6" class="bd1 member_n page_container">';
        str+='<hr id="f_border7" class="bd1 member_n page_container">';
        str+='<hr id="f_border8" class="bd1 member_n page_container">';
        str+='<hr id="f_border9" class="bd1 member_n page_container">';



        str+='<div id="f_7" class="page_container">';
        str+='<div id="f_71_" class="page_container"></div>';
        str+='<div id="f_71" class="page_container"></div>';

        //filterがよくわからんのでこれ
        skill_name=["","",""];
        skill_text=["","",""];
        for(var i=0;i<st_data.students[num].skill.length;i++){
            for(var j=0;j<skill_data.skills.length;j++){
                if(skill_data.skills[j].id==st_data.students[num].skill[i]){
                    skill_name[i]=skill_data.skills[j].name;
                    skill_text[i]=skill_data.skills[j].script;
                }
            }
        }

        str+='<div id="f_72" class="skills page_container">';
        str+='<div id="f_721" class="skills_de1 page_container">&nbsp;1.&nbsp;'+skill_name[0]+'</div>';
        str+='<div id="f_722" class="skills_de2 page_container">'+skill_text[0]+'</div>';
        str+='</div>';

        var skill_v=false;
        if(st_data.students[num].skill[1]==0){
            str+='<div id="f_73" class="skills page_container">';
            str+='<a href="#" onclick="use_item('+num+',3); return false;">';
            str+='<div id="use_item" class="use_button2 page_container"></div>';
            str+='</a>';
            str+='</div>';
            skill_v=true;
        }else{
            str+='<div id="f_73" class="skills page_container">';
            str+='<div id="f_731" class="skills_de1 page_container">&nbsp;2.&nbsp;'+skill_name[1]+'</div>';
            str+='<div id="f_732" class="skills_de2 page_container">'+skill_text[1]+'</div>';
            str+='</div>';
        }

        if(st_data.students[num].skill[2]==0){
            if(skill_v==false){
                str+='<div id="f_74" class="skills page_container">';
                str+='<a href="#" onclick="use_item('+num+',3); return false;">';
                str+='<div id="use_item" class="use_button2 page_container"></div>';
                str+='</a>';
                str+='</div>';
            }
        }else{
            str+='<div id="f_74" class="skills page_container">';
            str+='<div id="f_741" class="skills_de1 page_container">&nbsp;3.&nbsp;'+skill_name[2]+'</div>';
            str+='<div id="f_742" class="skills_de2 page_container">'+skill_text[2]+'</div>';
            str+='</div>';
        }
        str+='</div>';

    }else{
        str+='<div id="f_10" class="page_container scrollbox">&nbsp;'+gen_stu_data.gen[st_data.students[num].stu_type].info1+'</div>';

        str+='<div id="f_11_" class="page_container"></div>';
        str+='<div id="f_11" class="page_container">'+gen_stu_data.gen[st_data.students[num].stu_type].info2+'</div>';


        //'+gen_stu_data.gen[st_data.students[num].stu_type].info1+'
    }

    $("#float_body").append(str);

}
function stu_info(tt){
    stu_detail_info=tt;
    $("#float_body").empty();
    if(float_open_flag==1){stu_detail_(now_num);}
}




var now_num=0;
var float_open_flag=0;
function stu_detail(num){
    now_num=num;
    $("#all_contents").append("<div id='floating' class='page_container'></div>");
    $("#floating").hide().append("<div id='float_body'></div><div id='float_back'></div>");

    stu_detail_(num);

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
        effect_detail_num=0;
        stu_detail_info=false;
    });
};



var input_num=1;
var input_num_s=0;
//アイテム使用float
function use_item(s_num,num){
    $("#all_contents").append("<div id='floating2' class='page_container'></div>");
    $("#floating2").hide().append("<div id='float_body2'></div><div id='float_back2'></div>");

    var str="";

    //console.log(us_data.item_param[num]);
    //3種パラメータ
    if(num==0||num==1||num==2){
        if(us_data.item_param[num]==0){
            str+='<div id="use_i3" class="use_is in_float page_container">アイテムを持っていません！</div>';
        }else{
            str+='<form id="gi_form">';
            str+='<div id="use_i1_" class="use_is in_float page_container" style="background-image:url(images/icon_item'+num+'.png);"></div>';
            str+='<div id="use_i1" class="use_is in_float page_container">を</div>';
            str+='<div id="item_value1" class="use_item_s page_container"><label><select name="p1" onchange="inputfunc('+s_num+','+num+')">';
            str+='<option value="1" selected>1コ</option>';
            if(us_data.item_param[num]<6){
                for(var i=2;i<=us_data.item_param[num];i++){
                    str+='<option value="'+i+'">'+i+'コ</option>';
                }
            }
            else if(us_data.item_param[num]>=6&&us_data.item_param[num]<=10){
                for(var i=2;i<=5;i++){
                    str+='<option value="'+i+'">'+i+'コ</option>';
                }
                str+='<option value="'+us_data.item_param[num]+'">'+us_data.item_param[num]+'コ</option>';
            }else if(us_data.item_param[num]>=11){
                for(var i=2;i<=5;i++){
                    str+='<option value="'+i+'">'+i+'コ</option>';
                }
                str+='<option value="10">10コ</option>';
                str+='<option value="'+us_data.item_param[num]+'">'+us_data.item_param[num]+'コ</option>';
            }
            str+='</select></label></div>';

            str+='<div id="use_i2" class="use_is in_float page_container">使います</div>';
            if(num==0){
                str+='<div id="use_i6" class="use_is in_float page_container">'+st_data.students[s_num].status[0]+'&nbsp;→&nbsp;<span id="how_item_val" style="color:red;">'+(st_data.students[s_num].status[0]+input_num)+'</span></div>';
                str+='<div id="use_i6_" class="use_is in_float page_container" style="background-image:url(images/icon_ron.png);"></div>';
            }else if(num==1){
                str+='<div id="use_i6" class="use_is in_float page_container">'+st_data.students[s_num].status[1]+'&nbsp;→&nbsp;<span id="how_item_val" style="color:red;">'+(st_data.students[s_num].status[1]+input_num)+'</span></div>';
                str+='<div id="use_i6_" class="use_is in_float page_container" style="background-image:url(images/icon_kai.png);"></div>';
            }else if(num==2){
                str+='<div id="use_i6" class="use_is in_float page_container">'+st_data.students[s_num].status[2]+'&nbsp;→&nbsp;<span id="how_item_val" style="color:red;">'+(st_data.students[s_num].status[2]+input_num)+'</span></div>';
                str+='<div id="use_i6_" class="use_is in_float page_container" style="background-image:url(images/icon_com.png);"></div>';
            }
            str+='<a href="#" onclick="use_item_run1('+s_num+','+num+'); return false;">';
            str+='<div id="use_i4" class="use_is in_float page_container">はい</div>';
            str+='</a>';
            str+='<div id="use_i5" class="use_is in_float page_container">いいえ</div>';
            str+='</form>';
        }

    //スキル追加
    }else if(num==3){
        input_num_s=us_data.item_skill[0];
        if(us_data.item_skill[0]==0&&us_data.item_skill.length==1){
            str+='<div id="use_i3" class="use_is in_float page_container">アイテムを持っていません！</div>';
        }else{
            str+='<form id="gi_form2">';
            str+='<div id="use_i7" class="use_is in_float page_container">スキル:</div>';
            str+='<div id="item_value2" class="use_item_s2 page_container"><label><select name="p2" onchange="inputfunc2()">';

            //filterがよくわからんのでこれ
            i_skill_id=[];
            i_skill_name=[];
            i_skill_text=[];
            var kk=0;
            for(var i=0;i<us_data.item_skill.length;i++){
                if(us_data.item_skill[i]!=0){
                    for(var j=0;j<skill_data.skills.length;j++){
                        if(skill_data.skills[j].id==us_data.item_skill[i]){
                            i_skill_id.push(skill_data.skills[j].id);
                            i_skill_name.push(skill_data.skills[j].name);
                            i_skill_text.push(skill_data.skills[j].script);
                        }
                    }
                }
            }

            input_num_s=i_skill_id[0];
            for(var i=0;i<i_skill_name.length;i++){
                str+='<option value="'+i_skill_id[i]+'">'+i_skill_name[i]+'</option>';
            }
            str+='</select></label></div>';
            str+='<div id="use_i8" class="use_is in_float page_container"><span id="how_skill_e">'+i_skill_text[0]+'</div></div>';
            str+='<div id="use_i9" class="use_is in_float page_container">を継承します</div>';

            str+='<a href="#" onclick="use_item_run2('+s_num+'); return false;">';
            str+='<div id="use_i4" class="use_is in_float page_container">はい</div>';
            str+='</a>';
            str+='<div id="use_i5" class="use_is in_float page_container">いいえ</div>';
            str+='</form>';
        }
    }





    $("#float_body2").append(str);

    $("#float_back2").css({
        "opacity":"0.7"
    });
    $("#floating2").delay(0).fadeIn(0);
    $("#float_back2, #use_i5").click(float_close2);

}
var float_close2 = function(){
    $("#floating2").remove();
};
function inputfunc(s_num,num){
    var frm=document.forms["gi_form"];
    var idx=frm.elements["p1"].selectedIndex;
    input_num=Number(frm.elements["p1"].options[idx].value);
    $('#how_item_val').text(st_data.students[s_num].status[num]+input_num);
}
function use_item_run1(s_num,num){
    window.parent.useitem_index(s_num,num,input_num);
    input_num=1;
    window.parent.save_cookie();
    float_close2();
}
function inputfunc2(){
    var frm=document.forms["gi_form2"];
    var idx=frm.elements["p2"].selectedIndex;
    input_num_s=Number(frm.elements["p2"].options[idx].value);

    var st="";
    for(var j=0;j<skill_data.skills.length;j++){
        if(skill_data.skills[j].id==input_num_s){
            st=skill_data.skills[j].script;
        }
    }
    $('#how_skill_e').text(st);
}
function use_item_run2(s_num){
    window.parent.useskill_index(s_num,input_num_s);
    input_num_s=0;
    window.parent.save_cookie();
    float_close2();
}




//進路相談
function counseling(s_num){
    $("#all_contents").append("<div id='floating2' class='page_container'></div>");
    $("#floating2").hide().append("<div id='float_body2'></div><div id='float_back2'></div>");

    var str="";
    str+='<div id="coun11" class="in_float page_container">'+st_data.students[s_num].name+' さんが</div>';
    str+='<div id="coun12" class="in_float page_container">進路相談に来ました</div>';
    str+='<div id="coun1_" class="in_float page_container"></div>';
    str+='<a href="#" onclick="career('+s_num+',0); return false;">';
    str+='<div id="coun2" class="use_is in_float page_container">進学しなさい！</div>';
    str+='</a>';
    str+='<a href="#" onclick="career('+s_num+',1); return false;">';
    str+='<div id="coun3" class="use_is in_float page_container">卒業しなさい！</div>';
    str+='</a>';


    $("#float_body2").append(str);

    $("#floating2").append("<a href='#' id='info_batu2'></a>");

    $("#float_back2").css({
        "opacity":"0.7"
    });
    $("#floating2").delay(0).fadeIn(0);
    $("#float_back2, #info_batu2").click(float_close2);

}
var float_close2 = function(){
    $("#floating2").remove();
};
function career(s_num,c){
    var ca_name=st_data.students[s_num].name;
    $("#float_body2").empty();

    var str="";
    if(c==0){ //進学
        if(st_data.students[s_num].grade==2){
            str+='<div id="coun11" class="in_float page_container" style="left:16px;">'+ca_name+' さんは</div>';
            str+='<div id="coun12" class="in_float page_container" style="left:16px;">修士過程に進学しました！</div>';
            window.parent.add_status(s_num,10);
            window.parent.career_m(s_num,0);
        }else if(st_data.students[s_num].grade==5){
            str+='<div id="coun11" class="in_float page_container" style="left:16px;">'+ca_name+' さんは</div>';
            str+='<div id="coun12" class="in_float page_container" style="left:16px;">博士過程に進学しました！</div>';
            window.parent.add_status(s_num,15);
            window.parent.career_m(s_num,0);
        }
        str+='<div id="coun5" class="use_is in_float page_container">確認</div>';
        str+='<div id="coun2_1" class="in_float page_container"></div>';
    }else if(c==1){ //卒業
        str+='<div id="coun11" class="in_float page_container">'+ca_name+' さんは</div>';
        str+='<div id="coun12" class="in_float page_container">卒業していきました…</div>';
        str+='<div id="coun2_2" class="in_float page_container"></div>';
        window.parent.career_m(s_num,1);
        str+='<div id="coun5" class="use_is in_float page_container">確認</div>';
        float_close();
    }

    $("#float_body2").append(str);
    $("#coun5").click(float_close2);

}




function oya(){
    $("#member_list").empty();
    show_students();
    //$("#float_body").empty();
    //if(float_open_flag==1){stu_detail_(now_num);}

    //$('#member_1 #member_n1').text('a');
}


//-->
