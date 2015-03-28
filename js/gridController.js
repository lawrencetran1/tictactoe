// add draw line through winning combination
// add paper scissor rock to see who goes first
// add ninja animation
// change bamboo grid to japanese window grid
// add chat
// add firebase backend


// IIFE
(function(){

	angular
		.module('myApp')
		.controller('GridController', GridController);

		function GridController($timeout) {  // pass $timeout service in order to delay clearGrid function

			// capture variable and initialize variables
			var self = this;

			self.tracker = {
				p1turn: true, 	// initialize p1turn variable to check whose turn it is
				p2turn: false,	// initialize p2turn variable to check whose turn it is
				p1wins: null, 	// initialize p1wins variable to display flash screen when true
				p2wins: null, 	// initialize p2wins variable to display flash screen when true
				tie: null, 	  	// initialize tie variable to display flash screen when true
				p1score: 0,   	// initialize p1score variable to track p1 score -> bind to html
				p2score: 0,   	// initialize p2score variable to track p2 score -> bind to html
				winner: null  	// intialize winner variable to be able to clear grid once game is over
			}

			var elements = [null,null,null,null,null,null,null,null,null];  // initalize elements array to insert move in proper index

			var grid = [						// initialize 3x3 grid to insert corresponding elements into their corresponding position
							[null,null,null],	// top row
							[null,null,null],   // middle row
							[null,null,null]    // bottomk row
						];

			var counter = 0;	// when counter hits 9 and there is no winner, then it is a tie game

			self.turn = 1;		// Player 1 turn is 1 and Player 2 turn is 2

			self.squares = [
								{id: 'square1', used: false, player: null},		// top left square
								{id: 'square2', used: false, player: null},		// top middle square
								{id: 'square3', used: false, player: null},		// top right square
								{id: 'square4', used: false, player: null},		// middle left square
								{id: 'square5', used: false, player: null},		// middle square
								{id: 'square6', used: false, player: null},		// middle right square
								{id: 'square7', used: false, player: null},		// bottom left square
								{id: 'square8', used: false, player: null},		// bottom middle square
								{id: 'square9', used: false, player: null}		// bottom right square
							];

			self.click = function($index) {
				
				var square = self.squares[$index];	// create square variable using $index to select it

				if (square.used) return;  // check if the square is used, if true...exit function

				square.used = true;  // when square is clicked, change used property to true, and set player property to 'x' or 'o'

				if (self.tracker.p1turn) {				// if player 1's turn is true
					square.player = 'X';				// set square's player property to 'X' -> bind to html
					elements.splice($index, 1, 'X');	// remove null from square's index and insert 'X'
					self.tracker.p1turn = false;		// set player 1 turn to false
					self.tracker.p2turn = true;			// set player 2 turn to true
				}

				else if (self.tracker.p2turn) {			// if player 2's turn is true
					square.player = 'O';				// set square's player property to 'O' -> bind to html
					elements.splice($index, 1, 'O');	// remove null from square's index and insert 'O'
					self.tracker.p2turn = false;		// set player 2 turn to false
					self.tracker.p1turn = true;			// set player 1 turn to true
				}

				counter++;  	// increment counter on each click, if counter == 9, then it's a tie game

				tracker();		// call tracker function on each click to update grid on each click
				getWinner();	// call getWinner function on each click to check for winner on each click

			}

			// Create function that shows current state of the grid when click() is called
			function tracker() {

				// Convert array into 3x3 matrix
				grid[0][0] = elements[0];  // top row
				grid[0][1] = elements[1];  // top row
				grid[0][2] = elements[2];  // top row
				grid[1][0] = elements[3];  // middle row
				grid[1][1] = elements[4];  // middle row
				grid[1][2] = elements[5];  // middle row
				grid[2][0] = elements[6];  // bottom row
				grid[2][1] = elements[7];  // bottom row
				grid[2][2] = elements[8];  // bottom row

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

				if (self.tracker.winner == 1) {			// if player 1 wins...
					self.tracker.p1score++;				// increment score for player 1
					self.tracker.p1wins = true;			// set p1wins to true to display Player 1 Wins in div with ng-class
					$timeout(clearGrid, 1000);			// clear grid after 1 second
				}

				else if (self.tracker.winner == 2) {	// if player 2 wins...
					self.tracker.p2score++;				// increment score for player 2
					self.tracker.p2wins = true;			// set p2wins to true to display Player 2 Wins in div with ng-class
					$timeout(clearGrid, 1000);			// clear grid after 1 second
				}

				else if (self.tracker.winner === null && counter == 9) {		// in there is no winner and counter is 9...
					self.tracker.tie = true;									// set tie to true to display Tie Game in div with ng-class
					$timeout(clearGrid, 1000);									// clear grid after 1 second
				}

			};


			// reset everything!!!!!!!!!!!!!!!!
			function clearGrid() {
				self.tracker.p1wins = null;
				self.tracker.p2wins = null;
				self.tracker.tie = null;
				self.tracker.winner = null;
				self.squares.forEach(function(square) {		// loop through each square and set player to null and used to false
					square.player = null;
					square.used = false;
				});
				counter = 0;
				elements = [null,null,null,null,null,null,null,null,null];
				grid = [
								[null,null,null],
								[null,null,null],
								[null,null,null]
						];
			};


		};


})();