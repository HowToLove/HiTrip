var target_Id;//���ظ���Id
var entry_Id;//���ظ�״̬Id
$(document).ready(function(){
	//���������µ�����ظ���
	$("#spotLoadMore").click(function() {
	var spot_xmlHttp;
	if(window.ActiveXObject){
		spot_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
		else if(window.XMLHttpRequest){
		spot_xmlHttp = new XMLHttpRequest();
	}
	var url = "http://192.168.1.101/server/get_spot_down.php?t="+Math.random();
	spot_xmlHttp.open("GET",url,true);
	spot_xmlHttp.onreadystatechange = function (){
		if(spot_xmlHttp.readyState==4){
			if(spot_xmlHttp.status==200){			
				str = spot_xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_no_reply_button").tmpl(news[i]).appendTo("#spot-new");
					else
						$("#text_status_no_reply_button").tmpl(news[i]).appendTo("#spot-new");
				}	
			}
		}
	};
	spot_xmlHttp.send(null);	
	});	
	
	//����������ˢ��
	$("#spotRefresh").click(function() {
	$("#spot-new").empty();
	var spot_xmlHttp;
	if(window.ActiveXObject){
		spot_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
		else if(window.XMLHttpRequest){
		spot_xmlHttp = new XMLHttpRequest();
	}
	var url = "http://192.168.1.101/server/get_spot_refresh.php?t="+Math.random();
	spot_xmlHttp.open("GET",url,true);
	spot_xmlHttp.onreadystatechange = spot_xmlHttp.onreadystatechange = function (){
		if(spot_xmlHttp.readyState==4){
			if(spot_xmlHttp.status==200){			
				str = spot_xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_no_reply_button").tmpl(news[i]).appendTo("#spot-new");
					else
						$("#text_status_no_reply_button").tmpl(news[i]).appendTo("#spot-new");
				}	
			}
		}
	};
	spot_xmlHttp.send(null);	
	});
});
//���������³�ʼ��
function initialQueryJDNews(){
$("#spot-new").empty();
	var spot_xmlHttp;
	if(window.ActiveXObject){
		spot_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
		else if(window.XMLHttpRequest){
		spot_xmlHttp = new XMLHttpRequest();
	}
	var url = "http://192.168.1.101/server/get_spot_refresh.php?t="+Math.random();
	spot_xmlHttp.open("GET",url,true);
	spot_xmlHttp.onreadystatechange = spot_xmlHttp.onreadystatechange = function (){
		if(spot_xmlHttp.readyState==4){
			if(spot_xmlHttp.status==200){			
				str = spot_xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_no_reply_button").tmpl(news[i]).appendTo("#spot-new");
					else
						$("#text_status_no_reply_button").tmpl(news[i]).appendTo("#spot-new");
				}	
			}
		}
	};
	spot_xmlHttp.send(null);	
}


//������ҳ

$(document).ready(function(){
	//������ҳ������ظ���
	$("#myStatusLoadMore").click(function() {
	var personal_xmlHttp;
		if(window.ActiveXObject){
			personal_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if(window.XMLHttpRequest){
			personal_xmlHttp = new XMLHttpRequest();
		}
	var url = "http://192.168.1.101/server/get_personal_status_down.php?t="+Math.random();
	personal_xmlHttp.open("GET",url,true);
	personal_xmlHttp.onreadystatechange = function (){
		if(personal_xmlHttp.readyState==4){
			if(personal_xmlHttp.status==200){			
				str = personal_xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_no_reply_button").tmpl(news[i]).appendTo("#personal-new");
					else
						$("#text_status_no_reply_button").tmpl(news[i]).appendTo("#personal-new");
					if(news[i].Reply)
					{
						for(var j=0;j<news[i].Reply.length;j++)
						{
							$("#reply-tmpl").tmpl(news[i].Reply[j]).appendTo("#personal-new");
							replyListener();
						}
					}
				}	
			}
		}
	};
	personal_xmlHttp.send(null);	
	});	
	//������ҳˢ��
	$("#myStatusRefresh").click(function() {
	$("#personal-new").empty();
	var personal_xmlHttp;
		if(window.ActiveXObject){
			personal_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if(window.XMLHttpRequest){
			personal_xmlHttp = new XMLHttpRequest();
		}
	var url = "http://192.168.1.101/server/get_personal_status_refresh.php?t="+Math.random();
	personal_xmlHttp.open("GET",url,true);
	personal_xmlHttp.onreadystatechange = function (){
		if(personal_xmlHttp.readyState==4){
			if(personal_xmlHttp.status==200){			
				str = personal_xmlHttp.responseText;
				console.log("From get_personal_status_refresh.php:");
				console.log(str);
				if(str!=1){
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_no_reply_button").tmpl(news[i]).appendTo("#personal-new");
					else
						$("#text_status_no_reply_button").tmpl(news[i]).appendTo("#personal-new");
					if(news[i].Reply)
					{
						for(var j=0;j<news[i].Reply.length;j++)
						{
							$("#reply-tmpl").tmpl(news[i].Reply[j]).appendTo("#personal-new");
							replyListener();
						}
					}
				}
				}				
			}
		}
	};
	personal_xmlHttp.send(null);	
	});

	//������ҳ����ظ����Ͱ�ť
	/*
	$("#button-send-personal").tap(function(){
		var content=$("#reply-content-personal").val();
		var str = "status_id="+entry_id_personal+
			"&object_name="+target_Id+"&content="+content;
		alert(str);
		var personal_xmlHttp;
		if(window.ActiveXObject){
			personal_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if(window.XMLHttpRequest){
			personal_xmlHttp = new XMLHttpRequest();
		}
		var url="http://192.168.1.101/server/get_new_reply.php";
		personal_xmlHttp.open("POST",url,true);
		personal_xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		personal_xmlHttp.send(str);
	});
	*/
});
//������ҳ��ʼ��
function initialQueryPersonNews(){
	$("#personal-new").empty();
	//alert("in initialQueryPersonNews");
	var personal_xmlHttp;
		if(window.ActiveXObject){
			personal_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if(window.XMLHttpRequest){
			personal_xmlHttp = new XMLHttpRequest();
		}
	var url = "http://192.168.1.101/server/get_personal_status_refresh.php?t="+Math.random();
	personal_xmlHttp.open("GET",url,true);
	personal_xmlHttp.onreadystatechange = function (){
		if(personal_xmlHttp.readyState==4){
			if(personal_xmlHttp.status==200){			
				str = personal_xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_no_reply_button").tmpl(news[i]).appendTo("#personal-new");
					else
						$("#text_status_no_reply_button").tmpl(news[i]).appendTo("#personal-new");
					if(news[i].Reply)
					{
						for(var j=0;j<news[i].Reply.length;j++)
						{
							$("#reply-tmpl").tmpl(news[i].Reply[j]).appendTo("#personal-new");
							replyListener();
						}
					}
				}	
			}
		}
	};
	personal_xmlHttp.send(null);	
}
//״̬������������
function replyListener(){
	$(document).ready(function(){
	/*
		$(".button-reply").tap(function(){
			target_Id=$(this).parent().parent().attr("id");
			entry_id_personal=$(this).parent().attr("id");
		//
		});
		*/
		$(".button-reply").tap(function(){
		//alert($(this).parent().parent().parent().parent().parent().parent().children("#page2-reply").attr("id"));
			$(this).parent().parent().parent().parent().parent().parent().parent().parent().children("#page2-reply").show();
			target_Id=$(this).parent().parent().attr("id");
			entry_Id=$(this).parent().attr("id");
			//alert("target_Id:"+target_Id+" "+"entry_Id:"+entry_Id);
		});
		$(".status-button-reply").tap(function(){
		
		//alert($(this).parent().parent().parent().parent().children("#page2-reply").attr("id"));
			$(this).parent().parent().parent().parent().parent().parent().parent().parent().children("#page2-reply").show();
			target_Id=$(this).parent().parent().attr("id");
			entry_Id=$(this).parent().attr("id");
			//alert("target_Id:"+target_Id+" "+"entry_Id:"+entry_Id);			
		});
	});
}
//���Ѷ�̬

//����״̬��ʼ��
function initialFriendStatus(){
	$("#friend-new").empty();
	var xmlHttp;
	if(window.ActiveXObject){
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if(window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
		}
	var url = "http://192.168.1.101/server/get_status_refresh.php?t="+Math.random();
	xmlHttp.open("GET",url,true);
	xmlHttp.onreadystatechange = function (){
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){			
				str = xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_reply_button").tmpl(news[i]).appendTo("#friend-new");
					else
						$("#text_status_reply_button").tmpl(news[i]).appendTo("#friend-new");
					if(news[i].Reply)
					{
						for(var j=0;j<news[i].Reply.length;j++)
						{
							$("#reply-tmpl").tmpl(news[i].Reply[j]).appendTo("#friend-new");
							replyListener();
						}
					}
				}	
			}
		}
	};
	xmlHttp.send(null);	
}

$(document).ready(function(){
	//���ѵ�����ظ���
	//replyListener();
	$("#friendLoadMore").click(function() {
	//alert("in friendLoadMore");
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
	var url = "http://192.168.1.101/server/get_status_down.php?t="+Math.random();
	xmlHttp.open("GET",url,true);
	xmlHttp.onreadystatechange = function (){
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){			
				str = xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_reply_button").tmpl(news[i]).appendTo("#friend-new");
					else
						$("#text_status_reply_button").tmpl(news[i]).appendTo("#friend-new");
					if(news[i].Reply)
					{
						for(var j=0;j<news[i].Reply.length;j++)
						{
							$("#reply-tmpl").tmpl(news[i].Reply[j]).appendTo("#friend-new");
							replyListener();
						}
					}
				}	
			}
		}
	};
	xmlHttp.send(null);	
	});
	//����ˢ��
	$("#friendRefresh").click(function() {
	//alert("in friendRefresh");
	$("#friend-new").empty();
	var xmlHttp;
	if(window.ActiveXObject){
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if(window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
		}
	var url = "http://192.168.1.101/server/get_status_refresh.php?t="+Math.random();
	xmlHttp.open("GET",url,true);
	xmlHttp.onreadystatechange = function (){
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){			
				str = xmlHttp.responseText;
				console.log(str);
				var news = eval("("+str+")");
				for(var i=0;i<news.length;i++) {
					if(news[i].IMG)
						$("#pic_status_reply_button").tmpl(news[i]).appendTo("#friend-new");
					else
						$("#text_status_reply_button").tmpl(news[i]).appendTo("#friend-new");
					if(news[i].Reply)
					{
						for(var j=0;j<news[i].Reply.length;j++)
						{
							$("#reply-tmpl").tmpl(news[i].Reply[j]).appendTo("#friend-new");
							replyListener();
						}
					}
				}	
			}
		}
	};
	xmlHttp.send(null);	
	});
	//���ѵ���ظ����Ͱ�ť
	$("#button-send-friend").tap(function(){
		$(this).parent().hide();
		var content=$("#reply-content").val();
		var str = "status_id="+entry_Id+
			"&object_name="+target_Id+"&content="+content;
		//alert(str);
		var xmlHttp;
		if(window.ActiveXObject){
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if(window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
		}
		var url="http://192.168.1.101/server/get_new_reply.php";
		xmlHttp.open("POST",url,true);
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		//alert(str);
		
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4){
				if(xmlHttp.status == 200){
					console.log(xmlHttp.responseText);
					str = xmlHttp.responseText;
					console.log(str);
					var news = eval("("+str+")");
				}	
			}
		};
		xmlHttp.send(str);
	});

});

