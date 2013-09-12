var id_name;
var rank;
var news;

function rate(obj,oEvent){ 
var imgSrc = 'img/start_dark.gif'; //没有填色的星星
var imgSrc_2 = 'img/start_light.gif'; //打分后有颜色的星星

if(obj.rateFlag) return; 
var e = oEvent || window.event; 
var target = e.target || e.srcElement; 
var imgArray = obj.getElementsByTagName("img"); 
for(var i=0;i<imgArray.length;i++){ 
   imgArray[i]._num = i; 
   imgArray[i].onclick=function(){ 
    if(obj.rateFlag) return; 
    obj.rateFlag=true; 
    //alert(this._num+1);       //this._num+1这个数字写入到数据库中,作为评分的依据
	rank=this._num+1;
   }; 
} 
if(target.tagName=="IMG"){ 
   for(var j=0;j<imgArray.length;j++){ 
    if(j<=target._num){ 
     imgArray[j].src=imgSrc_2; 
    } else { 
     imgArray[j].src=imgSrc; 
    } 
   } 
} else { 
   for(var k=0;k<imgArray.length;k++){ 
    imgArray[k].src=imgSrc; 
   } 
} 
}

function ensure(){
	//alert ("aa");
	var com = document.getElementById("textarea").value;
	//var index = obj.index()+1;
	//alert(com+rank);
	if(rank==undefined){
		alert("请为景点评分吧");
	}
	else{
	//点击图片的时候会传入景点的id_name此处先设置为1
	var evaluate="content="+com+"&star="+rank+"&id_name="+id_name;
	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
		xmlHttp.open("POST","http://192.168.1.101/server/jingdian_get_evaluate.php");	
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");	
	
		//alert ("bb");
		xmlHttp.onreadystatechange = function(){
			//alert("dd");
			if(xmlHttp.readyState==4){
			//alert("ee");
				if(xmlHttp.status==200){
				
					var str=xmlHttp.responseText;
					console.log(str);
					var news = eval("("+str+")");
						 if(news=="1"){
							alert("没有更多的信息");
						}else{
						//alert("aa");
							//for(var i=0;i<news.length;i++){
								switch(news.star){
									case '1':
									$("#jingdianImg1").tmpl(news).prependTo("#comments");
									break;
									case '2':
									$("#jingdianImg2").tmpl(news).prependTo("#comments");
									break;
									case '3':
									$("#jingdianImg3").tmpl(news).prependTo("#comments");
									break;
									case '4':
									$("#jingdianImg4").tmpl(news).prependTo("#comments");
									break;
									case '5':
									$("#jingdianImg5").tmpl(news).prependTo("#comments");
									break;
								}
						}
				}
			}
		}
		xmlHttp.send(evaluate);
	}
}

function initialJDInfos(tmp){//当该页面被载入时调用这个函数；
		var xmlHttp;
		if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
		xmlHttp.open("POST","http://192.168.1.101/server/jingdian_introduce.php");	
		id_name=tmp;
		var jingdian_info="id_name="+id_name;
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");	
	
		//alert ("bb");
		xmlHttp.onreadystatechange = function(){
			//alert("dd");
			if(xmlHttp.readyState==4){
			//alert("ee");
				if(xmlHttp.status==200){
				
					var str=xmlHttp.responseText;
					var introduction = eval("("+str+")");
					$("#spot_head").attr("src",introduction.jingdian_portrait);
					$("#spot_name").html(introduction.jingdian_name);
					$("#spot_pic").attr("src",introduction.jingdian_piciture);
					$("#spot_intro").html(introduction.jingdian_content);
					var i=0;
					//alert(introduction.new_things);
					while(introduction.new_things[i])
					{
						if(introduction.new_things[i].IMG)
							{
							$("#newThingImg").tmpl(introduction.new_things[i]).appendTo("#newthings");
							}
						else
							$("#newThing").tmpl(introduction.new_things[i]).appendTo("#newthings");
						i++;
					}
					console.log(str);
				}
			}
		}
		xmlHttp.send(jingdian_info);
	}	
	
$(document).ready(function(){
		$("#toComment").click(function(){
			$("#comments").empty();
			var xmlHttp;
				if(window.ActiveXObject){
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			else if(window.XMLHttpRequest){
				xmlHttp = new XMLHttpRequest();
			}
			var jingdian_info="id_name="+id_name;
			var url = "http://192.168.1.101/server/refresh.php?t="+Math.random();
			xmlHttp.open("POST",url,true);
			xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");	
			xmlHttp.onreadystatechange = function (){
				if(xmlHttp.readyState==4){
					if(xmlHttp.status==200){
						console.log("From toComment:");//written by lanxiang 
						var str = xmlHttp.responseText;
						console.log(str);
						//var news=eval("("+str+")");
						 var news = eval("("+str+")");
						 if(news=="1"){
							alert("没有更多的信息");
						}else{
							for(var i=0;i<news.length;i++){
								switch(news[i].star){
									case '1':
									$("#jingdianImg1").tmpl(news[i]).appendTo("#comments");
									break;
									case '2':
									$("#jingdianImg2").tmpl(news[i]).appendTo("#comments");
									break;
									case '3':
									$("#jingdianImg3").tmpl(news[i]).appendTo("#comments");
									break;
									case '4':
									$("#jingdianImg4").tmpl(news[i]).appendTo("#comments");
									break;
									case '5':
									$("#jingdianImg5").tmpl(news[i]).appendTo("#comments");
									break;
								}
								}
						}	
					}
				}
			};
			xmlHttp.send(jingdian_info);		
		});
		
		
		//点击加载更多时调用该函数
		$("#commentLoadMore").click(function() {
		var xmlHttp;
			if(window.ActiveXObject){
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			else if(window.XMLHttpRequest){
				xmlHttp = new XMLHttpRequest();
			}
			var jingdian_info="id_name="+id_name;
			var url = "http://192.168.1.101/server/add_more.php?t="+Math.random();
			//console.log(url);
			xmlHttp.open("POST",url,true);
			xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");	
			xmlHttp.onreadystatechange = function(){
			//alert("dd");
				if(xmlHttp.readyState==4){
				//alert("ee");
					if(xmlHttp.status==200){
					
						//var str=xmlHttp.responseText;
						var str=xmlHttp.responseText;
						console.log("From commentLoadMore");
						console.log(str);					
						var news = eval("("+str+")");
						if(news=="1"){
							alert("没有更多的信息");
						}else{
							for(var i=0;i<news.length;i++){
								switch(news[i].star){
									case '1':
									$("#jingdianImg1").tmpl(news[i]).appendTo("#comments");
									break;
									case '2':
									$("#jingdianImg2").tmpl(news[i]).appendTo("#comments");
									break;
									case '3':
									$("#jingdianImg3").tmpl(news[i]).appendTo("#comments");
									break;
									case '4':
									$("#jingdianImg4").tmpl(news[i]).appendTo("#comments");
									break;
									case '5':
									$("#jingdianImg5").tmpl(news[i]).appendTo("#comments");
									break;
								}
							}	
						}
						//console.log(str);
					}
				}
			};
			xmlHttp.send(jingdian_info);	
		});	
		var count =1;		
      $("#introducepic").bind("swiperight", function(){
		  count++;
		  if(count <=4){
		 var picSrc = "img/";
		 picSrc+=count;
		 picSrc+=".jpg"
		 $("#introducepic").attr('src', picSrc);
		 }else{
			count = 4;
		 }	
      });

       $("#introducepic").bind("swipeleft", function(){
          count--;
		  if(count >=1){
		 var picSrc = "img/";
		 picSrc+=count;
		 picSrc+=".jpg"
		 $("#introducepic").attr('src', picSrc);
		 }else{
			count = 1;
		 }	
      });  	  
		$(".bubble-name").click(function(){
		var jingdian_id_name=$(this).parent().attr("id");
		//alert(jingdian_id_name);
		//swipeToChangPic();
		initialJDInfos(jingdian_id_name);
		});
		//刷新评论
		$("#commentRefresh").click(function() {
			$("#comments").empty();
			if(window.ActiveXObject){
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			else if(window.XMLHttpRequest){
				xmlHttp = new XMLHttpRequest();
			}
			var jingdian_info="id_name="+id_name;
			var url = "http://192.168.1.101/server/refresh.php?t="+Math.random();
			xmlHttp.open("POST",url,true);
			xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlHttp.onreadystatechange = function(){
				if(xmlHttp.readyState==4){
					if(xmlHttp.status==200){			
					var str = xmlHttp.responseText;
					console.log(str);
					//var news=eval("("+str+")");
					 var news = eval("("+str+")");
					 if(news=="1"){
							alert("没有更多的信息");
						}else{
							for(var i=0;i<news.length;i++){
								switch(news[i].star){
									case '1':
									$("#jingdianImg1").tmpl(news[i]).appendTo("#comments");
									break;
									case '2':
									$("#jingdianImg2").tmpl(news[i]).appendTo("#comments");
									break;
									case '3':
									$("#jingdianImg3").tmpl(news[i]).appendTo("#comments");
									break;
									case '4':
									$("#jingdianImg4").tmpl(news[i]).appendTo("#comments");
									break;
									case '5':
									$("#jingdianImg5").tmpl(news[i]).appendTo("#comments");
									break;
								}
							}
						}		
			
					}
				}
			};
			xmlHttp.send(jingdian_info);	
		});
});		