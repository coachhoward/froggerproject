//this file is a rebuild of project 1 file. I could not figure out how to link properly 
//with 3 diff html pages. Ask in chat if I cant debug. Put both files in github

//target all divs in game graph
const squares = document.querySelectorAll('.grid div');
//time left in game
const timeLeft = document.querySelector('#time-remaining');
//results of game
const result = document.querySelector('#result');
//start after refresh
const startButton = document.querySelector('#button');
const nextRound = document.querySelector('#next-round')
const tryAgain = document.querySelector('#try-again')
//text to show results of game
const h1Text = document.querySelector('.h1text')
//cars moving left to tartet in loop
const carsLeft = document.querySelectorAll('.car-left');
//cars moving right to target in loop
const carsRight = document.querySelectorAll('.car-right');
//log left target
const logsLeft = document.querySelectorAll('.log-left');
//log right target
const logsRight = document.querySelectorAll('.log-right');

//make a 9x9 grid for the gameboard
const width = 9;
//set starting point at index 76, which is bottom middle
let currentIndex = 76;
//timer at 20 seconds
let currentTime = 20;
//timer Id w/value
let timerId;


//add frog to bottom middle on ind 76 bottom
 squares[currentIndex].classList.add('frog')
//jquery frog jumping sound
//link to relative path sounds

//add frog jumping audio
 const frogSound = new Audio ('sounds/frog_jump(3).mp3');
 $(document).on('keydown',e => frogSound.play());

 const frogDied = new Audio ('sounds/hit_by_car (16).mp3');
 $(document).on('keydown',e => frogSound.play());

 const frogWins = new Audio ('sounds/frogWin.mp3');

 const sound = new Audio("sounds/game_audio.mp3");
$('#next-round').click(e => sound.play());
$('#button').click(e => sound.play());
$('.h1text').click(e => sound.play());
$('#try-again').click(e => sound.play());


//use arrow keys on keyboard to move frog 37=L,38=up,39=R,40=down
 function movefrog (event){
     squares[currentIndex].classList.remove('frog')
     switch(event.keyCode){
         //37 is left arrow
        case 37:
             if(currentIndex % width !== 0) currentIndex -= 1;
            break
            //38 is up arrow
        case 38:
            if(currentIndex - width >= 0) currentIndex -= width;
            break
            //39 is right arrow
        case 39:
            if(currentIndex % width < width -1) currentIndex += 1;
            break
            //40 is down arrow
        case 40:
            if(currentIndex + width < width * width) currentIndex += width;
            break
          }
          squares[currentIndex].classList.add('frog');

    //call lose/win, still need to define
          lose();
          win();
 }

 //const sound = new Audio("https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav");

  //$('event.keycode').keydown(e => sound.play());

//use foreach to create an illusion that cars and logs are moving. ////Also add timer to control speed 
//target class names .car-left and .car-right
function autoMoveCars() {
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}
//switch 
function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('car1'):
            carLeft.classList.remove('car1')
            carLeft.classList.add('car2')
            break
        case carLeft.classList.contains('car2'):
            carLeft.classList.remove('car2')
            carLeft.classList.add('car3')
            break
        case carLeft.classList.contains('car3'):
            carLeft.classList.remove('car3')
            carLeft.classList.add('car1')
            break
    }
}
//switch
function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('car1'):
            carRight.classList.remove('car1')
            carRight.classList.add('car3')
            break
        case carRight.classList.contains('car2'):
            carRight.classList.remove('car2')
            carRight.classList.add('car1')
            break
        case carRight.classList.contains('car3'):
            carRight.classList.remove('car3')
            carRight.classList.add('car2')
            break
    }
}
//foreach to create move log illusion
function autoMoveLogs() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
}
//5 wide, 3 log ,2 water
function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('log1'):
            logLeft.classList.remove('log1')
            logLeft.classList.add('log2')
            break
        case logLeft.classList.contains('log2'):
            logLeft.classList.remove('log2')
            logLeft.classList.add('log3')
            break
        case logLeft.classList.contains('log3'):
            logLeft.classList.remove('log3')
            logLeft.classList.add('log4')
            break
        case logLeft.classList.contains('log4'):
            logLeft.classList.remove('log4')
            logLeft.classList.add('log5')
            break
        case logLeft.classList.contains('log5'):
            logLeft.classList.remove('log5')
            logLeft.classList.add('log1')
            break
    }
}
//switch
function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('log1'):
            logRight.classList.remove('log1')
            logRight.classList.add('log5')
            break
        case logRight.classList.contains('log2'):
            logRight.classList.remove('log2')
            logRight.classList.add('log1')
            break
        case logRight.classList.contains('log3'):
            logRight.classList.remove('log3')
            logRight.classList.add('log2')
            break
        case logRight.classList.contains('log4'):
            logRight.classList.remove('log4')
            logRight.classList.add('log3')
            break
        case logRight.classList.contains('log5'):
            logRight.classList.remove('log5')
            logRight.classList.add('log4')
            break
    }
}
//reference index number 4, which is the 5th div.
function win() {
    if(squares[4].classList.contains('frog')) {
        h1Text.innerHTML = `You win! You must be feeling "Froggy" `
        frogWins.play()
        squares[currentIndex].classList.remove('frog')
        clearInterval(timerId)
        document.removeEventListener('keyup', movefrog)
    }
}
//define lose func
//note: (car1) is the truck img & (log5), (log4) is the river img
function lose() {
    if((currentTime === 0) || (squares[currentIndex].classList.contains('car1')) || (squares[currentIndex].classList.contains('log5')) || (squares[currentIndex].classList.contains('log4'))) {
        h1Text.innerHTML = (`You Lose, you have to "Be Careful and Hurry Up" hit the refresh button and try again.`)
        frogDied.play()
    squares[currentIndex].classList.remove('frog')
clearInterval(timerId)
document.removeEventListener('keyup', movefrog)
}
}
//move frog on log
function moveWithLogLeft() {
    if (currentIndex >= 27 && currentIndex < 35){
       squares[currentIndex].classList.remove('frog')
       currentIndex += 1
       squares[currentIndex].classList.add('frog') 
    }
}
//move frog on log
function moveWithLogRight() {
    if (currentIndex > 18 && currentIndex <= 26){
       squares[currentIndex].classList.remove('frog')
       currentIndex -= 1
       squares[currentIndex].classList.add('frog') 
    }
}
//func move pices on game grid invoke
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

nextRound.addEventListener('click', () => {
    if(timerId)
{
    clearInterval(timerId)
} else {
    timerId = setInterval(movePiece, 1000)
    document.addEventListener('keyup', movefrog)
    
}

})
tryAgain.addEventListener('click', () => {
    if(timerId)
{
    clearInterval(timerId)
} else {
    timerId = setInterval(movePiece, 1000)
    document.addEventListener('keyup', movefrog)
    
}

})

// function movePiece () {
//     currentTime--
//     timeLeft.textContent = currentTime
//     autoMoveCars()
//     autoMoveLogs()
//     moveWithLogLeft()
//     moveWithLogRight()
//     lose()
// }




// $('.car1').on(e => sound.play();



$('#try-agian').click(function(){
    console.log('test')
location.reload(true)
})




// const $openBtn = $('#openModal');
// const $modal = $('#modal');
// const $closeBtn = $('#close');
// //Event Handlers
// const openModal = (event) => {
//   $modal.css('display', 'block');
// }
// const closeModal = (event) => {
//   $modal.css('display', 'none');
// }
// //Event Listeners
// $openBtn.on('click', openModal);
// $closeBtn.on('click', closeModal);



// const $restart = $('#button')
// $($restart).click(function() {
//     location.reload();
// });

// $(function() {
//     $("#dialog").dialog();
//   } );



// const $nextRound = $("#next-round").click(function()
// {
//     location.reload(true);
// }

// );




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