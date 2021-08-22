let body = document.body
let startButton = document.getElementById('startBtn')
let qDisplay = document.getElementById('qContent')
let pickA = document.getElementById('optionA')
let pickB = document.getElementById('optionB')
let pickC = document.getElementById('optionC')
let pickD = document.getElementById('optionD')
let score = 0
let secondsLeft = 50
let save = document.getElementById('saveScore')
let initialsInput = document.getElementById('initials')
let initialsSaved = ''
let scoreSaver = document.querySelector('.highScore')
let highScores = document.querySelector('.test')


// this function listens for the click event to save the initials of the quiz champion

function saveclick(event){
    event.preventDefault()
    

    initialsSaved = initialsInput.value
    scoreSaver.setAttribute('style', 'display: block;')

    let addScore = document.createElement('li')
    addScore.textContent = initialsSaved

    highScores.appendChild(addScore)


}

// this function displays the number correct/incorrect in main html landing page
let messageScore = function(){
    document.querySelector('.scoreOverlay').setAttribute('style', 'display: flex;')
    document.getElementById('numberCorrect').textContent = score;
    document.getElementById('numberWrong').textContent = ((qArray.length)-(score))
    
}

// this function builds the questions from the arrays to follow
function renderQuestions(){
    document.querySelector('.questions').setAttribute('style', 'visibility: visible;')
    currenQuestion = qArray[setQuestion]
    qDisplay.textContent = currenQuestion.question
    pickA.textContent = currenQuestion.choiceA
    pickB.textContent = currenQuestion.choiceB
    pickC.textContent = currenQuestion.choiceC
    pickD.textContent = currenQuestion.choiceD

    return;
}


let qArray = [
    {
        question: "What does JS stand for?",
        choiceA: "Javascript",
        choiceB: "Junctionscript",
        choiceC: "Java Source",
        choiceD: "Jumbo Shrimp",
        correct: "A"

    },{
        question: "All of the following can be used to declare a variable EXCEPT",
        choiceA: "const",
        choiceB: "let",
        choiceC: "var",
        choiceD: "myVariable",
        correct: "D"
    },{
        question: "Where should the <script></script> go in the HTML document?",
        choiceA: "at the very bottom of the <body>",
        choiceB: "in a <div> tag neara the header",
        choiceC: "In the <head> tag",
        choiceD: "Anywhere because Javascript doesn't have an order",
        correct: "A"
    }
]

let setQuestion = 0
let currenQuestion = []

// this function checks the answer given, increments to the next question from our array, and if the answer was correct
// it adds to the score, and the answer was wrong it subtracts 1o seconds from the timer
function checkAnswer(value){
    
    currenQuestion = qArray[setQuestion]
    
    if(value === currenQuestion.correct) {
        setQuestion ++;
        score ++;
    }else {
        setQuestion ++;
        secondsLeft = secondsLeft -(10);
    }

    if(setQuestion == qArray.length){
        messageScore();
        
        return;
    }
    
  
// this calls the questions to be rendered as defined above
    renderQuestions();
    
}

// this defines our timer and when the fuction beginGame takes place and begins the timer with 50 seconds on it
let timer = document.querySelector('.time')

function beginGame(){
    
    document.querySelector('.scoreOverlay').setAttribute('style', 'display: none;')
    setQuestion = 0
    score = 0
    let timerInterval = setInterval(function(){
        secondsLeft--;
        timer.textContent = "Time left: " + secondsLeft

        if(secondsLeft === 0){
            clearInterval(timerInterval) 
            messageScore()}
        
        if(setQuestion == qArray.length){
            clearInterval(timerInterval)
        }

        

    }, 1000);

    renderQuestions();
    
}
// listens for the click on the button to begin game to run the begin game function
save.addEventListener('click', saveclick)
startButton.addEventListener('click', beginGame)