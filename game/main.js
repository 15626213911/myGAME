var game = new Phaser.Game(640,320, Phaser.AUTO, 'wrapper');

//初始化State
var bootState = {
	preload: function(){
		game.load.image('loading','asset/pic/loading.gif')
	},
	create: function(){
		game.state.start('load'); 
	}
}

//加载State
var loadState = {
	init: function(){
		this.loading = game.add.image(game.world.centerX,game.world.centerY,'loading');
		this.loading.anchor = {x:0.5,y:0.5};
		this.loading.width = 200;
		this.loading.height = 150;
		this.progressText = game.add.text(game.world.centerX,game.world.centerY+30,'0%',{fill:"#fff",fontSize:"14px"});
		this.progressText.anchor = {x:0.5,y:0.5};
	},
	preload: function(){
	    game.load.tilemap('round1','asset/map.json',null,Phaser.Tilemap.TILED_JSON);
	    game.load.image('tiles','asset/pic/tiles.png');
	    game.load.audio('bgm','asset/bgm.wav');
	    game.load.spritesheet('ball','asset/pic/ball.png',16,16);
	    game.load.spritesheet('mentor','asset/pic/mentor.png',72,126);
	    game.load.spritesheet('man', 'asset/pic/man.png', 20, 28);
	    game.load.spritesheet('ghost','asset/pic/ghost.png',16,16);
	    game.load.spritesheet('whelp','asset/pic/whelp.png',32,32);
	    game.load.spritesheet('snake','asset/pic/snake.png',16,16);	
	    game.load.spritesheet('ghostSword','asset/pic/ghostSword.png',24,16);	
	    game.load.spritesheet('buff','asset/pic/buff.png',10,10);	
		game.load.onFileComplete.add(function(progress){
			loadState.progressText.text = progress + '%';
		});
	},
	create: function(){
		game.state.start('menu'); 
	}
}


//菜单State
var menuState = {
	init: function(){
		this.menu = document.getElementsByClassName('menu-board')[0];
		this.menu.style.visibility = 'visible';
	},
	create: function(){
		this.startBtn = document.getElementsByClassName('start-btn')[0];
		this.startBtn.addEventListener('click',function(){
			menuState.menu.style.display = 'none';
			game.state.start('main');
		});
	}
}

//游戏State
var mainState = {
	createPlayer: function(){
	    //Sprite主角
	 	this.player = game.add.sprite(120, 184+960, 'man');
	 	game.physics.enable(this.player, Phaser.Physics.ARCADE); 
	 	//Sprite-body
	    this.player.body.bounce.y = 0.2;
	    this.player.body.setSize(20, 28, 0, 0);
	    //Sprite-animations
	    this.player.animations.add('right', [5,6,7,8], 10, true);	
	    this.player.animations.add('left', [0,1,2,3], 10, true);	
	    this.player.frame = 4;
	},
	createEnemy: function(){
		this.enemy = game.add.group();
		this.enemySnake = game.add.group(this.enemy);
	    //Sprite敌人 
	 	this.enemy_snake1 = this.createSnake(576,224+960);
	 	this.enemy_snake2 = this.createSnake(768,224+960);
	 	this.enemy_snake3 = this.createSnake(1120,224+960);
	 	this.enemy_snake4 = this.createSnake(1600,16+960);
	 	this.enemy_snake5 = this.createSnake(4192,160+960);
	 	this.enemy_snake6 = this.createSnake(4752,112+960);
	 	this.enemy_snake7 = this.createSnake(4912,176+960);
	 	this.enemy_snake8 = this.createSnake(6496,96+960);
	 	this.enemy_snake4.exists = false;

	 	this.ghostSword = [];
	 	this.enemy_ghostSword1 = this.createGhostSword(1744,224+960);
	 	this.enemy_ghostSword2 = this.createGhostSword(2224,224+960);
	 	this.enemy_ghostSword3 = this.createGhostSword(2608,48+960);
	 	this.enemy_ghostSword4 = this.createGhostSword(3776,224+960);
	 	this.enemy_ghostSword5 = this.createGhostSword(4368,224+960);
	 	this.enemy_ghostSword6 = this.createGhostSword(5280,224+960);
	 	this.enemy_ghostSword7 = this.createGhostSword(5408,224+960);
	 	this.enemy_ghostSword8 = this.createGhostSword(5760,224+960);

	 	this.enemy_ghost = this.createGhost(5760,144+960);
	 	this.enemy_whelp = this.createWhelp(7200,96+960);
	},	
	createSnake: function(x,y){
		var snake;
		snake = game.add.sprite(x,y,'snake','',this.enemySnake);
		game.physics.enable(snake, Phaser.Physics.ARCADE);
		snake.animations.add('left', [0,1], 6, true);
		return snake;
	},
	createGhost: function(x,y){
		var ghost;
		ghost = game.add.sprite(x,y,'ghost','',this.enemy);
		game.physics.enable(ghost, Phaser.Physics.ARCADE);
		ghost.animations.add('left', [0,1], 6, true);
		return ghost;
	},
	createGhostSword: function(x,y){
		var ghostSword;
		ghostSword = game.add.sprite(x,y,'ghostSword','',this.enemy);
		game.physics.enable(ghostSword, Phaser.Physics.ARCADE);
		ghostSword.animations.add('left', [0,1], 6, true);
		ghostSword.animations.add('right', [2,3], 6, true);
		this.ghostSword.push(ghostSword);
		return ghostSword;
	},
	createWhelp: function(x,y){
		var whelp;
		whelp = game.add.sprite(x,y,'whelp','',this.enemy);
		game.physics.enable(whelp, Phaser.Physics.ARCADE);
		whelp.animations.add('left', [0,1,2], 6, true);
		whelp.animations.add('right', [4,5,6], 6, true);
		whelp.body.allowGravity = false;
		whelp.height = 36;
		whelp.width = 36;
		return whelp;
	},
	createMentor: function(x,y){
		var mentor;
		mentor = game.add.sprite(x,y,'mentor');
		game.physics.enable(mentor, Phaser.Physics.ARCADE);
		mentor.height = 42;
		mentor.width = 24;
		return mentor;		
	},
	createBalls: function(){
		this.ballGroup = [];
		this.ball1 = this.createFireBall(2896,64+960);
		this.ball2 = this.createFireBall(2976,64+960);
		this.ball3 = this.createFireBall(3056,64+960);
		this.ball4 = this.createFireBall(3088,64+960);
		this.ball5 = this.createFireBall(3360,128+960);
		this.ball6 = this.createFireBall(3392,128+960);
		this.ball7 = this.createFireBall(3504,128+960);
		this.ball8 = this.createFireBall(3536,128+960);
		this.ball9 = this.createFireBall(3616,128+960);
		this.ball10 = this.createFireBall(3648,128+960);
		this.ball11 = this.createFireBall(3856,128+960);
		this.ball12 = this.createFireBall(3888,128+960);
		this.ball13 = this.createFireBall(4208,48+960);
		this.ball14 = this.createFireBall(5632,64+960);
		this.ball15 = this.createFireBall(5792,64+960);
	},
	createFireBall: function(x,y){
		var ball;
		ball = game.add.emitter(x,y,20);
		ball.makeParticles('ball',[0,1,2],10,true,false);
		ball.setXSpeed(0);
		ball.setYSpeed(10);
		ball.setRotation(0);
		ball.start(false,1000,900,50);
		this.ballGroup.push(ball);
		ball.exists = false;
		return ball;
	},
	createBuff: function(x,y){
		var buff;
		buff = game.add.sprite(x,y,'buff');
		buff.height = 16;
		buff.width = 16;
		game.physics.enable(buff, Phaser.Physics.ARCADE);
		return buff;	
	},
	enemyShow: function(){
		if(this.player.x > 1350){
			this.enemy_snake4.exists = true;
			if(this.player.x > 2400){
				this.ball1.exists = true;
				this.ball2.exists = true;
				this.ball3.exists = true;
				this.ball4.exists = true;
				this.ball5.exists = true;
				this.ball6.exists = true;
				this.ball7.exists = true;
				if(this.player.x > 3000){
					this.ball8.exists = true;
					this.ball9.exists = true;
					this.ball10.exists = true;
					this.ball11.exists = true;
					this.ball12.exists = true;
					if(this.player.x > 3800){
						this.ball13.exists = true;
						if(this.player.x > 5210){
							this.ball14.exists = true;
							this.ball15.exists = true;							
						}
					}
				}
			}
		}		
	},
	enemyAct: function(){
			this.enemy_snake1.body.velocity.x = -80;
			this.enemy_snake2.body.velocity.x = -80;
			this.enemy_snake3.body.velocity.x = -80;
			this.enemy_snake4.body.velocity.x = -80;
			this.enemy_snake5.body.velocity.x = -80;
			this.enemy_snake6.body.velocity.x = -80;
			this.enemy_snake7.body.velocity.x = -80;
			this.enemy_snake8.body.velocity.x = -80;
			this.enemy_ghost.animations.play('left');
			this.enemy_snake1.animations.play('left');
			this.enemy_snake2.animations.play('left');
			this.enemy_snake3.animations.play('left');
			this.enemy_snake4.animations.play('left');
			this.enemy_snake5.animations.play('left');
			this.enemy_snake6.animations.play('left');
	},
	enhance: function(){
		this.buff.kill();
		clearInterval(this.breathTimer);
		this.enhanceTimer = setInterval(function(){
	    	if(mainState.breath <100){
	    		mainState.breath++;		    		
	    	}
    		mainState.breathNum.innerHTML = mainState.breath;			
		},20)
	},
	initMap: function(){
	    //Tilemap创建地图
	    this.map = game.add.tilemap('round1');
	    this.map.addTilesetImage('tiles');
	    this.layer = this.map.createLayer('world');
	    this.layer.resizeWorld();
	    //Tilemap设置碰撞检测
	    this.map.setCollision([3,4,5,6,7,8,9,11,12,14,15,18,19,20,23,24,30,35,38,41,42,45,
	    	50,51,52,53,56,57,60,61,63,64,65,66,67,68,69,70,76,78,79,80,81,82,83,84,85,87,
	    	89,95,96,97,98,99,100,115,116,118,120,121,123,125,127,133,135,136,137,139,140,
	    	141,142,143,144,145,146,147,148,150,151,152,154,155,156,157,158,163,165]);
	},
	initControllor: function(){
	    //Input操控
	    this.cursors = game.input.keyboard.createCursorKeys();
	    this.pauseButton = game.input.keyboard.addKey(Phaser.KeyCode.Z);
	    this.pauseButton.onDown.add(this.pause);	
	    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);	
	    this.jumpButton.onDown.add(this.jump);
	    this.restartBtn = document.getElementsByClassName('board-btn1')[0];
	    this.restartBtn.addEventListener('click',this.restart);
	},
	initInfoBoard: function(){
	    this.info = document.getElementsByClassName('info-board')[0];
	    this.info.style.visibility = 'visible';
	    this.scoreBoard = this.info.getElementsByClassName('score')[0];
	    this.breathNum = this.info.getElementsByClassName('breath-number')[0];
	    this.breathBar = this.info.getElementsByClassName('breath-bar')[0];
	    this.score = 0;
	    this.scoreTimer = setInterval(function(){
		    mainState.score++;
		    mainState.scoreBoard.innerHTML = mainState.score;
	    },1000);
	    this.breath = 100;
	    this.breathTimer = setInterval(function(){
	    	if(mainState.breath <100){
	    		mainState.breath++;		    		
	    	}
    	mainState.breathNum.innerHTML = mainState.breath;
	    },180);		
	},
	playBgm: function(){
		if(this.bgm){
			this.bgm.stop();			
		}
	    this.bgm = game.add.audio('bgm',1,true);
	    this.bgm.play();				
	},
	cameraMoveUp: function(){
		this.cameraTimer =  setInterval(function(){
			game.camera.y -= 1;
		},50);
	},

	preload: function(){
	},
	init: function(){
		if (this.cameraTimer){
			clearInterval(this.cameraTimer);
		}
	},
	create: function(){
		this.initMap();
	    game.camera.x = 0;
	    game.camera.y = 2880+32;
	    this.initControllor();
	    this.initInfoBoard();
	    this.createPlayer();
	    this.createEnemy();  
		this.createBalls();
		this.buff = this.createBuff(8112,192+960);
		this.mentor = this.createMentor(8960,454);
		this.playBgm();
		this.ifMoveUp = false;
		//Physics全局物理系统
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 800; 
	},
	update: function(){
		game.physics.arcade.collide(this.player, this.layer);
		game.physics.arcade.collide(this.enemy,this.layer);
		game.physics.arcade.collide(this.enemySnake,this.layer);
		game.physics.arcade.collide(this.mentor,this.layer);
		game.physics.arcade.collide(this.buff,this.layer);
		this.enemy.enableBody = true;
		this.breathBar.style.width = this.breath*0.8 + 'px';
		this.enemyShow();
		//控制玩家移动
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -130;
			this.player.animations.play('left');
		}else if(this.cursors.right.isDown){
			this.player.body.velocity.x = 130;	
			this.player.animations.play('right');		
		}else{
			this.player.body.velocity.x  = 0;
		}

		if (mainState.score > 0){
			//检测玩家是否生存
			if (!this.player.alive || !this.player.inCamera) {
				this.player.alive = false;
				mainState.player.body.velocity.x = 0;
				clearInterval(this.scoreTimer);
				clearInterval(this.breathTimer);
				this.showScoreBoard();
			}else{
				//检测物理碰撞
				game.physics.arcade.overlap(this.player, this.enemy, this.die, null, this);
				game.physics.arcade.overlap(this.player, this.enemySnake, this.die, null, this);
				game.physics.arcade.overlap(this.player, this.fireBall, this.die, null, this);
				game.physics.arcade.overlap(this.player, this.mentor, this.win, null, this);
				game.physics.arcade.overlap(this.player, this.buff, this.enhance, null, this);
				for(var i = 0; i < this.ballGroup.length; i++){
					game.physics.arcade.overlap(this.player, this.ballGroup[i], this.die, null, this);
				}
				this.enemyAct();
				//检测镜头转换
				if ( mainState.score > 70) {
					if(!this.ifMoveUp){
						this.cameraMoveUp();
					}
					this.ifMoveUp = true;
				}else{
					if (this.ifMoveUp) {

					}else{
						game.camera.x += 2;
					}
				}
				//下一行测试用代码
				// mainState.breath = 100;
				//怪兽冲撞AI
				for (var i = 0; i < this.ghostSword.length; i++) {
					if(game.physics.arcade.distanceBetween(this.player,this.ghostSword[i]) < 640){
						game.physics.arcade.accelerateToObject(this.ghostSword[i],this.player,100);
					}
					if (this.player.x > this.ghostSword[i].x) {
						this.ghostSword[i].animations.play('right');
					}else{
						this.ghostSword[i].animations.play('left');
					}
				}
				if (game.physics.arcade.distanceBetween(this.player,this.enemy_whelp) < 400) {
					game.physics.arcade.accelerateToObject(this.enemy_whelp,this.player,120);
					if (this.player.body.x > this.enemy_whelp.body.x) {
						this.enemy_whelp.animations.play('right');
					}else{
						this.enemy_whelp.animations.play('left');
					}
				}
			}
		}

	},
	die: function(){
		this.player.alive = false;	
	},
	win: function(){
		clearInterval(this.cameraTimer);
		clearInterval(this.scoreTimer);
		clearInterval(this.breathTimer);
		this.showWinBoard();
	},
	jump: function(){
		if(!mainState.player.body.onFloor()){
			if(mainState.breath < 50){
				// mainState.player.body.velocity.y = -250;
			}else{
				mainState.player.body.velocity.y = -250;
				mainState.breath -= 50;
			}
		}else{
			mainState.player.body.velocity.y = -250;
		}
	},
	pause: function(){
		if (mainState.player.alive) {
			game.paused  = !game.paused;			
		}
	},
	showWinBoard: function(){
		var winBoard = document.getElementsByClassName('win-board')[0];
		winBoard.style.visibility = 'visible';
		this.jumpButton.onDown.add(this.restart);
	},
	showScoreBoard: function(){
		var deadBoard = document.getElementsByClassName('dead-board')[0];
 		var scoreBoard = document.getElementsByClassName('board-score')[0];
		scoreBoard.innerHTML = 'YOUR SCORE:' + mainState.score;
		deadBoard.style.visibility = 'visible';
		this.jumpButton.onDown.add(this.restart);
	},
	restart: function(){
		game.state.start('main'); 	
		document.getElementsByClassName('dead-board')[0].style.visibility = 'hidden';
		document.getElementsByClassName('win-board')[0].style.visibility = 'hidden';		
	},
}

game.state.add('boot', bootState);  
game.state.add('load', loadState);  
game.state.add('menu', menuState);  
game.state.add('main', mainState);  
game.state.start('boot'); 