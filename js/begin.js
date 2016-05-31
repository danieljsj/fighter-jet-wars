'use strict';
// Let's play this game!


player1.init();
player2.init();

comp1.init();
comp2.init();



var then = Date.now();


setInterval(main, 1000/60); // no need to go faster than 60 hz