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
console.log(questions)

//2. create array to store whether the answer is selected or not
const selectedAnswers = Array.from({length: questions.length}).fill(-1)

//3. start timer to calculate total taken time for this quiz
let totalTimerId = setInterval(() => {
    totalTakenSecond++
}, 1000)

//4. set time of whole quiz
let timerForQuestion = Number(questions[0].time_limit_seconds) * questions.length
// let timerForQuestion = 10;


//5. initial call for display first question and start timer
generateQuestion()
startInterval()

//6. check for click event
nextBtn.addEventListener('click', handleNextBtn)
previousBtn.addEventListener('click', handlePreviousBtn)
optionUl.addEventListener('click', handleSelectedQuestion)

////////////////////////////
/////////////////////////////
//Functions

//1. function to generate question
function generateQuestion() {
    //1. change the question number
    questionNoHTML.textContent = `Question: ${questionNo} / ${questions.length}`

    //2. display question
    questionText.textContent = `${questions[questionNo - 1].question_text}`


    //3 display options
    questions[questionNo - 1].options.map((opt: any) => {
        // console.log(typeof opt.option_text, opt.option_text)

        //3.1 if option is not selected then display all without any classes
        if (selectedAnswers[questionNo - 1] === -1) {
            const li = document.createElement('li')
            li.className = "option__text"
            li.textContent = opt.option_text;
            optionUl.appendChild(li);
            // optionUl.innerHTML += `
            // <li class="option__text">${opt.option_text}</li>
            // `
        }
        //3.2 else display question like this
        else {
            //3.2.1 if this is correct answer then add correct class to it
            if (opt.option_text === questions[questionNo - 1].correct_option_text) {
                const li = document.createElement('li')
                li.className = "option__text correct"
                li.textContent = opt.option_text;
                optionUl.appendChild(li);
                // optionUl.innerHTML += `
                // <li class="option__text correct">${opt.option_text}</li>
                // `
            }
            //3.2.2 if the selected ans is wrong then add wrong class
            else if (selectedAnswers[questionNo - 1] === opt.option_text) {
                const li = document.createElement('li')
                li.className = "option__text wrong"
                li.textContent = opt.option_text;
                optionUl.appendChild(li);
                // optionUl.innerHTML += `
                //     <li class="option__text wrong">${opt.option_text}</li>
                // `
            } else {
                const li = document.createElement('li')
                li.className = "option__text"
                li.textContent = opt.option_text;
                optionUl.appendChild(li);
                // optionUl.innerHTML += `
                //     <li class="option__text">${opt.option_text}</li>
                // `
            }
            disableOptions()
        }
    })
}

//2. handle for next question and restart the interval
function handleSelectedQuestion(e: any) {
    //1. return if the target is not option li or not next btn
    if (e.target.classList.contains('question__options') && !(e.target.textContent == 'Next' || e.target.textContent == 'Finish')) {
        return;
    }

    //2. if selected answer is correct then add correct class
    if (e.target.textContent === questions[questionNo - 1].correct_option_text) {
        e.target.classList.add('correct')
    }
    //3. if wrong then do this
    else {
        //3.1 get all list from the document
        let lis = document.getElementsByTagName('li') as HTMLCollection

        //3.2 loop over the all lists and add correct class to the correct answer
        for (const li of lis) {
            if (li.textContent === questions[questionNo - 1].correct_option_text) {
                li.classList.add('correct')
                break;
            }
        }
        //3.3 then add wrong class to selected one
        e.target.classList.add('wrong')
    }

    //4. disable all the options
    disableOptions()

    //5. update selectedAnswers to selected one
    selectedAnswers[questionNo - 1] = e.target.textContent
}


//3. this function handle finish screen or score screen
function handleFinishScreen() {
    //1. check all selected answers and increase correctAnswers by 1
    for (let i = 0; i < questions.length; i++) {
        if (selectedAnswers[i] == questions[i].correct_option_text) {
            correctAnswers++
        }
    }

    //2. change the timer and question no text
    questionNoHTML.textContent = `Completed`
    timer.textContent = '00:00'

    //3. clear both timer
    clearInterval(intervalID)
    clearInterval(totalTimerId)

    //4. clear the question and next and previous btns
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

    //5. upload the result data to DB
    handleUploadQuizResult(sid, did, (Number(correctAnswers) * Number(questions[0].points_per_question)), correctAnswers, questions.length, totalTakenSecond)
}

//4. this function handle next btn
function handleNextBtn() {
    //1. check is question is last or not
    if (questionNo > questions.length - 1) {
        for (let i = 0; i < questions.length; i++) {
            //1.1 if user miss any question then first show pop up and go to that question
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

        //1.2 if user is on last question then do this
        if (!confirm('Do you want to submit test')) {
            return;
        }

        //1.3 then display the result
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

//5. this function handle previous btn
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