<?php
session_start();
$_SESSION['userId']= 6;
$userId = $_SESSION['userId'];
$answer = $_POST['answer'];
$answerUserId=$_POST['answerUserId'];
$con = mysql_connect("localhost","root","aruizhuzhu");
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("test",$con);
//���Һ��ѵ���Ϣ
		$sql = "SELECT * FROM tempRelation WHERE (user_id2= '$userId' AND user_id1 = '$answerUserId') AND status = '1'";
		$result = mysql_query($sql);
		if(mysql_num_rows($result)>0)
		{
		if($answer==1){			
			$sql = "UPDATE tempRelation SET status='2' WHERE user_id2 = '$userId' AND user_id1 = '$answerUserId'";//2��ʾ����������
			$result = mysql_query($sql,$con);
			if($result == FALSE)
			{
				echo '-1';//��ʾ����ʧ��
			}
			else
			{
				$sql = "SELECT * FROM friends WHERE (user_id1='$userId' AND user_id2='$answerUserId') OR (user_id2='$userId' AND user_id1='$answerUserId')";//���Һ��ѹ�ϵ�Ƿ��Ѿ�����
				//echo $sql;
				$result = mysql_query($sql,$con);	
				if(mysql_num_rows($result)>0)//���ѹ�ϵ�Ѿ������������ظ����
				{
					echo '0';//��Ӻ��ѳɹ�
				}
				else{
					$sql = "INSERT INTO friends (user_id1,user_id2) VALUES ('$answerUserId','$userId')";//��Ӻ���
					$result = mysql_query($sql,$con);
					if($result==FALSE)
					{
						echo '-1';//��ʾ����ʧ��
					}
				}
			}
			
		}
		else{
			$sql = "UPDATE tempRelation SET status='3' WHERE user_id2 = '$userId'";//2��ʾ�ܾ�������
					$result = mysql_query($sql,$con);
					if($result == FALSE)
					{
						echo '-1';//��ʾ����ʧ��
					}
					else
					{
						echo '0';//��ʾ���³ɹ�
					}
		}
		}
		else{
			echo "status!=��";
		}
	mysql_close($con);
?>