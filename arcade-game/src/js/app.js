/*global Resources, Engine*/

var level = 3;

const ENEMY_HITBOX_WIDTH = 101,
  ENEMY_HITBOX_HEIGHT = 83,
  ENEMY_HITBOX_X_OFFSET = 0,
  ENEMY_HITBOX_Y_OFFSET = 70,
  ENEMY_START_X_POSITION = -101,
  ENEMY_START_Y_POSITION = (row) => { return 60 + 83 * row};

const PLAYER_HITBOX_WIDTH = 81,
  PLAYER_HITBOX_HEIGHT = 83,
  PLAYER_HITBOX_X_OFFSET = 10,
  PLAYER_HITBOX_Y_OFFSET = 60,
  PLAYER_START_X_POSITION = 202,
  PLAYER_START_Y_POSITION = 402;


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
    .forEach(function() {
      var randomRow = Number((Math.random() * 10).toFixed(0)) % 3;
      var randomSpeed = (Number((Math.random() * 10).toFixed(0)) + 1) * 100;
      var [x, sprite] = [ENEMY_START_X_POSITION, 'images/enemy-bug.png'];
      enemies.push(new Enemy(randomRow, x, randomSpeed, sprite));
    });

  return enemies;
}

var Hitbox = function(width, height) {  
  this.width = width;
  this.height = height;
};

/**
 * Renders a rectangle (hitbox) around game entities.
 * 
 * @param {any} x0 the initial position on the x-axis
 * @param {any} y0 the initial position on the y-axis
 * @param {any} w the width
 * @param {any} h the height
 * @param {any} color the color of the rectangle
 * @param {any} lineWidth the width of the rectangle's lines
 */
Hitbox.prototype.render = function(color, lineWidth, ...startCoordinates) {
  Engine.ctx.strokeStyle = color;
  Engine.ctx.lineWidth = lineWidth;
  Engine.ctx.strokeRect(...startCoordinates, ...Object.values(this));
};



// Enemies our player must avoid
var Enemy = function(row, x, speed, sprite) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.row = row;
  this.x = x;
  this.y = ENEMY_START_Y_POSITION(this.row);
  this.speed = speed;
  this.sprite = sprite;
  this.hitbox = new Hitbox(ENEMY_HITBOX_WIDTH, ENEMY_HITBOX_HEIGHT);
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
    this.row = Number((Math.random() * 10).toFixed(0)) % 3;
  }
  this.x = Number(this.x.toFixed(0));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.hitbox.render('magenta', 2, this.x + ENEMY_HITBOX_X_OFFSET, this.y + ENEMY_HITBOX_Y_OFFSET);
};

Enemy.prototype.resetPosition = function() {
  [this.x, this.y] = [ENEMY_START_X_POSITION, ENEMY_START_Y_POSITION(this.row)];
};

var allEnemies = spawnEnemies(level);



var Player = function (x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.hitbox = new Hitbox(PLAYER_HITBOX_WIDTH, PLAYER_HITBOX_HEIGHT);
};

Player.prototype.update = function () {
  if (player.y === -13) {
    player.resetPosition();
  }
};

Player.prototype.render = function () {
  Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.hitbox.render('cyan', 2, this.x + PLAYER_HITBOX_X_OFFSET, this.y + PLAYER_HITBOX_Y_OFFSET);
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
      break;
  }
};

Player.prototype.checkCollision = function(other) {
  return other.x + ENEMY_HITBOX_X_OFFSET < this.x + PLAYER_HITBOX_X_OFFSET + PLAYER_HITBOX_WIDTH &&
  other.x + ENEMY_HITBOX_X_OFFSET + ENEMY_HITBOX_WIDTH > this.x + PLAYER_HITBOX_X_OFFSET &&
  other.y + ENEMY_HITBOX_Y_OFFSET < this.y + PLAYER_HITBOX_Y_OFFSET + PLAYER_HITBOX_HEIGHT &&
  other.y + ENEMY_HITBOX_Y_OFFSET + ENEMY_HITBOX_HEIGHT > this.y + PLAYER_HITBOX_Y_OFFSET;
};

Player.prototype.resetPosition = function() {
  [this.x, this.y] = [PLAYER_START_X_POSITION, PLAYER_START_Y_POSITION];
};

var player = new Player(PLAYER_START_X_POSITION, PLAYER_START_Y_POSITION, 'images/char-boy.png');

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
