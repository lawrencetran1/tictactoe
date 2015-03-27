// IIFE
(function(){

	angular
		.module('myApp')
		.controller('GridController', GridController);

		function GridController() {

			// capture variable and initialize variables
			var self = this;

			// Player 1(x)'s turn is 0 and Player 2(o)'s turn is 1
			self.turn = 0;

			self.squares = [
								{id: 'square1', used: false, player: null},
								{id: 'square2', used: false, player: null},
								{id: 'square3', used: false, player: null},
								{id: 'square4', used: false, player: null},
								{id: 'square5', used: false, player: null},
								{id: 'square6', used: false, player: null},
								{id: 'square7', used: false, player: null},
								{id: 'square8', used: false, player: null},
								{id: 'square9', used: false, player: null}
							];

			self.click = function($index) {
				
				console.log(self.squares[$index].id);
				console.log(self.turn)

				// when square is clicked, change used property to true, and set player property to 'x' or 'o'
				self.squares[$index].used = true;

				if (self.turn == 0) {
					self.squares[$index].player = 'X';
					self.turn = 1;
				}
				else if (self.turn == 1) {
					self.squares[$index].player = 'O';
					self.turn = 0;
				}

			}

		};


})();