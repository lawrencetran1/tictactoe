// draw line through winning line
// add brush stroke to grid
// add tally mark for scores
// add animaation on score
// track whose turn it is
// who goes first
// track stats


(function(){

// Declare global variables
var squares = document.getElementsByClassName('square');
var p1score = document.getElementById('p1');
var p2score = document.getElementById('p2');
var grid = [["","",""],["","",""],["","",""]];
var winner = null;

// Player 1 = 'O' and Player 2 = 'X'
var tictactoe = {
	player1: true, 
	player2: false,
	p1score: 0,
	p2score: 0
};

// Create click function which is called on event listener 'click'
// When square is clicked, if value of square is true, then exit loop
// If Player 1 is active, insert 'O', set tictactoe.player1 = false and tictactoe.player2 = true
// If Player 2 is active, insert 'X', set tictactoe.player2 = false and tictactoe.player1 = true
function click() {

	// create capture variable
	var self = this;

	// if there is a value, exit function in order to not append additional text to div
	if (self.value) {return}

	if (tictactoe.player1) {
		self.appendChild(document.createTextNode('O'));

		// Set value property to 'O' or 'X' in order to exit function, see if (self.value) return
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
	tracker();
	getWinner();
};

// Create function that shows current state of the grid when click() is called
function tracker() {

	var topRow 	       = grid[0].join('');
	var middleRow      = grid[1].join('');
	var bottomRow      = grid[2].join('');
	var leftCol        = grid[0][0] + grid[1][0] + grid[2][0];
	var middleCol      = grid[0][1] + grid[1][1] + grid[2][1];
	var rightCol       = grid[0][2] + grid[1][2] + grid[2][2];
	var diagTopLeft    = grid[0][0] + grid[1][1] + grid[2][2];
	var diagTopRight   = grid[0][2] + grid[1][1] + grid[2][0];
		
		 if (topRow       === 'OOO') {winner = 'O'}
	else if (middleRow    === 'OOO') {winner = 'O'}
	else if (bottomRow    === 'OOO') {winner = 'O'}
	else if (leftCol      === 'OOO') {winner = 'O'}
	else if (middleCol    === 'OOO') {winner = 'O'}
	else if (rightCol     === 'OOO') {winner = 'O'}
	else if (diagTopLeft  === 'OOO') {winner = 'O'}
	else if (diagTopRight === 'OOO') {winner = 'O'}
	else if (topRow       === 'XXX') {winner = 'X'}
	else if (middleRow    === 'XXX') {winner = 'X'}
	else if (bottomRow    === 'XXX') {winner = 'X'}
	else if (leftCol      === 'XXX') {winner = 'X'}
	else if (middleCol    === 'XXX') {winner = 'X'}
	else if (rightCol     === 'XXX') {winner = 'X'}
	else if (diagTopLeft  === 'XXX') {winner = 'X'}
	else if (diagTopRight === 'XXX') {winner = 'X'}
}

// Create function to check winner. If there is a winner, reset the grid
function getWinner() {

	if (winner) {

		alert('winner is ' + winner);

			 if (winner === 'O') {tictactoe.p1score++}
		else if (winner === 'X') {tictactoe.p2score++}

		// Display score in HTML
		console.log(tictactoe.p1score, tictactoe.p2score);
		p1score.innerHTML = tictactoe.p1score;
		p2score.innerHTML = tictactoe.p2score;

		// reset innerHTML of each square to empty string
		for (var i = 0; i < squares.length; i++) {
			squares[i].innerHTML = "";
			winner = null;
			squares[i].value = null;
		}

		// reset grid to empty array
		grid = [["","",""],["","",""],["","",""]];
	}

}

// Add add event lisenter to each square
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', click)
};





})();