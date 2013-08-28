//地理定位+景点盖章
function getE(ele){
	return document.getElementById(ele);
}

window.setInterval(function getLocation(){
	if (navigator.geolocation){
		navigator.geolocation.watchPosition(showPosition);
	}
},1000)
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
function showPosition(position){
	showAllPosition(position.coords.latitude,position.coords.longitude,"user-ego");
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
var count=0;
function addBar(){
	count++;
	getE("bar").style.width=count*10+"%";
	getE("count").innerText=count;
}
/*function changeColor(a){
	getE(a).style.backgroundColor="rgba(251, 180,80, 0.9)";
}*/
function seal(id){
	if(count<10){
		animation();
		addBar();
		//changeColor(id);
	}
}
//地图拖拽
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
		else if(parseInt(dobj.style.top+0) < (h-1598)){//向上拖
			dobj.style.top=''+(h-1598)+'px';
		}
		
		dobj.style.left = tx + e.clientX - x +'px';
		if(parseInt(dobj.style.left+0)>0){//向右拖
			dobj.style.left = '0px';
		}
		else if(parseInt(dobj.style.left+0)<(w-2500)){//向左拖
			dobj.style.left=''+(w-2500)+'px';
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
					else if(parseInt(dobj.style.top+0) < (h-1598)){//向上拖
						dobj.style.top=''+(h-1598)+'px';
					}
					
					dobj.style.left = tx + e.clientX - x +'px';
					if(parseInt(dobj.style.left+0)>0){//向右拖
						dobj.style.left = '0px';
					}
					else if(parseInt(dobj.style.left+0)<(w-2500)){//向左拖
						dobj.style.left=''+(w-2500)+'px';
					}
					return false;
				}
			});
			return false;
		}
	});
});


$(document).ready(function(){
	//状态发布栏的隐藏和显示
	$("#pub-bar").hide();
	$(".marker .bubble").hide();
	$("#photo-button").tap(function(){
		$("#pub-bar").fadeToggle("fast");
		seal("lwz");
	});
	
	//地图景点名字显示
	$(".pin").tap(function(){
		$(this).parent().find(".bubble").toggle("slow");
	});
	
	//设置盖章效果
	getE("minilayer").style.height=(parseInt(document.body.clientHeight+0)-43)+'px';
	setstyle();
	
	//地图切换
	$("#simple-map").tap(function(){
		$("#map-sketch").find(".user-friend").hide();
		$("#map-sketch").find(".user-stranger").hide();
	});
	$("#friend-map").tap(function(){
		$("#map-sketch").find(".user-friend").show();
		$("#map-sketch").find(".user-stranger").hide();
	});
	$("#stranger-map").tap(function(){
		$("#map-sketch").find(".user-friend").show();
		$("#map-sketch").find(".user-stranger").show();
	});
});

//文字状态发布
var maxLength = 140; 
function MaxInput(form) {
	if (form.message.value.length > maxLength) 
		form.message.value = form.message.value.substring(0, maxLength);
	else getE("length").innerText = form.message.value.length;
}