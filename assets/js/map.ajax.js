/*************************************ȫ�ֱ���************************************/
var sendLocationIntervalId;
var queryAnswerId;
var queryAnswerCount=0;
var queryFriendsId;
var queryMessageId;
var queryJingdianNewsId;

/*************************************��ʼ����*************************************/
function init(){

	//getSelfInfo(); 
	//getFriendInfo();
	myListener();
	showMyPosition(31.88736,118.83043);
	//foot_print();
	//queryMessageId=setInterval(queryMessage,1000);
	//sendLocationIntervalId = setInterval(sendLocation,1000);
	//queryFriendsId = setInterval(queryFriends,1000);
	//queryJingdianNewsId=setInterval(queryJingdianNews,1000);
	//aaa();
	
}	

/***********************************��Ӿ����ע***********************************/
function eyeOn(idName){
	//var jingdian_id=6;//Ҫ��Ϊ��������
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="idName="+idName+"&t="+Math.random();
		console.log(param);
	var url = "http://192.168.1.101/server/eyeOn.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:eyeOn.php:");
			console.log(test);
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/********************************ʵʱ���Ҿ�����Ϣ**********************************/
function queryJingdianNews(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
	var url = "http://192.168.1.101/server/queryJingdianNews.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:queryJingdianNews.php:");
			console.log(test);
			if(test=="1"){
				console.log("û������Ϣ��");
			}
			else{
				var news = eval("("+test+")");//���������JSON���飺
				//[{"Id":"1","Head":"","Name":"\u7126\u5ef7\u6807\u9986","Picture":"jj","Content":"\u5feb\u4e50\u7684\u8682\u86b1"}] 
				for(var i=0;i<news.length;i++){
					var id=news[i].IdName;
					var pic=news[i].Picture;
					if(pic==""){
						$("#spot-word-tmpl").tmpl(news[i]).appendTo("#"+id);
					}else{
						$("#spot-pic-tmpl").tmpl(news[i]).appendTo("#"+id);
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

/********************��ͼ��Ϣ���ͺ����������Ϣ����������״̬**********************/
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
		console.log(param);
	var url = "http://192.168.1.101/server/sendMessage.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:sendMessage.php:");
			console.log(test);
			if(test!="0"){
			//var answer = eval("("+test+")");
			alert("��Ϣ����ʧ�ܣ�");
			}
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/********************��ͼ��Ϣ���ͺ����������Ϣ������ͼƬ״̬**********************/
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
		console.log(param);
	var url = "http://192.168.1.101/server/sendMessage.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:sendMessage.php:");
			console.log(test);
			if(test!="0"){
			//var answer = eval("("+test+")");
			alert("��Ϣ����ʧ�ܣ�");
			}
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/******************************ʵʱ��ѯ���ѷ�����״̬******************************/
function queryMessage(){//need to be added into init()
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		console.log(param);
	var url = "http://192.168.1.101/server/queryMessage.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:queryMessage.php:");
			console.log(test);
			if(test=="1"){
				console.log("û������Ϣ��");
			}
			else{
				var news = eval("("+test+")");//���������JSON���飺
				//[{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/C.jpg","Id":"3","Name":"C","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"},{"Longitude":"0","Latitude":"0","Head":"http:\/\/192.168.1.101\/register8.24\/files\/D.jpg","Id":"4","Name":"D","Picture":"","Content":"\u7537\u4eba\u5c31\u662f\u7d2f\uff01"}]
				for(var i=0;i<news.length;i++){
					var id=news[i].Id;
					var pic=news[i].Picture;
					if(pic==""){
						$("#status-word-tmpl").tmpl(news[i]).appendTo("#"+id);
					}else{
						$("#status-pic-tmpl").tmpl(news[i]).appendTo("#"+id);
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

/***********************************����Լ�����ͼ*********************************/
function getSelfInfo(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		console.log(param);
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

/***********************************��Ӻ��ѵ���ͼ*********************************/
function getFriendInfo(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		console.log(param);
	var url = "http://192.168.1.101/server/getFriendInfo.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			var friends = eval("("+test+")");
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
			console.log("From:getFriendInfo.php:");
			console.log(test);
			console.log(friends[0].Name);
		}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/***********************************���¿�ѵ���ͼ*********************************/
function getStrangeInfo(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		console.log(param);
	var url = "http://192.168.1.101/server/getStrangeInfo.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			var strange = eval("("+test+")");
			//�˴���̬���div
			console.log("From:getStrangeInfo.php:");
			console.log(test);
			console.log(strange[0].Name);
		}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/**********************************���ͺ�������************************************/
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
		console.log(param);
	var url = "http://192.168.1.101/server/requestFriends.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:requestFriends.php:");
			console.log(test);
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/*******�û���¼�ɹ�����ã���ѯ�Ƿ����µĺ������󣬷���������û���JSON����*******/
function queryFriends(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		console.log(param);
	var url = "http://192.168.1.101/server/queryFriends.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:queryFriends.php:");
			console.log(test);
			if(test==-1){
				alert("Update ʧ�ܣ�");
			}else{
			if(test!="1"){
				var strange = eval("("+test+")");
				for(var i=0;i<strange.length;i++){
					$("#newf-tmpl").tmpl(strange[i]).prependTo("#newf-list");
					//alert(i)
				}	
					myListener();

			}else{
			test = "û�������������Ϊ����";
			}
			}
			
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/*********************************�Ƿ���ܺ�������*********************************/
function answerFriends(answer,answerUserId){
	//answer,1��ʾ���ܺ�������2��ʾ�ܾ�
	//answerUserId��ʾ�ظ����û���Id��Ӧ��Ϊ��������
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="answer="+answer+"&answerUserId="+answerUserId+"&t="+Math.random();
		console.log(param);
	var url = "http://192.168.1.101/server/answerFriends.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:answerFriends.php:");
			console.log(test);
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);	
}

/**��ѯ�Է��Ƿ�����ظ��������������ֵ�ǶԷ���Ϣ��json�����ͻظ���status��1��ʾͬ�⣬0��ʾ��ͳһ**/
function queryAnswer(){
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
    var param ="t="+Math.random();
		console.log(param);
	var url = "http://192.168.1.101/server/queryAnswer.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			console.log("From:queryAnswer.php:");
			console.log(test);
			if(test!=""){
				var answer = eval("("+test+")");//�õ��˶Է���JSON�����ͽ��
				for(var i=0;i<answer.length;i++){
					if(answer[i].status==1){
						$("#newf-accept-tmpl").tmpl(answer[i]).prependTo("#newf-list");
					}
				}
				queryAnswerCount-=answer.length;
				if(queryAnswerCount==0)//��ʾ���е����󶼵õ��˻ش�
				clearInterval(queryAnswerId);//��ֹ�˴β���
			}			
			}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
}

/*****************ÿ�ζ�̬��Ӷ�Ҫ����һ�κ�����ִ��JQueryЧ��*********************/
var flag_zone_eyeon=0;
var flag_spot_eyeon=0;
function myListener(){
	$(document).ready(function(){
	   $(".newfY").tap(function(){
			var id=$(this).parent().parent().parent().parent().parent().attr("id");
			$("#"+id).find(".ui-li-aside").empty();
			$("#"+id).find(".ui-li-aside").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>�����</span></span><button data-inline='true' class='ui-btn-hidden' data-disabled='false'>�����</button></div>");
			answerFriends(1,id);
		});
		$(".newfN").tap(function(){
			var id=$(this).parent().parent().parent().parent().parent().attr("id");
			$("#"+id).find(".ui-li-aside").empty();
			$("#"+id).find(".ui-li-aside").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>�Ѿܾ�</span></span><button data-inline='true' class='ui-btn-hidden' data-disabled='false'>�Ѿܾ�</button></div>");
			answerFriends(2,id);
		});
		$(".eyeon").tap(function(){
			var id=$(this).parent().parent().parent().attr("id");
			$(".zone-eyeon").empty();
			if(flag_zone_eyeon==0){
				$(".zone-eyeon").append("<a class='eyeon ui-btn ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-left ui-btn-up-c' href='#' data-role='button' data-theme='c' data-icon='minus' data-inline='true' data-mini='true' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span'><span class='ui-btn-inner'><span class='ui-btn-text'>ȡ����ע</span><span class='ui-icon ui-icon-minus ui-icon-shadow'>&nbsp;</span></span></a>");
				flag_zone_eyeon=1;
				myListener();
			}else{
				$(".zone-eyeon").append("<a class='eyeon ui-btn ui-btn-up-e ui-shadow ui-btn-corner-all ui-mini ui-btn-inline ui-btn-icon-left' href='#' data-role='button' data-theme='e' data-icon='plus' data-inline='true' data-mini='true' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span'><span class='ui-btn-inner'><span class='ui-btn-text'>�ӹ�ע</span><span class='ui-icon ui-icon-plus ui-icon-shadow'>&nbsp;</span></span></a>");
				flag_zone_eyeon=0;
				myListener();
			}
			requestFriends(id);
		});
		$(".eyeon-spot").tap(function(){
			var id=$(this).parent().parent().parent().attr("id");
			$(".spot-eyeon").empty();
			if(flag_spot_eyeon==0){
				$(".spot-eyeon").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-icon='minus' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-left ui-btn-hover-c ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>ȡ����ע</span><span class='ui-icon ui-icon-minus ui-icon-shadow'>&nbsp;</span></span><button class='eyeon-spot ui-btn-hidden' data-inline='true' data-icon='minus' data-disabled='false'>ȡ����ע</button></div>");
				flag_spot_eyeon=1;myListener();
			}else{
				$(".spot-eyeon").append("<div data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-icon='plus' data-theme='c' data-inline='true' data-disabled='false' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-icon-left ui-btn-up-c' aria-disabled='false'><span class='ui-btn-inner'><span class='ui-btn-text'>�ӹ�ע</span><span class='ui-icon ui-icon-plus ui-icon-shadow'>&nbsp;</span></span><button class='eyeon-spot ui-btn-hidden' data-inline='true' data-icon='plus' data-disabled='false'>�ӹ�ע</button></div>");
				flag_spot_eyeon=0;myListener();
			}
			eyeOn(id);
		});
  	});
}

/************************���Ժ�������������µĺ���������Ϣ************************/
function aaa(){
	var json1=[{"Longitude":"118.8136401","Latitude":"31.885700300000003","Head":"http:\/\/localhost\/register8.24\/files\/A.jpg","Id":"1","Name":"A"}];
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