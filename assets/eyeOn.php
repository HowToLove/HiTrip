<?php
session_start();
$_SESSION['userId']= 1;
$userId = $_SESSION['userId'];
$idName=$_POST['idName'];
$con = mysql_connect("localhost","root","");

if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
mysql_query("set names 'GB2312'");
mysql_select_db("test",$con);
$sql0 =  "SELECT * FROM jingdian_inf WHERE id_name = '$idName'";
echo $sql0;
$result0=mysql_query($sql0,$con);
$jingdianId=mysql_fetch_array($result0)['jingdian_id'];
$sql = "SELECT * FROM eyeon WHERE user_id='$userId' AND jingdian_id='$jingdianId'";
	$result = mysql_query($sql,$con);
	if(mysql_num_rows($result)>0)
	{
		echo '1';//��ʾ�Ѿ������˹�ע�þ��������
	}
	else{
	$sql2 = "INSERT INTO eyeon (jingdian_id,user_id) VALUES ('$jingdianId','$userId')";
	$result2 = mysql_query($sql2,$con);
		if($result2==FALSE)
		{
			echo '-1';//��ʾ����ʧ��
		}
		else{
			echo '0';//��ע�þ���ɹ�
		}
	}	
?>