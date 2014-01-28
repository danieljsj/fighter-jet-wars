// Let's play this game!


console.info('PLAYERS BEFORE INIT:');
console.log(player1);
console.log(player2);
//console.log(comp1);

player1		.init();
player2		.init();
//comp1		.init();

console.info('PLAYERS AFTER INIT:');
console.log(player1);
console.log(player2);
//console.log(comp1);

var then = Date.now();

// setInterval(main, 1); // Execute as fast as possible

setInterval(main, 1); // Execute as fast as possible






