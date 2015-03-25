(function(){

// Declare global variables
var squares = document.getElementsByClassName('square');

// Player 1 = 'O' and Player 2 = 'X'
var active = {player1: true, player2: false};

// Add add event lisenter to each square
for (var i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', function() {

// When square is clicked, if value of square is true, then exit loop
	if (this.value) {return}	

// If Player 1 is active, insert 'O', set active.player1 = false and active.player2 = true
		if (active.player1) {
				this.appendChild(document.createTextNode('O'));
				this.value = 'O';
				active.player1 = false;
				active.player2 = true;
		}

// If Player 2 is active, insert 'X', set active.player2 = false and active.player1 = true
		else if (active.player2) {
				this.appendChild(document.createTextNode('X'));
				this.value = 'X';
				active.player2 = false;
				active.player1 = true;
		}

	})
}




})();