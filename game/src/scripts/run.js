import {game,bootState} from './boot';
import {loadState} from './load';
import {menuState} from './menu';
import {mainState} from './main';

game.state.add('boot', bootState);  
game.state.add('load', loadState);  
game.state.add('menu', menuState);  
game.state.add('main', mainState);  
game.state.start('boot'); 
