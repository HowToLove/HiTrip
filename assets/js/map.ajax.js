/*************************************全局变量************************************/
var sendLocationIntervalId;
var queryAnswerId;
var queryAnswerCount=0;
var queryFriendsId;
var queryMessageId;
var queryJingdianNewsId;
var queryAllId;
/*************************************初始调用*************************************/
window.onload=init;
function init(){
	//getSelfInfo(); 
	myListener();
	//queryAllId = setInterval(queryAll,1000);
	//queryAll();
	//startSimulation();
}
function startSimulation(){
	
	initialAll();
	setTimeout("window.location='#page1'",4000);//四秒中跳转到景区地图
	//让路人说几句话
	news0 = {"Id":"6","Content":"我是路人甲","Picture":""};
	onFriendNews(news0);
	news0 = {"Id":"7","Content":"我是路人乙","Picture":""};
	onFriendNews(news0);
	news0 = {"Id":"8","Content":"我是路人丙","Picture":""};
	onFriendNews(news0);
	/*
	//5秒后让3号好友说一句话
	news = {"Id":"3", "Content":"加油~","Picture":""}
	setTimeout(function(){onFriendNews(news);},5000);
	//7秒后让2号好友发布一张图片
	news2 = {"Id":"2","Content":"这是一张照片","Picture":"img/1.jpg"};
	setTimeout(function(){onFriendNews(news2);},7000);
	//6秒后让李文正图书馆发布一张图片
	news3 = {"IdName":"lwz","Content":"这是一张照片","Picture":"img/2.jpg"};
	setTimeout(function(){onJDNews(news3);},6000);
	var request = {"Id":"6","Name":"路人甲","Head":"img/Badge.png"};
	setTimeout(function(){onFriendRequest(request);},3000);
	var answer = {"Name":"路人甲","Head":"img/Badge.png"};
	setTimeout(function (){onFriendAccept(answer);},4000);
	*/
	setInterval(function(){
	moveHead(3,Math.floor(Math.random()*6+1),10);
	moveHead(5,Math.floor(Math.random()*6+1),20);
	moveHead(7,Math.floor(Math.random()*6+1),30);
},1000);
	setInterval(function(){
	moveHead(2,Math.floor(Math.random()*6+1),25);//1-6多两秒给它休息下
	moveHead(4,Math.floor(Math.random()*6+1),15);
	moveHead(6,Math.floor(Math.random()*6+1),5);
	moveHead(8,Math.floor(Math.random()*6+1),35);	
},500);

	//Spot1：在张睿找男友时出现，2号小颖发布状态“亲爱的，我在这呢”，3号睿睿回复一条状态——“恩呢，我马上过去找你”（最好倒过来，2号小颖发状态“亲爱的，别着急，你就呆在原地，我马上过去找你。” 不过这样子，与视频的部分内容不是很相符）
	var t0 = 8000;
	var vedioNews1 = {"Id":"2","Content":"亲爱的，我在这呢","Picture":""};
	setTimeout(function(){onFriendNews(vedioNews1);},t0);
	var vedioNews2 = {"Id":"3","Content":"恩呢，我马上过去找你","Picture":""};
	setTimeout(function(){onFriendNews(vedioNews2);},t0+=1000);
	//Spot2：在接下来两对情侣行程对比的时候，在张睿那边分别显示多个景点的景区新鲜事  //2秒后，6号景点探险世界发布一条新鲜事————“想体验最最惊险的探险旅程吗？那就不要错过3：30pm在探险世界举行的疯狂探险游戏吧！”照片为txsj_i.jpg     //1秒后，4号景点幻想世界发布了一条状态————“幻想世界，邀你体验梦幻般的感觉，体验时间
//4:00pm”，照片为hxsj_i.jpg
	vediroNews3 = {"IdName":"lwz","Content":"想体验最最惊险的探险旅程吗？那就不要错过3：30pm在探险世界举行的疯狂探险游戏吧！","Picture":"img/txsj_i.jpg"};
	setTimeout(function(){onJDNews(vediroNews3);},t0+=2000);  //8秒后1号灰姑娘的城堡发布一条状态————“灰姑娘灯光会将于2：00pm在灰姑娘城堡内上映，欢迎各位游客前去观赏”，照片为hgndcb_i3.jpg
	vediroNews4 = {"IdName":"lwz","Content":"灰姑娘灯光会将于2：00pm在灰姑娘城堡内上映，欢迎各位游客前去观赏","Picture":"img/hgndcb_i3.jpg"};
	setTimeout(function(){onJDNews(vediroNews4);},t0+=8000);  
//然后接后一段视频，即张睿二人去魔法城堡参观，随即到了下一场景
	//Spot3：最后一幕从城堡出来阶段遇到刘瑶二人，然后需要展示猴山的一条状态——“想观看强所未有的猴王争霸吗？5：00猴山将准时上映大型舞台剧猴王争霸，欢迎各位游客前来观赏”
	vediroNews5 = {"IdName":"lwz","Content":"想观看强所未有的猴王争霸吗？5：00猴山将准时上映大型舞台剧猴王争霸，欢迎各位游客前来观赏","Picture":""};
	setTimeout(function(){onJDNews(vediroNews5);},t0+=5000);  
	//其中可穿插路人的状态：
	//此处有疑问？？路人回复的状态是不会显示的。
	//3秒后，9号同学路人丙回复了睿睿的状态————”好啊，到时候灰姑娘城堡门口见啦！^_^”
	//1秒后，7号路人甲回复路人丙的状态———“—欧也想一起去耶~~，^_^”
	//4秒后，8号路人乙，回复7号路人甲的回复————“你去屎吧！！！！”
	//1秒后，9号同学路人丙回复7号路人甲的回复————“同意，你去屎！！！！”	
}
//头像移动
function moveHead(id,direction,px){//direction是方向1，2，3，4分别代表东南西北；px是像素值的大小
	originalTop = parseInt(document.getElementById(id).style.top);
	originalLeft = parseInt(document.getElementById(id).style.left);
	switch (direction){
	case 1://east
		document.getElementById(id).style.left=originalLeft+px+'px';
		break;
	case 2:	//south
		document.getElementById(id).style.top=originalTop+px+'px';
		break;
	case 3://west
		document.getElementById(id).style.left=originalLeft-px+'px';
		break;
	case 4://north
		document.getElementById(id).style.top = originalTop-px+'px';
		break;
	}
}
//当好友请求被对方接受时
function onFriendAccept(answer){
	$("#newf-accept-tmpl").tmpl(answer).prependTo("#newf-list");
}
//收到好友请求
function onFriendRequest(request){//request是好友请求的JSON对象
	$("#newf-tmpl").tmpl(request).prependTo("#newf-list");
	myListener();
}
//收到景点消息
function onJDNews(news){//news是一个消息的JSON的对象
	var id=news.IdName;
	var pic=news.Picture;
	if(pic==""){
		$("#spot-word-tmpl").tmpl(news).appendTo("#"+id);
	}else{
		$("#spot-pic-tmpl").tmpl(news).appendTo("#"+id);
	}
}
//收到好友消息
function onFriendNews(news){//news是一个消息的JSON对象
	var id=news.Id;
	var pic=news.Picture;
	if(pic==""){
		$("#status-word-tmpl").tmpl(news).appendTo("#"+id);
	}else{
		$("#status-pic-tmpl").tmpl(news).appendTo("#"+id);
	}
}


function initialAll(){
	var selfInfo ={"Longitude":"1600","Latitude":"900","Head":"img\/liyang.jpg","Id":"1","Name":"\u963f\u6960"} ;
	$("#user-ego-tmpl").tmpl(selfInfo).appendTo("#user-ego");
	getE("user-ego").style.top=900+'px';
	getE("user-ego").style.left=1600+'px';//自己位置坐标为（900，1600）
	var strangers = [{"Longitude":"1200","Latitude":"600","Head":"img\/Badge.png","Id":"6","Name":"\u8def\u4eba\u7532"},{"Longitude":"1400","Latitude":"700","Head":"img\/Badge.png","Id":"7","Name":"\u8def\u4eba\u4e59"},{"Longitude":"1900","Latitude":"800","Head":"img\/Badge.png","Id":"8","Name":"\u8def\u4eba\u4e19"}];
	var friends =[{"Longitude":"1500","Latitude":"800","Head":"img\/liyang.jpg","Id":"2","Name":"\u5c0f\u9896"},{"Longitude":"1500","Latitude":"1000","Head":"img\/lily.jpg","Id":"3","Name":"\u777f\u777f"},{"Longitude":"1600","Latitude":"1300","Head":"img\/lily.jpg","Id":"4","Name":"\u5c0f\u7476"},{"Longitude":"1700","Latitude":"1400","Head":"img\/liyang.jpg","Id":"5","Name":"\u5c0f\u84dd"}];
	
	//把好友的头像加到地图上
	for(var i=0,leng = friends.length;i<leng;i++){
	$("#user-friend-tmpl").tmpl(friends[i]).appendTo("#map-sketch");
	}
	for(var i=0;i<friends.length;i++){
		showAllPosition(friends[i].Latitude,friends[i].Longitude,friends[i].Id);
	}
	
	//把陌生人的头像加到地图上
	for(var i=0,leng = strangers.length;i<leng;i++){
	$("#user-stranger-tmpl").tmpl(strangers[i]).appendTo("#map-sketch");
	}
	for(var i=0;i<strangers.length;i++){
		showAllPosition(strangers[i].Latitude,strangers[i].Longitude,strangers[i].Id);
	}
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
	var url = "http://192.168.1.101/server/eyeOn.php";
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
	var url = "http://192.168.1.101/server/sendMessage.php";
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
	var url = "http://192.168.1.101/server/sendMessage.php";
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
	var url = "http://192.168.1.101/server/getSelfInfo.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//alert("QQQ: "+test);
			var selfInfo = eval("("+test+")");
			$("#user-ego-tmpl").tmpl(selfInfo).appendTo("#user-ego");
			console.log("From:getSelfInfo.php:");
			console.log(test);
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
	var url = "http://192.168.1.101/server/requestFriends.php";
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
	var url = "http://192.168.1.101/server/answerFriends.php";
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
	var url = "http://192.168.1.101/server/queryAnswer.php";
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
	var json1=[{"Longitude":"118.8136401","Latitude":"31.885700300000003","Head":"http:\/\/192.168.1.101\/register8.24\/files\/A.jpg","Id":"1","Name":"A"}];
	for(var i=0;i<json1.length;i++){
		$("#newf-tmpl").tmpl(json1[i]).prependTo("#newf-list");
	}
	myListener();
	var json2=[{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/C.jpg","Id":"3","Name":"C","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"}]
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
	var url = "http://192.168.1.101/server/totalHiTripMapServer.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var allMessage = xmlHttp.responseText;
			console.log("All.php:");
			console.log(allMessage);
			
			if(allMessage==""){
				console.log("没有新消息！");
			}
			else{
				var all = eval("("+allMessage+")");	
				var friends =all["friendInfoInMap"];
				var strangers = all['strangeInfoInMap'];
				
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
				if(strangers!="")
				{				
					var flag=0;
					if(flag==0){
						for(var i=0;i<strangers.length;i++){
							$("#user-stranger-tmpl").tmpl(strangers[i]).appendTo("#map-sketch");
						}
						flag=1;
					}
					for(var i=0;i<strangers.length;i++){
						showAllPosition(strangers[i].Latitude,strangers[i].Longitude,strangers[i].Id);
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