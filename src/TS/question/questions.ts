import getQuestions from "../functions/getQuestions.ts";
import handleUploadQuizResult from "../functions/handleUploadQuizResult.ts";

const timer = document.getElementById('time') as HTMLSpanElement
const options = document.getElementsByTagName('li')
const nextBtn = document.getElementById('btn-next') as HTMLButtonElement
const questionNoHTML = document.getElementById('question-no') as HTMLDivElement
const quesitionText = document.getElementById('question-text') as HTMLDivElement
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
console.log(questions)

let totalTimerId = setInterval(() => {
    totalTakenSecond++
}, 1000)

let timerForQuestion = questions[0].time_limit_seconds
// let timerForQuestion = '05'


//2. initial call for display first question
generateQuestion()

//3. check for click event
nextBtn.addEventListener('click', handleNextQuestion)
optionUl.addEventListener('click', handleNextQuestion)

////////////////////////////
/////////////////////////////
//Functions

// function to generate question
function generateQuestion() {
    //1. change the question number
    questionNoHTML.textContent = `Question: ${questionNo} / ${questions.length}`

    //2. display question
    quesitionText.textContent = `${questions[questionNo - 1].question_text}`


    //3 display options
    questions[questionNo - 1].options.map((opt: any) => {
        // console.log(opt)
        optionUl.innerHTML += `
        <li class="option__text">${opt.option_text}</li>
    `
    })

    //2.4. start timer
    startInterval()
}

// handle for next question and restart the interval
function handleNextQuestion(e: any) {
    // return if the target is not option li or not next btn
    if (e.target.classList.contains('question__options') && !(e.target.textContent == 'Next' || e.target.textContent == 'Finish')) {
        return;
    }

    //if the question is last then change the text of next btn
    if (questionNo == questions.length - 1) {
        nextBtn.innerHTML = 'Finish'
    }

    //then last do all of this
    questionNo++;
    setElementsToInitialValue()
    clearInterval(intervalID)
    handleSelectedAnswer(e)
}

//check selected ans if right or not
function handleSelectedAnswer(e: any) {
    // if question is last then show the final screed
    if (questionNo > questions.length) {
        questionNoHTML.textContent = `Completed`
        timer.textContent = '00'
        handleFinishScreen()
        return
    }
    // console.log(questions[questionNo - 2].correct_option_text, e.target.textContent)

    //if any one option is selected and the selected is right then increase correctAnswers count
    if ((!(e.target.textContent == 'Next') || !(e.target.textContent == 'Finish')) && (questions[questionNo - 2].correct_option_text == e.target.textContent)) {
        correctAnswers++
    }

    //last generate the next question
    generateQuestion()
}

function handleFinishScreen() {
    // console.log(correctAnswers)

    clearInterval(totalTimerId)
    quesitionText.textContent = ''
    nextBtn.classList.add('hidden')
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

//set initial value for all that we change
function setElementsToInitialValue() {
    optionUl.innerHTML = ''
    timer.textContent = timerForQuestion


    Object.assign(nextBtn.style, {
        opacity: '.8',
        cursor: 'not-allowed',
        'pointer-events': 'none',
    })
}

//set timer
function startInterval() {
    // initial time come from the supabase
    timer.textContent = timerForQuestion
    intervalID = setInterval(handleTimer, 1000)
}

// decrease time by 1 in html
function handleTimer() {
    if (Number(timer.textContent) <= 0) {
        timer.textContent = '00'
        clearInterval(intervalID)

        disableOptions()
    } else {
        timer.textContent = `${Number(timer.textContent) - 1}`.padStart(2, '0');
    }
}

//when time is 00 then disable all options and enable next btn
function disableOptions() {
    for (let li of options) {
        li.classList.add('li-disabled')
    }

    Object.assign(nextBtn.style, {
        opacity: '1',
        cursor: 'pointer',
        'pointer-events': 'auto',
    })
}