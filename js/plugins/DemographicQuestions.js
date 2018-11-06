/*:
 * @plugindesc Questionário Demográfico 
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

 		if(command == "QD") 
 		{ 
 			var questions = [
 			"1. Qual a sua idade?",
			"2. Qual o seu sexo?",
			"3. Você sabe o que são jogos de RPG?",
			"4. Você já jogou (ou joga) jogos de RPG?",
			"5. Você gosta de jogos de RPG?",
			"6. Você já jogou (ou joga) jogos de RPG no computador/celular?",
			"7. O quanto você gosta de jogos de computador/celular?",
			"8. Você tem computador/celular?",
			"9. Você tem acesso ao computador/celular em casa?",
			"10. Você tem acesso à internet em casa?",
			"11. Qual o seu ano escolar?",
			"12. Você repetiu o #º ano escolar?",
			"13. O quanto você gosta de matemática?",
			"14. Você acredita que é possível gostar de matemática através_de jogos de computador/celular?",
			"15. Você pede ajuda para resolver as tarefas de matemática?",
			"16. O quanto você gosta das aulas de matemática?",
			"17. Você sabe o que são as quatro operações matemáticas?",
			"18. Você sente dificuldade para resolver alguma_operação matemática?",
			"19. Qual dessas operações você sente MAIS dificuldade?",
			"20. Qual dessas operações você sente MAIS facilidade?",
			"21. A sua última nota de matemática foi?",
			"22. Você acredita que é possível aprender matemática através_de jogos de computador/celular?",
			"23. Você gostaria de aprender matemática jogando_no computador/celular?"
 			];

 			var choices = [
			["idade"],
			["Feminino", "Masculino", "Não declarar"],
			["Sim", "Não"],
			["Sim", "Não"],
			["Sim", "Não"],
			["Sim", "Não"],
			["Muito", "Médio", "Pouco", "Nada"],
			["Sim", "Não"],
			["Sim", "Não"],
			["Sim", "Não"],
			["2º Ano", "3º Ano", "4º Ano", "5º Ano", "6º Ano"],
			["Sim", "Não"],
			["Muito", "Médio", "Pouco", "Nada"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Sim", "As vezes", "Não"],
			["Muito", "Médio", "Pouco", "Nada"],
			["Sim", "Não"],
			["Sim", "As vezes", "Não"],
			["Todas", "Adição", "Subtração", "Multiplicação", "Divisão", "Nenhuma"],
			["Todas", "Adição", "Subtração", "Multiplicação", "Divisão", "Nenhuma"],
			["Maior ou igual a 8", "Menor do que 8 e maior ou igual a 6", "Menor do que 6", "Não consigo lembrar"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"],
			["Com certeza", "Acho que sim", "Talvez", "Acho que não", "De jeito nenhum"]
 			];

 			var counter = Number(args[0]);
 			var file = $gameActors.actor(5).name().toUpperCase();

 			if (counter == 6) { $gameSwitches.setValue(33, true); }

 			if (counter == 0)
 			{
 				content = readData(file); 			
				content = content + questions[counter] + ", " + $gameVariables.value(30) + "\r\n";
				writeData(content, file);
 			}
 			else if ($gameSwitches.value(33))
 			{
	 			$gameMap._interpreter.setupChoices([choices[counter]], -1, -1);
	 			$gameMessage.add(questions[counter].replace(/_/g, "\n").replace("#", $gameVariables.value(31)));
	 			this.setWaitMode('message');	 		

	 			$gameMessage.setChoiceCallback(function(responseIndex) 
	 			{	 				
	 				setTimeout(function()
	 				{
	 					if (counter == 2 && responseIndex == 1) { $gameSwitches.setValue(33, false); }
	 					if (counter == 10) { $gameVariables.setValue(31, Number(choices[counter][responseIndex].charAt(0))); }
	 					if (counter == 18) { $gameVariables.setValue(40, Number(responseIndex)); }

	 					content = readData(file); 			
	 					content = content + questions[counter].replace(/_/g, " ").replace("#", $gameVariables.value(31)) + "," + choices[counter][responseIndex] + "\r\n";
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