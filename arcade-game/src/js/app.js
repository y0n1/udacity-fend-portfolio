// Enemies our player must avoid
var Enemy = function(speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = 60 + 83 * (row || Math.floor(Math.random() * 10) % 3);
    this.speed = speed || 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log(`Enemy: (${Math.floor(this.x)},${this.y})`);
    this.x %= 505;
    this.x += 101 * dt * this.speed;
    if (this.x >= 505) {
        this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 101 * 2;
    this.y = 57 * 7;
};

// This class requires an update(),
Player.prototype.update = function() {
    // TODO: Implement this method!
};

// render() and
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x -= (this.x <= 0) ? 0 : 101; 
            break;
        case 'right':
            this.x += (this.x >= 404) ? 0 : 101;
            break;
        case 'up':
            this.y -= (this.y <= -16) ? 0 : 83;
            break;
        case 'down':
            this.y += (this.y >= 399) ? 0 : 83;
            break;
    }
    console.log(`Player: (${this.x},${this.y})`);
};


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
[0, 1, 2].forEach(function(assignedRow) {
    var randomSpeed = Math.floor(Math.random() * 10) % 3 + 1;
    allEnemies.push(new Enemy(randomSpeed, assignedRow));
});

// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
