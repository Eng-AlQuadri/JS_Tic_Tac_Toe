
const X_Class = "x";
const O_Class = "o";
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
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
        cell.addEventListener("click", handleClick, { once: true })
    });

    setBoardHoverClass();
}


function handleClick(e) {
    // place mark
    // check for win
    // check for draw
    // switch turns

    const cell = e.target;
    const currentClass = circleTurn ? O_Class : X_Class;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(O_Class) || cell.classList.contains(X_Class);
    })
}

function endGame(draw) {
    if (draw) {
        winScreen.style.display = "flex";
        WinScreenText.innerText = `No Winner`;
    } else {
        winScreen.style.display = "flex";
        WinScreenText.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
    }
}

function checkWin(currentClass) {
    return WINNING_COMPINATIONS.some(compination => {
        return compination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(O_Class)
    board.classList.remove(X_Class);

    if (circleTurn)
        board.classList.add(O_Class);
    else
        board.classList.add(X_Class);
}

function resetGame() {
    removeWinScreen();
    removeClasses();
    startGame();
}

function removeWinScreen() {
    winScreen.style.display = "none";
    WinScreenText.innerText = ``;
}

function removeClasses() {
    [...cellElements].forEach(cell => {
        cell.classList.remove(O_Class) || cell.classList.remove(X_Class);
    });
}

WinScreenButton.addEventListener("click", resetGame);

startGame();