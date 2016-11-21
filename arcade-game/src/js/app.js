/*global Resources, Engine*/

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

// Enemies our player must avoid
var Enemy = function (x, y, speed, sprite) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = sprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x >= Engine.canvas.width) {
    this.x = -101;
  }
  this.x = Number(this.x.toFixed(0));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  drawContainer(this.x, this.y + 70, 101, 83, 'magenta', 2);
};


var Player = function (x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
};

Player.prototype.update = function () {};

Player.prototype.render = function () {
  Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  drawContainer(this.x + 10, this.y + 60, 81, 83, 'cyan', 2);
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case 'left':
      this.x -= (this.x <= 0) ? 0 : 101;
      break;
    case 'right':
      this.x += (this.x >= 404) ? 0 : 101;
      break;
    case 'up':
      this.y -= (this.y <= -13) ? 0 : 83;
      break;
    case 'down':
      this.y += (this.y >= 402) ? 0 : 83;
      break;
    case 'space':
      (Engine.isPaused) ? Engine.resumeGame() : Engine.pauseGame(); 
  }
};

function drawContainer(x0, y0, w, h, color, lineWidth) {
  Engine.ctx.lineWidth = lineWidth;
  Engine.ctx.strokeStyle = color;
  Engine.ctx.strokeRect(x0, y0, w, h);
}

/**
 * Instanciates the given quantity of enemies. 
 * 
 * @param {any} quantity The number of enemies to instanciate.
 * @returns an array with the given number of enemy instances.
 */
function spawnEnemies(quantity) {
  var enemies = [];
  Array
  .from(Array(quantity).keys())
  .forEach(function (row) {
    var [x, y, speed, sprite] = [-101, 60 + 83 * row, Number((Math.random() * 10).toFixed(0) + 1) * 10, 'images/enemy-bug.png'];
    enemies.push(new Enemy(x, y, speed, sprite));
  });

  return enemies;
}

var allEnemies = spawnEnemies(1);
var player = new Player(202, 402, 'images/char-boy.png');

