//����window�����ϵļ��ݸ���������Ķ�������window.reAnimFrame();
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

//�����º���(������������:Ԫ��,�¼�������,�¼�ִ�з���),����ֵ������addHander������
function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on" + type,handler);
	}else{
		element["on"+type] = handler;
	}
}

//ʹ������Ŀ��ֵ
function lerpDis(aim,now,radio){
	var delta = now - aim;
	return aim + delta * radio;
}

//ʹ������Ŀ��Ƕ�
function lerpAng(a,b,t){
	var d = b - a;
	if(d > Math.PI) d -= 2*Math.PI;
	if(d < -Math.PI) d += 2*Math.PI;
	return a + d * t;
}

//�������������ƽ��
function calLength2(x1,y1,x2,y2){
	return Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
}

//���ͼƬ
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
	if(b && window.event.clientY < 0 || window.event.altKey){//������ر�
		window.event.returnValue = "dataStorage(dataName,[myData.blueNum,myData.orangeNum,myData.score]);"; //������Է����������Ĳ������� 
	}else{//�����ˢ��
		console.log("��ˢ�¶��ǹر�"); 
	} 
}