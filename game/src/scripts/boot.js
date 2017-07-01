var game = new Phaser.Game(640,320, Phaser.AUTO, 'wrapper');

//初始化State
var bootState = {
	preload: function(){
		game.load.image('loading','../game/src/asset/pic/loading.gif')
	},
	create: function(){
		game.state.start('load'); 
	}
}

export {game,bootState};