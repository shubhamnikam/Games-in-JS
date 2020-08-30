//global variables
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn = false;
const WINNING_COMBINATIONS =[
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]
]; 

//selectors
const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.getElementById('overlayWinningMsg');
const winningMessageTextElement = document.querySelector('[data-text-winning-msg]');
const restartButton = document.getElementById('restartButton');

//init game
startGame();
function startGame(){
    //init oTurn
    oTurn = false;
    //add click event on cell
    cellElements.forEach((cell)=>{
        //to remove after restart
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        //add click event
        cell.addEventListener('click', handleClick, {once:true});
    });
     //init hover effect
     setupBoardHover(); 
     //to remove after restart
     winningMessageElement.classList.remove('show');
}

//restart game
restartButton.addEventListener('click', startGame);

//cell click event
function handleClick(ev){
    const cell = ev.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;

    //call to add style class
    placeMark(cell, currentClass);

    //check for win, draw, normal condition
    if(checkWin(currentClass)){
        endGame(false);
    }else if(checkDraw()){
        endGame(true);
    } else{
        swapTurns();
        setupBoardHover();
    }
}


//add style class
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

//swap players
function swapTurns(){
    oTurn = !oTurn;
}

//setup hover effect
function setupBoardHover(){
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    if(oTurn){
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

//condition - win
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some((combination)=>{
        return combination.every((index)=>{
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
//condition - draw
function checkDraw(){
    return [...cellElements].every((cell)=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}


//condition - end game
function endGame(isDraw){
    if(isDraw){
        winningMessageTextElement.innerHTML = `Draw!`;
    } else {
        winningMessageTextElement.innerHTML = `${oTurn ? "O's" : "X's"} Wins!`;
    }

    //add class to overlay 
    winningMessageElement.classList.add('show');
}