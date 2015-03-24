(function(){

// Declare global variables
var square = document.getElementsByClassName('square');
var active = {
	x: true,
	o: null
}

// Track whose turn it is


// Add add event lisenter to each square
for (var i = 0; i < square.length; i++) {
	square[i].addEventListener('click', function() {
		// this.appendChild(document.createTextNode('x'))
	})
}















})();