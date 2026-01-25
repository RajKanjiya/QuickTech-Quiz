import getQuestions from "../functions/getQuestions.ts";
import handleUploadQuizResult from "../functions/handleUploadQuizResult.ts";

const timer = document.getElementById('time') as HTMLSpanElement
const options = document.getElementsByTagName('li')
const nextBtn = document.getElementById('btn-next') as HTMLButtonElement
const previousBtn = document.getElementById('btn-previous') as HTMLButtonElement
const questionNoHTML = document.getElementById('question-no') as HTMLDivElement
const questionText = document.getElementById('question-text') as HTMLDivElement
const optionUl = document.getElementById('options-ul') as HTMLUListElement
let intervalID: number;
let questionNo: number = 1;
let correctAnswers: number = 0
let totalTakenSecond: number = 0

const url = new URL(window.location.href)
const sid = url.searchParams.get('sid')
const did = url.searchParams.get('did')

//1. get question from the supabase
const questions = await getQuestions()

const selectedAnswers = Array.from({length: questions.length - 1}).fill(-1)

let totalTimerId = setInterval(() => {
    totalTakenSecond++
}, 1000)

let timerForQuestion = Number(questions[0].time_limit_seconds) * questions.length
// let timerForQuestion = 10;


//2. initial call for display first question and start timer
generateQuestion()
startInterval()

//3. check for click event
nextBtn.addEventListener('click', handleNextBtn)
previousBtn.addEventListener('click', handlePreviousBtn)
optionUl.addEventListener('click', handleSelectedQuestion)

////////////////////////////
/////////////////////////////
//Functions

// function to generate question
function generateQuestion() {
    //1. change the question number
    questionNoHTML.textContent = `Question: ${questionNo} / ${questions.length}`

    //2. display question
    questionText.textContent = `${questions[questionNo - 1].question_text}`


    //3 display options
    questions[questionNo - 1].options.map((opt: any) => {
        if (selectedAnswers[questionNo - 1] == opt.option_text) {
            optionUl.innerHTML += `
            <li class="option__text active">${opt.option_text}</li>
        `
        } else {
            optionUl.innerHTML += `
        <li class="option__text">${opt.option_text}</li>
    `
        }
    })
}

// handle for next question and restart the interval
function handleSelectedQuestion(e: any) {
    // return if the target is not option li or not next btn
    if (e.target.classList.contains('question__options') && !(e.target.textContent == 'Next' || e.target.textContent == 'Finish')) {
        return;
    }

    for (let options of optionUl.children) {
        options.classList.remove('active')
    }

    e.target.classList.add('active')

    selectedAnswers[questionNo - 1] = e.target.textContent
}

function handleFinishScreen() {
    for (let i = 0; i < questions.length; i++) {
        if (selectedAnswers[i] == questions[i].correct_option_text) {
            correctAnswers++
        }
    }


    questionNoHTML.textContent = `Completed`
    timer.textContent = '00:00'
    clearInterval(intervalID)
    clearInterval(totalTimerId)
    questionText.textContent = ''
    nextBtn.classList.add('hidden')
    previousBtn.classList.add('hidden')
    // @ts-ignore
    document.getElementById('question__body__id').innerHTML = `
    <div class="finalBox" id="finish">
            <div class="pill">Quiz Completed 🎉</div>
            <div class="final-score"><span id="correct-question">${correctAnswers}</span>/<span id="total-questions">${questions.length}</span></div>
            <div class="pill">Points Earned : <span id="final__Points">${(Number(correctAnswers) * Number(questions[0].points_per_question))}</span></div>
            <a class="" href="src/index.html">Home</a>
        </div>`


    handleUploadQuizResult(sid, did, (Number(correctAnswers) * Number(questions[0].points_per_question)), correctAnswers, questions.length, totalTakenSecond)
}

function handleNextBtn() {
    if (questionNo > questions.length - 1) {
        for (let i = 0; i < questions.length; i++) {
            if (selectedAnswers[i] === -1 && timerForQuestion != 0) {
                questionNo = i + 1;
                optionUl.innerHTML = ''
                if (questionNo == questions.length) {
                    nextBtn.innerHTML = 'Finish'
                } else {
                    nextBtn.innerHTML = 'Next'
                }
                generateQuestion()
                alert("Please select all answers")
                return
            }
        }

        if (!confirm('Do you want to submit test')) {
            return;
        }

        handleFinishScreen()
    }

    if (questionNo < questions.length) {
        questionNo++
        optionUl.innerHTML = ''
        generateQuestion()
    }

    if (questionNo == questions.length) {
        nextBtn.innerHTML = 'Finish'
    } else {
        nextBtn.innerHTML = 'Next'
    }

}

function handlePreviousBtn() {
    if (questionNo > 1) {
        questionNo--
        optionUl.innerHTML = ''
        generateQuestion()
    }

    if (questionNo == questions.length) {
        nextBtn.innerHTML = 'Finish'
    } else {
        nextBtn.innerHTML = 'Next'
    }
}

//set timer
function startInterval() {
    handleTimer()
    intervalID = setInterval(handleTimer, 1000)
}

// decrease time by 1 in html
function handleTimer() {
    timer.textContent = timerForQuestion.toString()
    timerForQuestion--
    const minutes = Math.floor(timerForQuestion / 60)
    const seconds = Math.floor(timerForQuestion % 60)
    if (Number(timer.textContent) <= 0) {
        timer.textContent = '00:00'
        clearInterval(intervalID)
        disableOptions()
        alert("Your time is over")
        handleFinishScreen()
    } else {
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

//when time is 00 then disable all options and enable next btn
function disableOptions() {
    for (let li of options) {
        li.classList.add('li-disabled')
    }
}