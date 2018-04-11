//������ֻ�������ͼ����
var pool,can,cxt;
//�����ʼʱ�䣬����ʱ��
var lastTime,durTime;
//canvas�Ŀ��
var canvW,canvH;
//����,��ʵ
var ane;
//��
var mom;
//����β�ͣ��۾�������1,����2ͼƬ����
var bigTailPic = [],bigEyePic = [],bigBody = [];
//�ҳ�ͼƬ
var dustPic = [];
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
	can = pool.getElementById("can");
	cxt = can.getContext("2d");

	canvW = can.width = document.body.offsetWidth;
	pool.style.width = canvW + "px";
	canvH = can.height = document.body.offsetHeight;
	pool.style.height = canvH + "px";

	//��ӹ�����ļ����¼�
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

	//ͼƬ�����ʼ��
	addPic(8,bigTailPic,'bigTail');
	addPic(2,bigEyePic,'bigEye');
	addPic(8,bigBodyB,'bigSwimBlue');
	addPic(8,bigBodyO,'bigSwim');

	addPic(2,babyEyePic,'babyEye');
	addPic(1,babyTailPic,'babyTail');
	addPic(20,babyBodyPic,'babyFade');

	addPic(7,dustPic,'dust');
	//�����������߽�������
}

function loop(){

}