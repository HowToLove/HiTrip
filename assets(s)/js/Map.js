/**********************************窗口重绘**********************************/
window.onresize=resize;
function resize(){
	setstyle();
	var imgH=$("#map-panorama-map").height();
	var imgW=$("#map-panorama-map").width();
	var coverH=$("#cover").height();
	var coverW=$("#cover").width();
	var scale=imgH/2487;
	var windowH=parseInt(document.body.clientHeight+0);
	var windowW=parseInt(document.body.clientWidth+0);
	//alert(coverH+"  "+imgH)
	$("#map-panorama-map").css("margin-top",(coverH-imgH)/2+'px');
	//$("#map-panorama-map").css("margin-left",(coverW-imgW)/2+'px');
	getE("minilayer").style.height=windowH-43+'px';
	getE("minilayer").style.width=windowW+'px';
	
	getE("mapholder").style.height=windowH-43+'px';
	getE("mapholder").style.width=windowW+'px';
	getE("user-ego-small").style.top=((parseInt(getE("user-ego").style.top+0))*scale+(coverH-imgH)/2)+'px';
	getE("user-ego-small").style.left=((parseInt(getE("user-ego").style.left+0))*scale+(coverW-imgW)/2)+'px';

	//$(".user-ego-small").css("top",(-parseInt(getE($(this).attr("id")).style.top+0))*scale+(coverH-imgH)/2);
	getE("select-box").style.top=((-parseInt(getE("map-sketch").style.top+0)+windowH/2)*scale+(coverH-imgH)/2-30)+'px';
	getE("select-box").style.left=((-parseInt(getE("map-sketch").style.left+0)+windowW/2)*scale+(coverW-imgW)/2-30)+'px';

}
function getE(ele){
	return document.getElementById(ele);
}
/************************************READY***********************************/
$(document).ready(function(){
	var resize_flag=1;
	var windowH=parseInt(document.body.clientHeight+0);
	var windowW=parseInt(document.body.clientWidth+0);
	getE("minilayer").style.height=windowH-43+'px';
	getE("minilayer").style.width=windowW+'px';
	
	getE("mapholder").style.height=windowH-43+'px';
	getE("mapholder").style.width=windowW+'px';
	/************************状态发布栏***********************/
	var flag_button_right=0;
	$("#button-right").tap(function(){
		seal("hgndcb");
		if(flag_button_right==0){
			button_right_show();
			flag_button_right=1;
		}else{
			button_right_hide();
			flag_button_right=0;
		}
	});
	var flag_button_left=0;
	$("#button-left").tap(function(){
		//seal("hgndcb");
		if(flag_button_left==0){
			button_left_show();
			flag_button_left=1;
		}else{
			button_left_hide();
			flag_button_left=0;
		}
	});
	$("#right-status").tap(function(){
		button_right_hide();
		flag_button_right=0;
	});
	$("#right-camera").tap(function(){
		button_right_hide();
		flag_button_right=0;
	});
	$("#right-gallery").tap(function(){
		button_right_hide();
		flag_button_right=0;
	});
	$("#left-pinpoint").tap(function(){
		button_left_hide();
		flag_button_left=0;
	});
	$("#left-map").tap(function(){
		button_left_hide();
		flag_button_left=0;
	});

	
	/************************足迹**********************/
	var flag_footprint=0;
	$("#left-footprint").tap(function(){
		if(!flag_footprint){
			foot_print();
			flag_footprint=1;
		}else{
			foot_print_hide();
			flag_footprint=0;
			button_left_hide();
			flag_button=0;		
		}
	});
	
	/************************景点名字***********************/
	$(".bubble-name").hide();
	$(".pin").tap(function(){
		$(this).parent().find(".bubble-name").toggle();
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
	$("#left-pinpoint").tap(function(){
		pinpointCenter("#user-ego");
		msg_show();
		jump_big("user-ego");
		jump_small("user-ego-small")
	});

	/************************遮罩出现***********************/
	var flag_cover=0;
	$("#msg-img").tap(function(){
		msg_hide();
		var imgH=$("#map-panorama-map").height();
		var imgW=$("#map-panorama-map").width();
		var coverH=$("#cover").height();
		var coverW=$("#cover").width();
		var scale=imgH/2487;
		var windowH=parseInt(document.body.clientHeight+0);
		var windowW=parseInt(document.body.clientWidth+0);
		if(resize_flag){
			$("#map-panorama-map").css("margin-top",(coverH-imgH)/2+'px');
			//alert("on")
			resize_flag=0
		}
		getE("select-box").style.top=((-parseInt(getE("map-sketch").style.top+0)+windowH/2)*scale+(coverH-imgH)/2-30)+'px';
		getE("select-box").style.left=((-parseInt(getE("map-sketch").style.left+0)+windowW/2)*scale+(coverW-imgW)/2-30)+'px';
		getE("user-ego-small").style.top=((parseInt(getE("user-ego").style.top+0))*scale+(coverH-imgH)/2)+'px';
		getE("user-ego-small").style.left=((parseInt(getE("user-ego").style.left+0))*scale+(coverW-imgW)/2)+'px';
		$("#cover").animate({
			right:"0"
		},300);
		$("#slide-left").css("z-index","1001");
		flag_cover=1;
	});
	$(document).on("vmouseover","#slide-right",function(){
		msg_hide();
		var imgH=$("#map-panorama-map").height();
		var imgW=$("#map-panorama-map").width();
		var coverH=$("#cover").height();
		var coverW=$("#cover").width();
		var scale=imgH/2487;
		var windowH=parseInt(document.body.clientHeight+0);
		var windowW=parseInt(document.body.clientWidth+0);
		if(resize_flag){
			$("#map-panorama-map").css("margin-top",(coverH-imgH)/2+'px');
			resize_flag=0
		}
		getE("select-box").style.top=((-parseInt(getE("map-sketch").style.top+0)+windowH/2)*scale+(coverH-imgH)/2-30)+'px';
		getE("select-box").style.left=((-parseInt(getE("map-sketch").style.left+0)+windowW/2)*scale+(coverW-imgW)/2-30)+'px';
		getE("user-ego-small").style.top=((parseInt(getE("user-ego").style.top+0))*scale+(coverH-imgH)/2)+'px';
		getE("user-ego-small").style.left=((parseInt(getE("user-ego").style.left+0))*scale+(coverW-imgW)/2)+'px';
		$("#cover").animate({
			right:"0"
		},300);
		$("#slide-left").css("z-index","1001");
		flag_cover=1;
	});
	
	/************************遮罩消失***********************/
	$(document).on("vmouseover","#slide-left",function(){
		if(flag_cover==1){
			$("#cover").animate({
				right:"-100%"
			},300);
			$("#slide-left").css("z-index","10");
		}else{
			$( "#panel1" ).panel( "open" );
		}
		flag_cover=0;
	});
	
	/********************点击缩略图遮罩消失*******************/
	$("#map-panorama-map").tap(function(e){
		var box=getE("select-box");
		var boxX=e.clientX;
		var boxY=e.clientY;
		
		box.style.top=boxY-box.offsetHeight/2-43+'px';
		box.style.left=boxX-box.offsetWidth/2+'px';
		
		mapping(boxY,boxX);
		
		$("#cover").animate({
			right:"-100%"
		},300);
		$("#slide-left").animate({
			zIndex:"10"
		},300);
	});
});

/********************************按钮出现********************************/
function button_left_show(){
	$("#left-pinpoint").animate({
		bottom:"115px"
	},300);
	$("#left-footprint").animate({
		bottom:"90px",
		left:"90px"
	},300);
	$("#left-map").animate({
		left:"115px"
	},300);
}
function button_right_show(){
	$("#right-status").animate({
		bottom:"115px"
	},300);
	$("#right-camera").animate({
		bottom:"90px",
		right:"90px"
	},300);
	$("#right-gallery").animate({
		right:"115px"
	},300);
}
/********************************按钮消失********************************/
function button_left_hide(){
	$("#left-pinpoint").animate({
		bottom:"18px"
	},300);
	$("#left-footprint").animate({
		bottom:"18px",
		left:"18px"
	},300);
	$("#left-map").animate({
		left:"18px"
	},300);
}
function button_right_hide(){
	$("#right-status").animate({
		bottom:"18px"
	},300);
	$("#right-camera").animate({
		bottom:"18px",
		right:"18px"
	},300);
	$("#right-gallery").animate({
		right:"18px"
	},300);
}

/**********************************地图拖拽**********************************/
$(function(){
	var isdragbig=false;
	var isdragsmall=false;
	var w=document.body.clientWidth;
	var h=document.body.clientHeight;
	$(document).on("vmousedown",function(e){
		var down_x = e.clientX ;
		var down_y = e.clientY ;

		var fobj = e.target ;			

		while (fobj.tagName != "HTML"  &&  fobj.className != "map-sketch" && fobj.className!="select-box"){
			fobj = fobj.parentNode ;
		}
		if (fobj.className=="map-sketch"){
			isdragbig = true;
			var dobj = fobj;
			var tx = parseInt(dobj.style.left+0);
			var ty = parseInt(dobj.style.top+0);
			$("#map-sketch").on("vmousemove",function(e){
				if (isdragbig){	
					var top = ty + e.clientY - down_y;
					var left = tx + e.clientX - down_x;
					map_sketch_limit(top,left);
					return false;
				}
			});
			$("#map-sketch").on("vmouseup",function(e){
				isdragbig=false;
			});
			return false;
		}
	});

});
/***********************************映射函数*********************************/
function mapping(mouseH,mouseW){
	var imgH=$("#map-panorama-map").height();
	var imgW=$("#map-panorama-map").width();
	var coverH=$("#cover").height();
	var coverW=$("#cover").width();
	var scale=imgH/2487;
	var windowH=parseInt(document.body.clientHeight+0);
	var windowW=parseInt(document.body.clientWidth+0);
	var maptop=-((mouseH-38-(coverH-imgH)/2)/scale-windowH/2);
	var mapleft=-((mouseW-(coverW-imgW)/2)/scale-windowW/2);
	map_sketch_limit(maptop,mapleft);
}
/**********************************中心定位**********************************/
function pinpointCenter(id){
	var top=-(parseInt($(id).css("top")+0))+(parseInt(document.body.clientHeight+0))/2-50;
	var left=-(parseInt($(id).css("left")+0))+(parseInt(document.body.clientWidth+0))/2-38;
	map_sketch_limit(top,left);
}

/*******************************地图移动限制*********************************/
function map_sketch_limit(top,left){
	var map_sketch=getE("map-sketch");
	var clientH=parseInt(document.body.clientHeight+0);
	var clientW=parseInt(document.body.clientWidth+0);
	
	if(top>0)
		map_sketch.style.top="0px";
	else if(top<(clientH-2487-43))
		map_sketch.style.top=clientH-2487-43+"px";
	else 
		map_sketch.style.top=top+"px";
	
	if(left>0)
		map_sketch.style.left="0px";
	else if(left<(clientW-2225))
		map_sketch.style.left=clientW-2225+"px";
	else 
		map_sketch.style.left=left+"px";
}




/**********************************地理定位**********************************/
function check(lat,lon){
	if(lastLongitude==lon)
	{
	return false;
	}
	else
	return true;
}
function sendLocation(){
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
	showMyPosition(900,1600);
	//init_para();

	//var lat=31.885700300;
}
/*function showError(error){
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
  }*/


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
function showMyPosition(top,left){
	/*
	var ad=524;
	var an=Distance(31.8948,118.8090,lat,lon);
	var dn=Distance(31.8948,118.8318,lat,lon);
	var otop=2*triArea(ad,an,dn)/ad;
	var oleft=Math.sqrt(Math.pow(an,2)-Math.pow(otop,2));
	var top=calTop(otop,oleft);
	var left=calLeft(otop,oleft);
	*/
	getE("user-ego").style.top=top+'px';
	getE("user-ego").style.left=left+'px';
	/*var json_spot=[{"IdName":"hgndcb","Name":"灰姑娘的城堡","Top":"885","Left":"1125"},
		  {"IdName":"mfqyzt","Name":"魔法奇缘之塔","Top":"462","Left":"479"},
		  {"IdName":"zygc","Name":"自由广场","Top":"975","Left":"555"},
		  {"IdName":"hxsj","Name":"幻想世界","Top":"375","Left":"1571"},
		  {"IdName":"mrsj","Name":"明日世界","Top":"1102","Left":"1930"},
		  {"IdName":"txsj","Name":"探险世界","Top":"1500","Left":"65"},
		  {"IdName":"mgxzdj","Name":"美国小镇大街","Top":"1901","Left":"1123"},
		  {"IdName":"yzfc","Name":"宇宙飞船","Top":"1382","Left":"2022"},
		  {"IdName":"gwgs","Name":"怪物公司","Top":"1436","Left":"1735"},
		  {"IdName":"fkch","Name":"疯狂茶会","Top":"675","Left":"1735"}];*/
	
	if(Math.sqrt(Math.pow((top-885),2)+Math.pow((left-1125),2))<160){
		seal("hgndcb");
	}
	
}
function showAllPosition(top,left,id){
	/*
	var ad=524;
	var an=Distance(31.8948,118.8090,lat,lon);
	var dn=Distance(31.8948,118.8318,lat,lon);
	var otop=2*triArea(ad,an,dn)/ad;
	var oleft=Math.sqrt(Math.pow(an,2)-Math.pow(otop,2));*/
	//getE(id).style.top=calTop(otop,oleft)+'px';
	//getE(id).style.left=calLeft(otop,oleft)+'px';
	getE(id).style.top=top+'px';
	getE(id).style.left=left+'px';
}

/**********************************景点盖章**********************************/
function setstyle(){
	var hb1,hb2,h1,h2;
	hb1=$("#box").width();
	hb2=$("#box").height();

	var winWidth=document.body.clientWidth;
	var winHeight=document.body.clientHeight;
	h1=winWidth-hb1;
	h1=h1/2;
	h2=winHeight-hb2;
	h2=h2/5;
	h2=h2*2;
	getE('box').style.left=h1+"px";
	getE('box').style.top=h2+"px";
}

function rotateYDIV(){
	var ny=0,rotYINT;
	var y=getE("badge")
	clearInterval(rotYINT)
	rotYINT=setInterval(function(){
		ny=ny+8
		y.style.transform="rotateY(" + ny + "deg)"
		y.style.webkitTransform="rotateY(" + ny + "deg)"
		y.style.OTransform="rotateY(" + ny + "deg)"
		y.style.MozTransform="rotateY(" + ny + "deg)"
		if (ny>=360){
			clearInterval(rotYINT)
			if (ny>=360){ny=0}
		}
	},10)
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
function changeColor(a){
	$("#"+a).find(".pin").empty();
	$("#"+a).find(".pin").append('<img src="img/Marker-GB.png"/>')
}
/***********************盖章总效果**********************/
function seal(id){
	if(count<10){
		animation();
		addBar();
		changeColor(id);
	}
}



/**********************************显示足迹**********************************/
function foot_print(){
	var json_footprint=[{"Id":"footprint1","top":"2246","left":"1136"},
						{"Id":"footprint2","top":"2186","left":"1211"},
						{"Id":"footprint3","top":"2057","left":"1123"},
						{"Id":"footprint4","top":"1395","left":"1123"},
						{"Id":"footprint5","top":"1304","left":"1232"},
						{"Id":"footprint6","top":"1328","left":"1445"},
						{"Id":"footprint7","top":"1359","left":"1681"},
						{"Id":"footprint8","top":"1497","left":"1875"},
						{"Id":"footprint9","top":"1547","left":"2027"},
						{"Id":"footprint10","top":"1406","left":"2183"},
						{"Id":"footprint11","top":"1230","left":"2154"},
						{"Id":"footprint12","top":"1116","left":"1918"},
						{"Id":"footprint13","top":"935","left":"1800"},
						{"Id":"footprint14","top":"722","left":"1745"},
						{"Id":"footprint15","top":"593","left":"1655"},
						{"Id":"footprint16","top":"549","left":"1540"},
						{"Id":"footprint17","top":"525","left":"1423"},
						{"Id":"footprint18","top":"470","left":"1478"},
						{"Id":"footprint19","top":"439","left":"1233"},
						{"Id":"footprint20","top":"494","left":"933"},
						{"Id":"footprint21","top":"477","left":"838"},
						{"Id":"footprint22","top":"498","left":"698"},
						{"Id":"footprint23","top":"533","left":"524"},
						{"Id":"footprint24","top":"551","left":"500"},
						{"Id":"footprint25","top":"603","left":"475"},
						{"Id":"footprint26","top":"671","left":"529"},
						{"Id":"footprint27","top":"737","left":"543"},
						{"Id":"footprint28","top":"842","left":"515"},
						{"Id":"footprint29","top":"974","left":"513"},
						{"Id":"footprint30","top":"1056","left":"479"},
						{"Id":"footprint31","top":"1112","left":"413"},
						{"Id":"footprint32","top":"1173","left":"236"},
						{"Id":"footprint33","top":"1238","left":"120"},
						{"Id":"footprint34","top":"1350","left":"112"},
						{"Id":"footprint35","top":"1438","left":"106"},
						{"Id":"footprint36","top":"1425","left":"154"},
						{"Id":"footprint37","top":"1541","left":"171"},
						{"Id":"footprint38","top":"1622","left":"186"},
						{"Id":"footprint39","top":"1670","left":"144"},
						{"Id":"footprint40","top":"1768","left":"165"},
						{"Id":"footprint41","top":"1787","left":"83"},
						{"Id":"footprint42","top":"1865","left":"56"},
						{"Id":"footprint43","top":"1931","left":"131"},
						{"Id":"footprint44","top":"1924","left":"214"},
						{"Id":"footprint45","top":"1928","left":"76"},
						{"Id":"footprint46","top":"1822","left":"58"},
						{"Id":"footprint47","top":"1769","left":"158"},
						{"Id":"footprint48","top":"1697","left":"258"},
						{"Id":"footprint49","top":"1628","left":"299"},
						{"Id":"footprint50","top":"1576","left":"288"},
						{"Id":"footprint51","top":"1520","left":"344"},
						{"Id":"footprint52","top":"1424","left":"416"},
						{"Id":"footprint53","top":"1397","left":"449"},
						{"Id":"footprint54","top":"1405","left":"505"},
						{"Id":"footprint55","top":"1422","left":"536"},
						{"Id":"footprint56","top":"1436","left":"572"},
						{"Id":"footprint57","top":"1440","left":"644"},
						{"Id":"footprint58","top":"1426","left":"693"},
						{"Id":"footprint59","top":"1404","left":"737"},
						{"Id":"footprint60","top":"1385","left":"783"},
						{"Id":"footprint61","top":"1365","left":"833"},
						{"Id":"footprint62","top":"1346","left":"867"},
						{"Id":"footprint63","top":"1329","left":"910"},
						{"Id":"footprint64","top":"1317","left":"961"},
						{"Id":"footprint65","top":"1319","left":"1001"},
						{"Id":"footprint66","top":"1265","left":"1013"},
						{"Id":"footprint67","top":"1222","left":"1027"},
						{"Id":"footprint68","top":"1185","left":"1058"},
						{"Id":"footprint69","top":"1173","left":"1081"},
						{"Id":"footprint70","top":"1155","left":"1118"},
						{"Id":"footprint71","top":"1085","left":"1118"},
						{"Id":"footprint72","top":"1004","left":"1118"},
						{"Id":"footprint73","top":"1238","left":"1118"},
						{"Id":"footprint74","top":"1252","left":"1097"},
						{"Id":"footprint75","top":"1271","left":"1089"},
						{"Id":"footprint76","top":"1310","left":"1112"},
						{"Id":"footprint77","top":"1334","left":"1121"}];
	var footIntervalId = setInterval(foot,300);
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

/***********************************头像跳动*********************************/
function jump_big(id){
	for(var i=0;i<10;i++){
		$('#'+id).animate({
			top:"-=25"
		},300);
		$('#'+id).animate({
			top:"+=25"
		},300);
	}
}
function jump_small(id){
	for(var i=0;i<10;i++){
		$('#'+id).animate({
			top:"-=10"
		},300);
		$('#'+id).animate({
			top:"+=10"
		},300);
	}
}
/*******************************新消息提醒出现*******************************/
function msg_show(){
	$("#msg-img").animate({
		right:"0"
	},300);
}
/*******************************新消息提醒消失*******************************/
function msg_hide(){
	$("#msg-img").animate({
		right:"-100"
	},300);
}
/**********************************文字状态**********************************/
function MaxInput1(form) {
	if (form.message.value.length > 140) 
		form.message.value = form.message.value.substring(0, 140);
	else getE("length1").innerText = form.message.value.length;
}

/*******************************给图片加文字状态******************************/
function MaxInput2(form) {
	if (form.message.value.length > 140) 
		form.message.value = form.message.value.substring(0, 140);
	else getE("length2").innerText = form.message.value.length;
}
