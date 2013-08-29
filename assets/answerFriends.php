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
//查找好友的信息
		$sql = "SELECT * FROM tempRelation WHERE (user_id2= '$userId' AND user_id1 = '$answerUserId') AND status = '1'";
		$result = mysql_query($sql);
		if(mysql_num_rows($result)>0)
		{
		if($answer==1){			
			$sql = "UPDATE tempRelation SET status='2' WHERE user_id2 = '$userId' AND user_id1 = '$answerUserId'";//2表示接受了请求
			$result = mysql_query($sql,$con);
			if($result == FALSE)
			{
				echo '-1';//表示更新失败
			}
			else
			{
				$sql = "SELECT * FROM friends WHERE (user_id1='$userId' AND user_id2='$answerUserId') OR (user_id2='$userId' AND user_id1='$answerUserId')";//查找好友关系是否已经成立
				//echo $sql;
				$result = mysql_query($sql,$con);	
				if(mysql_num_rows($result)>0)//好友关系已经成立，不必重复添加
				{
					echo '0';//添加好友成功
				}
				else{
					$sql = "INSERT INTO friends (user_id1,user_id2) VALUES ('$answerUserId','$userId')";//添加好友
					$result = mysql_query($sql,$con);
					if($result==FALSE)
					{
						echo '-1';//表示插入失败
					}
				}
			}
			
		}
		else{
			$sql = "UPDATE tempRelation SET status='3' WHERE user_id2 = '$userId'";//2表示拒绝了请求
					$result = mysql_query($sql,$con);
					if($result == FALSE)
					{
						echo '-1';//表示更新失败
					}
					else
					{
						echo '0';//表示更新成功
					}
		}
		}
		else{
			echo "status!=！";
		}
	mysql_close($con);
?>