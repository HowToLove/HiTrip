/*************************************全局变量************************************/
var sendLocationIntervalId;
var queryAnswerId;
var queryAnswerCount=0;
var queryFriendsId;
var queryMessageId;
var queryJingdianNewsId;
var queryAllId;
/*************************************初始调用*************************************/
function init(){
	getSelfInfo(); 
	myListener();
	//queryAllId = setInterval(queryAll,1000);
	queryAll();
}

/***********************************添加景点关注***********************************/
function eyeOn(idName){
	//var jingdian_id=6;//要作为参数传入
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="idName="+idName+"&t="+Math.random();
		//console.log(param);
	var url = "http://localhost/server/eyeOn.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}


/********************地图消息发送和请求好友消息，发布文字状态**********************/
function sendMessage(){
	var content = $("#message").val();
	$("#user-ego").append("<a class='bubble ui-link'><div class='tooltip fade right in bubble-word'><div class='tooltip-arrow'></div><div class='tooltip-inner'>"+content+"</div></div></a>");
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="content="+content+"&t="+Math.random();
		//console.log(param);
	var url = "http://localhost/server/sendMessage.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//console.log("From:sendMessage.php:");
			//console.log(test);
			if(test!="0"){
			//var answer = eval("("+test+")");
			alert("消息发送失败！");
			}
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/********************地图消息发送和请求好友消息，发布图片状态**********************/
function sendMessage2(){
	var content = $("#message2").val();
	$("#message2").empty();
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="content="+content+"&t="+Math.random();
		//console.log(param);
	var url = "http://localhost/server/sendMessage.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//console.log("From:sendMessage.php:");
			//console.log(test);
			if(test!="0"){
			//var answer = eval("("+test+")");
			alert("消息发送失败！");
			}
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/***********************************添加自己到地图*********************************/
function getSelfInfo(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		//console.log(param);
	var url = "http://localhost/server/getSelfInfo.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//alert("QQQ: "+test);
			var selfInfo = eval("("+test+")");
			$("#user-ego-tmpl").tmpl(selfInfo).appendTo("#user-ego");
			//console.log("From:getSelfInfo.php:");
			//console.log(test);
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}


/**********************************发送好友请求************************************/
function requestFriends(targetId){
//alert("!");
	if(queryAnswerCount==0){
		queryAnswerId = setInterval("queryAnswer()",1000);		
	}
	queryAnswerCount++;
	//var targetId=6;
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="targetId="+targetId+"&t="+Math.random();
		//console.log(param);
	var url = "http://localhost/server/requestFriends.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//console.log("From:requestFriends.php:");
			//console.log(test);
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/*********************************是否接受好友请求*********************************/
function answerFriends(answer,answerUserId){
	//answer,1表示接受好友请求，2表示拒绝
	//answerUserId表示回复的用户的Id，应作为参数传入
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="answer="+answer+"&answerUserId="+answerUserId+"&t="+Math.random();
		//console.log(param);
	var url = "http://localhost/server/answerFriends.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//console.log("From:answerFriends.php:");
			//console.log(test);
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);	
}

/**查询对方是否给出回复，如果给出返回值是对方信息的json变量和回复的status，1表示同意，0表示不统一**/
function queryAnswer(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		//console.log(param);
	var url = "http://localhost/server/queryAnswer.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//console.log("From:queryAnswer.php:");
			//console.log(test);
			if(test!=""){
				var answer = eval("("+test+")");//得到了对方的JSON变量和结果
				for(var i=0;i<answer.length;i++){
					if(answer[i].status==1){
						$("#newf-accept-tmpl").tmpl(answer[i]).prependTo("#newf-list");
					}
				}
				queryAnswerCount-=answer.length;
				if(queryAnswerCount==0)//表示所有的请求都得到了回答
				clearInterval(queryAnswerId);//终止此次查找
			}			
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/*****************每次动态添加都要调用一次函数以执行JQuery效果*********************/
var flag_zone_eyeon=0;
var flag_spot_eyeon=0;
function myListener(){
	$(document).ready(function(){
	   $(".newfY").tap(function(){
			var id=$(this).parent().parent().parent().parent().parent().attr("id");
			$("#"+id).find(".ui-li-aside").empty();
			$("#"+id).find(".ui-li-aside").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>已添加</span></span><button data-inline='true' class='ui-btn-hidden' data-disabled='false'>已添加</button></div>");
			answerFriends(1,id);
		});
		$(".newfN").tap(function(){
			var id=$(this).parent().parent().parent().parent().parent().attr("id");
			$("#"+id).find(".ui-li-aside").empty();
			$("#"+id).find(".ui-li-aside").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>已拒绝</span></span><button data-inline='true' class='ui-btn-hidden' data-disabled='false'>已拒绝</button></div>");
			answerFriends(2,id);
		});
		$(".eyeon").tap(function(){
			var id=$(this).parent().parent().parent().attr("id");
			$(".zone-eyeon").empty();
			if(flag_zone_eyeon==0){
				$(".zone-eyeon").append("<a class='eyeon ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-left ui-btn-up-c' href='#' data-role='button' data-theme='c' data-icon='minus' data-inline='true' data-mini='true' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span'><span class='ui-btn-inner'><span class='ui-btn-text'>取消关注</span><span class='ui-icon ui-icon-minus ui-icon-shadow'>&nbsp;</span></span></a>");
				flag_zone_eyeon=1;
				myListener();
			}else{
				$(".zone-eyeon").append("<a class='eyeon ui-btn ui-btn-up-e ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-left' href='#' data-role='button' data-theme='e' data-icon='plus' data-inline='true' data-mini='true' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span'><span class='ui-btn-inner'><span class='ui-btn-text'>加关注</span><span class='ui-icon ui-icon-plus ui-icon-shadow'>&nbsp;</span></span></a>");
				flag_zone_eyeon=0;
				myListener();
			}
			requestFriends(id);
		});
		$(".eyeon-spot").tap(function(){
			var id=$(this).parent().parent().parent().attr("id");
			$(".spot-eyeon").empty();
			if(flag_spot_eyeon==0){
				$(".spot-eyeon").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-icon='minus' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-left ui-btn-hover-c ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>取消关注</span><span class='ui-icon ui-icon-minus ui-icon-shadow'>&nbsp;</span></span><button class='eyeon-spot ui-btn-hidden' data-inline='true' data-icon='minus' data-disabled='false'>取消关注</button></div>");
				flag_spot_eyeon=1;myListener();
			}else{
				$(".spot-eyeon").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-icon='plus' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-left ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>加关注</span><span class='ui-icon ui-icon-plus ui-icon-shadow'>&nbsp;</span></span><button class='eyeon-spot ui-btn-hidden' data-inline='true' data-icon='plus' data-disabled='false'>加关注</button></div>");
				flag_spot_eyeon=0;myListener();
			}
			eyeOn(id);
		});
  	});
}

/************************测试函数，用以添加新的好友请求信息************************/
function aaa(){
	var json1=[{"Longitude":"118.8136401","Latitude":"31.885700300000003","Head":"http:\/\/localhost\/register8.24\/files\/A.jpg","Id":"1","Name":"A"}];
	for(var i=0;i<json1.length;i++){
		$("#newf-tmpl").tmpl(json1[i]).prependTo("#newf-list");
	}
	myListener();
	var json2=[{"Longitude":"0","Latitude":"0","Head":"http:\/\/localhost\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/localhost\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/localhost\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/localhost\/register8.24\/files\/C.jpg","Id":"3","Name":"C","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/localhost\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/localhost\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/localhost\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"}]
	for(var i=0;i<json2.length;i++){
		var id=json2[i].Id;
		var pic=json2[i].Picture;
		if(pic==""){
			$("#status-word-tmpl").tmpl(json2[i]).appendTo("#"+id);
		}else{
			$("#status-pic-tmpl").tmpl(json2[i]).appendTo("#"+id);
		}
	}
}

function queryAll(){//查询所有的景点消息
	 var flag = 0;
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
	sendLocation();//此处应该是向后台发送位置的函数，而且发送数据应该采用下面注掉的方法。
	/*
	var param ="longitude="+lon+
		"&latitude="+lat+
		"&t="+Math.random();
		*/
	var param ="t="+Math.random();
	var url = "http://localhost/server/totalHiTripMapServer.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var allMessage = xmlHttp.responseText;
			//console.log("All.php:");
			//console.log(allMessage);
			
			if(allMessage==""){
				console.log("没有新消息！");
			}
			else{
				var all = eval("("+allMessage+")");	
				var friends =all["friendInfoInMap"];
				var stranges = all['strangeInfoInMap'];
				var strangeToBeFriend = all['strangeRequestInfo'];
				//console.log(strangeToBeFriend);
				var friendNews = all['friendNews'];
				var JdNews = all['JdNews'];
				if(friends!="")
				{				
					var flag=0;
					if(flag==0){
						for(var i=0;i<friends.length;i++){
							$("#user-friend-tmpl").tmpl(friends[i]).appendTo("#map-sketch");
						}
						flag=1;
					}
					for(var i=0;i<friends.length;i++){
						showAllPosition(friends[i].Latitude,friends[i].Longitude,friends[i].Id);
					}
				}
				if(stranges!="")
				{				
					var flag=0;
					if(flag==0){
						for(var i=0;i<friends.length;i++){
							$("#user-friend-tmpl").tmpl(friends[i]).appendTo("#map-sketch");
						}
						flag=1;
					}
					for(var i=0;i<friends.length;i++){
						if(flag==0){
						showAllPosition(friends[i].Latitude,friends[i].Longitude,friends[i].Id);
						flag=1;
						}
					}
				}
				if(strangeToBeFriend!="")
				{
					for(var i=0;i<strangeToBeFriend.length;i++){
						$("#newf-tmpl").tmpl(strangeToBeFriend[i]).prependTo("#newf-list");
				}	
					myListener();
				}
				if(friendNews!="")
				{
					for(var i=0;i<friendNews.length;i++){
					var id=friendNews[i].Id;
					var pic=friendNews[i].Picture;
					if(pic==""){
						$("#status-word-tmpl").tmpl(friendNews[i]).appendTo("#"+id);
					}else{
						$("#status-pic-tmpl").tmpl(friendNews[i]).appendTo("#"+id);
					}
				}
				}
				if(JdNews!="")
				{
					for(var i=0;i<JdNews.length;i++){
					var id=JdNews[i].IdName;
					var pic=JdNews[i].Picture;
					if(pic==""){
						$("#spot-word-tmpl").tmpl(JdNews[i]).appendTo("#"+id);
					}else{
						$("#spot-pic-tmpl").tmpl(JdNews[i]).appendTo("#"+id);
					}
				}
				}
				
			}
			
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}