//定义各种画布，绘图环境
var pool,can,cxt;
//定义初始时间，持续时间
var lastTime,durTime;
//canvas的宽高
var canvW,canvH;
//海葵,果实
var ane;
//鱼
var mom;
//大鱼尾巴，眼睛，身体1,身体2图片数组
var bigTailPic = [],bigEyePic = [],bigBody = [];
//灰尘图片
var dustPic = [];
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
	can = pool.getElementById("can");
	cxt = can.getContext("2d");

	canvW = can.width = document.body.offsetWidth;
	pool.style.width = canvW + "px";
	canvH = can.height = document.body.offsetHeight;
	pool.style.height = canvH + "px";

	//添加关于鱼的监听事件
	addHandler(can,move,onMoveDo);

	data = new data();
	data.init();
	circle = new circle();
	circle.init();
	meet = new meet();
	meet.init();

	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom = new momFish();
	mom.init();
	baby = new babyFish();
	baby.init();
	dust = new dust();
	dust.init();

	touchX = canvW * 0.5;
	touchY = canvH * 0.5;

	//图片数组初始化
	addPic(8,bigTailPic,'bigTail');
	addPic(2,bigEyePic,'bigEye');
	addPic(8,bigBodyB,'bigSwimBlue');
	addPic(8,bigBodyO,'bigSwim');

	addPic(2,babyEyePic,'babyEye');
	addPic(1,babyTailPic,'babyTail');
	addPic(20,babyBodyPic,'babyFade');

	addPic(7,dustPic,'dust');
	//开场动画或者界面引导
}

function loop(){

}