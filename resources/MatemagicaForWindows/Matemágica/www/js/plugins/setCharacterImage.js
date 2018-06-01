/*:
 * @plugindesc Atualização de  imagens do usuario
 * @author Adelmo Oliveira
 *
 * @help
 */

( function(){

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

 	Game_Interpreter.prototype.pluginCommand = function(command, args) {
    
    	_Game_Interpreter_pluginCommand.call(this, command, args); 

    	if(command == "setCharacterImage") {

	    Game_Interpreter.prototype.command322 = function() {
		    var actor = $gameActors.actor(5);

		    var ChosedChar = Number($gameVariables.value(19));

		    if (actor) {

		    	switch(ChosedChar){
		    		case 1:
		    			actor.setCharacterImage('Estudante', 0);
		        		actor.setFaceImage('Estudantes_R', 3);
		       			actor.setBattlerImage('Estudante_1');
		       			break;
		       		case 2:
		    			actor.setCharacterImage('Estudante', 1);
		        		actor.setFaceImage('Estudantes_R', 2);
		       			actor.setBattlerImage('Estudante_2');
		       			break;
		       		case 3:
		    			actor.setCharacterImage('Estudante', 2);
		        		actor.setFaceImage('Estudantes_R', 1);
		       			actor.setBattlerImage('Estudante_3');
		       			break;
		       		case 4:
		    			actor.setCharacterImage('Estudante', 3);
		        		actor.setFaceImage('Estudantes_R', 0);
		       			actor.setBattlerImage('Estudante_4');
		       			break;
		       		case 5:
		    			actor.setCharacterImage('Estudante', 4);
		        		actor.setFaceImage('Estudantes_R', 7);
		       			actor.setBattlerImage('Estudante_5');
		       			break;
		       		case 6:
		    			actor.setCharacterImage('Estudante', 5);
		        		actor.setFaceImage('Estudantes_R', 6);
		       			actor.setBattlerImage('Estudante_6');
		       			break;
		       		case 7:
		    			actor.setCharacterImage('Estudante', 6);
		        		actor.setFaceImage('Estudantes_R', 5);
		       			actor.setBattlerImage('Estudante_7');
		       			break;
		       		case 8:
		    			actor.setCharacterImage('Estudante', 7);
		        		actor.setFaceImage('Estudantes_R', 4);
		       			actor.setBattlerImage('Estudante_8');
		       			break;

		    	}

		        
		    }
		    $gamePlayer.refresh();
		    return true;
		};

    	}

    }

})();