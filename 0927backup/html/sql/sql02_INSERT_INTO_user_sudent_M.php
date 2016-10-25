<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<HTML>
<head><title>userＭ初期データ追加</title>
<meta http-equiv="Content-Type" content="text/html; charset=shift_jis">
</head>

<body>

userＭ初期データ追加
<br>
<?php
			//パラメータ受け取り

			//ＤＢ接続
			include('connect_db.php');
/*
$query001="insert into groups (id,name,member,contents,progress,insertDate,updateDate,deleteFlag) values(1,'group1','めんばー1','こんてんつ1','しんちょく1',NOW(),NOW(),0)";
$query002="insert into groups (id,name,member,contents,progress,insertDate,updateDate,deleteFlag) values(2,'group2','めんばー2','こんてんつ2','しんちょく2',NOW(),NOW(),0)";
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

$result001=mysql_query($query001);
$result002=mysql_query($query002);
$result003=mysql_query($query003);
*/

$query001 = "insert into user_student_M	(id,uid,bachelor,master,doctor,insertDate,updateDate,deleteFlag)	values (1,'0001',1100,110,11,NOW(),NOW(),0);";
$query002 = "insert into user_student_M	(id,uid,bachelor,master,doctor,insertDate,updateDate,deleteFlag)	values (2,'0002',1200,120,12,NOW(),NOW(),0);";
$query003 = "insert into user_student_M	(id,uid,bachelor,master,doctor,insertDate,updateDate,deleteFlag)	values (3,'0003',1300,130,13,NOW(),NOW(),0);";
$query004 = "insert into user_student_M	(id,uid,bachelor,master,doctor,insertDate,updateDate,deleteFlag)	values (4,'0004',1400,140,14,NOW(),NOW(),0);";
$query005 = "insert into user_student_M	(id,uid,bachelor,master,doctor,insertDate,updateDate,deleteFlag)	values (5,'0005',1500,150,15,NOW(),NOW(),0);";
$query006 = "insert into user_student_M	(id,uid,bachelor,master,doctor,insertDate,updateDate,deleteFlag)	values (6,'0006',1600,160,16,NOW(),NOW(),0);";

$result001=mysql_query($query001);
if (!$result001) {echo 'Invalid query: ' . mysql_error();}
$result002=mysql_query($query002);
$result003=mysql_query($query003);
$result004=mysql_query($query004);
$result005=mysql_query($query005);
$result006=mysql_query($query006);

echo '終了';

?>
</body>
</HTML>