<?php
session_start();
$_SESSION['userId']= 1;
$userId = $_SESSION['userId'];
$con = mysql_connect("localhost","root","aruizhuzhu");
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("test",$con);
mysql_query("set names 'GB2312'");
//查找好友的信息
$sql = "SELECT * FROM user WHERE user_id = '$userId'";
		$result = mysql_query($sql,$con);
		$row=mysql_fetch_array($result);
		//var_dump($row);
		$SelfInfo['Longitude']=$row['longitude'];
		$SelfInfo['Latitude']=$row['latitude'];
		$SelfInfo['Head']="http://localhost/register8.24/";
		$SelfInfo['Head'].=$row['portrait'];		
		$SelfInfo['Id']=$row['user_id'];	
		$SelfInfo['Name']=iconv('gb2312//IGNORE','UTF-8',$row['user_name']);		
	mysql_close($con);
	//var_dump($a);
	echo json_encode($SelfInfo);	
?>