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