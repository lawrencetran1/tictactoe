(function(){

// Declare global variables
var squares = document.getElementsByClassName('square');
var history = [[],[],[]];

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
	if (this.value) return;

	if (tictactoe.player1) {
		this.appendChild(document.createTextNode('O'));
		this.value = 'O';
		tictactoe.player1 = false;
		tictactoe.player2 = true;

		if (this.id == 1) {history[0].unshift('O')}
		else if (this.id == 2) {history[0].splice(1, 0, 'O')}
		else if (this.id == 3) {history[0].push('O')}
		else if (this.id == 4) {history[1].unshift('O')}
		else if (this.id == 5) {history[1].splice(1, 0, 'O')}
		else if (this.id == 6) {history[1].push('O')}
		else if (this.id == 7) {history[2].unshift('O')}
		else if (this.id == 8) {history[2].splice(1, 0, 'O')}
		else if (this.id == 9) {history[2].push('O')}
	
	}

	else if (tictactoe.player2) {
		this.appendChild(document.createTextNode('X'));
		this.value = 'X';
		tictactoe.player2 = false;
		tictactoe.player1 = true;

		if (this.id == 1) {history[0].unshift('X')}
		else if (this.id == 2) {history[0].splice(1, 0, 'X')}
		else if (this.id == 3) {history[0].push('X')}
		else if (this.id == 4) {history[1].unshift('X')}
		else if (this.id == 5) {history[1].splice(1, 0, 'X')}
		else if (this.id == 6) {history[1].push('X')}
		else if (this.id == 7) {history[2].unshift('X')}
		else if (this.id == 8) {history[2].splice(1, 0, 'X')}
		else if (this.id == 9) {history[2].push('X')}
	}
	check(history);
};

// Create check score function which is called when click() is called
function check(history) {
	history.forEach(function(row) {
		console.log(row);
	})
}

// Add add event lisenter to each square
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', click)
};




})();