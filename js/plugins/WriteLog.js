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
 			var file = $gameActors.actor(5).name().toUpperCase();
 			switch(args[0]){

 				case "start":
 				//plugin command: write start
 				content = content + "NOME," + $gameActors.actor(5).name() + "\r\n";
 				content = content + "INICIO," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				writeData(content, file);
 				break;

 				case "quest":
 				//plugin command: write quest args[1] args[2]
				//args[1] = TipoQuestionario
				//args[2] = start/end
 				content = readData(file);

				if (args[2] == "start")
 				{
 					content = content + "QUESTIONÁRIO " + args[1] + " INICIO," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				}

 				if (args[2] == "end")
 				{
					content = content + "QUESTIONÁRIO " + args[1] + " FIM," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				}
 				writeData(content, file);
 				break;

 				case "chat":
				//plugin command: write chat args[1] args[2]
				//args[1] = TipoDialogo
				//args[2] = start/end
 				content = readData(file);
 				
				if (args[2] == "start")
				{
					content = content + "DIÁLOGO " + args[1] + " INICIO," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
				}

				if (args[2] == "end")
				{
					content = content + "DIÁLOGO " + args[1] + " FIM," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
				}
				writeData(content, file);
 				break;

 				case "mathemathics":
 				//plugin command: write mathemathics args[1]
				//args[1] = TipoOpinião
 				content = readData(file); 		
 				content = content + "MATEMÁTICA," + args[1] + "\r\n";
 				writeData(content, file);
 				break;

 				case "easterEgg":
 				//plugin command: write easterEgg args[1]
				//args[1] = start/end
 				content = readData(file); 		

 				if (args[1] == "start")
 				{
 					content = content + "ENCONTROU," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				}

 				if (args[1] == "end")
 				{
 					content = content + "CHARADAS TOTAL," + "10" + "\r\n";
 					content = content + "CHARADAS ACERTOS," + $gameVariables.value(38) + "\r\n";
 					content = content + "CHARADAS ERROS," + $gameVariables.value(37) + "\r\n";
 					content = content + "FINALIZOU," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				}
 				writeData(content, file);
 				break;

 				case "stage":
 				//plugin command: write stage args[1] args[2]
				//args[1] = TipoEstagio
				//args[2] = start/end
 				content = readData(file);

 				if (args[2] == "start")
 				{
 					content = content + "ESTÁGIO " + args[1] + " INICIO," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				}

 				if (args[2] == "end")
 				{
 					content = content + "MONSTROS TOTAL," + $gameVariables.value(32) + "\r\n";
	 				content = content + "MONSTROS FUGAS," + $gameVariables.value(33) + "\r\n";
	 				content = content + "MONSTROS VITORIA," + $gameVariables.value(34) + "\r\n";
	 				content = content + "CURAS," + $gameVariables.value(35) + "\r\n";
	 				content = content + "RESS," + $gameVariables.value(36) + "\r\n";
	 				content = content + "ESTÁGIO " + args[1] + " FIM," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				}
 				writeData(content, file);
 				break;

 				case "forceEnd":
 				//plugin command: write forceEnd
 				content = readData(file);
 				content = content + "MONSTROS TOTAL," + $gameVariables.value(32) + "\r\n";
 				content = content + "MONSTROS FUGAS," + $gameVariables.value(33) + "\r\n";
 				content = content + "MONSTROS VITORIA," + $gameVariables.value(34) + "\r\n";
 				content = content + "CURAS," + $gameVariables.value(35) + "\r\n";
 				content = content + "RESS," + $gameVariables.value(36) + "\r\n";
 				content = content + "INTERROMPIDO," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				writeData(content, file);
 				break;

 				case "end":
 				//plugin command: write end
 				content = readData(file);
 				content = content + "FIM," + getTimeFormatted($gameVariables.value(26), $gameVariables.value(27), $gameVariables.value(28)) + "\r\n";
 				writeData(content, file);
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

 function getTimeFormatted (hour, minute, second)
 {
 	return getTime(hour) + ":" + getTime(minute) + ":" getTime(second);
 };

 function getTime (interval)
 {
 	return interval < 10 ? ("0" + interval) : interval;
 };