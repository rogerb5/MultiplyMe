/*
    Title: MultiplyMe
    Description: This game provides
    a random multiplication equation for you to solve. It will keep track
    of your points earned and display simple statistics of your progress.
    This game was programmed by Roger B during 2/5/2023    
*/
const equationTag = document.querySelector('div#equation');
const inputBtn = document.querySelector('input.submit-btn');
const incorrectTag = document.querySelector('p#incorrect');
const correctTag = document.querySelector('p#correct');
const counterTag = document.querySelector('div#counter');
const exitButton = document.querySelector('button.exit-btn');
const displayButton = document.querySelector('button.display-btn');
const resultModal = document.querySelector('article.article-stats');

const averageP = document.querySelector('p.avg');
const guessP = document.querySelector('p.total-guesses');
const MAX = 12;
const MIN = 0;

let points = 0;
let correctGuesses = 0;
let incorrectGuess = 0;
let totalGuesses = 0;

/*
    Takes a min and max value as parameters, and
    returns a randomized integer
*/
function getRandomValue(min, max) {
    let r = Math.floor(Math.random() * (max - min + 1)) + min;
    return r;
}

// Displays multiplcation equation on the user interface
function displayEquation() {
    equationTag.textContent = `${integerOne} x ${integerTwo}=`;
}

// Returns the product of the two integers
function getProduct() {
    return integerOne * integerTwo;
}
/* 
    Event listener grabs user input on click
    and clears user input afterwards
 */
inputBtn.addEventListener('click', () => {
    const inputTag = document.querySelector('#num');
    const answer = parseFloat(inputTag.value);
    evaluateAnswer(answer);
    inputTag.value = "";
    inputTag.focus();
})

/* 
    Event listener grabs user input on enter key 
    and clears user input afterwards
*/
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const inputTag = document.querySelector('#num');
        const answer = parseFloat(inputTag.value);
        evaluateAnswer(answer);
        inputTag.value = "";
        inputTag.focus();
    }
})

exitButton.addEventListener('click', () => {
    setDisplayNone(resultModal);
})

displayButton.addEventListener('click', () => {
    setDisplayBlock(resultModal);
})

/*
    Takes a integer user input as an argument
    and compares whether the answer is correct or not.
*/
function evaluateAnswer(input) {
    // console.log('Input value on eval ', input);
    if (input === '' || isNaN(input)) {
        alert('Please enter a number ', input);
        return;
    } else if (input !== getProduct()) {
        subtractPoint();
        incorrectGuess++;
    } else {
        addPoint();
        correctGuesses++;
    }
    totalGuesses++;
    restartGame();
    guessP.textContent = "Incorrect guesses = " + incorrectGuess;
    let average = (correctGuesses / totalGuesses);
    let precisionAvg = roundToPrecision(average, 2);
    averageP.textContent = `Total average = ${(precisionAvg * 100).toFixed(0)}%`;
}

/*
    Evaluates if the points are less 
    than zero then restart points to 0
    else minus a point.
*/
function subtractPoint() {
    if (points <= 0) {
        points = 0;
    } else {
        points -= 1;
    }
    addActiveClass(incorrectTag);
    removeActiveClass(correctTag);
    incorrectTag.textContent = ('Incorrect: ' + integerOne + ' x ' + integerTwo + ' = ' + getProduct());
    setPoint();
}

// Sets new updated point
function setPoint() {
    counterTag.textContent = "Points: " + points;
}

// Adds a point and updates earned points
function addPoint() {
    points += 1;
    correctTag.textContent = ('Correct!');
    addActiveClass(correctTag);
    removeActiveClass(incorrectTag);
    setPoint();
}

/*
    Resets game and gets two new random integers
    and calls the displayEquation function.
*/
function restartGame() {
    integerOne = getRandomValue(MIN, MAX);
    integerTwo = getRandomValue(MIN, MAX);
    displayEquation();
}

// sets css display block and opacity 1 on element
function setDisplayBlock(displayResult) {
    displayResult.style.display = 'block';
    displayResult.style.opacity = 1;
}

// sets css display none and opacity 0 on element
function setDisplayNone(displayResult) {
    displayResult.style.display = 'none';
    displayResult.style.opacity = 0;
}

function addActiveClass(element) {
    element.classList.add('active')
}

function removeActiveClass(element) {
    element.classList.remove('active');
}

/*
    Takes a value as a parameter, and integer as a parameter
    returns a rounded value with two decimal places at most
*/
function roundToPrecision(value, decimals = 2) {
    const pow = Math.pow(10, decimals);
    return Math.round((value + Number.EPSILON) * pow) / pow;
}

// run game on load
let integerOne = getRandomValue(MIN, MAX);
let integerTwo = getRandomValue(MIN, MAX);
displayEquation(); 