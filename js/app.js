(function(){

// Declare global variables
var squares = document.getElementsByClassName('square');
var board = {
	topLeft: "",
	topMiddle: "",
	topRight: "",
	middleLeft: "",
	center: "",
	middleRight: "",
	bottomLeft: "",
	bottomMiddle: "",
	bottomRight: ""
}

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

			 if (this.id == 1) {board.topLeft = 'O'}
		else if (this.id == 2) {board.topMiddle = 'O'}
		else if (this.id == 3) {board.topRight = 'O'}
		else if (this.id == 4) {board.middleLeft = 'O'}
		else if (this.id == 5) {board.center = 'O'}
		else if (this.id == 6) {board.middleRight = 'O'}
		else if (this.id == 7) {board.bottomLeft = 'O'}
		else if (this.id == 8) {board.bottomMiddle = 'O'}
		else if (this.id == 9) {board.bottomRight = 'O'}
	
	}

	else if (tictactoe.player2) {
		this.appendChild(document.createTextNode('X'));
		this.value = 'X';
		tictactoe.player2 = false;
		tictactoe.player1 = true;

			 if (this.id == 1) {board.topLeft = 'X'}
		else if (this.id == 2) {board.topMiddle = 'X'}
		else if (this.id == 3) {board.topRight = 'X'}
		else if (this.id == 4) {board.middleLeft = 'X'}
		else if (this.id == 5) {board.center = 'X'}
		else if (this.id == 6) {board.middleRight = 'X'}
		else if (this.id == 7) {board.bottomLeft = 'X'}
		else if (this.id == 8) {board.bottomMiddle = 'X'}
		else if (this.id == 9) {board.bottomRight = 'X'}
	}
	check();
};

// Create check score function which is called when click() is called
function check() {
	console.log(board)
}

// Add add event lisenter to each square
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', click)
};




})();