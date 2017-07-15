import {game} from './boot';
//加载State
var loadState = {
	init: function(){
		// this.loading = game.add.image(game.world.centerX,game.world.centerY,'loading');
		// this.loading.anchor = {x:0.5,y:0.5};
		// this.loading.width = 200;
		// this.loading.height = 150;
		this.progressText = game.add.text(game.world.centerX,game.world.centerY+30,'0%',{fill:"#fff",fontSize:"14px"});
		this.progressText.anchor = {x:0.5,y:0.5};
	},
	preload: function(){
	    game.load.tilemap('round1','../game/src/asset/map.json',null,Phaser.Tilemap.TILED_JSON);
	    game.load.image('tiles','../game/src/asset/pic/tiles.png');
	    game.load.audio('bgm','../game/src/asset/bgm.wav');
	    game.load.spritesheet('ball','../game/src/asset/pic/ball.png',16,16);
	    game.load.spritesheet('mentor','../game/src/asset/pic/mentor.png',72,126);
	    game.load.spritesheet('man', '../game/src/asset/pic/man.png', 20, 28);
	    game.load.spritesheet('ghost','../game/src/asset/pic/ghost.png',16,16);
	    game.load.spritesheet('whelp','../game/src/asset/pic/whelp.png',32,32);
	    game.load.spritesheet('snake','../game/src/asset/pic/snake.png',16,16);	
	    game.load.spritesheet('ghostSword','../game/src/asset/pic/ghostSword.png',24,16);	
	    game.load.spritesheet('buff','../game/src/asset/pic/buff.png',10,10);	
		game.load.onFileComplete.add(function(progress){
			loadState.progressText.text = progress + '%';
		});
	},
	create: function(){
		game.state.start('menu'); 
	}
}

export {loadState};