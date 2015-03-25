(function(){

// Declare global variables
var squares = document.getElementsByClassName('square');
var p1score = document.getElementById('p1');
var p2score = document.getElementById('p2');
var tracker = [["","",""],["","",""],["","",""]];
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

	if (tictactoe.player1) {
		this.appendChild(document.createTextNode('O'));
		tictactoe.player1 = false;
		tictactoe.player2 = true;

			 if (this.id == 1) {tracker[0][0] = 'O'}
		else if (this.id == 2) {tracker[0][1] = 'O'}
		else if (this.id == 3) {tracker[0][2] = 'O'}
		else if (this.id == 4) {tracker[1][0] = 'O'}
		else if (this.id == 5) {tracker[1][1] = 'O'}
		else if (this.id == 6) {tracker[1][2] = 'O'}
		else if (this.id == 7) {tracker[2][0] = 'O'}
		else if (this.id == 8) {tracker[2][1] = 'O'}
		else if (this.id == 9) {tracker[2][2] = 'O'}
	
	}

	else if (tictactoe.player2) {
		this.appendChild(document.createTextNode('X'));
		tictactoe.player2 = false;
		tictactoe.player1 = true;

			 if (this.id == 1) {tracker[0][0] = 'X'}
		else if (this.id == 2) {tracker[0][1] = 'X'}
		else if (this.id == 3) {tracker[0][2] = 'X'}
		else if (this.id == 4) {tracker[1][0] = 'X'}
		else if (this.id == 5) {tracker[1][1] = 'X'}
		else if (this.id == 6) {tracker[1][2] = 'X'}
		else if (this.id == 7) {tracker[2][0] = 'X'}
		else if (this.id == 8) {tracker[2][1] = 'X'}
		else if (this.id == 9) {tracker[2][2] = 'X'}
	}
	grid();
	getWinner();
};

// Create function that shows current state of the grid when click() is called
function grid() {

	var topRow 	       = tracker[0].join('');
	var middleRow      = tracker[1].join('');
	var bottomRow      = tracker[2].join('');
	var leftCol        = tracker[0][0] + tracker[1][0] + tracker[2][0];
	var middleCol      = tracker[0][1] + tracker[1][1] + tracker[2][1];
	var rightCol       = tracker[0][2] + tracker[1][2] + tracker[2][2];
	var diagTopLeft    = tracker[0][0] + tracker[1][1] + tracker[2][2];
	var diagTopRight   = tracker[0][2] + tracker[1][1] + tracker[2][0];
		
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

		console.log('winner is ' + winner);

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
		}

		// reset tracker to empty array
		tracker = [["","",""],["","",""],["","",""]];
	}

}

// Add add event lisenter to each square
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', click)
};





})();