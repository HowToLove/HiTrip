<?php
//�������ʱ���øú�����Ȼ�����ponsernal_status
	include "jingdian_new_things.php";	
	session_start();
		$res=jingdian_status();
		echo json_encode($res);
?>