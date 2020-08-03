
const squares = document.querySelectorAll('.grid div');
const timeLeft = document.querySelector('#time');
const result = document.querySelector('#result');
const startButton = document.querySelector('#button');

const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');



//make a 9x9 grid for the gameboard
const width = 9;
//set starting point at index 76, which is bottom middle
let currentIndex = 76;
//timer at 20 seconds
let currentTime = 5;
//timer Id w/value
let timerId = 0;

 squares[currentIndex].classList.add('frog')

 function movefrog (event){
     squares[currentIndex].classList.remove('frog')
     switch(event.keyCode){
        case 37:
             if(currentIndex % width !== 0) currentIndex -= 1;
            break
        case 38:
            if(currentIndex - width >= 0) currentIndex -= width;
            break
        case 39:
            if(currentIndex % width < width -1) currentIndex += 1;
            break
        case 40:
            if(currentIndex + width < width * width) currentIndex += width;
            break
          }
          squares[currentIndex].classList.add('frog');
          lose();
          win();
 }


function autoMoveCars() {
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}

function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function autoMoveLogs() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
}

function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}
//reference index number 4, which is the 5th div.
function win() {
    if(squares[4].classList.contains('frog')) {
        result.innerHTML = 'You win'
        squares[currentIndex].classList.remove('frog')
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

//note: (c1) is the truck img & (l5), (l4) is the river img
function lose() {
    if((currentTime === 0) || (squares[currentIndex].classList.contains('c1')) || (squares[currentIndex].classList.contains('l5')) || (squares[currentIndex].classList.contains('l4'))) {
        result.innerHTML = 'You Looose'
    squares[currentIndex].classList.remove('frog')
clearInterval(timerId)
document.removeEventListener('keyup', movefrog)
}
}

function moveWithLogLeft() {
    if (currentIndex >= 27 && currentIndex < 35){
       squares[currentIndex].classList.add('frog')
       currentIndex += 1
       squares[currentIndex].classList.add('frog') 
    }
}
function moveWithLogRight() {
    if (currentIndex > 18 && currentIndex <= 26){
       squares[currentIndex].classList.add('frog')
       currentIndex -= 1
       squares[currentIndex].classList.add('frog') 
    }
}

function movePiece () {
    currentTime--
    timeLeft.textContent = currentTime
    autoMoveCars()
    autoMoveLogs()
    moveWithLogLeft()
    moveWithLogRight()
    lose()
}
startButton.addEventListener('click', () => {
    if(timerId)
{
    clearInterval(timerId)
} else {
    timerId = setInterval(movePiece, 1000)
    document.addEventListener('keyup', movefrog)
}
})

// function movelogRight(logRight) {
//     switch (true) {
//         case logRight.classList.contains('c1'):
//             logRight.classList.remove('c1')
//             logRight.classList.add('c3')
//             break
//         case logRight.classList.contains('c2'):
//             logRight.classList.remove('c2')
//             logRight.classList.add('c1')
//             break
//         case logRight.classList.contains('c3'):
//             logRight.classList.remove('c3')
//             logRight.classList.add('c2')
//             break
//     }
// }