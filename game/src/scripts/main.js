import {game} from './boot';
import {enemyCON,playerCON,systemCON,mediaCON} from './controller';

//游戏State
var mainState = {
	preload: function(){
	},
	init: function(){
	},
	create: function(){
		if(mediaCON.cameraTimer){
			clearInterval(mediaCON.cameraTimer);
		}
		if(mainState.enhanceTimer){
			clearInterval(mainState.enhanceTimer);
		}
		systemCON.initMap();
	    game.camera.x = 0;
	    game.camera.y = 2880+32;
	    systemCON.initControllor();
	    systemCON.initInfoBoard();
		playerCON.createPlayer();
		playerCON.buff = playerCON.createBuff(8112,192+960);
		playerCON.mentor = playerCON.createMentor(8960,454);
	    enemyCON.createEnemy();  
		enemyCON.createBalls();
		mediaCON.playBgm();
		mediaCON.ifMoveUp = false;
		//Physics全局物理系统
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 800; 
		//浏览器窗口失去焦点事件
		window.addEventListener('blur',function(){
			if(systemCON.scoreTimer){
				clearInterval(systemCON.scoreTimer);	
				systemCON.scoreTimer = null;
			}
			if(systemCON.breathTimer){
				clearInterval(systemCON.breathTimer);
				systemCON.breathTimer = null;
			}
		});
		window.addEventListener('focus',function(){
			if(!systemCON.scoreTimer){
			    systemCON.scoreTimer = setInterval(function(){
				    systemCON.score++;
				    systemCON.scoreBoard.innerHTML = systemCON.score;
			    },1000);				
			}
			if(!systemCON.breathTimer){
			    systemCON.breathTimer = setInterval(function(){
			    	if(systemCON.breath <100){
			    		systemCON.breath++;		    		
			    	}
		    	systemCON.breathNum.innerHTML = systemCON.breath;
			    },180);	
			}
		});
	},
	update: function(){
		game.physics.arcade.collide(playerCON.player, systemCON.layer);
		game.physics.arcade.collide(enemyCON.enemy,systemCON.layer);
		game.physics.arcade.collide(enemyCON.enemySnake,systemCON.layer);
		game.physics.arcade.collide(playerCON.mentor,systemCON.layer);
		game.physics.arcade.collide(playerCON.buff,systemCON.layer);
		enemyCON.enemy.enableBody = true;
		systemCON.breathBar.style.width = systemCON.breath*0.8 + 'px';
		enemyCON.enemyShow();
		//控制玩家移动
		if(systemCON.cursors.left.isDown){
			playerCON.player.body.velocity.x = -130;
			playerCON.player.animations.play('left');
		}else if(systemCON.cursors.right.isDown){
			playerCON.player.body.velocity.x = 130;	
			playerCON.player.animations.play('right');		
		}else{
			playerCON.player.body.velocity.x  = 0;
		}

		if (systemCON.score > 0){
			//检测玩家是否生存
			if (!playerCON.player.alive || !playerCON.player.inCamera) {
				playerCON.player.alive = false;
				playerCON.player.body.velocity.x = 0;
				clearInterval(systemCON.scoreTimer);
				clearInterval(systemCON.breathTimer);
				systemCON.showScoreBoard();
			}else{
				//检测物理碰撞
				game.physics.arcade.overlap(playerCON.player, enemyCON.enemy, playerCON.die, null, this);
				game.physics.arcade.overlap(playerCON.player, enemyCON.enemySnake, playerCON.die, null, this);
				game.physics.arcade.overlap(playerCON.player, enemyCON.fireBall, playerCON.die, null, this);
				game.physics.arcade.overlap(playerCON.player, playerCON.mentor, systemCON.win, null, this);
				game.physics.arcade.overlap(playerCON.player, playerCON.buff, playerCON.enhance, null, this);
				for(let i = 0; i < enemyCON.ballGroup.length; i++){
					game.physics.arcade.overlap(playerCON.player, enemyCON.ballGroup[i], playerCON.die, null, this);
				}
				enemyCON.enemyAct();
				//检测镜头转换
				if (systemCON.score > 70) {
					if(!mediaCON.ifMoveUp){
						mediaCON.cameraMoveUp();
					}
					mediaCON.ifMoveUp = true;
				}else{
					if (mediaCON.ifMoveUp) {

					}else{
						game.camera.x += 2;
					}
				}
				//下一行测试用代码
				// systemCON.breath = 100;
				//怪兽冲撞AI
				for (let i = 0; i < enemyCON.ghostSword.length; i++) {
					if(game.physics.arcade.distanceBetween(playerCON.player,enemyCON.ghostSword[i]) < 640){
						game.physics.arcade.accelerateToObject(enemyCON.ghostSword[i],playerCON.player,100);
					}
					if (playerCON.player.x > enemyCON.ghostSword[i].x) {
						enemyCON.ghostSword[i].animations.play('right');
					}else{
						enemyCON.ghostSword[i].animations.play('left');
					}
				}
				if (game.physics.arcade.distanceBetween(playerCON.player,enemyCON.enemy_whelp) < 400) {
					game.physics.arcade.accelerateToObject(enemyCON.enemy_whelp,playerCON.player,120);
					if (playerCON.player.body.x > enemyCON.enemy_whelp.body.x) {
						enemyCON.enemy_whelp.animations.play('right');
					}else{
						enemyCON.enemy_whelp.animations.play('left');
					}
				}
			}
		}
	}
}

export {mainState};