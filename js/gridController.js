// IIFE
(function(){

	angular
		.module('myApp')
		.controller('GridController', GridController);

		function GridController() {

			// capture variable
			var self = this;

			self.squares = [
								{id: 'square1', active: false},
								{id: 'square2', active: false},
								{id: 'square3', active: false},
								{id: 'square4', active: false},
								{id: 'square5', active: false},
								{id: 'square6', active: false},
								{id: 'square7', active: false},
								{id: 'square8', active: false},
								{id: 'square9', active: false}
							];

		};


})();