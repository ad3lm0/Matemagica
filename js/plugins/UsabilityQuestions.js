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
 			"1. O quão fácil foi jogar esse jogo?",
 			"2. O quanto você gostou desse jogo?",
 			"3. O quão fácil foi aprender a jogar esse jogo?",
 			"4. Você indicaria esse jogo para seus amigos?",
 			"5. Você sentiu dificuldade em jogar?",
 			"6. Esse jogo estimulou você a gostar de matemática?",
 			"7. As explicações que existem nesse jogo foram suficientes_para você conseguir jogar?",
 			"8. Esse jogo contribuiu para o seu aprendizado em matemática?",
 			"9. Depois de jogar..._Você acredita que é possível gostar de matemática_através de jogos de computador/celular?",
 			"10. Esse jogo melhorou a sua compreensão sobre_as operações básicas de matemática?",
 			"11. Você acha que depois de jogar ficou mais fácil de_solucionar probleminhas de " + dif[$gameVariables.value(40)] + "?",
 			"12. Depois de jogar..._Você acredita que é possível aprender matemática_através de jogos de computador/celular?",
 			"13. Esse jogo deu mais motivação para você aprender matemática?",
 			"14. Qual desses elementos você acha que teve maior destaque no jogo?",
 			"15. Enquanto você jogava..._Foi encontrado algum erro no jogo?",
 			"16. Você precisou pedir ajuda aos monitores para_entender como o jogo funciona?",
 			"17. Quando estava jogando..._Você achou que o jogo foi tão empolgante que o_tempo pareceu passar mais rápido?",
 			"18. Você errou alguma operação no jogo?",
 			"19. Quando você errou..._O jogo te avisou de forma clara sobre o erro?",
 			"20. O jogo te mostrou qual foi o erro cometido_e qual seria a resposta certa?",
 			"21. Qual desses elementos você acha que não teve destaque no jogo?"
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
 			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
 			["Aventura matemágica", "Diálogos divertidos", "Ensino da matemática", "Personagens diferentes"],
 			["Sim", "Não"],
 			["Sim", "Não"],
 			["Sim", "Não"],
 			["Sim", "Não"],
 			["Sim", "Não"],
 			["Sim", "Não"],
 			["Aventura matemágica", "Diálogos divertidos", "Ensino da matemática", "Personagens diferentes"]
 			];

 			var counter = Number(args[0]);
 			var file = $gameActors.actor(5).name().toUpperCase();

 			if (counter == 20) { $gameSwitches.setValue(33, true); }

 			if ($gameSwitches.value(33))
 			{
	 			$gameMap._interpreter.setupChoices([choices[counter]], -1, -1);
 				$gameMessage.add(questions[counter].replace(/_/g, "\n"));
 				this.setWaitMode('message');	 		

	 			$gameMessage.setChoiceCallback(function(responseIndex) 
	 			{	 				
	 				setTimeout(function()
	 				{
	 					if (counter == 17 && responseIndex == 1) { $gameSwitches.setValue(33, false); }

	 					content = readData(file); 			
 								content = content + questions[counter].replace(/_/g, " ") + ", " + choices[counter][responseIndex] + "\r\n";
 								writeData(content, file);	 						
	 				}, 1);
	 			});	
 			} 
 			else
 			{
 				content = readData(file); 			
	 			content = content + questions[counter] + ", " + choices[counter][1] + "\r\n";
	 			writeData(content, file);
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