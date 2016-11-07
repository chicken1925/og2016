<!--


var st_data;
var us_data;

var wdata;


//初期処理
window.addEventListener("load", function(){

}, false);

var $id = function(id) { return document.getElementById(id); }
window.onload = function()
{
    $id("download-link").addEventListener("click", function(){
        var value = JSON.stringify(wdata, null, '    ');
        var href = "data:application/octet-stream," + encodeURIComponent(value);
        this.setAttribute("href", href);
    }, false);
}

function call_questlist(){
    var url_='http://153.126.164.52:8080/api/m_questlist/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
            },
            error: function(data) {
                console.log(data);
            }
        });
}
function call_greatdata(){
    var url_='http://153.126.164.52:8080/api/m_greatdata/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;

            },
            error: function(data) {
                console.log(data);
            }
        });
}
function call_greatdatajson(){
    //引数1で消去
    var url_='http://153.126.164.52:8080/api/m_greatdatajson/0/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;

            },
            error: function(data) {
                console.log(data);
            }
        });
}

function call_participantlist(){
    var url_='http://153.126.164.52:8080/api/m_participantlist/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;

            },
            error: function(data) {
                console.log(data);
            }
        });
}

function call_nowstate(){
    var url_='http://153.126.164.52:8080/api/now_state/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;

            },
            error: function(data) {
                console.log(data);
            }
        });
}
function call_eventdata(){
    var url_='http://153.126.164.52:8080/api/m_setevent/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;

            },
            error: function(data) {
                console.log(data);
            }
        });
}
function call_summoney(){
    var url_='http://153.126.164.52:8080/api/sum_money/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;

            },
            error: function(data) {
                console.log(data);
            }
        });
}
function call_login(){
    var login_id_ = document.forms["login_"].elements["login_id"].value;
    var login_pass_ = document.forms["login_"].elements["login_pass"].value;
    if(login_id_==''||login_pass_==''){
        console.log("please set.");
    }else{
        var url_='http://153.126.164.52:8080/api/login/';
        $.ajax({
            url: url_,
            type:'post',
            dataType: 'json',
            timeout:800,
            data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
                uid: login_id_,
                password: login_pass_
            },
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
}












function set_now_state(){
    var set_now_state_num_ = document.forms["set_state"].elements["now_stete"].value;
    var set_now_message_ = document.forms["set_state"].elements["now_message"].value;
    if(set_now_state_num_==''||set_now_message_==''){
        console.log("please set.");
    }else{
        var url_='http://153.126.164.52:8080/api/now_state/';
        $.ajax({
            url: url_,
            type:'post',
            dataType: 'json',
            timeout:800,
            data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
                set_now_state: set_now_state_num_,
                set_now_message: set_now_message_,
            },
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
}




function set_rank(val){
    var set_rank_val = document.forms["set_rank"].elements["rank_val"].value;
    var set_rank_val_json=$.parseJSON(set_rank_val);
    var set_rank_mem = document.forms["set_rank"].elements["rank_mem"].value;
    var set_rank_mem_arr=$.parseJSON(set_rank_mem);

    for(var i=0;i<set_rank_mem_arr.length;i++){
        set_rank_mem_arr[i].checked=0;
    }

    set_rank_val_json.reward_member=set_rank_mem_arr;

    var check_amount=true;


    /*人数あってるか確認
    var mm=0;
    for(var i=0;i<set_rank_val_json.reward_num.length;i++){
        mm+=parseInt(set_rank_val_json.reward_num[i],10);
    }
    if(mm==Object.keys(set_rank_val_json.reward_member).length){check_amount=true;}
    else{console.log("Not same num and member");}
    */


    if(check_amount==true){
        var url_='http://153.126.164.52:8080/api/m_setevent/';
        $.ajax({
            url: url_,
            type:'post',
            dataType: 'json',
            timeout:800,
            data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
                    event_num:set_rank_val_json.event_num,
                    event_name:set_rank_val_json.event_name,
                    reward_num:set_rank_val_json.reward_num,
                    reward_money:set_rank_val_json.reward_money,
                    reward_member:set_rank_val_json.reward_member,
                    set_num: val
            },
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
}









function call_delete_participantlist(){
    var url_='http://153.126.164.52:8080/api/m_delete_participantlist/';
        $.ajax({
            url: url_,
            type:'GET',
            dataType: 'jsonp',
            timeout:800,
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;

            },
            error: function(data) {
                console.log(data);
            }
        });
}
function call_delete_questdata(){
    var d_qid_ = document.forms["delete_qd"].elements["d_qid"].value;
    if(d_qid_==''){
        console.log("please set.");
    }else{
        var url_='http://153.126.164.52:8080/api/m_delete_questdata/';
        $.ajax({
            url: url_,
            type:'post',
            dataType: 'json',
            timeout:800,
            data: { // 送信データを指定(getの場合は自動的にurlの後ろにクエリとして付加される)
                d_qid: d_qid_
            },
            success: function(data) {
                console.log(data);
                var e = document.getElementById ('show_json');
                e.value = JSON.stringify(data, undefined, 2);
                wdata=data;
            },
            error: function(data) {
                console.log(data);
            }
        });
    }
}






//-->
