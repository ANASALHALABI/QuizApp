const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "blue whale", correct: true},
            {text: "lion", correct: false},
            {text: "fish", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "blue whale", correct: false},
            {text: "lion", correct: true},
            {text: "fish", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "shark", correct: true},
            {text: "blue whale", correct: false},
            {text: "lion", correct: false},
            {text: "fish", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "blue whale", correct: false},
            {text: "lion", correct: false},
            {text: "fish", correct: true},
        ]
    },
];
const questionElemnt = document.getElementById('question');
const answer_buttons = document.getElementById('answer-buttons');
const next_btn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
function startquiz(){
    currentQuestionIndex = 0;
    score= 0;
    next_btn.innerHTML= 'next';
    showQuestions();
}
function showQuestions(){
    resertState();
    let currentquestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElemnt.innerHTML = questionNo + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_buttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
    
}

function resertState(){
    next_btn.style.display = "none";
    while(answer_buttons.firstChild){
        answer_buttons.removeChild(answer_buttons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answer_buttons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    next_btn.style.display = "block"
}

function showScore(){
    resertState();
    questionElemnt.innerHTML = `you scored ${score} out if ${questions.length}!`;
    next_btn.innerHTML = "play Again";
    next_btn.style.display = "block"
}

function habdleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}
next_btn.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        habdleNextButton();
    }else{
        startquiz();
    }
})


startquiz();