//定义各种画布，绘图环境
var pool,can,cxt;
//定义初始时间，持续时间
var lastTime,durTime;
//canvas的宽高
var canvW,canvH;
//海葵,灰尘,鱼
var ane,dust,fish,myData,circle;
//大鱼尾巴，眼睛，身体的图片数组
var tailPic = [],eyePic = [],fishBody = [],dustPic = [];
//鼠标或指控的坐标
var touchX,touchY;
//窗口调整大小的开关
var onOff = false;
//手机获取滑动坐标变化的方法是ontouchmove
//而在电脑上面则是onmousemove
var move = ('ontouchmove' in document)?'touchmove':'mousemove';

var isPc = (function browserRedirect() {  
                var sUserAgent = navigator.userAgent.toLowerCase();  
                var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";  
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
                var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
                var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
                var bIsAndroid = sUserAgent.match(/android/i) == "android";  
                var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
                var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";  
                if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {  
                    return false;//移动地址  
                } else {  
                    return true;//PC地址  
                }  
            })();

window.onload = fishPool;

function fishPool(){
	init();

	lastTime = Date.now();
	durTime = 0;

	loop();
}

function init(){
	pool = document.getElementById("pool");
	can = document.getElementById("can");
	cxt = can.getContext("2d");

	canvW = can.width = 1530;
	canvH = can.height = pool.offsetHeight;

	//添加关于鱼的监听事件
	addHandler(can,move,onMoveDo);

	fish = new myFish();
	fish.init();
	ane = new aneObj();
	ane.init();
	dust = new getDust();
	dust.init();
	fruit = new fruitObj();
	fruit.init();
	circle = new getCircle();
	circle.init();
	myData = new data();
	myData.init();

	touchX = canvW * 0.5;
	touchY = canvH * 0.5;

	//图片数组初始化
	addPic(7,dustPic,'dust');
	addPic(8,tailPic,'tail');
	addPic(2,eyePic,'eye');
	addPic(1,fishBody,'fishBody');
}

function loop(){
	window.reAnimFrame(loop);
	var now = Date.now();
	durTime = now - lastTime;
	lastTime = now;
	durTime = durTime>40?40:durTime;
 

	cxt.clearRect(0,0,canvW,canvH);
	//在其它画布绘制时，清空之前的画布

	ane.draw();
	dust.draw();
	fruitMonitor();
	fruit.draw();
	fish.draw();
	myData.draw();
	circle.draw();
	
	window.onresize = onResizeDo;
	
	testHitFruit();
}

function onMoveDo(e){
	var ev = ('ontouchmove' in document) ? e.touches[0] : e;
	touchX = ev.pageX;
	touchY = ev.pageY-50;
}

function onResizeDo(){
	if(!onOff && document.body.offsetWidth>=550){
		onOff = true;
		fishPool();
	}
	if(document.body.offsetHeight!==canvH){
		can.height = canvH = document.body.offsetHeight;
		ane.init();
	}
}