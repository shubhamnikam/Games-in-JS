//imports
import {
    SNAKE_SPEED,
    update as updateSnake,
    draw as drawSnake,
    getSnakeHead,
    snakeIntersection,
    getScore,
    increaseSnakeSpeed
} from './snake.js'
import {
    update as updateFood,
    draw as drawFood
} from './food.js'
import {
    outsideGrid
} from './grid.js'

//setup ui elements
const gameBoard = document.getElementById('gameBoard');
const scoreRef = document.getElementById('score');
const highScoreRef = document.getElementById('highScore');
const noOfTriesRef = document.getElementById('chanceCount');
const snakeSpeedRef = document.getElementById('snakeSpeed');
const gameStatusRef = document.getElementById('gameStatus');

//key
const KEY_HIGHSCORE = "snakeGame_highScore";
const KEY_NOOFTRIES = "snakeGame_noOfTries";
const KEY_ISINCREASEDSPEED = "snakeGame_isIncreasedSpeed";
const GAME_STATUS_ON = " 😀 ON [Best of Luck]";
const GAME_STATUS_OVER = " 😵 OVER [Please Refresh]";

//global variables
let lastRenderTime = 0;
let gameOver = false;
let noOfTries = 0;
let score = 0;
let highScore = 0;

//initial setup call
setUpHighScore(score);
setupNoOfTries();
genericSessionStorage("set", KEY_ISINCREASEDSPEED, false);
gameStatusRef.innerText = GAME_STATUS_ON;


//functions setup
function main(currentTime) {

    //check to game stop/lose condition
    if (gameOver) {
        setupNoOfTries();
        if (confirm('You lost. Press ok to restart')) {
            genericSessionStorage("set", KEY_ISINCREASEDSPEED, false);
            window.location = '/';
            gameStatusRef.innerText = GAME_STATUS_ON;
        }
        gameStatusRef.innerText = GAME_STATUS_OVER;
        genericSessionStorage("set", KEY_ISINCREASEDSPEED, false);
        return;
    }
    //recall
    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    lastRenderTime = currentTime;

    //call for update & draw new position
    update();
    draw();
}

//1st time call 
window.requestAnimationFrame(main);


//to update calculations
function update() {
    updateSnake();
    updateFood();
    checkDeath();
    //update score, Highest Score, no. of tries
    updatePlayerDetails();
    //increase speed
    setupSnakeSpeed();
}

//to render & draw
function draw() {
    //to clean up board
    gameBoard.innerHTML = '';
    //actual draw
    drawSnake(gameBoard);
    drawFood(gameBoard);
}


//check for failure/end game
function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


//updatePlayerDetails
function updatePlayerDetails() {
    score = getScore();
    highScore = setUpHighScore(score);


    //update ui
    scoreRef.innerText = score;
    highScoreRef.innerText = highScore;
    noOfTriesRef.innerText = +genericSessionStorage("get", KEY_NOOFTRIES);
    snakeSpeedRef.innerText = SNAKE_SPEED;
}

//setup high score
function setUpHighScore(score) {
    if (genericSessionStorage("get", KEY_HIGHSCORE) == null ||
        (score > +genericSessionStorage("get", KEY_HIGHSCORE))) {
        genericSessionStorage("set", KEY_HIGHSCORE, score);
    }
    return +genericSessionStorage("get", KEY_HIGHSCORE);
}

//setup No Of Tries
function setupNoOfTries() {
    if ((genericSessionStorage("get", KEY_NOOFTRIES)) == null) {
        genericSessionStorage("set", KEY_NOOFTRIES, ++noOfTries);
    } else {
        noOfTries = +genericSessionStorage("get", KEY_NOOFTRIES);
        genericSessionStorage("set", KEY_NOOFTRIES, ++noOfTries);
    }
}

//generic implementation for Session storage
function genericSessionStorage(type, key, value = 0) {
    if (type === "get") {
        return sessionStorage.getItem(key);
    } else if (type === "set") {
        sessionStorage.setItem(key, value);
    } else {
        //do nothing
    }
}

//increase speed
function setupSnakeSpeed() {
    let tempIsIncreasedSpeed = genericSessionStorage("get", KEY_ISINCREASEDSPEED);
    if (score % 5 == 0 && tempIsIncreasedSpeed == "false") {
        increaseSnakeSpeed();
        genericSessionStorage("set", KEY_ISINCREASEDSPEED, true);
    } else if (score % 5 != 0 || tempIsIncreasedSpeed == "false") {
        genericSessionStorage("set", KEY_ISINCREASEDSPEED, false);
    }
}