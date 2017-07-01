import {game} from './boot';
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

export {menuState};