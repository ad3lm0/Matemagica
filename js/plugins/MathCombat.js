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
	    				    	
    			console.log("dmg_enemy ");
	    		dmg_enemy = 20;
	    		console.log("dmg_enemy "+dmg_enemy);
	    		$gameVariables.setValue(97, 0);

	    		dmg_hero = Number($gameParty.members(1).hp) * 0.05;
	    		$gameVariables.setValue(98, 0);
	    		console.log("dmg_hero "+dmg_hero);
	    	
		    	var val_op = Number(args[0]);
	    		var operacao = 'a';

	    		console.log("batalha");
	    		console.log("iniciarVariavel");
	    		$gameMap._interpreter.pluginCommand('iniciarVariavel', ['1', '50']);
	    		console.log("iniciarVariavel");
		    	$gameMap._interpreter.pluginCommand('iniciarVariavel', ['2', '20']);
		    	if (val_op == 4 || val_op == 3){
		    		console.log("iniciarVariavel");
		    		$gameMap._interpreter.pluginCommand('iniciarVariavel', ['2', '11']);
		    	}
		    	console.log("total");
		    	$gameMap._interpreter.pluginCommand('total', String([val_op]));
				console.log(" fim total");
		    	var atual_enemy =  1;//$gameVariables.value(100);

		    	switch(val_op) {
		    		case 1:
		    			operacao = ' + ';
		    			break;
		    		case 2:
		    			operacao = ' - ';
		    			break;
		    		case 3:
		    			operacao = ' x ';
		    			break;
		    		case 4:
		    			operacao = ' ÷ ';
		    			break;
		    	 }
				$gameMessage.add(Number($gameVariables.value(0001))  + operacao + Number($gameVariables.value(0002)) 
			    		+ ' = ');
				
				console.log("choices");
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

		    	console.log("setChoiceCallback");

	    		$gameMessage.setChoiceCallback(function(responseIndex) {
	    			if (Number(choices[responseIndex]) == Number($gameVariables.value(0003))){

	    				$gameVariables.setValue(100, 0);
	    				console.log($gameVariables.value(100));
	    				setTimeout(function(){$gameMessage.add('Acerto mize');}, 1);
	    			} else {

	    				$gameVariables.setValue(100, 1);	
	    				console.log($gameVariables.value(100));			
		    			setTimeout(function(){$gameMessage.add('Errou bobão');}, 1);
		    			}
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