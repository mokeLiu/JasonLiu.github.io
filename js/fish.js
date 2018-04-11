//定义各种画布，绘图环境
var pool,can,cxt;
//定义初始时间，持续时间
var lastTime,durTime;
//canvas的宽高
var canvW,canvH;
//海葵,灰尘,鱼
var ane,dust,fish,data;
//大鱼尾巴，眼睛，身体的图片数组
var tailPic = [],eyePic = [],fishBody = [];
//鼠标或指控的坐标
var touchX,touchY;
//手机获取滑动坐标变化的方法是ontouchmove
//而在电脑上面则是onmousemove
var move = ('ontouchmove' in document)?'touchmove':'mousemove';

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

	canvW = can.width = pool.offsetWidth;
	canvH = can.height = pool.offsetHeight;

	//添加关于鱼的监听事件
	addHandler(can,move,onMoveDo);

	fish = new myFish();
	fish.init();
	ane = new aneObj();
	ane.init();
	dust = new dust();
	dust.init();
	fruit = new fruitObj();
	fruit.init();
	circle = new circle();
	circle.init();
	data = new data();
	data.init();

	touchX = canvW * 0.5;
	touchY = canvH * 0.5;

	//图片数组初始化
	addPic(7,dust,'dust');
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
	data.draw();

	window.onresize = resizeDo;
	
	testHitFruit();
}

function onMoveDo(e){
	var ev = ('ontouchmove' in document) ? e.touches[0] : e;
	touchX = ev.pageX;
	touchY = ev.pageY-50;
}

function resizeDo(){
	canvW = can.width = pool.offsetWidth;
	canvH = can.height = pool.offsetHeight;
	ane = new aneObj();
	ane.init();
}