function dataStorage(dataName,data){
	//判断是否有预存值
	if(!localStorage.getItem(dataName[0])) {
		//不存在则新写
		for(var i=0;i<dataName.length;i++){
			localStorage.setItem(dataName[i],data[i]);
		}
		initStorage(dataName);
	} else {
		//存在则用原值写入
		for(var i=0;i<dataName.length;i++){
			data[i] = localStorage.getItem(dataName);
		}
		myData.draw(data);
	}
}