// IIFE
(function(){

	angular
		.module('myApp')
		.controller('GridController', GridController);

		function GridController($timeout) {

			// capture variable and initialize variables
			var self = this;

			self.tracker = {
				p1wins: null,
				p2wins: null,
				tie: null,
				p1score: 0,
				p2score: 0,
				winner: null,
				gameover: false
			}

			// Initialize grid with null in each spot
			var elements = [null,null,null,null,null,null,null,null,null];
			var grid = [
							[null,null,null],
							[null,null,null],
							[null,null,null]
						];

			var counter = 0;

			// Player 1 turn is 1 and Player 2 turn is 2
			self.turn = 1;

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
				
				var square = self.squares[$index];

				// check if the square is used, if true...exit function
				if (square.used) return;

				// when square is clicked, change used property to true, and set player property to 'x' or 'o'
				self.squares[$index].used = true;

				if (self.turn == 1) {
					square.player = 'X';
					elements.splice($index, 1, 'X');
					self.turn = 2;
				}
				else if (self.turn == 2) {
					square.player = 'O';
					elements.splice($index, 1, 'O');
					self.turn = 1;
				}
				// console.log(elements);

				// increment counter on each click
				counter++;

				// Call tracker function and getWinner function on each click to continuously check for winner
				tracker();
				getWinner();

			}

			// Create function that shows current state of the grid when click() is called
			function tracker() {

				// Convert array into 3x3 matrix
				grid[0][0] = elements[0];
				grid[0][1] = elements[1];
				grid[0][2] = elements[2];
				grid[1][0] = elements[3];
				grid[1][1] = elements[4];
				grid[1][2] = elements[5];
				grid[2][0] = elements[6];
				grid[2][1] = elements[7];
				grid[2][2] = elements[8];

				// Parse result of grid into a string
				var topRow 	       = grid[0].join('');
				var middleRow      = grid[1].join('');
				var bottomRow      = grid[2].join('');
				var leftCol        = grid[0][0] + grid[1][0] + grid[2][0];
				var middleCol      = grid[0][1] + grid[1][1] + grid[2][1];
				var rightCol       = grid[0][2] + grid[1][2] + grid[2][2];
				var diagTopLeft    = grid[0][0] + grid[1][1] + grid[2][2];
				var diagTopRight   = grid[0][2] + grid[1][1] + grid[2][0];

				// Insert each result into an array
				var combinations = [topRow, middleRow, bottomRow, leftCol, middleCol, rightCol, diagTopLeft, diagTopRight];

				// Loop through combinations to check if O or X won and set winMsg accordingly
				for (var i = 0; i < combinations.length; i++) {
					if (combinations[i] === 'XXX') {
						self.tracker.winner = 1;
					}
					else if (combinations[i] === 'OOO') {
						self.tracker.winner = 2;
					}
				};				
			
			};

			// Create function to check winner. If there is a winner, reset the grid
			function getWinner() {

				if (self.tracker.winner == 1) {
					self.tracker.p1score++;
					self.tracker.p1wins = true;
					self.tracker.gameover = true;
					$timeout(clearGrid, 1000);
				}
				else if (self.tracker.winner == 2) {
					self.tracker.p2score++;
					self.tracker.p2wins = true;
					self.tracker.gameover = true;
					$timeout(clearGrid, 1000);
				}
				else if (self.tracker.winner === null && counter == 9) {
					self.tracker.tie = true;
					self.tracker.gameover = true;
					$timeout(clearGrid, 1000);
				}

			};

			function clearGrid() {
				self.tracker.p1wins = false;
				self.tracker.p2wins = false;
				self.tracker.tie = false;
				self.tracker.gameover = false;
				self.squares.forEach(function(ele) {
					ele.used = false;
				});
			};


		};


})();