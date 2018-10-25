//veriables
const board = document.querySelector('.board');
const turnDisplay = document.querySelector('.turn span');
const controls = document.querySelector('.controls');
const resetBtn = controls.querySelector('button');
let currentPlayer = 'X';
let gameOver = false;
let grid = makeGrid();

function Cell(template){
    const data = {
        template: template,
        hasBeenClicked: false
    };
    return data;
}


//events 
board.addEventListener('click', onCellClick);
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
    currentPlayer = 'X';
    renderTurn();
    grid = makeGrid();
    render();
}

function makeGrid(){
    return [
        Cell(`<div class="cell h30 w30 bl-none bt-none"></div>`), 
        Cell(`<div class="cell h30 w30 bt-none"></div>`), 
        Cell(`<div class="cell h30 w30 bt-none br-none"></div>`),
        Cell(`<div class="cell h30 w30 bl-none"></div>`), 
        Cell(`<div class="cell h30 w30"></div>`), 
        Cell(`<div class="cell h30 w30 br-none"></div>`),
        Cell(`<div class="cell h30 w30 bl-none bb-none"></div>`), 
        Cell(`<div class="cell h30 w30 bb-none"></div>`),
        Cell(`<div class="cell h30 w30 bb-none br-none"></div>`)
    ];
}

function renderTurn(){
    turnDisplay.textContent = currentPlayer;
}

function render() {
    board.innerHTML = grid.map(function(element) {
        return element.template;
    }).join('\n');
}

//kick it off

renderTurn();
render();