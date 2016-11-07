<!--


var st_data;
var us_data;


//初期処理
window.addEventListener("load", function(){
    us_data = window.parent.back_us_data();
	st_data = window.parent.back_stu_data();
	var hh= window.parent.box_size();
    window.parent.frame_num(4);
	$("#member_list").css("height", hh+"px");
	$("#all_contents").css("height", hh+"px");

	show_content();

}, false);

function show_content(){
    str="";
    str+='<a href="#" onclick="save_state_db_i(); return false;">';
    str+='<div id="i_1" class="page_container">save_db</div>';
    str+='</a>';

    str+='<a href="#" onclick="save_state_cookie_i(); return false;">';
    str+='<div id="i_2" class="page_container">save_cookie</div>';
    str+='</a>';

    str+='<a href="#" onclick="delete_cookie_i(); return false;">';
    str+='<div id="i_3" class="page_container">delete_cookie</div>';
    str+='</a>';

    $("#all_contents").append(str);
}

function save_state_db_i(){
	//console.log(st_data);
	window.parent.save_db();
}

function save_state_cookie_i(){
    //console.log(st_data);
    window.parent.save_cookie();
}

function delete_cookie_i(){
    //console.log(st_data);
    window.parent.delete_cookie();
}

//-->
