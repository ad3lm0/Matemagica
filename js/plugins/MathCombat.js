/*:
 * @plugindesc Substituição de opções de combate 
 * @author Adelmo Oliveira
 *
 * @help
 *
 */

( function(){
	

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

 	Game_Interpreter.prototype.pluginCommand = function(command, args) {
    
    	_Game_Interpreter_pluginCommand.call(this, command, args); 

   

    	if(command == "batalha") {    		
	    				    	

	    		hp_enemy = 	0;// Number($gameTroop.members()[1].hp()) * 0.1 * (-1);	
	    	
		    	 $gameMap._interpreter.pluginCommand('iniciarVariavel', ['1', '50']);
		    	 $gameMap._interpreter.pluginCommand('iniciarVariavel', ['2', '50']);
		    	 $gameMap._interpreter.pluginCommand('total', ['1']);

		    	 var atual_enemy =  1;//$gameVariables.value(100);
		    	 isPaused = false;

		    			
				$gameMessage.add(Number($gameVariables.value(0001)) + ' + ' + Number($gameVariables.value(0002)) 
			    		+ ' = ' + Number($gameVariables.value(0003)) );
				

			    var choices = new Array(
			    	String($gameVariables.value(0003)),
			    	String($gameVariables.value(0004)),
			    	String($gameVariables.value(0005)),
			    	String($gameVariables.value(0006)),
			    	String($gameVariables.value(0007)),
			    	String($gameVariables.value(0008)));

			    choices = shuffle(choices);
			    this._index++;
		    	$gameMap._interpreter.setupChoices([choices], -1, -1);
		    	this.setWaitMode('message');

	    		$gameMessage.setChoiceCallback(function(responseIndex) {
	    			if (Number(choices[responseIndex]) == Number($gameVariables.value(0003))){

	    				$gameTroop.members()[1].gainHp(hp_enemy);		
	    				setTimeout(function(){$gameMessage.add('Acerto mize' + atual_enemy);}, 1);
	    				isPaused = true;
	    			} else {

	    				$gameTroop.members()[1].gainHp(20);    				
		    			setTimeout(function(){$gameMessage.add('Errou bobão' + $gameVariables.value(100));}, 1);
		    			}
		    			isPaused = true;
					});

	    		


	    		
		}		
	}


	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

 })();