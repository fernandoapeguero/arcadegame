// Enemies our player must avoid
const min = -100;
const max = -600; //Math.random() * (-800 - -300) + -800;
let speed = [35, 50, 100];
let positionY = 380;
let positionX = 200;
//game sounds
const winSound = new Audio("audio/win.wav");
const jumpSound = new Audio("audio/jumpsound.mp3");
const gameMusic = new Audio("audio/gamemusic.mp3");
const dieSound = new Audio("audio/diesound.mp3");
//game music and sounds
gameMusic.loop = true;
// gameMusic.play();

function win(){
    winSound.currentTime = 0 ;
    winSound.play();

}

jumpSound.volume = 0.1;
//jump sound player and reseter
function jumping(){
    jumpSound.currentTime = 0;
    jumpSound.play();
}

var Enemy = function (x, y, radius) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.radius = radius;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    enemi1.x += speed[2] * dt;
    enemi2.x += speed[0] * dt;
    enemi3.x += speed[1] * dt;
    enemi4.x += speed[0] * dt;
    enemi5.x += speed[2] * dt;
    enemi6.x += speed[1] * dt;

    if (this.x >= 550) {
        this.x = randomizeLocation();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// instatiating enemies on different location on screen
const enemi1 = new Enemy(randomizeLocation(), 50, 40);
const enemi2 = new Enemy(randomizeLocation(), 50, 40);
const enemi3 = new Enemy(randomizeLocation(), 135, 40);
const enemi4 = new Enemy(randomizeLocation(), 225, 40);
const enemi5 = new Enemy(randomizeLocation(), 135, 40);
const enemi6 = new Enemy(randomizeLocation(), 300, 40);
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function () {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;
    this.radius = 30;


}
let lastX = 0;
Player.prototype.update = function () {

    if (this.y < 20) {
       playerStarPosition();
       win();
    }

    if (getDistance(this.x, this.y, enemi1.x, enemi1.y) < this.radius + enemi1.radius ||
        getDistance(this.x, this.y, enemi2.x, enemi2.y) < this.radius + enemi2.radius ||
        getDistance(this.x, this.y, enemi3.x, enemi3.y) < this.radius + enemi3.radius ||
        getDistance(this.x, this.y, enemi4.x, enemi4.y) < this.radius + enemi4.radius ||
        getDistance(this.x, this.y, enemi5.x, enemi5.y) < this.radius + enemi5.radius ||
        getDistance(this.x, this.y, enemi6.x, enemi6.y) < this.radius + enemi6.radius) {
        this.x = 200;
        this.y = 400;

    }
}


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (e) {
    // add similar logic to move character around up button working
    if (e === "up" && this.y > 0) {
        this.y -= 90;
        jumping();
    }
    if (e === "down" && this.y < 400) {
        this.y += 90;
        jumping();
    } else if (e === "left" && this.x > 0) {
        this.x -= 100;
        jumping();
    } else if (e === "right" && this.x < 400) {
        this.x += 100;
        jumping();
    }

}

const allEnemies = [enemi1, enemi2, enemi3, enemi4, enemi5, enemi6];

const player = new Player();



// randomized the location of enemies after they go off screen to have variation on the game
function randomizeLocation() {
    return Math.random() * (max - min) + min;

}

function getDistance(x1, y1, x2, y2) {

    let distanceX = x2 - x1;
    let distanceY = y2 - y1;

    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

function playerStarPosition(){
    player.x = 200;
    player.y = 400;
}
// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});