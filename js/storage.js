function dataStorage(dataName,data){
	//�ж��Ƿ���Ԥ��ֵ
	if(!localStorage.getItem(dataName[0])) {
		//����������д
		for(var i=0;i<dataName.length;i++){
			localStorage.setItem(dataName[i],data[i]);
		}
		initStorage(dataName);
	} else {
		//��������ԭֵд��
		for(var i=0;i<dataName.length;i++){
			data[i] = localStorage.getItem(dataName);
		}
		myData.draw(data);
	}
}