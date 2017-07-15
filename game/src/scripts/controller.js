import {game} from './boot';

class EnemyCON{
	constructor(){
		
	}
	createSnake(x,y){
		let snake;
		snake = game.add.sprite(x,y,'snake','',this.enemySnake);
		game.physics.enable(snake, Phaser.Physics.ARCADE);
		snake.animations.add('left', [0,1], 6, true);
		return snake;
	}
	createGhost(x,y){
		let ghost;
		ghost = game.add.sprite(x,y,'ghost','',this.enemy);
		game.physics.enable(ghost, Phaser.Physics.ARCADE);
		ghost.animations.add('left', [0,1], 6, true);
		return ghost;
	}
	createGhostSword(x,y){
		let ghostSword;
		ghostSword = game.add.sprite(x,y,'ghostSword','',this.enemy);
		game.physics.enable(ghostSword, Phaser.Physics.ARCADE);
		ghostSword.animations.add('left', [0,1], 6, true);
		ghostSword.animations.add('right', [2,3], 6, true);
		this.ghostSword.push(ghostSword);
		return ghostSword;
	}
	createWhelp(x,y){
		let whelp;
		whelp = game.add.sprite(x,y,'whelp','',this.enemy);
		game.physics.enable(whelp, Phaser.Physics.ARCADE);
		whelp.animations.add('left', [0,1,2], 6, true);
		whelp.animations.add('right', [4,5,6], 6, true);
		whelp.body.allowGravity = false;
		whelp.height = 36;
		whelp.width = 36;
		return whelp;
	}
	createFireBall(x,y){
		let ball;
		ball = game.add.emitter(x,y,20);
		ball.makeParticles('ball',[0,1,2],10,true,false);
		ball.setXSpeed(0);
		ball.setYSpeed(10);
		ball.setRotation(0);
		ball.start(false,1000,900,50);
		this.ballGroup.push(ball);
		ball.exists = false;
		return ball;
	}
	createBalls(){
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
	}
	createEnemy(){
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
	}
	enemyAct(){
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
	}
	enemyShow(){
		if(playerCON.player.x > 1350){
			this.enemy_snake4.exists = true;
			if(playerCON.player.x > 2400){
				this.ball1.exists = true;
				this.ball2.exists = true;
				this.ball3.exists = true;
				this.ball4.exists = true;
				this.ball5.exists = true;
				this.ball6.exists = true;
				this.ball7.exists = true;
				if(playerCON.player.x > 3000){
					this.ball8.exists = true;
					this.ball9.exists = true;
					this.ball10.exists = true;
					this.ball11.exists = true;
					this.ball12.exists = true;
					if(playerCON.player.x > 3800){
						this.ball13.exists = true;
						if(playerCON.player.x > 5210){
							this.ball14.exists = true;
							this.ball15.exists = true;							
						}
					}
				}
			}
		}		
	}
}

class PlayerCON{
	constructor(){

	}
	createPlayer(){
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
	}
	jump(){
		if(!playerCON.player.body.onFloor()){
			if(systemCON.breath < 50){
				// playerCON.player.body.velocity.y = -250;
			}else{
				playerCON.player.body.velocity.y = -250;
				systemCON.breath -= 50;
			}
		}else{
			playerCON.player.body.velocity.y = -250;
		}
	}
	die(){
		playerCON.player.alive = false;	
	}
	createMentor(x,y){
		let mentor;
		mentor = game.add.sprite(x,y,'mentor');
		game.physics.enable(mentor, Phaser.Physics.ARCADE);
		mentor.height = 42;
		mentor.width = 24;
		return mentor;		
	}
	createBuff(x,y){
		let buff;
		buff = game.add.sprite(x,y,'buff');
		buff.height = 16;
		buff.width = 16;
		game.physics.enable(buff, Phaser.Physics.ARCADE);
		return buff;	
	}
	enhance(){
		playerCON.buff.kill();
		clearInterval(systemCON.breathTimer);
		this.enhanceTimer = setInterval(function(){
	    	if(systemCON.breath < 100){
	    		systemCON.breath++;		    		
	    	}
    		systemCON.breathNum.innerHTML = systemCON.breath;			
		},20)
	}
}

class SystemCON{
	constructor(){

	}
	initMap(){
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
	}
	initControllor(){
	    //Input操控
	    this.cursors = game.input.keyboard.createCursorKeys();
	    this.pauseButton = game.input.keyboard.addKey(Phaser.KeyCode.Z);
	    this.pauseButton.onDown.add(this.pause);	
	    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);	
	    this.jumpButton.onDown.add(playerCON.jump);
	    this.restartBtn = document.getElementsByClassName('board-btn1')[0];
	    this.restartBtn.addEventListener('click',this.restart);
	}
	initInfoBoard(){
	    this.info = document.getElementsByClassName('info-board')[0];
	    this.info.style.visibility = 'visible';
	    this.scoreBoard = this.info.getElementsByClassName('score')[0];
	    this.breathNum = this.info.getElementsByClassName('breath-number')[0];
	    this.breathBar = this.info.getElementsByClassName('breath-bar')[0];
	    this.score = 0;
	    this.scoreTimer = setInterval(function(){
		    systemCON.score++;
		    systemCON.scoreBoard.innerHTML = systemCON.score;
	    },1000);
	    this.breath = 100;
	    this.breathTimer = setInterval(function(){
	    	if(systemCON.breath <100){
	    		systemCON.breath++;		    		
	    	}
    	systemCON.breathNum.innerHTML = systemCON.breath;
	    },180);		
	}
	showWinBoard(){
		var winBoard = document.getElementsByClassName('win-board')[0];
		winBoard.style.visibility = 'visible';
		this.jumpButton.onDown.add(this.restart);
	}
	showScoreBoard(){
		var deadBoard = document.getElementsByClassName('dead-board')[0];
 		var scoreBoard = document.getElementsByClassName('board-score')[0];
		scoreBoard.innerHTML = 'YOUR SCORE:' + systemCON.score;
		deadBoard.style.visibility = 'visible';
		this.jumpButton.onDown.add(this.restart);
	}
	win(){
		clearInterval(this.cameraTimer);
		clearInterval(this.scoreTimer);
		clearInterval(this.breathTimer);
		SystemCON.showWinBoard();
	}
	pause(){
		if (playerCON.player.alive) {
			game.paused  = !game.paused;			
		}
	}
	restart(){
		game.state.start('main'); 	
		document.getElementsByClassName('dead-board')[0].style.visibility = 'hidden';
		document.getElementsByClassName('win-board')[0].style.visibility = 'hidden';		
	}
}

class MediaCON{
	constructor(){

	}
	playBgm(){
		if(this.bgm){
			this.bgm.stop();			
		}
	    this.bgm = game.add.audio('bgm',1,true);
	    this.bgm.play();				
	}
	cameraMoveUp(){
		this.cameraTimer =  setInterval(function(){
			game.camera.y -= 1;
		},50);
	}
}


var enemyCON = new EnemyCON();
var playerCON = new PlayerCON();
var systemCON = new SystemCON();
var mediaCON = new MediaCON();

export {enemyCON,playerCON,systemCON,mediaCON};