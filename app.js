document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
    const upBtn = document.querySelector('.up-btn')
    const downBtn = document.querySelector('.down-btn')
    const leftBtn = document.querySelector('.left-btn')
    const rightBtn = document.querySelector('.right-btn')

    const width = 12
    let currentIndex = 0 // first div in the grid
    let appleIndex = 0 // first div in the grid
    let currentSnake = [2,1,0] // 2 head, 1 body, 0 tail
    let direction = 1
    let score = 0
    let speed = 0.85
    let intervalTime = 0
    let interval = 0


// to start and restart the game 
function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0 
    randomApple()
    direction = 1
    scoreDisplay.innerText = score 
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
}


// function to deal with all move outcomes of the snake
function moveOutcomes(){

    if(
        (currentSnake[0] + width >= (width * width) && direction === width) ||  // snake hits bottom 
        (currentSnake[0] % width >= (width - 1) && direction === 1) ||  // snake hits right wall
        (currentSnake[0] - width <=  0 && direction === -width) || // snake hits top 
        (currentSnake[0] % width <= 0 && direction === -1) || // snake hits left wall
        squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
    ) {
        return clearInterval(interval)
    }

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake') // removes class of snake from the tail
    currentSnake.unshift(currentSnake[0] + direction)

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

// generate a new apple once one is eaten

function randomApple() {
do {
    appleIndex = Math.floor(Math.random() * squares.length)
} while(squares[appleIndex].classList.contains('snake'))
squares[appleIndex].classList.add('apple')
}


// assign functions to keycodes
function control(e) {
    squares[currentIndex].classList.remove('snake')

     leftBtn.addEventListener('click', function() {
        direction = -1
     })
     upBtn.addEventListener('click', function() {
        direction = -width
     })
     rightBtn.addEventListener('click', function() {
        direction = 1
     })
     downBtn.addEventListener('click', function() {
        direction = +width
     })

    if(e.keyCode === 39) {
        direction = 1 // right
    } else if (e.keyCode === 38) {
        direction = -width // up
    } else if (e.keyCode === 37) {
        direction = -1 // left
    } else if (e.keyCode === 40) {
        direction = +width // down
    }
}

document.addEventListener('keyup', control)
document.addEventListener('click', control)
startBtn.addEventListener('click', startGame)

})