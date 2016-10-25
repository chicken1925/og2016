<!--
var canvas;
var context;
var btn_scene=1;
var rects=[];
var numrects=5;

var smartphone=false;
var mouseX=0,mouseY=0;

var persec=0;
var bachelor=10,master=0,doctor=0;

var time=0;

//初期処理
window.addEventListener("load", function(){
	
	
	//document.getElementById("bachelor_n").textContent=bachelor+"人";
	//document.getElementById("master_n").textContent=master+"人";
	//document.getElementById("doctor_n").textContent=doctor+"人";
	
	persec=bachelor+master*20+doctor*50;
	//document.getElementById("min_m").textContent="¥"+persec+"/秒";
	
	//document.getElementById("all_m").textContent="¥"+money;
	
}, false);


setInterval(function (){
},100)


//アニメーション
/*
setInterval(function(){
	
},33);
*/

function test(){
	//サーバーにあげると動く
	//console.log(window.parent.money);
	window.parent.from_info();
	//window.parent.money=0;
}




//-->