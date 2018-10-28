/*:
 * @plugindesc Questionário Usabilidade 
 * @author Juliane Cristina
 *
 * @help
 *
 */

 (function() 
 {
 	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
 	Game_Interpreter.prototype.pluginCommand = function(command, args) 
 	{
 		_Game_Interpreter_pluginCommand.call(this, command, args); 

 		var content = "KEY,VALUE\r\n"; 			

 		if(command == "QU") 
 		{ 
 			var dif = ["matemática", "adição", "subtração", "multiplicação", "divisão", "matemática"];

 			var questions = [
			"1.O quão fácil foi jogar esse jogo?",
			"2.O quanto você gostou desse jogo?",
			"3.O quão fácil foi aprender a jogar esse jogo?",
			"4.Você indicaria esse jogo para seus amigos?",
			"5.Você sentiu dificuldade em jogar?",
			"6.Esse jogo estimulou você a gostar de matemática?",
			"7.As explicações que existem nesse jogo foram*suficientes para você conseguir jogar?",
			"8.Esse jogo contribuiu para o seu aprendizado em matemática?",
			"9.Depois de jogar...*Você acredita que é possível gostar de matemática*através de jogos de computador/celular?",
			"10.Esse jogo melhorou a sua compreensão sobre as*operações básicas de matemática?",
			"11.Você acha que depois de jogar ficou mais fácil resolver*as operações de " + dif[$gameVariables.value(40)] + "?",
			"12.Depois de jogar...*Você acredita que é possível aprender matemática*através de jogos de computador/celular?",
			"13.Esse jogo deu mais motivação para você aprender matemática?"
 			];

 			var choices = [
			["Totalmente fácil", "Muito fácil", "Meio fácil", "Pouco fácil", "Nada fácil"],
			["Muito", "Médio", "Pouco", "Nada"],
			["Totalmente fácil", "Muito fácil", "Meio fácil", "Pouco fácil", "Nada fácil"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"]
			];

 			var counter = Number(args[0]);
 			var file = $gameActors.actor(5).name().toUpperCase();

			$gameMap._interpreter.setupChoices([choices[counter]], -1, -1);
			$gameMessage.add(questions[counter].replace("*", "\n"));
			this.setWaitMode('message');	 		

			$gameMessage.setChoiceCallback(function(responseIndex) 
			{	 				
				setTimeout(function()
				{
					content = readData(file); 			
					content = content + questions[counter].replace("*", " ") + ", " + choices[counter][responseIndex] + "\r\n";
					writeData(content, file);	 						
				}, 1);
			});				
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