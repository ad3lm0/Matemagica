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
	    		

	    		
		    	var val_op = Number(args[0]);
	    		var operacao = 'a';
	    		var max = $gameVariables.value(21);

	    		var face = Number($gameVariables.value(23));


	    		switch(max){
	    			case 1:
		    			$gameMap._interpreter.pluginCommand('iniciarVariavel', ['1', '11']);	    		
			    		$gameMap._interpreter.pluginCommand('iniciarVariavel', ['2', '11']);
		    			break;
		    		case 2:
		    			$gameMap._interpreter.pluginCommand('iniciarVariavel', ['1', '100']);	    		
		    			$gameMap._interpreter.pluginCommand('iniciarVariavel', ['2', '11']);
		    			break;
		    		case 3:
		    			$gameMap._interpreter.pluginCommand('iniciarVariavel', ['1', '100']);	    		
		    			$gameMap._interpreter.pluginCommand('iniciarVariavel', ['2', '100']);
		    			break;
	    		}		    	
		    	
		    	$gameMap._interpreter.pluginCommand('total', String([val_op]));
				
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

				$gameMessage.add('Quanto é ' + Number($gameVariables.value(0001))  + operacao + Number($gameVariables.value(0002)) 
			    		+ ' ?');
				
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

		    	

	    		$gameMessage.setChoiceCallback(function(responseIndex) {
	    			if (Number(choices[responseIndex]) == Number($gameVariables.value(0003))){



	    				$gameVariables.setValue(100, 0);
	    				console.log($gameVariables.value(100));
	    				setTimeout(function(){
	    					if (face == 1){
								 $gameMessage.setFaceImage('FadaBash_R',5);
	    					}else {
	    						 $gameMessage.setFaceImage('Professora_R',1);
	    					}
	    					
	    					$gameMessage.add('Otímo, você acertou!');
	    				}, 1);
	    			} else {

	    				$gameVariables.setValue(100, 1);	
	    				console.log($gameVariables.value(100));			
		    			setTimeout(function(){
		    				if (face == 1){
	    					 $gameMessage.setFaceImage('FadaBash_R',1);
	    					}else {
	    						$gameMessage.setFaceImage('Professora_R',4);
	    					}
		    				$gameMessage.add('Vixe, você errou.');
		    				$gameMessage.add(Number($gameVariables.value(0001))  + operacao + Number($gameVariables.value(0002)) 
			    		+ ' = ' + Number($gameVariables.value(0003)));
		    			}, 1);
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