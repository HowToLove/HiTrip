<?php
	session_start();
	//echo "lanxiang";
	//$_SESSION['unreadJingdianNewsId']=0;
	$jingdianId = $_POST['jingdianId'];
	$_SESSION['userId']=1;
	$userId=$_SESSION['userId'];
	$mysqltime = date('Y-m-d H:i:s',time());
	$con = mysql_connect("localhost","root","");
	if (!$con)
	{
	  die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("test",$con);
	mysql_query("set names 'gbk'");
	$sql="SELECT * FROM jingdian_inf,jingdian_status, eyeon WHERE eyeon.jingdian_id='$jingdianId' AND eyeon.user_id = '$userId' AND jingdian_inf.jingdian_id='$jingdianId' AND UNIX_TIMESTAMP( time_stamp ) <= UNIX_TIMESTAMP ('$mysqltime')";
	//echo $sql;
	
	if(isset($_SESSION['unreadJingdianNewsId'])){
	$maxReadId=$_SESSION['unreadJingdianNewsId'];
	$sql.= " AND jingdian_status.status_id>'$maxReadId'";
	}
	//��sql�������û���¼֮�����о��㷢������Ϣ
	
	//echo $sql;
	
	$result=mysql_query($sql);
	if(mysql_num_rows($result)>0)
	{	
		$i=0;
		while($row=mysql_fetch_array($result))
		{
			$jingdian_news[$i]['Id']=$row['jingdian_id'];
			$jingdian_news[$i]['Head']=$row['portrait'];
			$jingdian_news[$i]['Name']=iconv('gb2312//IGNORE','UTF-8',$row['jingdian_name']);
			$jingdian_news[$i]['Picture']=$row['picture'];
			$jingdian_news[$i++]['Content']=iconv('gb2312//IGNORE','UTF-8',$row['content']);
			$_SESSION['unreadJingdianNewsId']=$row['status_id'];
		}
		
		echo json_encode($jingdian_news);
	}
	
	else{
		echo '1';//��ʾû�е�ͼ��û������Ϣ��
	}
	?>