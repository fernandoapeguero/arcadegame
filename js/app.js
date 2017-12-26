// Enemies our player must avoid
const min = -300;
const max = -1500; //Math.random() * (-800 - -300) + -800;
let speed = [35, 60, 100];
let positionY = 380;
let positionX = 200;
let speedSwitch = false;

var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    enemi1.x += speed[0] * dt;
    enemi2.x += speed[1] * dt;
    enemi3.x += speed[2] * dt;
    enemi4.x += speed[0] * dt;
    enemi5.x += speed[0] * dt;
    enemi6.x += speed[0] * dt;

    if (this.x >= 550) {
        this.x = randomizeLocation();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function () {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;


}

Player.prototype.update = function () {

    Player.bind("EnterFrame", function () {
        console.log(` nitido papa`)
    });
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (e) {
    // add similar logic to move character around up button working
    if (e === "up" && this.y > 0) {
        this.y -= 90;
    }
    if (e === "down" && this.y < 400) {
        this.y += 90;
    } else if (e === "left" && this.x > 0) {
        this.x -= 100;
    } else if (e === "right" && this.x < 400) {
        this.x += 100;
    }

}

console.log(Player.prototype);


const enemi1 = new Enemy(randomizeLocation(), 50);
const enemi2 = new Enemy(randomizeLocation(), 50);
const enemi3 = new Enemy(randomizeLocation(), 135);
const enemi4 = new Enemy(randomizeLocation(), 225);
const enemi5 = new Enemy(randomizeLocation(), 135);
const enemi6 = new Enemy(randomizeLocation(), 300);

const allEnemies = [enemi1, enemi2, enemi3, enemi4, enemi5, enemi6];

const player = new Player();

function randomizeLocation() {
    return Math.random() * (max - min) + min;
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