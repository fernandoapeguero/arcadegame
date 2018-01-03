//player score
const scores = document.querySelector(".streaks");
const resetButton = document.querySelector(".reset");

const min = -100;
const max = -500; //Math.random() * (-800 - -300) + -800;
let positionY = 380;
let positionX = 200;
//game sounds
const winSound = new Audio("audio/win.wav");
const jumpSound = new Audio("audio/jumpsound.mp3");
const gameMusic = new Audio("audio/gamemusic.mp3");
const dieSound = new Audio("audio/diesound.mp3");
const bugSound = new Audio("audio/waspcar.wav");
//game music and sounds
gameMusic.loop = true;
gameMusic.play();

//sounds volumes
gameMusic.volume = 0.5;
bugSound.volume = 0.1;
dieSound.volume = 0.3;
jumpSound.volume = 0.1;

//array of character for the game to change them so you can play with you favorite one have fun
let playerIndex = 0;
const chartsArray = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

function playerDeath() {
    dieSound.currentTime = 0;
    dieSound.play();
}

function win() {
    winSound.currentTime = 0;
    winSound.play();

}

//jump sound player and reseter
function jumping() {
    jumpSound.currentTime = 0;
    jumpSound.play();
}
// Enemies our player must avoid
class Enemy {
    constructor(x, y, radius, speed = 35) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        /* the reviewer wanted me to do this.x += this.speed * dt i already try that but it wont works if it was only at one speed them
        yes but since i have diferent speed on enemies that code only make them run at the same speed don't work for this game
        as you can see when i'm creating the enemy some have 50 of speed some 100 and the ones that don't have the 35 default apply to them. */
        //this is the only code that work for me and is shorter than the last code i used
        allEnemies.forEach(enemi => enemi.x += enemi.speed * dt);

        if (this.x >= 550) {
            this.x = randomizeLocation();
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// instatiating enemies on different location on screen
const enemi1 = new Enemy(randomizeLocation(), 50, 40, 100);
const enemi2 = new Enemy(randomizeLocation(), 50, 40);
const enemi3 = new Enemy(randomizeLocation(), 135, 40, 50);
const enemi4 = new Enemy(randomizeLocation(), 225, 40);
const enemi5 = new Enemy(randomizeLocation(), 135, 40, 100);
const enemi6 = new Enemy(randomizeLocation(), 300, 40, 50);
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {

    constructor() {
        this.sprite = chartsArray[playerIndex];
        this.x = 200;
        this.y = 400;
        this.radius = 30;
        this.winStreak = 0;
        this.crashStreak = 0;
    }
    starPosition() {
        this.x = 200;
        this.y = 400;
    }

    update() {

        if (this.y < 20) {
            this.starPosition();
            win();
            player.winStreak += 1;
            player.crashStreak = 0;
        }

        allEnemies.forEach(enemi => {
            if (getDistance(this.x, this.y, enemi.x, enemi.y) < this.radius + enemi.radius) {
                this.starPosition();
                playerDeath();
                player.winStreak = 0;
                player.crashStreak += 1;
            } else if (getDistance(this.x, this.y, enemi.x, enemi.y) < this.radius + enemi.radius + 40) {
                bugSound.play();
            }
        });

        scores.innerHTML = `WinStreaks: ${this.winStreak}&nbsp&nbsp CrashStreak: ${this.crashStreak} &nbsp&nbsp`;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(e) {
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

}
const allEnemies = [enemi1, enemi2, enemi3, enemi4, enemi5, enemi6];

const player = new Player();

// randomized the location of enemies after they go off screen to have variation on the game
function randomizeLocation() {
    return Math.random() * (max - min) + min;

}
//get distance between enemy and player
function getDistance(x1, y1, x2, y2) {

    let distanceX = x2 - x1;
    let distanceY = y2 - y1;

    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}
// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

resetButton.addEventListener("click", scoreReseter);

function scoreReseter() {
    player.winStreak = 0;
    player.crashStreak = 0;

}
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