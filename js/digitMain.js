//定义容器，画布，绘图环境
var oCon,canv,cxt;
//定义数字图形数组，特效数字数组
var digit,aBalls = [];
//定义获取自适应宽高
var canvW,canvH;
//定义整体边距，小圆半径，间距
var mL,mT,r,dis;
//前一时间，当前时间
var curTime,preTime;

window.onload = function(){
 var oP = document.getElementsByTagName('footer')[0];
 var canv = oP.getElementsByTagName('canvas')[0];
 if(canv){
  run(canv);
 }else{
  
 }
}
//执行
function run(canv){
 init(canv);
 showLoop();
}
//初始化
function init(canv){
 cxt = canv.getContext('2d');
 
 canvW = canv.width = 600;
 canvH = canv.height = 200;
 
 mL = 45, mT = 50;
 r = 4, dis = 1;
 preTime = getTime();
}
//显示循环
function showLoop(){
 requestAnimationFrame(showLoop);
 update(70,20);
}
//数字时钟的绘制
function draw(arr,disNum,disDot){
 cxt.clearRect(0,0,canvW,canvH);
 
 drawDigit(mL,mT,Math.floor(arr[0]/10),cxt);
 drawDigit(mL+disNum,mT,arr[0]%10,cxt);
 drawDigit(mL+disNum*2,mT,10,cxt);
 drawDigit(mL+disNum*2+disDot*2,mT,Math.floor(arr[1]/10),cxt);
 drawDigit(mL+disNum*3+disDot*2,mT,arr[1]%10,cxt);
 drawDigit(mL+disNum*4+disDot*2,mT,10,cxt);
 drawDigit(mL+disNum*4+disDot*4,mT,Math.floor(arr[2]/10),cxt);
 drawDigit(mL+disNum*5+disDot*4,mT,arr[2]%10,cxt);
 
 for(var i=0;i<aBalls.length;i++){
  cxt.save();
  
  cxt.beginPath();
  cxt.fillStyle = aBalls[i].color;
  cxt.arc(aBalls[i].x,aBalls[i].y,r,0,2*Math.PI);
  cxt.closePath();
  cxt.fill();
  
  cxt.restore();
 }
}
//单个数字的绘制
function drawDigit(x,y,num,cxt){
 for(var i=0;i<digit[num].length;i++){
  for(var j=0;j<digit[num][i].length;j++){
   if(digit[num][i][j] == 1){
    cxt.save();
    
    cxt.fillStyle = "#fff";
    cxt.beginPath();
    var pX = x+(j+1)*dis+(2*j+1)*r;
    var pY = y+(i+1)*dis+(2*i+1)*r;
    cxt.arc(pX,pY,4,0,2*Math.PI);
    cxt.closePath();
    cxt.fill();
    
    cxt.restore();
   }
  }
 }
}
//关于时间的更新
function update(disNum, disDot){
 curTime = getTime();
 if(curTime[2] != preTime[2]){
  if(Math.floor(curTime[2]/10) != Math.floor(preTime[2]/10)){
   addBall(mL+disNum*4+disDot*4,mT,Math.floor(curTime[2]/10));
  }
  if((curTime[2]%10) != (preTime[2]%10)){
   addBall(mL+disNum*5+disDot*4,mT,curTime[2]%10);
  }
  if((Math.floor(curTime[1]/10)) != (Math.floor(preTime[1]/10))){
   addBall(mL+disNum*2+disDot*2,mT,Math.floor(curTime[1]/10));
  }
  if((curTime[1]%10) != (preTime[1]%10)){
   addBall(mL+disNum*3+disDot*2,mT,curTime[1]%10);
  }
  if((Math.floor(curTime[0]/10)) != (Math.floor(preTime[0]/10))){
   addBall(mL,mT,Math.floor(curTime[0]/10));
  }
  if((curTime[0]%10) != (preTime[0]%10)){
   addBall(mL+disNum,mT,curTime[0]%10);
  }
 }
 preTime = curTime;
 draw(preTime, disNum, disDot);
 
 for(var i=0;i<aBalls.length;i++){
  aBalls[i].x += aBalls[i].vX;
  aBalls[i].y += aBalls[i].vY;
  aBalls[i].vY += aBalls[i].a;
  if(aBalls[i].y >= canvH - r){
   aBalls[i].y = canvH - r;
   aBalls[i].vY = -aBalls[i].vY*0.75;
   aBalls[i].count ++;
  }
  if(aBalls[i].count>=3){
   aBalls.splice(i,1);
  }
 }
}
//获取当前时间
function getTime(){
 var date = new Date();
 var h = date.getHours();
 var m = date.getMinutes();
 var s = date.getSeconds();
 return [h,m,s];
}
//向数组中添加变化的球
function addBall(x,y,num){
 for(var i=0;i<digit[num].length;i++){
  for(var j=0;j<digit[num][i].length;j++){
   if(digit[num][i][j] == 1){
    var c = randomColor();
    var oBall = {
     x : x+(j+1)*dis+(2*j+1)*r,
     y : y+(i+1)*dis+(2*i+1)*r,
     a : 0.08 + Math.random()*0.5,
     vX : Math.pow(-1,Math.ceil(Math.random()*1000))*0.8 + Math.pow(-1,Math.ceil(Math.random()*1000))*0.2,
     vY : Math.pow(-1,Math.ceil(Math.random()*1000))*0.5 + Math.pow(-1,Math.ceil(Math.random()*1000))*0.1,
	 count : 0,
     color : c
    }
    aBalls.push(oBall);
   }
  }
 }
}
//随机颜色
function randomColor() {
	var col = [0, 1, 2];
	col[0] = Math.random() * 100 + 155;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 100 + 155;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 100 + 155;
	col[2] = col[2].toFixed();
	var num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgb(" + col[0] + "," + col[1] + "," + col[2] + ")";
}