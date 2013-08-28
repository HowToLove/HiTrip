<?php
session_start();
$_SESSION['userId']= 1;
$userId = $_SESSION['userId'];
$con = mysql_connect("localhost","root","");
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("test",$con);
mysql_query("set names 'GB2312'");
//查找好友的信息
$sql = "SELECT user.* FROM user,friends WHERE ((friends.user_id1=$userId AND friends.user_id2=user.user_id) OR (friends.user_id2=$userId AND friends.user_id1=user.user_id) )";
		$result = mysql_query($sql,$con);

	$i=0;
	while($row=mysql_fetch_array($result))
	{
		$friends_info_rows[$i]['Longitude']=$row['longitude'];
		$friends_info_rows[$i]['Latitude']=$row['latitude'];
		$friends_info_rows[$i]['Head']="http://localhost/register8.24/";
		$friends_info_rows[$i]['Head'].=$row['portrait'];		
		$friends_info_rows[$i]['Id']=$row['user_id'];	
		$friends_info_rows[$i++]['Name']=iconv('gb2312//IGNORE','UTF-8',$row['user_name']);
		
	}
	mysql_close($con);
	//var_dump($a);
	echo json_encode($friends_info_rows);	
?>