// bug: if idle then getWinner doesn't run correctly
// add draw line through winning combination
// add ninja animation
// change bamboo grid to japanese window grid
// add chat
// add firebase backend
// fix checkbox
// add bombs ~ 33% chance of hitting one, lose turn when stepping on a bomb
// limit ng-repeat to self.select.count -> should change grid accordingly
// when controller loads it prompts for username, store username in firebase to track who's turn it isTrusted


// IIFE
(function(){

	angular
		.module('myApp')
		.controller('GridController', GridController);

		GridController.$inject = ['$firebaseArray', '$firebaseObject', '$timeout'];		

		function GridController($firebaseArray, $firebaseObject, $timeout) {  				// pass $timeout service in order to delay clearGrid function
			// var choice = prompt("Do you want to be X or O?");
			var GAME_LOCATION = 'https://larry-firebase.firebaseio.com/gamegrid';
			var self = this;													// capture variable
			self.squares = getSquares();							// retrieve array of squares from firebase
			self.tictactoe = getGame();								// retrieve tictactoe object from firebase
			self.id = null;
			// initalize elements array to insert move in proper index
			self.elements = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']; 
			self.tictactoe.counter = 0;		// when counter hits 9 and there is no winner, then it is a tie game

			function getSquares() {
				var ref = new Firebase(GAME_LOCATION + '/squares');
				var squares = $firebaseArray(ref);
				return squares;
			};

			function getGame() {
				var ref = new Firebase(GAME_LOCATION + '/tictactoe');
				var game = $firebaseObject(ref);
				return game;
			};

			(function(){
				var gameRef = new Firebase('https://larry-firebase.firebaseio.com/gamegrid');
				console.log('test')
				gameRef.once("value", function(snapshot) {
					if (typeof(snapshot.val().player1)==="undefined") {
						var player1 = new Player('Player 1', 'X', 0, false, false);
						var player1Ref = gameRef.child('player1');
						player1Ref.update(player1);
						self.id = 'X';
					}
					else if (typeof(snapshot.val().player1)==="object" && typeof(snapshot.val().player2)==="undefined" && self.id===null) {
						var player2 = new Player('Player 2', 'O', 0, false, false);
						var player2Ref = gameRef.child('player2');
						player2Ref.update(player2);
						self.id = 'O';
					}
				});
			})();

			function Player(name, piece, score, turn, won) {
				this.name = name;
				this.piece = piece;
				this.score = score;
				this.turn = turn;
				this.won = won;
			}

			self.click = function($index) {
				var square = self.squares[$index];				// create square variable using $index to select it
				if (!square.player) {
					if (self.tictactoe.p1turn === true && self.id === 'X') {							  // if player 1's turn is true
						square.player = 'X';																							// set square's player property to 'X' -> bind to html
						self.elements.splice($index, 1, 'X');															// remove null from square's index and insert 'X'
						self.tictactoe.p1turn = false;
						self.tictactoe.p2turn = true;
					}
					else if (self.tictactoe.p2turn === true && self.id === 'O') {					// if player 2's turn is true
						square.player = 'O';																							// set square's player property to 'O' -> bind to html
						self.elements.splice($index, 1, 'O');															// remove null from square's index and insert 'O'
						self.tictactoe.p2turn = false;
						self.tictactoe.p1turn = true;
					}
					self.squares.$save(square);
					self.tictactoe.$save(self.elements);
					self.tictactoe.$save();
					self.tictactoe.counter++;  								// increment counter on each click, if counter == 9, then it's a tie game
					tracker();																// call tracker function on each click to update grid on each click
					getWinner();															// call getWinner function on each click to check for winner on each click
				}
			};

			self.changeGrid = function(num) {					// use parameter passed from ng-click
				self.clearGrid();												// clear grid each time grid is changed			
				self.gridSize = num;										// set grid size to number of squares passed from ng-click parameter
				if (num == 9) {
					self.tictactoe.gridx3 = true;
					self.tictactoe.gridx4 = false;
					self.tictactoe.gridx5 = false;
					self.tictactoe.gridSize = 9;
				}
				else if (num == 16) {
					self.tictactoe.gridx4 = true;
					self.tictactoe.gridx5 = false;
					self.tictactoe.gridx3 = false;
					self.tictactoe.gridSize = 16;
				}
				else if (num == 25) {
					self.tictactoe.gridx5 = true;
					self.tictactoe.gridx4 = false;
					self.tictactoe.gridx3 = false;
					self.tictactoe.gridSize = 25;
				}
				self.tictactoe.$save()
			};

			// Create function that shows current state of the grid when click() is called
			function tracker() {

				var elementsCopy = [];																// initialize local empty array each time function is called
				self.elements.forEach(function(ele) {									// for each element of the self.elements array
					elementsCopy.push(ele);															// push the element into elementsCopy
				});
				var newGrid = [];																			// initialize local empty array that will act as the updated grid
				var combos = [];																			// initialize empty array to house all the different combinations

				if (self.tictactoe.gridx3) {
			  	while (elementsCopy.length - 16) {
			  		newGrid.push(elementsCopy.splice(0,3));
			  	}
				}
				else if (self.tictactoe.gridx4) {
					while (elementsCopy.length - 9) {
						newGrid.push(elementsCopy.splice(0,4));
					}
				}
				else if (self.tictactoe.gridx5) {
					while (elementsCopy.length) {
						newGrid.push(elementsCopy.splice(0,5));
					}
				}

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

				// reverses grid to get other diagonal
				var reversedGrid = newGrid.reverse();
				var diagRightToLeft = transformArray(reversedGrid, reversedGrid.length, 'diagLeftToRight')
				combos.push(diagRightToLeft.join(''));

				// Loop through combinations to check if O or X won and set winMsg accordingly
				for (var i = 0; i < combos.length; i++) {
					if (self.tictactoe.gridSize == 9) {
						if (combos[i] === 'XXX') {
							self.tictactoe.winner = 1;
						}
						else if (combos[i] === 'OOO') {
							self.tictactoe.winner = 2;
						}
					}
					else if (self.tictactoe.gridSize == 16) {
						if (combos[i] === 'XXXX') {
							self.tictactoe.winner = 1;
						}
						else if (combos[i] === 'OOOO') {
							self.tictactoe.winner = 2;
						}
					}
					else if (self.tictactoe.gridSize == 25) {
						if (combos[i] === 'XXXXX') {
							self.tictactoe.winner = 1;
						}
						else if (combos[i] === 'OOOOO') {
							self.tictactoe.winner = 2;
						}
					}
					self.tictactoe.$save();
				};				
			
			};

			function transformArray(array, arrayLength, type) {
				var newArray = [];															// initalize empty array
				for (var i = 0; i < array.length; i++) {				// push in empty arrays into newArray.
					newArray.push([]);														// # of empty arrays depend on length of original array
				};

				if (type === 'rotate90') {											// 90 degree rotation will turn columns into rows and rows into columns
					for (var i = 0; i < array.length; i++) {
						for (var j = 0; j < array.length; j++) {
							newArray[j].push(array[i][j]);
						};
					};					
				}

				else if (type === 'diagLeftToRight') {					// pushes diagonal top left to bottom right into newArray
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

			// Create function to check winner. If there is a winner, reset the grid
			function getWinner() {

				if (self.tictactoe.winner == 1) {						// if player 1 wins...
					self.tictactoe.p1score++;									// increment score for player 1
					self.tictactoe.p1wins = true;							// set p1wins to true to display Player 1 Wins in div with ng-class
					$timeout(self.clearGrid, 1000);						// clear grid after 1 second
				}

				else if (self.tictactoe.winner == 2) {			// if player 2 wins...
					self.tictactoe.p2score++;									// increment score for player 2
					self.tictactoe.p2wins = true;							// set p2wins to true to display Player 2 Wins in div with ng-class
					$timeout(self.clearGrid, 1000);						// clear grid after 1 second
				}

				else if (self.tictactoe.winner === false && self.tictactoe.gridSize == 9 && self.tictactoe.counter == 9) {
					self.tictactoe.tie = true;
					$timeout(self.clearGrid, 1000);
				}
				else if (self.tictactoe.winner === false && self.tictactoe.gridSize == 16 && self.tictactoe.counter == 16) {
					self.tictactoe.tie = true;
					$timeout(self.clearGrid, 1000);
				}
				else if (self.tictactoe.winner === false && self.tictactoe.gridSize == 25 && self.tictactoe.counter == 25) {
					self.tictactoe.tie = true;
					$timeout(self.clearGrid, 1000);
				}
				self.tictactoe.$save();
			};


			// reset everything!!!!!!!!!!!!!!!!
			self.clearGrid = function() {
				self.tictactoe.p1wins = false;
				self.tictactoe.p2wins = false;
				self.tictactoe.tie = false;
				self.tictactoe.winner = false;
				self.tictactoe.counter = 0;
				self.tictactoe.$save();
				self.elements = [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']; 
				for (var i = 0; i < self.squares.length; i++) {
					self.squares[i].player = null;
					self.squares[i].used = false;
					self.squares.$save(self.squares[i]);
				}
			};

			// reset scores
			self.clearScore = function() {
				self.tictactoe.p1score = 0;
				self.tictactoe.p2score = 0;
				self.tictactoe.$save();
			}

			var speed = 10;
  		var topDon = 0;
  		var topRaf = 0;
  		var fireCount1 = 40;
  		var fireCount2 = 40;
			var don = document.getElementById('don');
			var rafael = document.getElementById('rafael');
			var bullet1 = document.createElement('div');
			var bullet2 = document.createElement('div');
  		bullet1.className = 'bullet1';
  		bullet2.className = 'bullet2';
			function moveDonDown() {
				topDon += speed;
				if (topDon > 190) {
					topDon = 190;
				}
				else {
					don.style.top = topDon + 'px';
				}
			};

			function moveDonUp() {
				console.log(rafael.offsetTop);
				topDon -= speed;
				if (topDon < 0) {
					topDon = 0;
				}
				else {
					don.style.top = topDon + 'px';
				}
			};
			function moveRafDown() {
				console.log(rafael.offsetTop);
				topRaf += speed;
				if (topRaf > 190) {
					topRaf = 190;
				}
				else {
					rafael.style.top = topRaf + 'px';
				}
			};

			function moveRafUp() {
				topRaf -= speed;
				if (topRaf < 0) {
					topRaf = 0;
				}
				else {
					rafael.style.top = topRaf + 'px';
				}
			};

			function shootRaf() {
				rafael.appendChild(bullet1);
				// rafael.style.background = 'url(shoot.gif)';
				// rafael.style.width = '61px';
				bullet1.style.display = 'block';
				fireCount1 += 60;
				bullet1.style.marginLeft = fireCount1 + 'px';
				if (fireCount1 > 775) {fireCount1 = 40}
			};

			function shootDon() {
				don.appendChild(bullet2);
				// rafael.style.background = 'url(shoot.gif)';
				// rafael.style.width = '61px';
				bullet2.style.display = 'block';
				fireCount2 -= 60;
				bullet2.style.marginLeft = fireCount2 + 'px';
				if (fireCount2 < -740 ) {fireCount2 = 40}
			};	

			document.onkeydown = function(event) {
				if (event.keyCode == 40) {
					moveDonDown();
					console.log(rafael.offsetLeft, rafael.offsetTop, bullet2.offsetLeft, bullet2.offsetTop);
				}
				else if (event.keyCode == 38) {
					moveDonUp();
					console.log(rafael.offsetLeft, rafael.offsetTop, bullet2.offsetLeft, bullet2.offsetTop);
				}
				else if (event.keyCode == 83) {
					moveRafDown();
					console.log(rafael.offsetLeft, rafael.offsetTop, bullet2.offsetLeft, bullet2.offsetTop);
				}
				else if (event.keyCode == 87) {
					moveRafUp();
					console.log(rafael.offsetLeft, rafael.offsetTop, bullet2.offsetLeft, bullet2.offsetTop);
				}
				else if (event.keyCode == 68) {
					shootRaf();
					console.log(rafael.offsetLeft, rafael.offsetTop, bullet2.offsetLeft, bullet2.offsetTop);
				}
				else if (event.keyCode == 37) {
					shootDon();
					console.log(rafael.offsetLeft, rafael.offsetTop, bullet2.offsetLeft, bullet2.offsetTop);
					if (bullet2.offsetLeft == -740) {console.log('ok')}
				}
			};

			document.onkeyup = function(event) {
		    // bullet1.style.display = 'none';
		    // bullet2.style.display = 'none';
		    // bullet1.style.marginLeft = 70 + 'px';
		    // bullet2.style.marginRight = 70 + 'px';
		    // fireCount1 = 40;
		    // fireCount2 = 40;
			};

		};


})();