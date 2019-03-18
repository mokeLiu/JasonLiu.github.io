Bomb.initialize("0ed89ba049534af505fc0324c3a70cc4", "185ee4b4ab9e2a77f9661f61a17e3e56");

var GameScore = Bmob.Object.extend("GameScore");
var gameScore = new GameScore();
gameScore.set("score", 1337);
gameScore.save(null, {
	success: function(object) {
		console.log("create object success, object id:" + object.id);
	},
	error: function(model, error) {
		console.log("create object fail");
	}
});