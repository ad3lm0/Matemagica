/*:
 * @plugindesc Iniciar as variaveis que serão utilizadas nos calculos
 * @author Adelmo Oliveira
 *
 * @help
 *
 */

 ( function() {

 	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

 	Game_Interpreter.prototype.pluginCommand = function(command, args) {
    
    	_Game_Interpreter_pluginCommand.call(this, command, args);        

    	if(command == "iniciarVariavel"){
            
    		var varNum = Number(args[0]);
    		var max = Number(args[1]);

            $gameVariables.setValue(varNum, randomNumber(max));	                   
           

    	}

        if(command == 'verificaSub'){
            var val1 = $gameVariables.value(0001);
            var val2 = $gameVariables.value(0002);


        }


    	if(command == 'total'){

            
    		var val1 = $gameVariables.value(0001);
    		var val2 = $gameVariables.value(0002);
            console.log("val1 " + val1 + ' val2 '+ val2);
    		var operacao = Number(args[0]);
    		var total = 0;
    		var aux = true;



    		switch(operacao){
    			case 1:
    				total = val1 + val2;                    
    				break;
    			case 2:
                console.log("case2 ");
    				if (val1 < val2){
                        console.log("if ");
	    				while(aux){
                            console.log("while ");
	    					val2 = randomNumber(20);
	    					if(val1 > val2){
                                console.log("break ");
	    						$gameVariables.setValue(2, val2);
	    						aux = false;
	    					}
	    				}	    				
	    			}
                   

	    			total = val1 - val2;                    
    				break;    				
    			
    			case 3:

    				total = val1 * val2;                   
    				break;
    			case 4:

    				if(isPrime(val1)){
    					while(aux){
    						val1 = randomNumber(100);
    						if(!isPrime(val1)){
    							$gameVariables.setValue(1, val1);
    							aux = false;
    						}
    					}
    				}

    				aux = true;

    				if(!(val1%val2==0)){
    					while(aux){
    						val2 = randomNumber(21);
    						if(val1%val2==0){
    							$gameVariables.setValue(2, val2);
    							aux = false;
    						}
    					}
    				}
    			

    				total = val1 / val2;
    				break;    			
    			default:
    				total = 1;
    		}
                
                $gameVariables.setValue(0003, total);
                console.log("3 " + total);
                $gameVariables.setValue(0004, randomNumber(total+100));
                console.log("4 " + $gameVariables.value(0004));
                $gameVariables.setValue(0005, randomNumber(total+50));
                console.log("5 " + $gameVariables.value(0005));
                $gameVariables.setValue(0006, randomNumber(total+25));
                console.log("6 " + $gameVariables.value(0006));
                $gameVariables.setValue(0007, randomNumber(total));
               console.log("7 " + $gameVariables.value(0007));
                $gameVariables.setValue(0008, randomNumber(total));
                 console.log("8 " + $gameVariables.value(0008));
    		    		

            console.log("arrayVal ");
    		arrayVal = new Array(
    			Number($gameVariables.value(0003)),
    			Number($gameVariables.value(0004)),
    			Number($gameVariables.value(0005)),
    			Number($gameVariables.value(0006)),
    			Number($gameVariables.value(0007)),
    			Number($gameVariables.value(0008)));

    		aux = true;

    		while(aux){
               			
    			aux = notDuplicates(arrayVal);
    		}
            
    	}
	}

    function notDuplicates(array) {
        var valuesSoFar = [];
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (valuesSoFar.indexOf(value) !== -1) {
                var novoValor = randomNumber(Number(20));
                $gameVariables.setValue(i + 3, novoValor);
                arrayVal[i] = novoValor;
                return true;
            }
            valuesSoFar.push(value);
        }
        return false;
}

	function isPrime(num) {
	  for(var i = 2; i < num; i++)
	    if(num % i === 0) return false;
	  return num !== 1;
	}

 	
 	function randomNumber(max){
    	return Math.floor(Math.random() * (max - 1) + 2);
	}

 })();