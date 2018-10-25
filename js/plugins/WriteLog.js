/*:
 * @plugindesc Escrita da coleta de dados 
 * @author Juliane Cristina
 *
 * @help
 *
 */

 ( function(){


 	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

 	Game_Interpreter.prototype.pluginCommand = function(command, args) {

 		_Game_Interpreter_pluginCommand.call(this, command, args); 

 		var content = "KEY,VALUE\r\n";

 		if(command == "write") 
 		{ 
 			var option = Number(args[0]);
 			var file = $gameActors.actor(5).name().toUpperCase();

 			switch(option){

 				case 0:
 				//INÍCIO DO JOGO, COLETA NOME DO JOGADOR E CONTADOR DE TEMPO
 				content = content + "NOME," + $gameActors.actor(5).name() + "\r\n";
 				content = content + "INICIO," + $gameVariables.value(26) + "h" + $gameVariables.value(27) + "m" + $gameVariables.value(28) + "s" + "\r\n";
 				writeData(content, file);
 				break;

 				case 1:
 				//FASE DE DIÁLOGOS 
 				content = readData(file);
 				content = content + "DIALOGO," + $gameVariables.value(26) + "h" + $gameVariables.value(27) + "m" + $gameVariables.value(28) + "s" + "\r\n";
 				writeData(content, file);
 				break;

 				case 2:
 				//EASTER EGG
 				content = readData(file);
 				content = content + "ENCONTROU," + $gameVariables.value(26) + "h" + $gameVariables.value(27) + "m" + $gameVariables.value(28) + "s" + "\r\n";
 				writeData(content, file);

 				case 3:
 				//ESTÁGIO: INICIAL
 				content = readData(file);
 				content = content + "ESTÁGIO " + args[1] + " INICIO," + $gameVariables.value(26) + "h" + $gameVariables.value(27) + "m" + $gameVariables.value(28) + "s" + "\r\n";
 				writeData(content, file);
 				break;

 				case 4:
 				//ESTÁGIO: FINAL
 				content = readData(file); 				
 				content = content + "MONSTROS TOTAL," + $gameVariables.value(32) + "\r\n";
 				content = content + "MONSTROS FUGAS," + $gameVariables.value(33) + "\r\n";
 				content = content + "MONSTROS VITORIA," + $gameVariables.value(34) + "\r\n";
 				content = content + "CURAS," + $gameVariables.value(35) + "\r\n";
 				content = content + "RESS," + $gameVariables.value(36) + "\r\n";
 				content = content + "ESTÁGIO " + args[1] + " FIM," + $gameVariables.value(26) + "h" + $gameVariables.value(27) + "m" + $gameVariables.value(28) + "s" + "\r\n";
 				writeData(content, file);
 				break;

 				case 5:
 				//JOGO INTERROMPIDO POR TEMPO/GAME-OVER
 				content = readData(file);
 				content = content + "MONSTROS TOTAL," + $gameVariables.value(32) + "\r\n";
 				content = content + "MONSTROS FUGAS," + $gameVariables.value(33) + "\r\n";
 				content = content + "MONSTROS VITORIA," + $gameVariables.value(34) + "\r\n";
 				content = content + "CURAS," + $gameVariables.value(35) + "\r\n";
 				content = content + "RESS," + $gameVariables.value(36) + "\r\n";
 				content = content + "INTERROMPIDO," + $gameVariables.value(26) + "h" + $gameVariables.value(27) + "m" + $gameVariables.value(28) + "s" + "\r\n";
 				writeData(content, file);
 				break;

 				case 6:
 				//TERMINO DO JOGO
 				content = readData(file);
 				content = content + "TERMINO," + $gameVariables.value(26) + "h" + $gameVariables.value(27) + "m" + $gameVariables.value(28) + "s" + "\r\n";
 				writeData(content, file);
 				break;

 				case 7:
 				//??
 				break;

 			}

 			
 		}
 	}

 })();

 function writeData (data, fileName)
 { 
 	var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
 	if (path.match(/^\/([A-Z]:)/)) { path = path.slice(1); }

 	path = decodeURIComponent(path) + fileName + ".txt";
 	var fs = require('fs');
 	fs.writeFile(path, data, function(err) { if(err) { return console.log(err); } });
 };

 function readData (fileName)
 { 
 	var txt = "";
 	var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
 	if (path.match(/^\/([A-Z]:)/)) { path = path.slice(1); }

 	path = decodeURIComponent(path) + fileName + ".txt";
 	var fs = require('fs');
 	txt = fs.readFileSync(path, 'utf8');

 	return txt;
 };