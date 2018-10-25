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
        textContent: '',
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
    const dataset = element.dataset;
    const index = dataset.index;
    const cell = grid[index];
    if( !cell || (index !== 0 && !index)  ) {
        return;
    }
    if(cell.hasBeenClicked){
        return;
    }
    cell.hasBeenClicked = true;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O': 'X';
    renderTurn();
    render();
}

function reset(event) {
    currentPlayer = 'X';
    renderTurn();
    grid = makeGrid();
    render();
}

function makeGrid(){
    return [
        Cell(`<div class="cell h30 w30 bl-none bt-none" data-index="0"></div>`), 
        Cell(`<div class="cell h30 w30 bt-none" data-index="1"></div>`), 
        Cell(`<div class="cell h30 w30 bt-none br-none" data-index="2"></div>`),
        Cell(`<div class="cell h30 w30 bl-none" data-index="3"></div>`), 
        Cell(`<div class="cell h30 w30" data-index="4"></div>`), 
        Cell(`<div class="cell h30 w30 br-none" data-index="5"></div>`),
        Cell(`<div class="cell h30 w30 bl-none bb-none" data-index="6"></div>`), 
        Cell(`<div class="cell h30 w30 bb-none" data-index="7"></div>`),
        Cell(`<div class="cell h30 w30 bb-none br-none" data-index="8"></div>`)
    ];
}

function renderTurn(){
    turnDisplay.textContent = currentPlayer;
}

function render() {
    board.innerHTML = grid.map(function(element) {
        const [first,last] = element.template.split('><');
        const html = `${first}>${element.textContent}<${last}`;
        return html;
    }).join('\n');
}

//kick it off

renderTurn();
render();