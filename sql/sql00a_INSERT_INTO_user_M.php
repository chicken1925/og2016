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

$query001 = "update user_M set  campus = 'campusA',department='alpha',updateDate=NOW()  where id=1;";

$result001=mysql_query($query001);
$result002=mysql_query($query002);
$result003=mysql_query($query003);
*/
$query001 =     "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  1   ,'  0001    ',' user01  ',' 1111    ',' AAA ',' alpha   ',  111111  ,'  1   ',' 2   ',' 3   ',' 4   ',' 5   ',' 6   ',  NOW()   ,   NOW()   ,   0   );";    $result001= mysql_query($query001);     if (!$result001) {echo 'Invalid query: ' . mysql_error();}
$query002 =     "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  2   ,'  0002    ',' user02  ',' 2222    ',' AAA ',' beta    ',  222222  ,'  7   ',' 8   ',' 9   ',' 10  ',' 11  ',' 12  ',  NOW()   ,   NOW()   ,   0   );";    $result002= mysql_query($query002); if (!$result002) {echo 'Invalid query: ' . mysql_error();}
$query003 = "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  3   ,'  0003    ',' user03  ',' 3333    ',' AAA ',' theta   ',  333333  ,'  13  ',' 14  ',' 15  ',' 16  ',' 17  ',' 18  ',  NOW()   ,   NOW()   ,   0   );";    $result003= mysql_query($query003); if (!$result003) {echo 'Invalid query: ' . mysql_error();}
$query004 = "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  4   ,'  0004    ',' user04  ',' 4444    ',' BBB ',' alpha   ',  444444  ,'  19  ',' 20  ',' 21  ',' 22  ',' 23  ',' 24  ',  NOW()   ,   NOW()   ,   0   );";    $result004= mysql_query($query004); if (!$result004) {echo 'Invalid query: ' . mysql_error();}
$query005 = "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  5   ,'  0005    ',' user05  ',' 5555    ',' BBB ',' beta    ',  555555  ,'  25  ',' 26  ',' 27  ',' 28  ',' 29  ',' 30  ',  NOW()   ,   NOW()   ,   0   );";    $result005= mysql_query($query005); if (!$result005) {echo 'Invalid query: ' . mysql_error();}
$query006 = "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  6   ,'  0006    ',' user06  ',' 6666    ',' BBB ',' theta   ',  666666  ,'  31  ',' 32  ',' 33  ',' 34  ',' 35  ',' 36  ',  NOW()   ,   NOW()   ,   0   );";    $result006= mysql_query($query006); if (!$result006) {echo 'Invalid query: ' . mysql_error();}
$query007 = "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  7   ,'  0007    ',' user07  ',' 7777    ',' CCC ',' alpha   ',  777777  ,'  37  ',' 38  ',' 39  ',' 40  ',' 41  ',' 42  ',  NOW()   ,   NOW()   ,   0   );";    $result007= mysql_query($query007); if (!$result007) {echo 'Invalid query: ' . mysql_error();}
$query008 = "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  8   ,'  0008    ',' user08  ',' 8888    ',' CCC ',' beta    ',  888888  ,'  43  ',' 44  ',' 45  ',' 46  ',' 47  ',' 48  ',  NOW()   ,   NOW()   ,   0   );";    $result008= mysql_query($query008); if (!$result008) {echo 'Invalid query: ' . mysql_error();}
$query009 = "insert into user_M (id,uid,name,password,faculty,department,money,student1,student2,student3,student4,student5,student6,insertDate,updateDate,deleteFlag)values (  9   ,'  0009    ',' user09  ',' 9999    ',' CCC ',' theta   ',  999999  ,'  49  ',' 50  ',' 51  ',' 52  ',' 53  ',' 54  ',  NOW()   ,   NOW()   ,   0   );";    $result009= mysql_query($query009); if (!$result009) {echo 'Invalid query: ' . mysql_error();}


/*
$result007=mysql_query($query007);
//if (!$result007) {echo 'Invalid query: ' . mysql_error();}
$result008=mysql_query($query008);
$result009=mysql_query($query009);
*/

echo '終了';

?>
</body>
</HTML>
