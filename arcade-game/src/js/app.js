/* global allEnemies, player, Resources, Engine */
var constants = {
  player: {
    START_POSITION_X: 202,
    START_POSITION_Y: 392
  },
  enemy: {
    START_POSITION_X: -101,
    START_POSITION_Y: 60,
    OFFSET_POSITION_Y: 83
  }
};

// Enemies our player must avoid
var Enemy = function (speed, row) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = constants.enemy.START_POSITION_X;
  this.y = constants.enemy.START_POSITION_Y + constants.enemy.OFFSET_POSITION_Y * row;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x %= Engine.canvas.width;
  this.x += 101 * dt * this.speed;
  if (this.x >= 505) {
    this.x = -101;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  _fillCircle('cyan', this.x + 50, this.y + 120, 5, 0, 2 * Math.PI);
};

// Now write your own player class
var Player = function () {
  this.sprite = 'images/char-boy.png';
  this.x = constants.player.START_POSITION_X;
  this.y = constants.player.START_POSITION_Y;
};

// This class requires an update(),
Player.prototype.update = function () {
};


// render() and
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  _fillCircle('magenta', this.x + 50, this.y - 7 + 120, 5, 0, 2 * Math.PI);
};

// a handleInput() method.
Player.prototype.handleInput = function (key) {
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
    case 'space':
      // TODO: pause/un-pause the game 
  }
};


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
[0].forEach(function (assignedRow) {
  var randomSpeed = (Math.random() * 10) % 3 + 1;
  allEnemies.push(new Enemy(Number(randomSpeed.toFixed(2)), assignedRow));
});

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

function _fillCircle(color, x0, y0, radius, startAngle, endAngle, anticlockwise=false) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x0, y0, radius, startAngle, endAngle, anticlockwise);
  ctx.fill();
  ctx.closePath();
}
