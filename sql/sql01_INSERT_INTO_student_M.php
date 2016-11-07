<!DOCTYPEHTMLPUBLIC"-//W3C//DTDHTML4.01Transitional//EN""http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<head><title>studentＭ初期データ追加</title>
<metahttp-equiv="Content-Type"content="text/html;charset=shift_jis">
</head>

<body>

studentＭ初期データ追加
<br>
<?php
			//パラメータ受け取り

			//ＤＢ接続
			include('connect_db.php');
/*
$query001="insertintogroups(id,name,member,contents,progress,insertDate,updateDate,deleteFlag)values(1,'group1','めんばー1','こんてんつ1','しんちょく1',NOW(),NOW(),0)";
$query002="insertintogroups(id,name,member,contents,progress,insertDate,updateDate,deleteFlag)values(2,'group2','めんばー2','こんてんつ2','しんちょく2',NOW(),NOW(),0)";
*/
/*
$query001	=	"insertintouser_M
(id,uid,name,insertDate,updateDate,deleteFlag)
values(1,'0001','user01',NOW(),NOW(),0)";
$query002	=	"insertintouser_M
(id,uid,name,insertDate,updateDate,deleteFlag)
values(2,'0002','user02',NOW(),NOW(),0)";
$query003	=	"insertintouser_M
(id,uid,name,insertDate,updateDate,deleteFlag)
values(3,'0003','user03',NOW(),NOW(),0)";

$result001=mysql_query($query001);
$result002=mysql_query($query002);
$result003=mysql_query($query003);
*/
$query001="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(1,'佐藤',0,0,0,15,15,15,111,0,0,1,0,0,NOW(),NOW(),0);";$result001=mysql_query($query001);if(!$result001){echo'Invalidquery:'.mysql_error();}
$query002="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(2,'鈴木',0,1,1,15,15,15,112,0,0,2,1,0,NOW(),NOW(),0);";$result002=mysql_query($query002);if(!$result002){echo'Invalidquery:'.mysql_error();}
$query003="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(3,'高橋',0,2,2,15,15,15,121,0,0,3,0,0,NOW(),NOW(),0);";$result003=mysql_query($query003);if(!$result003){echo'Invalidquery:'.mysql_error();}
$query004="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(4,'吉田',0,3,3,15,15,15,122,0,0,4,1,0,NOW(),NOW(),0);";$result004=mysql_query($query004);if(!$result004){echo'Invalidquery:'.mysql_error();}
$query005="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(5,'山田',0,4,4,15,15,15,131,0,0,5,0,0,NOW(),NOW(),0);";$result005=mysql_query($query005);if(!$result005){echo'Invalidquery:'.mysql_error();}
$query006="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(6,'佐々木',0,5,5,15,15,15,132,0,0,6,1,0,NOW(),NOW(),0);";$result006=mysql_query($query006);if(!$result006){echo'Invalidquery:'.mysql_error();}
$query007="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(7,'山口',0,0,6,15,15,15,141,0,0,7,0,0,NOW(),NOW(),0);";$result007=mysql_query($query007);if(!$result007){echo'Invalidquery:'.mysql_error();}
$query008="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(8,'松本',0,1,7,15,15,15,142,0,0,8,1,0,NOW(),NOW(),0);";$result008=mysql_query($query008);if(!$result008){echo'Invalidquery:'.mysql_error();}
$query009="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(9,'井上',0,2,8,15,15,15,111,0,0,9,0,0,NOW(),NOW(),0);";$result009=mysql_query($query009);if(!$result009){echo'Invalidquery:'.mysql_error();}
$query010="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(10,'木村',0,3,9,15,15,15,112,0,0,10,1,0,NOW(),NOW(),0);";$result010=mysql_query($query010);if(!$result010){echo'Invalidquery:'.mysql_error();}
$query011="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(11,'林',0,4,10,15,15,15,121,0,0,11,0,0,NOW(),NOW(),0);";$result011=mysql_query($query011);if(!$result011){echo'Invalidquery:'.mysql_error();}
$query012="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(12,'斎藤',0,5,11,15,15,15,122,0,0,12,1,0,NOW(),NOW(),0);";$result012=mysql_query($query012);if(!$result012){echo'Invalidquery:'.mysql_error();}
$query013="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(13,'清水',0,0,12,15,15,15,131,0,0,13,0,0,NOW(),NOW(),0);";$result013=mysql_query($query013);if(!$result013){echo'Invalidquery:'.mysql_error();}
$query014="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(14,'山崎',0,1,13,15,15,15,132,0,0,14,1,0,NOW(),NOW(),0);";$result014=mysql_query($query014);if(!$result014){echo'Invalidquery:'.mysql_error();}
$query015="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(15,'森',0,2,14,15,15,15,141,0,0,15,0,0,NOW(),NOW(),0);";$result015=mysql_query($query015);if(!$result015){echo'Invalidquery:'.mysql_error();}
$query016="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(16,'池田',0,3,0,15,15,15,142,0,0,16,1,0,NOW(),NOW(),0);";$result016=mysql_query($query016);if(!$result016){echo'Invalidquery:'.mysql_error();}
$query017="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(17,'橋本',0,4,1,15,15,15,111,0,0,17,0,0,NOW(),NOW(),0);";$result017=mysql_query($query017);if(!$result017){echo'Invalidquery:'.mysql_error();}
$query018="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(18,'阿部',0,5,2,15,15,15,112,0,0,18,1,0,NOW(),NOW(),0);";$result018=mysql_query($query018);if(!$result018){echo'Invalidquery:'.mysql_error();}
$query019="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(19,'藤田',0,0,3,15,15,15,121,0,0,19,0,0,NOW(),NOW(),0);";$result019=mysql_query($query019);if(!$result019){echo'Invalidquery:'.mysql_error();}
$query020="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(20,'後藤',0,1,4,15,15,15,122,0,0,20,1,0,NOW(),NOW(),0);";$result020=mysql_query($query020);if(!$result020){echo'Invalidquery:'.mysql_error();}
$query021="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(21,'近藤',0,2,5,15,15,15,131,0,0,21,0,0,NOW(),NOW(),0);";$result021=mysql_query($query021);if(!$result021){echo'Invalidquery:'.mysql_error();}
$query022="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(22,'村上',0,3,6,15,15,15,132,0,0,22,1,0,NOW(),NOW(),0);";$result022=mysql_query($query022);if(!$result022){echo'Invalidquery:'.mysql_error();}
$query023="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(23,'遠藤',0,4,7,15,15,15,141,0,0,23,0,0,NOW(),NOW(),0);";$result023=mysql_query($query023);if(!$result023){echo'Invalidquery:'.mysql_error();}
$query024="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(24,'青木',0,5,8,15,15,15,142,0,0,24,1,0,NOW(),NOW(),0);";$result024=mysql_query($query024);if(!$result024){echo'Invalidquery:'.mysql_error();}
$query025="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(25,'福田',0,0,9,15,15,15,111,0,0,25,0,0,NOW(),NOW(),0);";$result025=mysql_query($query025);if(!$result025){echo'Invalidquery:'.mysql_error();}
$query026="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(26,'太田',0,1,10,15,15,15,112,0,0,26,1,0,NOW(),NOW(),0);";$result026=mysql_query($query026);if(!$result026){echo'Invalidquery:'.mysql_error();}
$query027="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(27,'西村',0,2,11,15,15,15,121,0,0,27,0,0,NOW(),NOW(),0);";$result027=mysql_query($query027);if(!$result027){echo'Invalidquery:'.mysql_error();}
$query028="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(28,'藤井',0,3,12,15,15,15,122,0,0,28,1,0,NOW(),NOW(),0);";$result028=mysql_query($query028);if(!$result028){echo'Invalidquery:'.mysql_error();}
$query029="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(29,'竹内',0,4,13,15,15,15,131,0,0,29,0,0,NOW(),NOW(),0);";$result029=mysql_query($query029);if(!$result029){echo'Invalidquery:'.mysql_error();}
$query030="insert into student_M(id,name,grade,personality,speciality,logic,develop,communicate,skill1,skill2,skill3,history_lab,stu_type,course_t,insertDate,updateDate,deleteFlag)values(30,'小野',0,5,14,15,15,15,132,0,0,30,1,0,NOW(),NOW(),0);";$result030=mysql_query($query030);if(!$result030){echo'Invalidquery:'.mysql_error();}




echo'終了';

?>
</body>
</HTML>
