var lastLongitude=1.1;//written by lanxiang 
var lastLatitude=1.2;//written by lanxiang

/**********************************地理定位**********************************/
function getE(ele){
	return document.getElementById(ele);
}
/*
start
written by lanxiang
*/
function check(lat,lon){
//////////console.log(LastLongitude+"  "+Lon);
	if(lastLongitude==lon)
	{
	return false;
	}
	else
	return true;
}
function sendLocation(){
	//////////console.log("lanxiang!");
	//alert("")
	/*
	if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(getPosition,showError);
    }
  else{
	alert("sorry!Your browser is bad!");
  }
  */
  getPosition();
}

//function getPosition(position)
function getPosition(){
  var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}
  var lat=31.885700300;
  var lon=118.8136401;
  if(check(lat,lon)){//用来判断用户的位置是否发生了变化
  lastLatitude=lat;
  lastLongitude=lon; 
  
  var param ="longitude="+lon+
		"&latitude="+lat+
		"&t="+Math.random();
		//////////console.log(param);
	var url = "sendPosition.php";
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState==4){
		if(xmlHttp.status == 200){
			var test = xmlHttp.responseText;
			//////////console.log("From:sendPosition.php:");
			////////console.log(test);
		}
		}
	};
	xmlHttp.open("POST",url);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send(param);
	}
	//showAllPosition(position.coords.latitude,position.coords.longitude,"user-ego");
	//showMyPosition(31.88646,118.81918);
	showMyPosition(31.885700300,118.8136401);
	//var lat=31.885700300;
 // var lon=118.8136401;
	//alert("hi")
}
function showError(error){
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
     alert("An unknown error occurred.");
      break;
    }
  }
  /*
  end 
  written by lanxiang 
  */

var json=[{"IdName":"lwz","Top":"628","Left":"1064"},{"IdName":"jtbg","Top":"916","Left":"1600"},{"IdName":"jsjl","Top":"820","Left":"710"},{"IdName":"jzl","Top":"916","Left":"865"}];
function Distance(latA,lonA,latB,lonB){
	return (25960.23679735*(Math.acos(Math.sin(latA)*Math.sin(latB)+Math.cos(latA)*Math.cos(latB)*Math.cos(lonA-lonB))));
}
function triArea(a,b,c){
	var p=(a+b+c)/2;
	return Math.sqrt(p*(p-a)*(p-b)*(p-c));
}
function calTop(x,y){
	return 1.895560108*x+1.905552983*y+63-230;
}
function calLeft(x,y){
	return 2.953059756*y-2.96137829*x+945;
}
var isSealed=false;
function showMyPosition(lat,lon){
	var ad=524;
	var an=Distance(31.8948,118.8090,lat,lon);
	var dn=Distance(31.8948,118.8318,lat,lon);
	var otop=2*triArea(ad,an,dn)/ad;
	var oleft=Math.sqrt(Math.pow(an,2)-Math.pow(otop,2));
	var top=calTop(otop,oleft);
	var left=calLeft(otop,oleft);
	getE("user-ego").style.top=top+'px';
	getE("user-ego").style.left=left+'px';
	/*
	for(var i=0;i<json.length;i++){
		if(Math.sqrt(Math.pow((top-json[i].Top),2)-Math.pow((left-json[i].Left),2))<200){
			seal(json[i]);
		}
	}
	*/
}
function showAllPosition(lat,lon,id){
	var ad=524;
	var an=Distance(31.8948,118.8090,lat,lon);
	var dn=Distance(31.8948,118.8318,lat,lon);
	var otop=2*triArea(ad,an,dn)/ad;
	var oleft=Math.sqrt(Math.pow(an,2)-Math.pow(otop,2));
	getE(id).style.top=calTop(otop,oleft)+'px';
	getE(id).style.left=calLeft(otop,oleft)+'px';
}

/**********************************景点盖章**********************************/
var winWidth = 0;
var winHeight = 0;

function setstyle(){
	var hb1,hb2,h1,h2;
	hb1=$("#box").width();
	hb2=$("#box").height();

	winWidth=document.body.clientWidth;
	winHeight=document.body.clientHeight;
	h1=winWidth-hb1;
	h1=h1/2;
	h2=winHeight-hb2;
	h2=h2/5;
	h2=h2*2;
	document.getElementById('box').style.left=h1+"px";
	document.getElementById('box').style.top=h2+"px";
}

var x,y,n=0,ny=0,rotINT,rotYINT;
function rotateYDIV(){
	y=document.getElementById("badge")
	clearInterval(rotYINT)
	rotYINT=setInterval("startYRotate()",10)
}

function startYRotate(){
	ny=ny+8
	y.style.transform="rotateY(" + ny + "deg)"
	y.style.webkitTransform="rotateY(" + ny + "deg)"
	y.style.OTransform="rotateY(" + ny + "deg)"
	y.style.MozTransform="rotateY(" + ny + "deg)"
	if (ny>=360){
		clearInterval(rotYINT)
		if (ny>=360){ny=0}
	}
}

function animation(){
	$('#box').show();
	$('#bind').fadeIn(200,function(){
		$('#badge').toggle(300,function(){
			rotateYDIV();
			$('#badge').animate({"height":"206px","width":"200px"},function(){ 
				$('#star-fill').fadeIn("fast",function(){
					$('#star-twinkle').fadeIn("fast");
					$('#star-twinkle').fadeOut("normal",function(){
						$('.seal').fadeOut("normal",function(){
							$('#badge').animate({"height":"320px","width":"310px"});
							$('#box').hide();
						});
					}) 
				});
			});
		});
	});
}
var count=0;//景点数
/************************增加进度条***********************/
function addBar(){
	count++;
	getE("bar").style.width=count*10+"%";
	getE("count").innerText=count;
}
/************************改变颜色***********************/
/*function changeColor(a){
	getE(a).style.backgroundColor="rgba(251, 180,80, 0.9)";
}*/
/***********************盖章总效果**********************/
function seal(id){
	if(count<10){
		animation();
		addBar();
		//changeColor(id);
	}
}

/**********************************地图拖拽**********************************/
var isdrag=false;
var x,y;
var dobj;

function movemouse(e){
	if (isdrag){
		w=document.body.clientWidth;
		h=document.body.clientHeight;
		
		dobj.style.top  = ty + e.clientY - y +'px';			
		if(parseInt(dobj.style.top+0) > 0){//向下拖
			dobj.style.top = '0px';
		}
		else if(parseInt(dobj.style.top+0) < (h-3316)){//向上拖
			dobj.style.top=''+(h-3316)+'px';
		}
		
		dobj.style.left = tx + e.clientX - x +'px';
		if(parseInt(dobj.style.left+0)>0){//向右拖
			dobj.style.left = '0px';
		}
		else if(parseInt(dobj.style.left+0)<(w-2967)){//向左拖
			dobj.style.left=''+(w-2967)+'px';
		}
		return false;
		}
}

function selectmouse(e){
	var fobj = e.target ;
	while (fobj.tagName != "HTML"  &&  fobj.className != "map-sketch"){
		fobj = fobj.parentNode ;
	}
	if (fobj.className=="map-sketch"){
		isdrag = true;
		dobj = fobj;
		tx = parseInt(dobj.style.left+0);
		ty = parseInt(dobj.style.top+0);
		x = e.clientX ;
		y = e.clientY ;
		document.onmousemove=movemouse;
		return false;
	}

}
document.onmousedown=selectmouse;
document.onmouseup=new Function("isdrag=false");

$( function () {
	$( document ).on( "vmousedown",function(e) {
		var fobj = e.target ;
		while (fobj.tagName != "HTML"  &&  fobj.className != "map-sketch"){
			fobj = fobj.parentNode ;
		}
		if (fobj.className=="map-sketch"){
			isdrag = true;
			dobj = fobj;
			tx = parseInt(dobj.style.left+0);
			ty = parseInt(dobj.style.top+0);
			x = e.clientX ;
			y = e.clientY ;
			$( document ).on( "vmousemove",function movemouse(e){
				if (isdrag){
					w=document.body.clientWidth;
					h=document.body.clientHeight;
					
					dobj.style.top  = ty + e.clientY - y +'px';			
					if(parseInt(dobj.style.top+0) > 0){//向下拖
						dobj.style.top = '0px';
					}
					else if(parseInt(dobj.style.top+0) < (h-3316)){//向上拖
						dobj.style.top=''+(h-3316)+'px';
					}
					
					dobj.style.left = tx + e.clientX - x +'px';
					if(parseInt(dobj.style.left+0)>0){//向右拖
						dobj.style.left = '0px';
					}
					else if(parseInt(dobj.style.left+0)<(w-2967)){//向左拖
						dobj.style.left=''+(w-2967)+'px';
					}
					return false;
				}
			});
			return false;
		}
	});
});

/**********************************中心定位**********************************/
function pinpointCenter(id){
	var top=-(parseInt($(id).css("top")+0))+(parseInt(document.body.clientHeight+0))/2-50;
	var left=-(parseInt($(id).css("left")+0))+(parseInt(document.body.clientWidth+0))/2-38;
	if(top>0)
		$("#map-sketch").css("top","0px");
	else if(top<(-3316+parseInt(document.body.clientHeight+0)))
		$("#map-sketch").css("top",-3316+parseInt(document.body.clientHeight+0)+"px");
	else $("#map-sketch").css("top",top+"px");
	
	if(left>0)
		$("#map-sketch").css("left","0px");
	else if(left<(-2967+parseInt(document.body.clientWidth+0)))
		$("#map-sketch").css("left",-2967+parseInt(document.body.clientWidth+0)+"px");
	else $("#map-sketch").css("left",left+"px");
}

/**********************************窗口重绘**********************************/
function resize(){
	//getE("minilayer").style.height=(parseInt(document.body.clientHeight+0)-43)+'px';
	//getE("switch-button").style.top=(parseInt(document.body.clientHeight+0)-103)/2+'px';
	setstyle();
	$("#map-panorama-map").css("margin-top",($("#cover").height()-$("#map-panorama-map").height())/2+'px');
}

/************************************READY***********************************/
$(document).ready(function(){
	/************************设置盖章***********************/
	//getE("minilayer").style.height=(parseInt(document.body.clientHeight+0)-43)+'px';
	
	
	/************************设置地图切换按钮位置***********************/
	//getE("switch-button").style.top=(parseInt(document.body.clientHeight+0)-103)/2+'px';
	

	
	/************************状态发布栏***********************/
	//$("#pub-bar").hide();
	var flag_button=0;
	$("#photo-button").tap(function(){
		seal("lwz");
		if(flag_button==0){
			button4_show();
			flag_button=1;
		}else{
			button4_hide();
			flag_button=0;
		}
	});
	$("#pub-bar-status").tap(function(){
		button4_hide();
		flag_button=0;
	});
	$("#pub-bar-camera").tap(function(){
		button4_hide();
		flag_button=0;
	});
	$("#pub-bar-gallery").tap(function(){
		button4_hide();
		flag_button=0;
	});
	
	/************************足迹**********************/
	var flag_footprint=0;
	$("#pub-bar-footprint").tap(function(){
		if(!flag_footprint){
			foot_print();
			flag_footprint=1;
		}else{
			foot_print_hide();
			flag_footprint=0;
			button4_hide();
			flag_button=0;
			
		}
	});
	
	/************************景点名字***********************/
	$(".bubble-name").hide();
	$(".pin").tap(function(){
		$(this).parent().find(".bubble-name").toggle("fast");
	});
	
	/************************地图切换***********************/
	$("#simple-map").tap(function(){
		$("#map-sketch").find(".user-friend").hide();
		$("#map-sketch").find(".user-stranger").hide();
		$("#popupPanel").popup("close");
	});
	$("#friend-map").tap(function(){
		$("#map-sketch").find(".user-friend").show();
		$("#map-sketch").find(".user-stranger").hide();
		$("#popupPanel").popup("close");
	});
	$("#stranger-map").tap(function(){
		$("#map-sketch").find(".user-friend").show();
		$("#map-sketch").find(".user-stranger").show();
		$("#popupPanel").popup("close");
	});
	
	/************************定位到我***********************/
	$("#pinpoint-button").tap(function(){
		pinpointCenter("#user-ego");
	});

	/************************遮罩出现***********************/
	var flag_cover=0;
	$(document).on("vmouseover","#slide-right",function(){
		$("#map-panorama-map").css("margin-top",($("#cover").height()-$("#map-panorama-map").height())/2+'px');
		$("#cover").animate({
			right:"0"
		},300);
		$("#slide-left").animate({
			zIndex:"1001"
		},300);
		flag_cover=1;
	});
	
	/************************遮罩消失***********************/
	$(document).on("vmouseover","#slide-left",function(){
		if(flag_cover==1){
			$("#cover").animate({
				right:"-100%"
			},300);
			$("#slide-left").animate({
				zIndex:"10"
			},300);
		}else{
			//此处添加滑动出现面板的函数
		}
		flag_cover=0;
	});
	
});

/**********************************显示足迹**********************************/
function foot_print(){
	var json_footprint=[{"Id":"footprint1","top":"250","left":"1000"},
						{"Id":"footprint2","top":"250","left":"1100"},
						{"Id":"footprint3","top":"250","left":"1200"},
						{"Id":"footprint4","top":"250","left":"1300"}];
	var footIntervalId = setInterval(foot,500);
	var i=0;
	function foot(){
		if(i>=json_footprint.length)
			clearInterval(footIntervalId);
		else{
			$("#footprint-tmpl").tmpl(json_footprint[i]).appendTo("#map-sketch");
			pinpointCenter("#"+json_footprint[i].Id+"");
			i++;
		}
	}
}

/**********************************消失足迹**********************************/
function foot_print_hide(){
	$(".footprint").remove();
}

/********************************四个按钮出现********************************/
function button4_show(){
	$("#pub-bar-status").animate({
		bottom:"140px",
		right:"10px"
	},300);
	$("#pub-bar-camera").animate({
		bottom:"120px",
		right:"74px"
	},300);
	$("#pub-bar-gallery").animate({
		bottom:"74px",
		right:"120px"
	},300);
	$("#pub-bar-footprint").animate({
		bottom:"10px",
		right:"140px"
	},300);
}

/********************************四个按钮消失********************************/
function button4_hide(){
	$("#pub-bar-status").animate({
		bottom:"12px",
		right:"12px"
	},300);

	$("#pub-bar-camera").animate({
		bottom:"12px",
		right:"12px"
	},300);
	$("#pub-bar-gallery").animate({
		bottom:"12px",
		right:"12px"
	},300);
	$("#pub-bar-footprint").animate({
		bottom:"12px",
		right:"12px"
	},300);

}

/**********************************文字状态**********************************/
var maxLength1 = 140; 
function MaxInput1(form) {
	if (form.message.value.length > maxLength1) 
		form.message.value = form.message.value.substring(0, maxLength1);
	else getE("length1").innerText = form.message.value.length;
}

/*******************************给图片加文字状态******************************/
var maxLength2 = 140;
function MaxInput2(form) {
	if (form.message.value.length > maxLength2) 
		form.message.value = form.message.value.substring(0, maxLength2);
	else getE("length2").innerText = form.message.value.length;
}