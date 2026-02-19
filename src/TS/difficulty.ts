import getDifficulties from "./functions/getDifficulties.ts";

const url = new URL(window.location.href)
const cards__container = document.getElementById('cards__container') as HTMLDivElement
const subjectDetails = document.getElementById('subject__details') as HTMLDivElement

//1. get difficulty data from supabase and return array of object
const difficulties = await getDifficulties() || {}
console.log(difficulties)


//2. set the subject name and logo
subjectDetails.innerHTML = `    
    ${difficulties[0].subject_svg_icon}
    <div class="subject__name">
        ${difficulties[0].subject_name}
    </div>
`

//3. get all the diff from the supabase and render them on the dom
difficulties.map((diff: any) => {
    cards__container.innerHTML += `
        <div class="diff__card diff__card--${diff.level_name}" id="${diff.id}">
            <div class="diff__card__icon">
                ${diff.level_icon}
            </div>
            <div class="diff__card__text">
                <h3>${diff.level_name}</h3>
                <p>${diff.level_text}</p>
            </div>
            <div class="diff__card__PTS">
                +${diff.points_per_question} PTS / Correct
                <span class="diff__card__PTS__time">${diff.time_limit_seconds} S / Question</span>
            </div>
        </div>
    `
})

//4. set selected card id to parameter and the send user to questions page
cards__container.addEventListener('click', (e) => {
    // @ts-ignore
    if (!e.target.closest('.diff__card')) {
        return
    }

    // 4.1. add selected difficulty id to the url that we created before
    // @ts-ignore
    url.searchParams.set('did', `${e.target.closest('.diff__card').id}`)

    //4.2. then update url without reloading the page
    window.history.pushState({}, '', url)

    const currentParam = window.location.search || ''

    //4.3 if there was a parameter the add to the next page
    if (currentParam) {
        //4.4 get the next page url and then add the current parameter
        const destinationUrl = '/Pages/questions.html' + currentParam
        // console.log(destinationUrl)

        //4.5 then go to the url
        window.location.href = destinationUrl
    }
})