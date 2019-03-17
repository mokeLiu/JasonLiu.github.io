(function(){
	const pastScore = document.getElementById('past_score');

	const dbRefObject = firebase.database().ref().child('object');

	dbRefObject.on('value', snap => console.log(snap.val()));
}());