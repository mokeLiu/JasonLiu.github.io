//海葵绘制开始
function aneObj(){
	this.x = [];
	this.headX = [];
	this.headY = [];
	this.base = 0;
	this.num = canvW/15;
}
aneObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.x[i] = i*15+Math.random()*18;
		this.headX[i] = 0;
		this.headY[i] = canvH-200+Math.random()*40;[i];
		while(this.x[i] > canvW){
			this.x[i] -= Math.random()*8*i+5;
		}
	}
}
aneObj.prototype.draw = function(){
	cxt.save();
	cxt.globalAlpha = 0.8;
	cxt.strokeStyle = "#591578";
	cxt.lineWidth = 15;
	cxt.lineCap = "round";
	this.base += durTime * 0.001;
	var len = Math.sin(this.base);
	for(var i=0;i<this.num;i++){
		cxt.beginPath();
		cxt.moveTo(this.x[i],canvH);
		this.headX[i] = this.x[i] + this.headY[i] * 0.1 * len;
		cxt.quadraticCurveTo( this.x[i], this.headY[i] + 50, this.headX[i], this.headY[i] );
		cxt.stroke();
		cxt.closePath();
	}
	cxt.restore();
}
//海葵绘制结束
//鱼的绘制开始
function myFish(){
	this.x;
	this.y;
	this.angle;
 
	this.tailPicTimer = 0;
	this.tailPicNum = 0;
 
	this.eyePicTimer = 0;
	this.eyePicNum = 0;
	this.eyePicInterval = 1000;
}
myFish.prototype.init = function(){
	this.x = canvW * 0.5;
	this.y = canvH * 0.5;
	this.angle = 0;
}
myFish.prototype.draw = function(){
	this.x = lerpDis(touchX,this.x,0.92);
	this.x = Math.min(Math.max(this.x,20),canvW-20);
	this.y = lerpDis(touchY,this.y,0.92);
	this.y = Math.min(Math.max(this.y,20),canvH-20);
	var deltaX = touchX - this.x;
	var deltaY = touchY - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;
	this.angle = lerpAng(beta,this.angle,0.6);

	this.tailPicTimer += durTime;
	if(this.tailPicTimer > 100){
		this.tailPicNum = ( this.tailPicNum + 1 ) % 8;
		this.tailPicTimer %= 100;
	}
	this.eyePicTimer += durTime;
	if(this.eyePicTimer > this.eyePicInterval){
		this.eyePicNum = ( this.eyePicNum + 1 ) % 2;
		this.eyePicTimer %= this.eyePicInterval;
		if(!this.eyePicNum){
			this.eyePicInterval = Math.random()*1500 + 1000;
		}else{
			this.eyePicInterval = 200;
		}
	}
 
	cxt.save();
 
	cxt.translate(this.x,this.y);
	cxt.rotate(this.angle);
 
	var oPicTail = tailPic[this.tailPicNum];
	cxt.drawImage( oPicTail,-oPicTail.width*0.5+29,-oPicTail.height*0.5 );

	var oPicBody = fishBody[0];
	cxt.drawImage(oPicBody,-oPicBody.width*0.5,-oPicBody.height*0.5);
 
	var oPicEye = eyePic[this.eyePicNum];
	cxt.drawImage( oPicEye,-oPicEye.width*0.5,-oPicEye.height*0.5 );
 
	cxt.restore();
}
//鱼的绘制结束
//灰尘绘制开始
function getDust(){
	this.x = [];
	this.y = [];
	this.type = [];
	this.range = [];
 
	this.base;
}
getDust.prototype.num = 100;
getDust.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.x[i] = Math.random()*canvW;
		this.y[i] = Math.random()*canvH*0.8;
		this.type[i] = Math.floor( Math.random()*7 );
		this.range[i] = Math.random()*10 + 15;
	}
	this.base = 0;
}
getDust.prototype.draw = function(){
	this.base += durTime * 0.001;
	for(var i=0;i<this.num;i++){
		var moveX = Math.sin(this.base)*this.range[i];
		cxt.save();
		cxt.drawImage(dustPic[this.type[i]],this.x[i] + moveX,this.y[i]);
		cxt.restore();
	}
}
//灰尘绘制结束
//果实绘制开始
function fruitObj(){
	this.alive = [];//boolֵ
	this.kindA = new Image();
	this.kindB = new Image();
	this.aneId = [];
	this.x = [];
	this.y = [];
	this.sp = [];
	this.speed = [];
	this.fruitType = [];
	this.r = [];
}
fruitObj.prototype.num = 100;
fruitObj.prototype.limitNum = 20;
fruitObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.aneId[i] = 0;
		this.x[i] = 0;
		this.y[i] = 0;
		this.sp[i] = Math.random() * 0.04 + 0.06;
		this.fruitType[i] = "";
		this.r[i] = 0;
	}
	this.kindA.src = './images/fish/blue.png';
	this.kindB.src = './images/fish/fruit.png';
}
fruitObj.prototype.draw = function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			var pic = this.fruitType[i] == "A" ? this.kindA : this.kindB;
			if(this.speed[i] < 16){
				this.x[i] = ane.headX[this.aneId[i]];
				this.y[i] = ane.headY[this.aneId[i]];
				this.speed[i] += this.sp[i] * durTime * 0.5;
			}else{
				this.y[i] -= this.sp[i] * durTime;
			}
			cxt.drawImage( pic, this.x[i]-this.speed[i]/2, this.y[i]-this.speed[i]/2, this.speed[i], this.speed[i] );
			if(this.y[i] < 5){
				this.alive[i] = false;
			}
		}
	}
}
fruitObj.prototype.born = function(i){
	this.aneId[i] = Math.floor( Math.random()*ane.num );
	this.speed[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran>0.8){
		this.fruitType[i] = "A";
	}else{
		this.fruitType[i] = "B";
	}
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
function fruitMonitor(){
	var num = 0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num < fruit.limitNum){
		sendFruit();
		return;
	}
}
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
//果实绘制结束
//碰撞检测绘制开始
function testHitFruit(){
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			var l = calLength2(fruit.x[i],fruit.y[i],fish.x,fish.y);
			if(l < 900){
				fruit.dead(i);
				circle.born( fruit.x[i], fruit.y[i] );
				if(fruit.fruitType[i] == "A"){
					myData.blueNum ++;
					myData.allBlue ++;
				}else{
					myData.orangeNum ++;
					myData.allOrange ++;
				}
				myData.addScore();
			}
		}
	}
}
//碰撞检测绘制结束
//碰撞圈绘制开始
function getCircle(){
	this.x = [];
	this.y = [];
	this.r = [];
	this.alive = [];
}
getCircle.prototype.num = 10;
getCircle.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
getCircle.prototype.draw = function(){
	cxt.save();
	cxt.lineWidth = 3;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i] += durTime * 0.05;
			if(this.r[i] > 40){
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 40;
			cxt.strokeStyle = "rgba( 255, 255, 255, " + alpha + ")";
			cxt.beginPath();
			cxt.arc( this.x[i], this.y[i], this.r[i], 0, 2*Math.PI );
			cxt.closePath();
			cxt.stroke();
		}
	}
	cxt.restore();
}
getCircle.prototype.born = function( x, y ){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] = 10;
			return;
		}
	}
}
//碰撞圈绘制结束
//数据绘制开始
function data(){
	this.orangeNum;
	this.blueNum;
	this.score;
	this.alpha;
	this.creazyMode;
}
data.prototype.init = function(){
	this.orangeNum = 0;
	this.blueNum = 0;
	this.score = 0;
}
data.prototype.draw = function(){
	cxt.save();
 
	cxt.fillStyle = "#fff";
	cxt.font = "20px bold";
	cxt.fillText( " score: "+this.score, 8, 25 );
	cxt.drawImage( fruit.kindA,15, 50 );
	cxt.drawImage( fruit.kindB,14, 82 );
	cxt.fillText( this.blueNum, 50, 68 );
	cxt.fillText( this.orangeNum, 50, 100 );
 
	cxt.restore();
}
data.prototype.addScore = function(){
	this.score = ( this.orangeNum + this.blueNum * 2 ) * 10;
}
//数据绘制结束