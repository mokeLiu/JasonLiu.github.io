//绑定在window对象上的兼容各种浏览器的动画方法window.reAnimFrame();
window.reAnimFrame = (function(){
	return window.requestAnimationFrame ||window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(callback,element){
		return window.setTimeout(callback, 1000 / 60);
	}
})();
window.caAnimFrame = (function(){
	return window.cancelAnimationFrame ||window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(callback,element){
		return window.setTimeout(callback, 1000 / 60);
	}
})();

//定义新函数(传入三个参数:元素,事件类型名,事件执行方法),返回值保存在addHander变量中
function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on" + type,handler);
	}else{
		element["on"+type] = handler;
	}
}

//使趋向于目标值
function lerpDis(aim,now,radio){
	var delta = now - aim;
	return aim + delta * radio;
}

//使趋向于目标角度
function lerpAng(a,b,t){
	var d = b - a;
	if(d > Math.PI) d -= 2*Math.PI;
	if(d < -Math.PI) d += 2*Math.PI;
	return a + d * t;
}

//计算坐标间距离的平方
function calLength2(x1,y1,x2,y2){
	return Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
}

//添加图片
function addPic(num,arr,name){
	for(var i=0;i<num;i++){
		arr[i] = new Image();
		arr[i].src = './images/fish/'+ name + i + '.png';
	}
}window.onbeforeunload = window.onunload = function(){
	
}


//author: meizz 
window.onbeforeunload = function(){ 
	var n = window.event.screenX - window.screenLeft; 
	var b = n > document.documentElement.scrollWidth-20; 
	if(b && window.event.clientY < 0 || window.event.altKey){//浏览器关闭
		window.event.returnValue = "dataStorage(dataName,[myData.blueNum,myData.orangeNum,myData.score]);"; //这里可以放置你想做的操作代码 
	}else{//浏览器刷新
		console.log("是刷新而非关闭"); 
	} 
}