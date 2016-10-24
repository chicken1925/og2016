<?php
mb_language("uni");
mb_internal_encoding("utf-8"); //内部文字コードを変更
mb_http_input("auto");
mb_http_output("utf-8");


$link = mysql_connect ("localhost", "root", "kgog2016")
	or die ("MySQLに接続できませんでした");
	
$sdb = mysql_select_db("og2016", $link) or die ("og2016 NG") ;
/*
$link = mysql_connect ("localhost", "root", "password")
	or die ("MySQLに接続できませんでした");
$sdb = mysql_select_db("project_a", $link) or die ("use project_a NG") ;
*/

?>
