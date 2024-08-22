

const O_CLASS = "o";
const X_CLASS = "x";
const board = document.querySelector('[data-board]');
const cellElements = document.querySelectorAll('[data-cell]');
const winScreen = document.querySelector('[data-win-screen]');
const WinScreenText = document.querySelector('[data-win-screen-text]');
const WinScreenButton = document.querySelector('[data-win-screen-button]');
const WINNING_COMPINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let circleTurn;


function startGame() {

    circleTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener("click", handleClick, { once: true });
    })

    setBoardHoverClass();
}

function handleClick(e) {
    // place mark
    // check win
    // check draw
    // swap turns

    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        winScreen.style.display = 'flex';
        WinScreenText.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
    } else if (checkDraw()) {
        winScreen.style.display = 'flex';
        WinScreenText.innerText = `No Winner`;
    } else {

        swapTurns();
        setBoardHoverClass();
    }
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS);
    })
}

function checkWin(currentClass) {
    return WINNING_COMPINATIONS.some(compination => {
        return compination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    if (circleTurn)
        board.classList.add(O_CLASS);
    else
        board.classList.add(X_CLASS);
}

startGame();