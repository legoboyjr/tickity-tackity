//veriables
const board = document.querySelector('.board');
const cells = board.querySelectorAll('.cell');
const turnDisplay = document.querySelector('.turn');
const controls = document.querySelector('.control');
let currentPlayer = 'X';
let gameOver = false;

//events 
cells.forEach(function addEventListener(Cell){
    Cell.addEventListener('click', onCellClick);
});
//functions
function onCellClick(event) {
    const element = event.target;
    element.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O': 'X';
}
//kick it off