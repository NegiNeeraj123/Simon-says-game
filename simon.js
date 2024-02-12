

const colors = ['red', 'green', 'blue', 'yellow'];
let gameSequence = [];
let userSequence = [];
let level = 0;
let gameStarted = false;

function startGame() {
    gameStarted = true;
    level = 1;
    nextSequence();
}

function nextSequence() {
    userSequence = [];
    updateDisplay();
    addToSequence();
    setTimeout(() => {
        playSequence();
    }, 1000);
}

function addToSequence() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
}

function playSequence() {
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            flashButton(color);
        }, (index + 1) * 1000);
    });
}

function flashButton(color) {
    const button = document.querySelector(`.${color}`);
    button.classList.add('flash');
    setTimeout(() => {
        button.classList.remove('flash');
    }, 500);
}

function handleClick(color) {
    if (!gameStarted) return;
    userSequence.push(color);
    if (userSequence.length === gameSequence.length) {
        if (checkSequence()) {
            level++;
            nextSequence();
        } else {
            gameOver();
        }
    }
}

function checkSequence() {
    for (let i = 0; i < gameSequence.length; i++) {
        if (gameSequence[i] !== userSequence[i]) {
            return false;
        }
    }
    return true;
}

function updateDisplay() {
    document.querySelector('h1').textContent = `Level ${level}`;
}

function gameOver() {
    gameStarted = false;
    alert(`Game Over! You reached level ${level}.`);
}

