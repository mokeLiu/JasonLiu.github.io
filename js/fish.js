//������ֻ�������ͼ����
var pool,can,cxt;
//�����ʼʱ�䣬����ʱ��
var lastTime,durTime;
//canvas�Ŀ��
var canvW,canvH;
//����,�ҳ�,��
var ane,dust,fish,data;
//����β�ͣ��۾��������ͼƬ����
var tailPic = [],eyePic = [],fishBody = [];
//����ָ�ص�����
var touchX,touchY;
//�ֻ���ȡ��������仯�ķ�����ontouchmove
//���ڵ�����������onmousemove
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

	//��ӹ�����ļ����¼�
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

	//ͼƬ�����ʼ��
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
	//��������������ʱ�����֮ǰ�Ļ���

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