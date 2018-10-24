//veriables
const board = document.querySelector('.board');
const cells = board.querySelectorAll('.cell');
const turnDisplay = document.querySelector('.turn span');
const controls = document.querySelector('.controls');
const resetBtn = controls.querySelector('button');
let currentPlayer = 'X';
let gameOver = false;

//events 
cells.forEach(function addEventListener(Cell){
    Cell.addEventListener('click', onCellClick);
});
resetBtn.addEventListener('click', reset);
//functions
function onCellClick(event) {
    const element = event.target;
    if(element.beenClicked){
        return;
    }
    element.beenClicked = true;
    element.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O': 'X';
    renderTurn();
}

function reset(event) {
    console.log('resetting!!!');
}

function renderTurn(){
    turnDisplay.textContent = currentPlayer;
}
//kick it off

renderTurn();