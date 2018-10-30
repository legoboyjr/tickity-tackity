//veriables
const board = document.querySelector('.board');
const turnDisplay = document.querySelector('.turn span');
const controls = document.querySelector('.controls');
const resetBtn = controls.querySelector('button');
let currentPlayer = 'X';
let gameOver = false;
let moveCount = 0;
let grid = makeGrid();
const wins = [
    [0,4,8],
    [0,3,6],
    [0,1,2],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


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
    //implement movecount
    moveCount += 1;
    //check for win
    gameOver = checkForWin();
    //switch player
    if(!gameOver){
        (currentPlayer = currentPlayer === 'X' ? 'O': 'X')
    }
    //render
    renderTurn();
    render();
}

function checkForWin() {
    for(let i = 0; i< wins.length; i += 1){
        const combo = wins[i];
        const selection = combo.map(function getGridCell(n){
            return grid[n].textContent;
        });
        const allTheSame = selection.every(function sameAsCurrentPlayer(char){
            return char === currentPlayer;
        })
        if(allTheSame){
            return true;
        }
    }
    if(moveCount >= 9){
        return true;
    }
    return false;
}

function reset(event) {
    currentPlayer = 'X';
    moveCount = 0;
    gameOver = false;
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

    if(gameOver){
        if(moveCount >= 9){
            return alert (`Cat takes the board`);
        }
        alert(`${currentPlayer} Wins!!!`);
    }
}

//kick it off

renderTurn();
render();