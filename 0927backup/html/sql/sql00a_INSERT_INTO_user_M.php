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

$query001 = "update user_M set	campus = 'campusA',department='alpha',updateDate=NOW()	where id=1;";
$query002 = "update user_M set	campus = 'campusA',department='beta',updateDate=NOW()	where id=2;";
$query003 = "update user_M set	campus = 'campusA',department='gamma',updateDate=NOW()	where id=3;";
$query004 = "update user_M set	campus = 'campusB',department='alpha',updateDate=NOW()	where id=4;";
$query005 = "update user_M set	campus = 'campusB',department='beta',updateDate=NOW()	where id=5;";
$query006 = "update user_M set	campus = 'campusB',department='gamma',updateDate=NOW()	where id=6;";

$query007 = "insert into user_M	(id,uid,name,password,campus,department,insertDate,updateDate,deleteFlag)	values (7,'0007','user07','7777','campusC','alpha',NOW(),NOW(),0);";
$query008 = "insert into user_M	(id,uid,name,password,campus,department,insertDate,updateDate,deleteFlag)	values (8,'0008','user08','8888','campusC','beta',NOW(),NOW(),0);";
$query009 = "insert into user_M	(id,uid,name,password,campus,department,insertDate,updateDate,deleteFlag)	values (9,'0009','user09','9999','campusC','gamma',NOW(),NOW(),0);";




$result001=mysql_query($query001);
$result002=mysql_query($query002);
$result003=mysql_query($query003);
$result004=mysql_query($query004);
$result005=mysql_query($query005);
$result006=mysql_query($query006);
$result007=mysql_query($query007);
if (!$result007) {echo 'Invalid query: ' . mysql_error();}
$result008=mysql_query($query008);
$result009=mysql_query($query009);

echo '終了';

?>
</body>
</HTML>