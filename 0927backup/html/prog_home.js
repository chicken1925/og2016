<!--
var canvas;
var context;
var btn_scene=1;
var rects=[];
var numrects=30;

var smartphone=false;
var mouseX=0,mouseY=0;

var money=0;
var persec=0;

var time=0;



var loadevent = function() {
	//描画コンテキストの取得
	canvas = document.getElementById('main_canvas');
	if (canvas.getContext) {
		context = canvas.getContext('2d');
		
		context.fillStyle='rgb(240,240,240)';
		context.fillRect(0,0,canvas.width,canvas.height);
	}
	
	//スマホ、PCのクリック判定
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)) {
		smartphone=true;
	}
	
	function adjustXY(e) {
		var rect = e.target.getBoundingClientRect();
		mouseX = Math.floor(e.clientX - rect.left);
		mouseY = Math.floor(e.clientY - rect.top);
	}
	if(smartphone==false){
		canvas.onmousedown = mouseDownListner;
		function mouseDownListner(e) {
			//座標調整
			adjustXY(e);
			//console.log(mouseX+","+mouseY);
			//document.getElementById("min_m").textContent=mouseX+","+mouseY;
			add_rect(mouseX,mouseY);
		}
	}else{
		$(function(){
			var box = $("#main_canvas")[0];
			box.addEventListener("touchstart", touchHandler, false);
			box.addEventListener("touchmove", touchHandler, false);
			box.addEventListener("touchend", touchHandler, false);
		});
	}
	
	function touchHandler(e){
		e.preventDefault();
		var touch = e.touches[0];
		if(e.type == "touchstart"){
			mouseX=touch.pageX;
			mouseY=touch.pageY; //スマホ調整用
			//document.getElementById("min_m").textContent=mouseX+","+mouseY;
			add_rect(mouseX,mouseY);
		}
	}
	
	
	for(var i=0;i<numrects;i++){
		var rect =new Object();
		rect.x = Math.random()*(canvas.width-64)+32;
		rect.y = Math.random()*(canvas.height-64)+32;
		rect.vx = Math.random() * 2 - 1;
		rect.vy = Math.random() * 2 - 1;
		rect.r = 32;
		rect.t =  Math.floor(Math.random() * 500);
		rect.status=0;
		rect.img =new Image();
		if(i%10==7||i%10==8){
			rect.img.src = "images/chara2.png";
		}else if(i%10==9){
			rect.img.src = "images/chara3.png";
		}else{
		rect.img.src = "images/chara1.png";
		}
		rects[i] = rect;
	}
	//document.getElementById("all_m").textContent="¥"+numrects*100000;
	
};
 

if(window.addEventListener) {
    // W3C DOM イベントモデルサポートブラウザ
    // FireFox, Chrome, Safari, Opera, IE9 ～
    window.addEventListener("load", loadevent, false);
} else if(window.attachEvent){
    // ～ IE8
    window.attachEvent("onload", loadevent);
} else {
    window.onload = eventFunc;
}







//アニメーション
setInterval(function(){
	//context初期化
	context.fillStyle='rgb(240,240,240)';
	context.fillRect(0,0,canvas.width,canvas.height);
	/*
	if(btn_scene==1){context.fillStyle = 'rgb(255,0,0)';}
	else if(btn_scene==2){context.fillStyle = 'rgb(0,255,0)';}
	else if(btn_scene==3){context.fillStyle = 'rgb(0,0,255)';}
	else if(btn_scene==4){context.fillStyle = 'rgb(255,255,0)';}
	else if(btn_scene==5){context.fillStyle = 'rgb(255,0,255)';}
	*/
	
	if(btn_scene==1){
		for(var i=0;i<numrects;i++){
			context.fillStyle = 'rgb(255,0,0)';
			//context.fillRect(rects[i].x,rects[i].y,rects[i].r,rects[i].r);
			
			context.drawImage(rects[i].img, rects[i].x,rects[i].y);
			
			//停止=0,歩行=1
			if(rects[i].status==0){
			
			}else if(rects[i].status==1){
				rects[i].x=rects[i].x+rects[i].vx;
				rects[i].y=rects[i].y+rects[i].vy;
			}
			
			rects[i].t--;
			if(rects[i].t<0){
				
				if(rects[i].status==0){
					rects[i].status=1;
					rects[i].t =  Math.floor(Math.random() * 150)+50;
					//console.log("hoge0");
				}else if(rects[i].status==1){
					rects[i].status=0;
					rects[i].t =  Math.floor(Math.random() * 500)+200;
					//console.log("hoge1");
				}
				rects[i].vx = Math.random() * 2 - 1;
				rects[i].vy = Math.random() * 2 - 1;
			}
			
			
			
			if(rects[i].x>canvas.width-rects[i].r||rects[i].x<0){
				rects[i].vx=rects[i].vx*-1;
			}
			if(rects[i].y>canvas.height-rects[i].r||rects[i].y<0){
				rects[i].vy=rects[i].vy*-1;
			}
		}
		
	}
	
	
},33);


function add_rect(xx,yy){
	numrects++;
	//console.log(numrects);
	var rect =new Object();
	rect.x = xx-5;
	rect.y = yy-5;
	rect.vx = Math.random() * 2 - 1;
	rect.vy = Math.random() * 2 - 1;
	rect.r = 30;
	rect.t =  Math.floor(Math.random() * 300);
	rect.status=0;
	rect.img =new Image();
	rect.img.src = "images/chara1.png"
	rects[numrects-1] = rect;
	//document.getElementById("all_m").textContent="¥"+numrects*100000;
}


//-->