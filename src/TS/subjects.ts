import getSubjects from "./functions/getSubjects.ts";

const url = new URL(window.location.href)
const subjectsContainer = document.getElementById('subject-container') as HTMLDivElement
const continueAnchor = document.getElementById('continue') as HTMLButtonElement

//1. get subjects from the supabase
const subjects = await getSubjects()


//2. loop over all the subjects and add them to the container
subjects.map((subject: { id: number; svg_icon: string; name: string; }) => {
    subjectsContainer.innerHTML += `
    <div class='subject-card' id='${subject.id}'>
        <div class='icon-box'>
            ${subject.svg_icon}
        </div>
        <h3>${subject.name}</h3>
    </div>
    `
})

//3. when click happen on subject container change the class and append url if click on any subject div
// @ts-ignore
subjectsContainer.addEventListener('click', (e) => {
    //3.1. if target element is not an any subject card then return
    // @ts-ignore
    if (!e.target.closest('.subject-card')) {
        return
    }

    const subject = document.getElementsByClassName('subject-card')

    //3.2. loop over the all the subject that are in the container and remove selected class
    for (let sub of subject) {
        sub.classList.remove('selected')
    }

    //3.3. add selected class to clicked one
    // @ts-ignore
    const target = e.target.closest('.subject-card')
    target.classList.add('selected')
    // console.log(target)

    //3.4. add selected subject id to the url that we created before
    url.searchParams.set('sid', `${target.id}`)

    //3.5. then update url without reloading the page
    window.history.pushState({}, '', url)

    //3.6. assign this style to btn
    Object.assign(continueAnchor.style, {
        opacity: '1',
        cursor: 'pointer',
        'pointer-events': 'auto'
    })

    //3.7. remove disabled attribute from btn
    continueAnchor.removeAttribute('disabled')
})


// event listener for continue btn
continueAnchor.addEventListener('click', (e) => {
    e.preventDefault()
    const currentParam = window.location.search || null


    if (currentParam) {
        const destinationUrl = continueAnchor.getAttribute('href') + currentParam
        // console.log(destinationUrl)
        window.location.href = destinationUrl
    } else {
        window.location.href = '/Pages/difficulty.html'
    }

})
