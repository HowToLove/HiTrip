<?php
session_start();
$_SESSION['userId']= 1;
$userId = $_SESSION['userId'];
$jingdianId=$_POST['jingdian_id'];
$con = mysql_connect("localhost","root","");
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
mysql_query("set names 'GB2312'");
mysql_select_db("test",$con);

$sql = "SELECT * FROM eyeon WHERE user_id='$userId' AND jingdian_id='$jingdianId'";
	$result = mysql_query($sql,$con);
	if(mysql_num_rows($result)>0)
	{
		echo '1';//表示已经发送了关注该景点的请求。
	}
	else{
	$sql2 = "INSERT INTO eyeon (jingdian_id,user_id) VALUES ('$jingdianId','$userId')";
	$result2 = mysql_query($sql2,$con);
		if($result2==FALSE)
		{
			echo '-1';//表示插入失败
		}
		else{
			echo '0';//关注该景点成功
		}
	}	
?>