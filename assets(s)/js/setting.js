function isPasswordLegal(){
	if(checkPassword($("#password").val())==false)
	{
		document.getElementById("passwordTip").innerHTML="<font color=red>您输入的密码不合法</font>";
		$("#password").focus();
		return false;
	}
	else{
		document.getElementById("passwordTip").innerHTML="";
	}
}
function isPasswordSame(){
	if($("#password").val()!=$("#password2").val()){
		document.getElementById("userpasswordTip").innerHTML="<font color=red>前后密码不一致</font>";
		$("#password2").focus();
		return false;
	}else{
		document.getElementById("userpasswordTip").innerHTML="";
	}
}
function isNameUnique()
{
	if($("#username").val()=="")
	{
		//alert("昵称不能为空！");
		document.getElementById("usernameTip").innerHTML="<font color=red>请输入用户名</font>";
		$("#username").focus();
		return false;
	}
	else{
		document.getElementById("usernameTip").innerHTML="";
	}
	var xmlHttp=null
	if (window.XMLHttpRequest)
	{
	  xmlHttp=new XMLHttpRequest()
	}
	else if (window.ActiveXObject)
	 {
	  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")
	 }
	var url="http://192.168.1.101/server/isNameUnique.php";
	url=url+"?username="+$("#username").val();
	url=url+"&sid="+Math.random();
	xmlHttp.onreadystatechange=function stateChanged(){
	if(xmlHttp.readyState==4){
	if(xmlHttp.status == 200){
	//console.log(xmlHttp.responseText);
		if(xmlHttp.responseText=="1"){			
			document.getElementById("usernameTip").innerHTML="<font color=red>该用户名已经被使用</font>";
			$("#username").focus();
		}
		else return true;
	}
	}
	}
	; 
	xmlHttp.open("GET",url,true);
	xmlHttp.send(null);
}
function isPasswordRight(){
	var xmlHttp=null
	if (window.XMLHttpRequest)
	{
		xmlHttp=new XMLHttpRequest()
	}
	else if (window.ActiveXObject)
	{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")
	}
	
	/*var url="http://192.168.1.101/server/register.php";
	var str = "username="+$("#username").val()+
	"&password="+$("#password").val()+
	"&t="+Math.random();
	console.log(str);
	xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.onreadystatechange=function stateChanged(){
		if(xmlHttp.readyState==4){
			if(xmlHttp.status == 200){
				console.log(xmlHttp.responseText);
				if(xmlHttp.responseText!="-1"){		
				alert("信息更改成功！");
				//window.location='login.html';
				}
			else {
				alert("出错啦！");
				return ;
				}
			
			}	
		}
	};*/
	
	xmlHttp.send(name);
}

function infoChange()
{
	var xmlHttp=null
	if (window.XMLHttpRequest)
	{
	  xmlHttp=new XMLHttpRequest()
	}
	else if (window.ActiveXObject)
	 {
	  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")
	 }

	var url="http://192.168.1.101/server/register.php";
	var str = "username="+$("#username").val()+
	"&password="+$("#password").val()+
	"&t="+Math.random();
	console.log(str);
	xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.onreadystatechange=function stateChanged(){
		if(xmlHttp.readyState==4){
			if(xmlHttp.status == 200){
				console.log(xmlHttp.responseText);
				if(xmlHttp.responseText!="-1"){		
				alert("信息更改成功！");
				//window.location='login.html';
				}
			else {
				alert("出错啦！");
				return ;
				}
			
			}	
		}
	};
	xmlHttp.send(str);	
}