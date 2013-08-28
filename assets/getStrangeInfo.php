<?php
session_start();
$_SESSION['userId']= 1;
$userId = $_SESSION['userId'];
$con = mysql_connect("localhost","root","");
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
mysql_query("set names 'GB2312'");
mysql_select_db("test",$con);
//查找好友的信息
$sql = "SELECT * FROM user WHERE user_id!=$userId";
		$result = mysql_query($sql,$con);

	$i=0;
	while($row=mysql_fetch_array($result))
	{
		$strange_info_rows[$i]['Longitude']=$row['longitude'];
		$strange_info_rows[$i]['Latitude']=$row['latitude'];
		$strange_info_rows[$i]['Head']="http://localhost/register8.24/";
		$strange_info_rows[$i]['Head'].=$row['portrait'];		
		$strange_info_rows[$i]['Id']=$row['user_id'];	
		$strange_info_rows[$i++]['Name']=iconv('gb2312//IGNORE','UTF-8',$row['user_name']);
	}
	mysql_close($con);
	//var_dump($a);
	echo json_encode($strange_info_rows);	
?>