//import
import {
    getInputDirection
} from "./input.js";


//variables
export let SNAKE_SPEED = 4;
const INCREASE_SNAKE_SPEED_BY = 1;
let newSegment = 0;


//snake total length
const snakeBody = [{
    x: 11,
    y: 11
}];

//update calculation for snake
export function update() {
    //add segments
    addSegment();

    const inputDirection = getInputDirection();

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {
            ...snakeBody[i]
        };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

//draw updated calculation on board
export function draw(gameBoard) {
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });
}


//to check food & snake on same grid
export function onSnake(position, {
    ignoreHead = false
} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalPosition(segment, position);
    });
}

//actual checking of same grid position
function equalPosition(pos1, pos2) {
    return ((pos1.x === pos2.x) && (pos1.y === pos2.y))
}

//expand snake
export function expandSnake(amount) {
    newSegment += amount;
}

//add segment
function addSegment() {
    for (let i = 0; i < newSegment; i++) {
        snakeBody.push({
            ...snakeBody[snakeBody.length - 1]
        });
    }
    newSegment = 0;
}

//get snake head position to check stop/failure condition
export function getSnakeHead() {
    return snakeBody[0];
}

//check for failure condition snake intersection
export function snakeIntersection() {
    return onSnake(snakeBody[0], {
        ignoreHead: true
    })
}

//get score
export function getScore() {
    return snakeBody.length;
}

//to increase snake speed
export function increaseSnakeSpeed() {
    SNAKE_SPEED += INCREASE_SNAKE_SPEED_BY;
}