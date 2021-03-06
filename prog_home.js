//<!--
//定義部分
var canvas;
var context;
var btn_scene=1;
var student_data;
var us_data;
var studentCount;
var rects=[];

var notifications=[];

var bgLayer=[];
var effectLayer=[];
var objectLayer=[];
    
var news;
var smartphone=false;
var mouseX=0,mouseY=0;
var imgBG=[];

function Sprite(_img,_x,_y){
    this.x=_x;
    this.y=_y;
    this.img=_img;
    this.Draw=function(){
        context.drawImage(this.img, this.x,this.y);
    }
}

function Notification(_mode,_value){
    this.mode=_mode;
    this.margine=25;
    this.offset=10;
    this.value=_value;
    this.img=new Image();
    this.img.src="images/bar.png";
    this.x=-500;
    this.active=false;
    this.y=this.margine*notifications.length+this.offset;
    this.message="";

    
    this.SetValue=function(_newValue){
        if(this.value !=_newValue){
            this.value=_newValue;
            this.x=-500;
        }
        if(this.value>0){
            this.active=true;
        }else{
            this.active=false;
        }
    }

    this.Animation=function(){

        this.x/=1.2;

    }

    this.Draw=function(){
        if(this.active){
            switch(_mode){
                case 0:
                    this.message="進路相談待ちの生徒が"+this.value+"人います";
                    break;
        
                case 1:
                    this.message="完了した共同研究が"+this.value+"件あります";
                    break;
        
                case 2:
                    this.message="代表生徒を学会に参加させましょう";
                    break;
        
                default:
                    this.message="このメッセージは見えないはずだよ。"
                    break;

            }
            $('#box').text(this.message);
            $('#box').animate({
                'width':'70%'
            },{
                'duration':600,
                'easing':"easeOutBack"
            })
            /*
            context.drawImage(this.img, this.x,this.y);
            context.font = "14px 'ヒラギノ角ゴ Pro'";
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.fillStyle = "white";
            context.fillText(this.message, this.x+this.offset, this.y+(this.margine/2.5));
            */
        }
        
    }
    this.CheckCorrision=function(_x,_y){
         if(this.x<_x&&_x<this.x+this.img.width&&
            this.y<_y&&_y<this.y+this.img.height&&
             this.active){
            
              switch(this.mode){
                  case 0:
                    window.top.u_button(2);
                  break;
                  case 1:
                    window.top.u_button(3);
                  break;
                  case 2:
                    window.top.u_button(4);
                  break;

              }
        }
    }
}
function ChangePage(){
    console.log("hoge");
    window.top.u_button(2);

};

function News(_contents){
    this.contents=_contents;
    this.displayVector=0;
    this.displayContent=this.contents[0];
    this.displayNextContent=this.contents[0];
    this.splitPoint=0;
    this.reloadContent=true;
    this.display_t=0;

    this.Animation= function(){
        if(this.reloadContent){
            this.splitPoint*=0.95;
            if(this.splitPoint<=0.1){
                this.splitPoint=canvas.width;
                this.displayContent=this.displayNextContent;
                this.reloadContent=false;
            }
            
        }else{
            this.display_t++;
            if(this.display_t>300){
                this.displayVector++;
                if(this.displayVector>=this.contents.length){
                    this.displayVector=0;
                }
                this.displayNextContent=this.contents[this.displayVector];
                this.reloadContent=true;
                this.display_t=0;
            }
        }
    }

    this.Draw=function(){

        context.font = "bold 20px 'ヒラギノ角ゴ Pro W6'";
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillStyle = "black";
        fillTextLine(context,this.displayContent, -canvas.width+this.splitPoint, canvas.height-40);
        fillTextLine(context,this.displayNextContent,this.splitPoint,canvas.height-40 );
       // context.fillText(this.displayContent, -canvas.width+this.splitPoint, canvas.height-40);
       // context.fillText(this.displayNextContent,this.splitPoint,canvas.height-40 );
    }
}

function Student(_id,_imgIndex,_x,_y){
    //console.log(numrects);
    this.id=_id;
    this.x = _x-5;
    this.y = _y-5;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.r = 30;
    this.t =  Math.floor(Math.random() * 300);
    this.percentage=0;
    this.isCollabo=false;
    this.status=0;
    this.img =new Image();
    if(_imgIndex<3){
        this.img.src = "images/chara1.png";
    }else if(_imgIndex>6){
        this.img.src = "images/chara3.png";
    }else{
        this.img.src = "images/chara2.png";
    
    }
    
    this.papers=[];
    this.maxPaper=8;
    for(var i=0;i<this.maxPaper;i++){
        this.papers[i]=new Paper(this.id,i,this.x,this.y);
    }
    
    
    this.Animation=function(){
        //停止=0,歩行=1
        objectLayer.push(new Sprite(this.img, this.x,this.y));
        for(var i in this.papers){
            this.papers[i].Animation(this.img,this.maxPaper,this.x,this.y);
        }
        

    }
    this.DrawBar=function(){
        if(this.isCollabo==true){



        }else{
            context.fillStyle = "rgb(255, 0, 0)";
            context.fillRect(this.x,this.y+this.img.height-5,this.img.width,5);
            context.fillStyle = "rgb(0, 255, 0)";
            context.fillRect(this.x,this.y+this.img.height-5,this.img.width*this.percentage,5);
        }
    }
    this.PaperGenelate=function(){
        
        var student = student_data.students[this.id];
        var status=window.top.calc_param(this.id);   
        var rank= window.top.calc_rank(status[1],false);
        
		var genTime=15;
		if(rank==0){
            genTime=45;
        }else if(rank==1){
            genTime=40;
        }else if(rank==2){
            genTime=35;
        }else if(rank==3){
            genTime=30;
        }else if(rank==4){
            genTime=25;
        }else if(rank==5){
            genTime=20;
        }else{
            genTime=15;
        }
        
        this.percentage = student.journal_t/genTime;
        if(this.percentage>1){
            this.percentage=1;
        }
        for(var i in student.journal_pos){
            var journal_pos=student.journal_pos[i];
            if(journal_pos!=0){
                
                this.papers[i].paperInitialize(journal_pos,Math.pow( 4,journal_pos)*100);
            
            }
        }
    }
    //document.getElementById("all_m").textContent="¥"+numrects*100000;
}

function Paper(_user,_id,_x,_y){
    this.userID=_user;
    this.id=_id;
    this.x=_x;
    this.y=_y;
    this.level=0;
    this.active=false;
    this.value=0;
    this.effects=[];
    this.activeEffect=false;
    this.imgs=[];
    //イメージソースをメモリ上に展開
    for(var img_i=0;img_i<8;img_i++){
        var img=new Image();
        switch(img_i){
            case 1:
                img.src = "images/paper_0.png";
                break;
            case 2:
                img.src = "images/paper_1.png";
                break;
            case 3:
                img.src = "images/paper_2.png";
                break;
            case 4:
                img.src = "images/paper_3.png";
                break;
            case 5:
                img.src = "images/paper_4.png";
                break;
            case 6:
                img.src = "images/paper_5.png";
                break;
            default:
                img.src = "images/paper_0.png";
                break;
        }
        this.imgs[img_i]=img;
    }

    this.paperInitialize=function(_level,_value){
        this.level=_level;
        this.value=_value;
        this.active=true;
    }
    this.Animation=function(parentImg,_maxPaper,_parentX,_parentY){
        if(this.active){
            //context.drawImage(this.imgs[this.level], this.x,this.y);
            objectLayer.push(new Sprite(this.imgs[this.level], this.x,this.y));
        }
        for(var i in this.effects){
            if(!this.effects[i].BangEffect(this.x,this.y)){
                this.effects.splice(i,1);
                
                window.parent.SetDispValue(this.value);
                //setCookie('DeltaValue',dispValue,7);
                
            }
        }
        var offsetX=0;
        var offsetY=0;
        var adjustX=5;
        var adjustY=-5;
        var marginX=1;
        var marginY=0.75;
        var opposide=1;
        if(this.userID%2==1){
            opposide=-1;
        }
        //var marginSize=1.0;
        //var leftMargine=90;
        switch(this.id){
            case 0:
                offsetX=32*marginX*opposide+adjustX;
                offsetY=32*marginY*0+adjustY;
                break;
            case 1:
                offsetX=32*marginX*opposide+adjustX;
                offsetY=32*marginY+adjustY;
                break;
            case 2:
                offsetX=32*marginX*0+adjustX;
                offsetY=32*marginY+adjustY;
                break;
            case 3:
                offsetX=32*marginX*-opposide+adjustX;
                offsetY=32*marginY+adjustY;
                break;
            case 4:
                offsetX=32*marginX*-opposide+adjustX;
                offsetY=32*marginY*0+adjustY;

                break;
            case 5:
                offsetX=32*marginX*-opposide+adjustX;
                offsetY=32*-marginY+adjustY;
                break;
            case 6:
                offsetX=32*marginX*0+adjustX;
                offsetY=32*-marginY+adjustY;
                break;
            case 7:
                offsetX=32*marginX*opposide+adjustX;
                offsetY=32*-marginY+adjustY;
                break;

            default:
                offsetX=32*marginX;
                offsetY=32*marginY;
                break;


        }
        //var rad= this.id* ((360/_maxPaper)+leftMargine) * (Math.PI / 180);
        //offsetX=parentImg.width*marginSize*Math.cos(rad);
        //offsetY=parentImg.height*marginSize*Math.sin(rad);
        this.x=_parentX+offsetX;
        this.y=_parentY+offsetY;
    }

    this.CheckCorrision=function(_x,_y){
        if(this.active){
            if(this.x<_x&&_x<this.x+this.imgs[this.level].width&&
                this.y<_y&&_y<this.y+this.imgs[this.level].width){
                this.level=0;
                this.active=false;
                //console.log(sumValue);
                window.top.SetValue(this.value);
                window.top.SetPaper(this.userID,this.id);
                //setCookie('SumPaper',sumPaper,7);
                //setCookie('SumValue',sumValue,7);
                this.effects.push(new PaperEffect(this.x,this.y));
            }
        }
    }

}

function PaperEffect(_x,_y){
    this.x=_x;
    this.y=_y;
    this.particleNum=5;
    this.particle=[];
    for(var i=0;i<this.particleNum;i++){
        this.particle[i]=new Particle(this.x,this.y, Math.random()*10+5 ,i*360/this.particleNum);
    }

    this.BangEffect=function(){
        var exist=true;
        for(var i in this.particle){
            if(!this.particle[i].BangEffect()){
                this.particle.splice(i,1);
            }
        }
        if(this.particle.length<=0){
            exist=false;
            //console.log("hoge");
            
        }
        return exist;
    }
    
}

function Particle(_x,_y,_velocity,_direction){
    this.id=0;
    this.img=new Image();
    this.img.src="images/ikura.png";

    var rad = _direction * (Math.PI / 180);
    this.x=_x;
    this.y=_y;
    this.dx=_velocity*Math.cos(rad);
    this.dy=_velocity*Math.sin(rad);
    this.timer=Math.random()*60+30;

    this.BangEffect=function(){
        var exist=true;
        //context.drawImage(this.img, this.x,this.y);
        effectLayer.push(new Sprite(this.img, this.x,this.y));
        this.x+=this.dx;
        this.y+=this.dy;
        if(this.timer<=0){
            this.dy-=1.0;
            if(this.y<0){
                exist=false;
                
            }
        }else{
            this.dx*=0.9;
            this.dy*=0.9;
            this.timer--;
        }
        return exist;
    }
}

//ここから実働部分
//マウスがクリックされたときに呼び出されるあれ
var OnMouseClick=function(_mouseX,_mouseY){
    for(var i in notifications){
        notifications[i].CheckCorrision(_mouseX,_mouseY);
    }
    
}
//マウスが動いたときに呼び出されるあれ
var OnMouseMove=function(_mouseX,_mouseY){
    for(var i in rects){
        for(var j in rects[i].papers){
            rects[i].papers[j].CheckCorrision(mouseX,mouseY);
                    
        }
    }
}

var loadevent = function() {
    var canvas2 = document.getElementById( "main_canvas" ) ;
    // キャンパスの描画領域の横幅を500pxに変更する
    canvas2.height = 340;
    var hh= window.parent.box_size();
    $("#all_contents").css("height", hh+"px");
    window.parent.frame_num(0); //1026追加
    var content=["○○研究室との共同研究完了！\nミジンコの生態について学んだ！","学会実施中！\n学生を一人参加させよう！"];
    news=new News(content);
    for(var i=0;i<6;i++){
        imgBG[i]=new Image();
        imgBG[i].src="images/bg_"+i+".png"
    }
    student_data=window.parent.back_stu_data();
    us_data=window.parent.back_us_data();
    studentCount=student_data.students.length*1;
    notifications.push(new Notification(0,0));
    notifications.push(new Notification(1,0));
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
        canvas.onmousemove = mouseMoveListenr;
        canvas.onmousedown = mouseDownListner;
        function mouseMoveListenr(e){
            adjustXY(e);
            OnMouseMove(mouseX,mouseY);
        }
        function mouseDownListner(e) {
            //座標調整
            adjustXY(e);
            
            OnMouseClick(mouseX,mouseY);
            //console.log(mouseX+","+mouseY);
            //document.getElementById("min_m").textContent=mouseX+","+mouseY;

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
            OnMouseClick(mouseX,mouseY);
        }
        if(e.type =="touchmove"){
            mouseX=touch.pageX;
            mouseY=touch.pageY; //スマホ調整用
            OnMouseMove(mouseX,mouseY);

        }
    

        //document.getElementById("all_m").textContent="¥"+numrects*100000;
    
    };
    for(var i in student_data.students){


        var offset = GetRectOffset(Number(i));

        rects[i] =new Student(i,student_data.students[i].grade,offset[0],offset[1]);
        
        
    }
}

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

//スチューデントデータの更新
setInterval(
    function(){
        //ユーザーデータベースの更新
        if(studentCount!=student_data.students.length){
            rects=[];
            for(var i in student_data.students){
                var offset = GetRectOffset(Number(i));
                rects[i] =new Student(i,student_data.students[i].grade,offset[0],offset[1]);
            }
            studentCount=student_data.students.length*1;
        }
        
        //通知欄の更新
        var waitDiscuss=0;
        var waitCollabo=0;
        for(var i in student_data.students){
            var remain;
            
            if(student_data.students[i].collabo!=0){

                rects[i].collabo=true;

            }else{
                rects[i].collabo=false;

            }
            if(student_data.students[i].grade==2||student_data.students[i].grade==5){
                waitDiscuss++;
            }
        }
        for(var i in notifications){
            switch(notifications[i].mode){
                case 0:
                    notifications[i].SetValue(waitDiscuss);
                    break;
                case 1:
                    notifications[i].SetValue(waitCollabo);
                    break;
            }   
        }

        //ペーパーの更新
        for(var i in rects){
            rects[i].PaperGenelate();
            
        }
    }    
,33)

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
    bgLayer=[];
    effectLayer=[];
    objectLayer=[];
    
    
    
    if(btn_scene==1){

        var bg_level=0;
        if(us_data.level<5){
            bg_level=0;
        }else if(us_data.level<10){
            bg_level=1;
        }else if(us_data.level<15){
            bg_level=2;
        }else if(us_data.level<20){
            bg_level=3;
        }else if(us_data.level<25){
            bg_level=4;
        }else{
            bg_level=5;
        }



        bgLayer.push(new Sprite(imgBG[bg_level],0,0));
        for(var i in rects){
            context.fillStyle = 'rgb(255,0,0)';
            rects[i].Animation();
            //context.fillRect(rects[i].x,rects[i].y,rects[i].r,rects[i].r);
        }
        for(var i in notifications){
            notifications[i].Animation();    
        }
        news.Animation();
        for(var i in bgLayer){
            bgLayer[i].Draw();
        }
        for(var i in objectLayer){
            objectLayer[i].Draw();
        }
        for(var i in rects){
            rects[i].DrawBar();
            //context.fillRect(rects[i].x,rects[i].y,rects[i].r,rects[i].r); 
        }
        for(var i in effectLayer){
            effectLayer[i].Draw();  
        }
        for(var i in notifications){
            notifications[i].Draw();
        }
        //news.Draw();
    }
    
    
},33);
var fillTextLine = function(context, text, x, y) {
    var textList = text.split('\n');
    var lineHeight = context.measureText("あ").width;
    textList.forEach(function(text, i) {
        context.fillText(text, x, y+lineHeight*i);
    });
};


function GetRectOffset(_number){
    var offset=[0,0];
    
    switch(_number){
        case 0:
            offset[0]=32*3+4;
            offset[1]=32*2.5;
            break;
        case 1:
            offset[0]=32*6+4;
            offset[1]=32*2.5;
            break;
        case 2:
            offset[0]=32*3+4;
            offset[1]=32*4.5;
            break;
        case 3:
            offset[0]=32*6+4;
            offset[1]=32*4.5;
            break;
        case 4:
            offset[0]=32*3+4;
            offset[1]=32*6.5;

            break;
        case 5:
            offset[0]=32*6+4;
            offset[1]=32*6.5;
            break;
        default:
            offset[0]=32*3+4;
            offset[1]=32*2.5;
            break;
    }


    return offset;
}
//-->
