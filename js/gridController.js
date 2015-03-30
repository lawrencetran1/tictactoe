// add draw line through winning combination
// add paper scissor rock to see who goes first
// add ninja animation
// change bamboo grid to japanese window grid
// add chat
// add firebase backend
// fix checkbox
// add bombs ~ 33% chance of hitting one, lose turn when stepping on a bomb
// limit ng-repeat to self.select.count -> should change grid accordingly



// IIFE
(function(){

	angular
		.module('myApp')
		.controller('GridController', GridController);

		function GridController($timeout) {  // pass $timeout service in order to delay clearGrid function

			var self = this;	// capture variable

			self.select = [
				{id: '3x3 Grid', active: true},		// initialize grid sizes, 3x3 is default
				{id: '4x4 Grid', active: false},
				{id: '5x5 Grid', active: false}
			];

			self.gridSize = 9;						// track current grid size by counting number of squares

			self.changeGrid = function(num) {		// use parameter passed from ng-click
				clearGrid();						// clear grid each time grid is changed			
				self.gridSize = num;				// set grid size to number of squares passed from ng-click parameter
				if (num == 9) {
					self.select[0].active = true;	// set grid active state to true to use ng-class to change square sizes	
					self.select[1].active = false;
					self.select[2].active = false;
				}
				else if (num == 16) {
					self.select[1].active = true;
					self.select[0].active = false;
					self.select[2].active = false;
				}
				else if (num == 25) {
					self.select[2].active = true;
					self.select[0].active = false;
					self.select[1].active = false;
				}
			};

			self.tracker = {
				p1turn: true, 	// initialize p1turn variable to check whose turn it is
				p2turn: false,	// initialize p2turn variable to check whose turn it is
				p1wins: null, 	// initialize p1wins variable to display flash screen when true
				p2wins: null, 	// initialize p2wins variable to display flash screen when true
				tie: null, 	  	// initialize tie variable to display flash screen when true
				p1score: 0,   	// initialize p1score variable to track p1 score -> bind to html
				p2score: 0,   	// initialize p2score variable to track p2 score -> bind to html
				winner: null  	// intialize winner variable to be able to clear grid once game is over
			};

			self.roundZero = false;

			// initalize elements array to insert move in proper index
			self.elements = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']; 
		
			self.grid = [								// initialize grid to insert corresponding elements into their corresponding position
							[null,null,null,null,null],
							[null,null,null,null,null],
							[null,null,null,null,null],
							[null,null,null,null,null],
							[null,null,null,null,null]
						];

			self.counter = 0;	// when counter hits 9 and there is no winner, then it is a tie game

			self.turn = 1;		// Player 1 turn is 1 and Player 2 turn is 2

			self.squares = [
								{id: 'square1', used: false, player: null},
								{id: 'square2', used: false, player: null},
								{id: 'square3', used: false, player: null},
								{id: 'square4', used: false, player: null},
								{id: 'square5', used: false, player: null},
								{id: 'square6', used: false, player: null},
								{id: 'square7', used: false, player: null},
								{id: 'square8', used: false, player: null},
								{id: 'square9', used: false, player: null},
								{id: 'square10', used: false, player: null},
								{id: 'square11', used: false, player: null},
								{id: 'square12', used: false, player: null},
								{id: 'square13', used: false, player: null},
								{id: 'square14', used: false, player: null},
								{id: 'square15', used: false, player: null},
								{id: 'square16', used: false, player: null},
								{id: 'square17', used: false, player: null},
								{id: 'square18', used: false, player: null},
								{id: 'square19', used: false, player: null},
								{id: 'square20', used: false, player: null},
								{id: 'square21', used: false, player: null},
								{id: 'square22', used: false, player: null},
								{id: 'square23', used: false, player: null},
								{id: 'square24', used: false, player: null},
								{id: 'square25', used: false, player: null}
							];


			self.click = function($index) {
				// console.log('p1 turn: ' + self.tracker.p1turn, ' p2 turn: ' + self.tracker.p2turn);

				var square = self.squares[$index];	// create square variable using $index to select it

				if (square.used) return;  // check if the square is used, if true...exit function

				square.used = true;  // when square is clicked, change used property to true, and set player property to 'x' or 'o'

				if (self.tracker.p1turn) {				// if player 1's turn is true
					square.player = 'X';				// set square's player property to 'X' -> bind to html
					self.elements.splice($index, 1, 'X');	// remove null from square's index and insert 'X'
					self.tracker.p1turn = false;		// set player 1 turn to false
					self.tracker.p2turn = true;			// set player 2 turn to true
				}

				else if (self.tracker.p2turn) {			// if player 2's turn is true
					square.player = 'O';				// set square's player property to 'O' -> bind to html
					self.elements.splice($index, 1, 'O');	// remove null from square's index and insert 'O'
					self.tracker.p2turn = false;		// set player 2 turn to false
					self.tracker.p1turn = true;			// set player 1 turn to true
				}

				self.counter++;  		// increment counter on each click, if counter == 9, then it's a tie game

				tracker();				// call tracker function on each click to update grid on each click
				// getWinner();			// call getWinner function on each click to check for winner on each click

			}

			// Create function that shows current state of the grid when click() is called
			function tracker() {

				var elementsCopy = [];										// initialize local empty array each time function is called
				self.elements.forEach(function(ele) {						// for each element of the self.elements array
					elementsCopy.push(ele);									// push the element into elementsCopy
				});
				var newGrid = [];											// initialize local empty array that will act as the updated grid
				var combos = [];											// initialize empty array to house all the different combinations

				for (var i = 0; i < self.select.length; i++) {				// loop through all grid sizes (3 total)
					if (self.select[i].active === true) {					// make sure to only select active grid
						if (self.select[i].id === '3x3 Grid') {				// identify grid id: '3x3 Grid' 
							while(elementsCopy.length - 16) {				// Acts as a counter for 3x3 Grid, intial value is 9
								newGrid.push(elementsCopy.splice(0,3));	// remove 3 elements at a time which decreases count at same rate
							}												// and pushes 3 elements at a time into newGrid, while loop exits when count hits zero
						}
						else if (self.select[i].id === '4x4 Grid') {		// identify grid id: '4x4 Grid'
							while(elementsCopy.length - 9) {				// Acts as a counter for 4x4 Grid, intial value is 16
								newGrid.push(elementsCopy.splice(0,4));	// remove 4 elements at a time which decreases count at same rate
							}												// and pushes 4 elements at a time into newGrid, while loop exits when count hits zero
						}
						else if (self.select[i].id === '5x5 Grid') {		// identify grid id: '5x5 Grid'
							while(elementsCopy.length) {					// acts as a counter for 5x5 Grid, initial value is 25
								newGrid.push(elementsCopy.splice(0,5));	// and pushes 5 elements at a time into newGrid, while loop exits when count hits zero
							}
						}						
					}

				};

				// Push all rows into combos array -  >>>>>>>>>>>  WORKING!!! DO NOT DELETE THIS CODE BLOCK
				for (var i = 0; i < newGrid.length; i++) {
					for (var j = 0; j < newGrid[i].length; j++) {
						if (i == 0 && j == 0) {
							combos.push(newGrid[i].join(''));
						}
						else if (i == 1 && j == 0) {
							combos.push(newGrid[i].join(''));
						}
						else if (i == 2 && j == 0) {
							combos.push(newGrid[i].join(''));
						}
						else if (i == 3 && j == 0) {
							combos.push(newGrid[i].join(''));
						}
						else if (i == 4 && j == 0) {
							combos.push(newGrid[i].join(''));
						}
					}
				};

				// // Push all columns into combos array. Need to rotate newGrid array and use same for loop above to get combos for columns
				var rowToColumns = transformArray(newGrid, newGrid.length, 'rotate90');
				for (var i = 0; i < rowToColumns.length; i++) {
					for (var j = 0; j < rowToColumns[i].length; j++) {
						if (i == 0 && j == 0) {
							combos.push(rowToColumns[i].join(''));
						}
						else if (i == 1 && j == 0) {
							combos.push(rowToColumns[i].join(''));
						}
						else if (i == 2 && j == 0) {
							combos.push(rowToColumns[i].join(''));
						}
						else if (i == 3 && j == 0) {
							combos.push(rowToColumns[i].join(''));
						}
						else if (i == 4 && j == 0) {
							combos.push(rowToColumns[i].join(''));
						}
					}
				};

				// Push all diagonals into combos array.
				var diagLeftToRight = transformArray(newGrid, newGrid.length, 'diagLeftToRight');
				combos.push(diagLeftToRight.join(''));

				var reversedGrid = newGrid.reverse();
				var diagRightToLeft = transformArray(reversedGrid, reversedGrid.length, 'diagLeftToRight')
				combos.push(diagRightToLeft.join(''));

				console.log(combos);

				// calculate winning combinations
				// var row1 = newGrid[0][0] + newGrid[0][1] + newGrid[0][2] + newGrid[0][3] + newGrid[0][4];
				// var row2 = newGrid[1][0] + newGrid[1][1] + newGrid[1][2] + newGrid[1][3] + newGrid[1][4];
				// var row3 = newGrid[2][0] + newGrid[2][1] + newGrid[2][2] + newGrid[2][3] + newGrid[2][4];
				// var row4 = newGrid[3][0] + newGrid[3][1] + newGrid[3][2] + newGrid[3][3] + newGrid[3][4];
				// var row5 = newGrid[4][0] + newGrid[4][1] + newGrid[4][2] + newGrid[4][3] + newGrid[4][4];
				// var col1 = newGrid[0][0] + newGrid[1][0] + newGrid[2][0] + newGrid[3][0] + newGrid[4][0];
				// var col2 = newGrid[0][1] + newGrid[1][1] + newGrid[2][1] + newGrid[3][1] + newGrid[4][1];
				// var col3 = newGrid[0][2] + newGrid[1][2] + newGrid[2][2] + newGrid[3][2] + newGrid[4][2];
				// var col4 = newGrid[0][3] + newGrid[1][3] + newGrid[2][3] + newGrid[3][3] + newGrid[4][3];
				// var col5 = newGrid[0][4] + newGrid[1][4] + newGrid[2][4] + newGrid[3][4] + newGrid[4][4];
				// var diag1 = newGrid[2][0] + newGrid[3][1] + newGrid[4][2];
				// var diag2 = newGrid[1][0] + newGrid[2][1] + newGrid[3][2] + newGrid[4][3];
				// var diag3 = newGrid[0][0] + newGrid[1][1] + newGrid[2][2] + newGrid[3][3] + newGrid[4][4];
				// var diag4 = newGrid[0][1] + newGrid[1][2] + newGrid[2][3] + newGrid[3][4];
				// var diag5 = newGrid[0][2] + newGrid[1][3] + newGrid[2][4];
				// var diag6 = newGrid[2][0] + newGrid[1][1] + newGrid[0][2];
				// var diag7 = newGrid[3][0] + newGrid[2][1] + newGrid[1][2] + newGrid[0][3];
				// var diag8 = newGrid[4][0] + newGrid[3][1] + newGrid[2][2] + newGrid[1][3] + newGrid[0][4];
				// var diag9 = newGrid[4][1] + newGrid[3][2] + newGrid[2][3] + newGrid[1][4];
				// var diag10 = newGrid[4][2] + newGrid[3][3] + newGrid[2][4];

				// var combos = [row1, row2, row3, row4, row5, col1, col2, col3, col4, col5, diag1, diag2, diag3, diag4, diag5, diag6, diag7, diag8, diag9, diag10];

				// console.log(row1);

				// for (var i = 0; i < combos.length; i++) {
				// 	var combo = combos[i].split('');
				// 	for (var j = 0; j < combo.length; j++) {
				// 		if (combo[j] + combo[j+1] + combo[j+2] === 'XXX') {
				// 			console.log('X WINS');
				// 		}
				// 	}
				// }

				// for (var i = 0; i < combos.length; i++) {
				// 	var XXX = combos[i].split('').filter(filterX).join('');
				// 	var OOO = combos[i].split('').filter(filterO).join('');
				// 	console.log(XXX, OOO);
				// 	if (XXX === 'XXX') {
				// 		console.log('X WINS');
				// 		self.tracker.winner = 1;
				// 	}
				// 	else if (OOO === 'OOO') {
				// 		console.log('O WINS');
				// 		self.tracker.winner = 2;
				// 	}
				// }


				// // Convert array into 3x3 matrix
				self.grid[0][0] = self.elements[0];  // top row
				self.grid[0][1] = self.elements[1];  // top row
				self.grid[0][2] = self.elements[2];  // top row
				self.grid[1][0] = self.elements[3];  // middle row
				self.grid[1][1] = self.elements[4];  // middle row
				self.grid[1][2] = self.elements[5];  // middle row
				self.grid[2][0] = self.elements[6];  // bottom row
				self.grid[2][1] = self.elements[7];  // bottom row
				self.grid[2][2] = self.elements[8];  // bottom row

				// // Parse result of grid into a string
				var topRow 	       = self.grid[0].join('');
				var middleRow      = self.grid[1].join('');
				var bottomRow      = self.grid[2].join('');
				var leftCol        = self.grid[0][0] + self.grid[1][0] + self.grid[2][0];
				var middleCol      = self.grid[0][1] + self.grid[1][1] + self.grid[2][1];
				var rightCol       = self.grid[0][2] + self.grid[1][2] + self.grid[2][2];
				var diagTopLeft    = self.grid[0][0] + self.grid[1][1] + self.grid[2][2];
				var diagTopRight   = self.grid[0][2] + self.grid[1][1] + self.grid[2][0];

				// // Insert each result into an array
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

			function transformArray(array, arrayLength, type) {
				var newArray = [];										// initalize empty array
				for (var i = 0; i < array.length; i++) {				// push in empty arrays into newArray.
					newArray.push([]);									// # of empty arrays depend on length of original array
				};

				if (type === 'rotate90') {								// 90 degree rotation will turn columns into rows and rows into columns
					for (var i = 0; i < array.length; i++) {
						for (var j = 0; j < array.length; j++) {
							newArray[j].push(array[i][j]);
						};
					};					
				}

				else if (type === 'diagLeftToRight') {					
					for (var i = 0; i < array.length; i++) {
						for (var j = 0; j < array.length; j++) {
							if (i == j) {
								newArray[j].push(array[i][j]);
							}
						}
					}
				}

				return newArray;
			};		

			function diagonalArray(array, arrayLength) {
				var newArray = [];										// initalize empty array
				for (var i = 0; i < array.length; i++) {				// push in empty arrays into newArray.
					newArray.push([]);									// # of empty arrays depend on length of original array
				};

				for (var i = 0; i < array.length; i++) {
					for (var j = 0; j < array.length; j++) {
						if (i + j == 4) {
							newArray[j].push(array[i][j]);
						}
					}
				}				

				return newArray;
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

				else if (self.tracker.winner === null && self.counter == 9) {		// in there is no winner and counter is 9...
					self.tracker.tie = true;										// set tie to true to display Tie Game in div with ng-class
					$timeout(clearGrid, 1000);										// clear grid after 1 second
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
				self.counter = 0;
				self.elements = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']; 
				self.grid = [
							[null,null,null,null,null],
							[null,null,null,null,null],
							[null,null,null,null,null],
							[null,null,null,null,null],
							[null,null,null,null,null]
						];
			};

			var speed = 10;
  			var topCount = 0;
  			var leftCount = 0;
			var mike = document.getElementById('mike');
			function moveRight() {
				leftCount += speed;
				// animate();
				// Stop at right border
				if (leftCount > 260) {
					leftCount = 260;
				}
				else {
					mike.style.left = leftCount + 'px';
				}
			};

			function moveDown() {
				topCount += speed;
				// animate();

				// Stop at bottom border
				if (topCount > 190) {
					topCount = 190;
				}
				else {
					mike.style.top = topCount + 'px';
				}
			};

			function moveLeft() {
				leftCount -= speed;
				// animate();

				// Stop at left border
				if (leftCount < 0) {
					leftCount = 0;
				}
				else {
					mike.style.left = leftCount + 'px';
				}
			};

			function moveUp() {
				topCount -= speed;
				// animate();

				// Stop at top border
				if (topCount < 0) {
					topCount = 0;
				}
				else {
					mike.style.top = topCount + 'px';
				}
			};

			document.onkeydown = function(event) {

			// Move right
			if (event.keyCode === 39) {moveRight();}
			// Move down
			else if (event.keyCode === 40) {moveDown();}
			// Move left
			else if (event.keyCode === 37) {moveLeft();}
			// Move up
			else if (event.keyCode === 38) {moveUp();}
			// Shoot continuous fireball
			// else if (event.keyCode === 32) {shoot();}
			};			


		};


})();