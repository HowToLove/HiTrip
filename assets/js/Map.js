/*var json=[{"IdName":"hgndcb","Name":"灰姑娘的城堡","Top":"885","Left":"1125"},
		  {"IdName":"mfqyzt","Name":"魔法奇缘之塔","Top":"462","Left":"479"},
		  {"IdName":"zygc","Name":"自由广场","Top":"975","Left":"555"},
		  {"IdName":"hxsj","Name":"幻想世界","Top":"375","Left":"1571"},
		  {"IdName":"mrsj","Name":"明日世界","Top":"1102","Left":"1930"},
		  {"IdName":"txsj","Name":"探险世界","Top":"1500","Left":"65"},
		  {"IdName":"mgxzdj","Name":"美国小镇大街","Top":"1901","Left":"1123"},
		  {"IdName":"yzfc","Name":"宇宙飞船","Top":"1382","Left":"2022"},
		  {"IdName":"gwgs","Name":"怪物公司","Top":"1436","Left":"1735"},
		  {"IdName":"fkch","Name":"疯狂茶会","Top":"675","Left":"1735"}];*/
		  
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
	setstyle();
	/************************设置地图切换按钮位置***********************/
	//getE("switch-button").style.top=(parseInt(document.body.clientHeight+0)-103)/2+'px';

	/************************状态发布栏***********************/
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
	$("#pinpoint-button").tap(function(){
		pinpointCenter("#user-ego");
		jump_big("user-ego");
		jump_small("user-ego-small");
		msg_show();
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
		//init_para();
		//anti_mapping(getE("map-sketch").style.top,getE("map-sketch").style.left)
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
	
	/************************遮罩消失***********************/
	$(document).on("vmouseover","#slide-left",function(){
		if(flag_cover==1){
			$("#cover").animate({
				right:"-100%"
			},300);
			$("#slide-left").css("z-index","10");
		}else{
			//此处添加滑动出现面板的函数

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

/**********************************地图拖拽**********************************/
/*var isdrag=false;
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
		else if(parseInt(dobj.style.top+0) < (h-2487-43)){//向上拖
			dobj.style.top=''+(h-2487-43)+'px';
		}
		
		dobj.style.left = tx + e.clientX - x +'px';
		if(parseInt(dobj.style.left+0)>0){//向右拖
			dobj.style.left = '0px';
		}
		else if(parseInt(dobj.style.left+0)<(w-2225)){//向左拖
			dobj.style.left=''+(w-2225)+'px';
		}
		init_para();
		anti_mapping(parseInt(dobj.style.top+0),parseInt(dobj.style.left+0))
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
document.onmouseup=new Function("isdrag=false");*/

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
		/*else if(fobj.className=="select-box"){
			*********************************框跟随鼠标*******************************
			isdragsmall=true;
			var box=getE("select-box");
			//var bx=parseInt(box.style.left+0);
			//var by=parseInt(box.style.top+0);
			
			$("#select-box").on("vmousemove",function(e){
				if(isdragsmall){
					//var mouseH = e.clientY - down_y;
					//var mouseW = e.clientX - down_x;
					var boxX=e.clientX;
					var boxY=e.clientY;
					
					box.style.top=boxY-box.offsetHeight/2-43+'px';
					box.style.left=boxX-box.offsetWidth/2+'px';
					//box.style.top=e.clientY+'px';
					//box.style.left=e.clientX+'px';
					mapping(boxY,boxX);
				}
			});
			$("#select-box").on("vmouseup",function(e){
				isdragsmall=false;
				
				$("#cover").animate({
					right:"-100%"
				},300);
				$("#slide-left").animate({
					zIndex:"10"
				},300);
			});
		}*/
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

/*var json=[{"IdName":"hgndcb","Name":"灰姑娘的城堡","Top":"1180","Left":"1500"},
		  {"IdName":"mfqyzt","Top":"616","Left":"639"},
		  {"IdName":"zygc","Top":"1300","Left":"740"},
		  {"IdName":"hxsj","Top":"500","Left":"2095"},
		  {"IdName":"mrsj","Top":"1469","Left":"2573"},
		  {"IdName":"txsj","Top":"2000","Left":"87"},
		  {"IdName":"mgxzdj","Top":"2535","Left":"1497"},
		  {"IdName":"smjs","Top":"2535","Left":"297"},
		  {"IdName":"yzfc","Top":"1843","Left":"2696"},
		  {"IdName":"gwgs","Top":"1914","Left":"2313"},
		  {"IdName":"fkch","Top":"900","Left":"2313"},];*/
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
	/*
	for(var i=0;i<json.length;i++){
		if(Math.sqrt(Math.pow((top-json[i].Top),2)-Math.pow((left-json[i].Left),2))<200){
			seal(json[i]);
		}
	}
	*/
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



/**********************************显示足迹**********************************/
function foot_print(){
	var json_footprint=[{"Id":"footprint1","top":"2994","left":"1514"},
						{"Id":"footprint2","top":"2915","left":"1614"},
						{"Id":"footprint3","top":"2742","left":"1497"},
						{"Id":"footprint4","top":"1860","left":"1497"},
						{"Id":"footprint5","top":"1738","left":"1643"},
						{"Id":"footprint6","top":"1771","left":"1926"},
						{"Id":"footprint7","top":"1812","left":"2241"},
						{"Id":"footprint8","top":"1996","left":"2500"},
						{"Id":"footprint9","top":"2063","left":"2702"},
						{"Id":"footprint10","top":"1875","left":"2910"},
						{"Id":"footprint11","top":"1640","left":"2872"},
						{"Id":"footprint12","top":"1488","left":"2557"},
						{"Id":"footprint13","top":"1247","left":"2400"},
						{"Id":"footprint14","top":"962","left":"2326"},
						{"Id":"footprint15","top":"791","left":"2207"},
						{"Id":"footprint16","top":"732","left":"2053"},
						{"Id":"footprint17","top":"700","left":"1897"},
						{"Id":"footprint18","top":"627","left":"1970"},
						{"Id":"footprint19","top":"585","left":"1644"},
						{"Id":"footprint20","top":"659","left":"1244"},
						{"Id":"footprint21","top":"636","left":"1117"},
						{"Id":"footprint22","top":"664","left":"931"},
						{"Id":"footprint23","top":"711","left":"699"},
						{"Id":"footprint24","top":"735","left":"666"},
						{"Id":"footprint25","top":"804","left":"633"},
						{"Id":"footprint26","top":"895","left":"705"},
						{"Id":"footprint27","top":"982","left":"724"},
						{"Id":"footprint28","top":"1122","left":"687"},
						{"Id":"footprint29","top":"1299","left":"684"},
						{"Id":"footprint30","top":"1408","left":"639"},
						{"Id":"footprint31","top":"1482","left":"550"},
						{"Id":"footprint32","top":"1564","left":"315"},
						{"Id":"footprint33","top":"1650","left":"160"},
						{"Id":"footprint34","top":"1800","left":"149"},
						{"Id":"footprint35","top":"1917","left":"141"},
						{"Id":"footprint36","top":"1900","left":"205"},
						{"Id":"footprint37","top":"2055","left":"228"},
						{"Id":"footprint38","top":"2162","left":"248"},
						{"Id":"footprint39","top":"2226","left":"192"},
						{"Id":"footprint40","top":"2357","left":"220"},
						{"Id":"footprint41","top":"2382","left":"110"},
						{"Id":"footprint42","top":"2487","left":"75"},
						{"Id":"footprint43","top":"2575","left":"174"},
						{"Id":"footprint44","top":"2565","left":"285"},
						{"Id":"footprint45","top":"2571","left":"101"},
						{"Id":"footprint46","top":"2429","left":"77"},
						{"Id":"footprint47","top":"2358","left":"210"},
						{"Id":"footprint48","top":"2262","left":"344"},
						{"Id":"footprint49","top":"2171","left":"398"},
						{"Id":"footprint50","top":"2101","left":"384"},
						{"Id":"footprint51","top":"2027","left":"459"},
						{"Id":"footprint52","top":"1899","left":"554"},
						{"Id":"footprint53","top":"1862","left":"598"},
						{"Id":"footprint54","top":"1873","left":"673"},
						{"Id":"footprint55","top":"1896","left":"715"},
						{"Id":"footprint56","top":"1914","left":"762"},
						{"Id":"footprint57","top":"1920","left":"859"},
						{"Id":"footprint58","top":"1901","left":"924"},
						{"Id":"footprint59","top":"1872","left":"982"},
						{"Id":"footprint60","top":"1846","left":"1044"},
						{"Id":"footprint61","top":"1820","left":"1111"},
						{"Id":"footprint62","top":"1794","left":"1156"},
						{"Id":"footprint63","top":"1772","left":"1213"},
						{"Id":"footprint64","top":"1756","left":"1281"},
						{"Id":"footprint65","top":"1758","left":"1335"},
						{"Id":"footprint66","top":"1686","left":"1351"},
						{"Id":"footprint67","top":"1629","left":"1369"},
						{"Id":"footprint68","top":"1580","left":"1411"},
						{"Id":"footprint69","top":"1564","left":"1441"},
						{"Id":"footprint70","top":"1540","left":"1490"},
						{"Id":"footprint71","top":"1446","left":"1490"},
						{"Id":"footprint72","top":"1338","left":"1490"},
						{"Id":"footprint73","top":"1650","left":"1490"},
						{"Id":"footprint74","top":"1669","left":"1463"},
						{"Id":"footprint75","top":"1695","left":"1452"},
						{"Id":"footprint76","top":"1746","left":"1483"},
						{"Id":"footprint77","top":"1778","left":"1495"}];
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
