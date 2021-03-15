const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionNumber = document.getElementById("questionNumber");
const scoreNumber = document.getElementById("scoreNumber");
//console.log(choices);

// create vars
let currentQuestion = {}
let acceptAnswer = false;
let score = 0;
let questionCounter = 0; // which question they are at ? starts from 0
let availableQuestion = []; //

let questions = [];
  (fetch(
   "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium"
))
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

          return   formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

// consts
const correctBonus = 10; // points for each correct answer;
const maxQuestion = 10; // how many question does user gets ? 

function startGame() {
    socre = 0;
    questionCounter = 0;
    availableQuestion = [...questions] // spread operator =  takes each item from question array and spreads each item and creates a new array.
    getNewQuestion();
  //  console.log(availableQuestion);
}

getNewQuestion = () => {

if (availableQuestion.length === 0 || questionCounter > maxQuestion) {  // check if all question are answered
   localStorage.setItem("mostRecentScore", score)
    
    // go to the home page
    return window.location.assign("/end.html");                          // if so, go to the end page.
}

    questionCounter++; // when start, increase by 1;
    questionNumber.innerText = questionCounter + "/" + maxQuestion;     // heads up display. score and number of questions - `${questionCounter}/${maxQuestion}`;

    const questionIndex = Math.floor(Math.random() * availableQuestion.length); // gets random number question in questions array. and gives remaining questions
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question; // current question with question property

    choices.forEach(choice => {
        const number = choice.dataset["number"]; // data-number attribute
        choice.innerText = currentQuestion["choice" + number];

    });

    availableQuestion.splice(questionIndex, 1); // get rid of used questions
    acceptAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
 // console.log(e.target);
        if (!acceptAnswer) return;
        acceptAnswer = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]

       // const classToApply = "incorrect";
// if (selectedAnswer == currentQuestion.answer) {           
  // return "correct";
     // check if selected answer is correct or incorrect

   const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect" ; 
 // console.log(classToApply);

if (classToApply === "correct") {
    incrementScore(correctBonus);
}

 selectedChoice.parentNode.classList.add(classToApply);    // add class to the parent element, adding class 
 setTimeout( () => {
    selectedChoice.parentNode.classList.remove(classToApply); 
 }, 1000);

 getNewQuestion();
    })
});

function incrementScore(num) {           // adding new scores
    score += num;
    scoreNumber.innerText = score;      // get new scores
}

