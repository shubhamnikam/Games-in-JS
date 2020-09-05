//imports
import {
    onSnake,
    expandSnake
} from './snake.js'
import {
    randomGridPosition
} from './grid.js'

//variables
let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update() {

    //to check food & snake on same grid
    if (onSnake(food)) {
        //expand snake
        expandSnake(EXPANSION_RATE);
        //update food position to new random location
        food = getRandomFoodPosition();
    }

}

//draw updated calculation on board
export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

//get random food position
function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}