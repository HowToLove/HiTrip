<?php
//����ҵ���ҳʱ���ã���unread_reply��ֵΪ��󣬼�ȫ��δ��
	include "jingdian_new_things.php";
	session_start();
		$con = mysql_connect("localhost","root","");
		if (!$con)
		{
		  die('Could not connect: ' . mysql_error());
		}
		mysql_select_db("test",$con);
		//$_SESSION['userId']=1;//��ʱ��userId��ֵ��1��ʵ���ϵ�¼ʱ���ɸ�ֵ
		//$user_id=$_SESSION['userId'];
		//return $con;
		//����ʱ��user_id��ֵΪ1��ʵ����Ҫ�õ�ȫ�ֱ���SESSION['userId'] y
		$sql = "SELECT status_id FROM jingdian_status WHERE jingqu_id=1 ORDER BY time_stamp  DESC LIMIT 1";//select 6 entry everty time
		$result = mysql_query($sql,$con);
		$unread_id=mysql_fetch_array($result);		
		$unread_id=$unread_id['status_id'];
		$unread_id++;
		//echo json_encode($unread_id);
		$_SESSION['unread_id']=$unread_id;
		mysql_close($con);
		//echo $_SESSION['unread_id'];
		$res=jingdian_status();
		//echo json_encode($_SESSION['unread_id']);
		
		echo json_encode($res);
?>