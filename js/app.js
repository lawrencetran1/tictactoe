// draw line through winning line
// incorporate constructor function
// add brush stroke to grid
// add tally mark for scores
// add animaation on score
// track whose turn it is
// who goes first
// track stats


(function(){

	var tally = document.getElementById('tally');

	// Initialze variables
	var squares = document.getElementsByClassName('square');
	var p1score = document.getElementById('p1score');
	var p2score = document.getElementById('p2score');
	var star1 = document.getElementById('star1');
	var star2 = document.getElementById('star2');
	// var positions = [];
	// var x = [];
	// var y = [];
	var winIndex = null;
	// var winningCoords = [];

	// Initialize grid with null in each spot
	var grid = [[null,null,null],
				[null,null,null],
				[null,null,null]];

	var winMsg = null;
	var counter = 0;

	// Player 1 = 'O' and Player 2 = 'X'
	var tictactoe = {
		player1: true, 
		player2: false,
		p1score: 0,
		p2score: 0
	};

	// IIFE
	(function(){

		// var element = document.getElementById('some-id');
		// var position = element.getBoundingClientRect();
		// var x = position.left;
		// var y = position.top;

		// Add add event lisenter to each square
		// Store x and y coordinates in array
		for (var i = 0; i < squares.length; i++) {
			squares[i].addEventListener('click', click);
			// positions.push(squares[i].getBoundingClientRect());
			// x.push(positions[i].left);
			// y.push(positions[i].top);
		};

	})();

	// Create click function which is called on event listener 'click'
	// When square is clicked, if value of square is true, then exit loop
	// If Player 1 is active, insert 'O', set player1 to false and player2 to true
	// If Player 2 is active, insert 'X', set player2 to false and player1 to true
	function click() {

		// create capture variable
		var self = this;

		// if there is a value, exit function in order to not append additional text to div
		if (self.value) {return}

		if (tictactoe.player1) {
			self.appendChild(document.createTextNode('O'));
			star1.className = 'hidden';
			star2.className = 'star';

			// Set value property to 'O' or 'X' in order to exit click function, (to stop function from clicking same square)
			self.value = 'O';
			tictactoe.player1 = false;
			tictactoe.player2 = true;

			// Depending on which ID# is clicked, set the corresponding grid
				 if (self.id == 'box1') {grid[0][0] = 'O'}
			else if (self.id == 'box2') {grid[0][1] = 'O'}
			else if (self.id == 'box3') {grid[0][2] = 'O'}
			else if (self.id == 'box4') {grid[1][0] = 'O'}
			else if (self.id == 'box5') {grid[1][1] = 'O'}
			else if (self.id == 'box6') {grid[1][2] = 'O'}
			else if (self.id == 'box7') {grid[2][0] = 'O'}
			else if (self.id == 'box8') {grid[2][1] = 'O'}
			else if (self.id == 'box9') {grid[2][2] = 'O'}
		
		}

		else if (tictactoe.player2) {
			self.appendChild(document.createTextNode('X'));
			star2.className = 'hidden';
			star1.className = 'star';

			// Set value property to 'O' or 'X' in order to exit function, see if (self.value) return at top of click function
			self.value = 'X';
			tictactoe.player2 = false;
			tictactoe.player1 = true;

				 if (self.id == 'box1') {grid[0][0] = 'X'}
			else if (self.id == 'box2') {grid[0][1] = 'X'}
			else if (self.id == 'box3') {grid[0][2] = 'X'}
			else if (self.id == 'box4') {grid[1][0] = 'X'}
			else if (self.id == 'box5') {grid[1][1] = 'X'}
			else if (self.id == 'box6') {grid[1][2] = 'X'}
			else if (self.id == 'box7') {grid[2][0] = 'X'}
			else if (self.id == 'box8') {grid[2][1] = 'X'}
			else if (self.id == 'box9') {grid[2][2] = 'X'}
		}

		// increment counter on each click
		counter++;

		// Call tracker function and getWinner function on each click to continuously check for winner
		tracker();
		getWinner();
	};

	// Create function that shows current state of the grid when click() is called
	function tracker() {

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
			if (combinations[i] === 'OOO') {
				winMsg = 'Player 1 wins';
				winIndex = combinations.indexOf(combinations[i]);
			}
			else if (combinations[i] === 'XXX') {
				winMsg = 'Player 2 wins';
				winIndex = combinations.indexOf(combinations[i]);
			}
		};
			
	};

	// Create function to check winner. If there is a winner, reset the grid
	function getWinner() {

		// var comboString = 
		// 	[
		// 		[ x[0], x[2], y[0], y[2] ], // topRow
		// 		[ x[3], x[5], y[3], y[5] ], // middleRow
		// 		[ x[6], x[8], y[6], y[8] ], // bottomRow
		// 		[ x[0], x[6], y[0], y[6] ], // leftCol
		// 		[ x[1], x[7], y[1], y[7] ], // middleCol
		// 		[ x[2], x[8], y[2], y[8] ], // rightCol
		// 		[ x[0], x[8], y[0], y[0] ], // diagTopLeft
		// 		[ x[2], x[6], y[2], y[6] ], // diagTopRight
		// 	];

		if (winMsg != null) {

			console.log('combo with index of ' + winIndex + ' won');

			alert(winMsg);

			if (winMsg === 'Player 1 wins') {
				tictactoe.p1score++;
			}

			else if (winMsg === 'Player 2 wins') {
				tictactoe.p2score++
			}

			// Display score in HTML
			// console.log(tictactoe.p1score, tictactoe.p2score);
			p1score.innerHTML = tictactoe.p1score;
			p2score.innerHTML = tictactoe.p2score;

			clear();
		}

		// if counter reaches 9, then it's a time game
		else if (counter == 9 && winMsg === null) {
			alert('Tie Game');
			clear();
		}

	};

	// Create function to clear grid
	function clear() {
			
			// Reset winMsg to null when game is over
			winMsg = null;

			// reset innerHTML and value of each square
			for (var i = 0; i < squares.length; i++) {
				squares[i].innerHTML = "";
				squares[i].value = null;
			}

			// reset grid to empty array
			grid = [[null,null,null],
					[null,null,null],
					[null,null,null]];

			// reset counter
			counter = 0;
	};

})();