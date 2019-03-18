window.onload = function(){
	Bomb.initialize("0ed89ba049534af505fc0324c3a70cc4", "185ee4b4ab9e2a77f9661f61a17e3e56");

	const query = Bmob.Query('testTable');
	query.set("name","Bmob");
	query.set("count",1);
	query.set("score",99.9);
	query.save().then(res => {
	  console.log(res)
	}).catch(err => {
	  console.log(err)
	})
}