
const squares = document.querySelectorAll('.grid div');
const timeLeft = document.querySelector('#time');
const result = document.querySelector('#result');
const startButton = document.querySelector('#button');

const carsLeft = document.querySelector('.car-left');
const carsRight = document.querySelector('.car-right');
const logsLeft = document.querySelector('.log-left');
const logsRight = document.querySelector('.log-right');




const width = 9;
let currentIndex = 76;
let timer 

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
    }
}

