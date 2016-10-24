<!--

//接続に時間がかかるため、returnしても値がnullのまま返されてしまう
//waitを設けるか、値がセットされてから返す方法があればいいのだが、わからん


function get_api(location,uid,callback){
	var url_='http://153.126.164.52:3030/api/'+location+'/'+uid;
		
		$.ajax({
			url: url_,
			type:'GET',
			dataType: 'jsonp',
			timeout:1000,
			success: function(data) {
				//console.log(data);
				/*
				target = document.getElementById("output");
				target.innerText ="id="+data.id;
				target.innerText +=", uid="+data.uid;
				if(document.forms.id_form1.id_textBox_num2.value=="users"){
					target.innerText +=", name="+data.name;
					target.innerText +=", password="+data.password;
					target.innerText +=", campus="+data.campus;
					target.innerText +=", department="+data.department;
				}
				if(document.forms.id_form1.id_textBox_num2.value=="money"){
					target.innerText +=", all_m="+data.all_m;
					target.innerText +=", per_m="+data.per_m;
				}
				console.log(data['id']);
				*/
				//money_jsonval=data;
				if(location=="users"){
					users_jsonval=data;
				}else if(location=="money"){
					money_jsonval=data;
				}else if(location=="students"){
					students_jsonval=data;
				}
				
				//senddata=data;
				//console.log(data);
				//return data;
			},
			error: function(data) {
				console.log("ng");
				console.log(data);
			}
		});
		
		
		
		//setTimeout(function(){}, 500);
		
		//return senddata;
		/*
		var count=0;
		var waitfunc = setInterval(function(){
			console.log(count);
			count++;
			if(count > 5){
				console.log(senddata);
				
				clearInterval(waitfunc);
				return 200;
			}
		}, 100);
		*/
		
		//console.log(waitfunc);
		//return waitfunc;
		
	//return 0;
}

