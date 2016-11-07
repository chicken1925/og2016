<!DOCTYPEHTMLPUBLIC"-//W3C//DTDHTML4.01Transitional//EN""http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<head><title>userＭ初期データ追加</title>
<metahttp-equiv="Content-Type"content="text/html;charset=shift_jis">
</head>

<body>

userＭ初期データ追加
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
$query001	=	"insert into user_M
(id,uid,name,insertDate,updateDate,deleteFlag)
values(1,'0001','user01',NOW(),NOW(),0)";
$query002	=	"insert into user_M
(id,uid,name,insertDate,updateDate,deleteFlag)
values(2,'0002','user02',NOW(),NOW(),0)";
$query003	=	"insert into user_M
(id,uid,name,insertDate,updateDate,deleteFlag)
values(3,'0003','user03',NOW(),NOW(),0)";

$query001="updateuser_Msetcampus='campusA',department='alpha',updateDate=NOW()whereid=1;";

$result001=mysql_query($query001);
$result002=mysql_query($query002);
$result003=mysql_query($query003);
*/
$query001="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(1,'u001','橘1','p001','宇宙','alpha',0,1,1,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result001=mysql_query($query001);if(!$result001){echo'Invalidquery:'.mysql_error();}
$query002="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(2,'u002','橘2','p002','宇宙','beta',0,1,2,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result002=mysql_query($query002);if(!$result002){echo'Invalidquery:'.mysql_error();}
$query003="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(3,'u003','橘3','p003','宇宙','theta',0,1,3,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result003=mysql_query($query003);if(!$result003){echo'Invalidquery:'.mysql_error();}
$query004="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(4,'u004','橘4','p004','バイオ','alpha',0,1,4,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result004=mysql_query($query004);if(!$result004){echo'Invalidquery:'.mysql_error();}
$query005="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(5,'u005','橘5','p005','バイオ','beta',0,1,5,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result005=mysql_query($query005);if(!$result005){echo'Invalidquery:'.mysql_error();}
$query006="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(6,'u006','橘6','p006','バイオ','theta',0,1,6,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result006=mysql_query($query006);if(!$result006){echo'Invalidquery:'.mysql_error();}
$query007="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(7,'u007','橘7','p007','ロボ','alpha',0,1,7,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result007=mysql_query($query007);if(!$result007){echo'Invalidquery:'.mysql_error();}
$query008="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(8,'u008','橘8','p008','ロボ','beta',0,1,8,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result008=mysql_query($query008);if(!$result008){echo'Invalidquery:'.mysql_error();}
$query009="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(9,'u009','橘9','p009','ロボ','theta',0,1,9,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result009=mysql_query($query009);if(!$result009){echo'Invalidquery:'.mysql_error();}
$query010="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(10,'u010','橘10','p010','宇宙','alpha',0,1,10,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result010=mysql_query($query010);if(!$result010){echo'Invalidquery:'.mysql_error();}
$query011="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(11,'u011','橘11','p011','宇宙','beta',0,1,11,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result011=mysql_query($query011);if(!$result011){echo'Invalidquery:'.mysql_error();}
$query012="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(12,'u012','橘12','p012','宇宙','theta',0,1,12,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result012=mysql_query($query012);if(!$result012){echo'Invalidquery:'.mysql_error();}
$query013="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(13,'u013','橘13','p013','バイオ','alpha',0,1,13,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result013=mysql_query($query013);if(!$result013){echo'Invalidquery:'.mysql_error();}
$query014="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(14,'u014','橘14','p014','バイオ','beta',0,1,14,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result014=mysql_query($query014);if(!$result014){echo'Invalidquery:'.mysql_error();}
$query015="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(15,'u015','橘15','p015','バイオ','theta',0,1,15,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result015=mysql_query($query015);if(!$result015){echo'Invalidquery:'.mysql_error();}
$query016="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(16,'u016','橘16','p016','ロボ','alpha',0,1,16,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result016=mysql_query($query016);if(!$result016){echo'Invalidquery:'.mysql_error();}
$query017="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(17,'u017','橘17','p017','ロボ','beta',0,1,17,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result017=mysql_query($query017);if(!$result017){echo'Invalidquery:'.mysql_error();}
$query018="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(18,'u018','橘18','p018','ロボ','theta',0,1,18,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result018=mysql_query($query018);if(!$result018){echo'Invalidquery:'.mysql_error();}
$query019="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(19,'u019','橘19','p019','宇宙','alpha',0,1,19,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result019=mysql_query($query019);if(!$result019){echo'Invalidquery:'.mysql_error();}
$query020="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(20,'u020','橘20','p020','宇宙','beta',0,1,20,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result020=mysql_query($query020);if(!$result020){echo'Invalidquery:'.mysql_error();}
$query021="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(21,'u021','橘21','p021','宇宙','theta',0,1,21,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result021=mysql_query($query021);if(!$result021){echo'Invalidquery:'.mysql_error();}
$query022="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(22,'u022','橘22','p022','バイオ','alpha',0,1,22,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result022=mysql_query($query022);if(!$result022){echo'Invalidquery:'.mysql_error();}
$query023="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(23,'u023','橘23','p023','バイオ','beta',0,1,23,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result023=mysql_query($query023);if(!$result023){echo'Invalidquery:'.mysql_error();}
$query024="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(24,'u024','橘24','p024','バイオ','theta',0,1,24,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result024=mysql_query($query024);if(!$result024){echo'Invalidquery:'.mysql_error();}
$query025="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(25,'u025','橘25','p025','ロボ','alpha',0,1,25,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result025=mysql_query($query025);if(!$result025){echo'Invalidquery:'.mysql_error();}
$query026="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(26,'u026','橘26','p026','ロボ','beta',0,1,26,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result026=mysql_query($query026);if(!$result026){echo'Invalidquery:'.mysql_error();}
$query027="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(27,'u027','橘27','p027','ロボ','theta',0,1,27,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result027=mysql_query($query027);if(!$result027){echo'Invalidquery:'.mysql_error();}
$query028="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(28,'u028','橘28','p028','宇宙','alpha',0,1,28,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result028=mysql_query($query028);if(!$result028){echo'Invalidquery:'.mysql_error();}
$query029="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(29,'u029','橘29','p029','宇宙','beta',0,1,29,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result029=mysql_query($query029);if(!$result029){echo'Invalidquery:'.mysql_error();}
$query030="insert into user_M(id,uid,name,password,faculty,department,money,level,student1,student2,student3,student4,student5,student6,save_t,respawn_t,item_param,item_skill,insertDate,updateDate,deleteFlag)values(30,'u030','橘30','p030','宇宙','theta',0,1,30,0,0,0,0,0,0,0,'0,0,0','0',NOW(),NOW(),0);";$result030=mysql_query($query030);if(!$result030){echo'Invalidquery:'.mysql_error();}

/*
$result007=mysql_query($query007);
//if(!$result007){echo'Invalidquery:'.mysql_error();}
$result008=mysql_query($query008);
$result009=mysql_query($query009);
*/

echo'終了';

?>
</body>
</HTML>
