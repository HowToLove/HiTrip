<?php
//�������ʱ���øú�����Ȼ�����ponsernal_status
	include "personal_status.php";	
	session_start();
		$res=personal_status();
		echo json_encode($res);
?>