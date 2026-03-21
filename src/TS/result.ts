const correctQuestions = document.getElementById("correct-questions") as HTMLDivElement;
const timeTaken = document.getElementById("time-taken") as HTMLSpanElement;
const pointsEarned = document.getElementById("pointsEarned") as HTMLSpanElement;
const backHome = document.getElementById("back-home") as HTMLButtonElement;

const resultDta = localStorage.getItem("quizResult");

interface Data {
    correctAnswers: number
    scores: number
    totalQuestions: number
    totalTakenSecond: number
}

let data = {} as Data

if (resultDta != null) {
    data = JSON.parse(resultDta);
}

correctQuestions.innerHTML = `
    ${data.correctAnswers}<span id="total-questions">/${data.totalQuestions}</span>
`;

pointsEarned.innerText = String(data.scores);

let min = Math.floor(data.totalTakenSecond / 60);
let sec = data.totalTakenSecond % 60;

timeTaken.innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

backHome.addEventListener("click", () => {
    window.location.href = "/index.html"
})

