import getUserDetails from "./functions/getUserData.ts";

const avatar = document.getElementById('user-avatar') as HTMLDivElement
const userMenu = document.getElementById('user-Menu') as HTMLDivElement
const greater = document.getElementById('toggle-arrow') as HTMLElement
const userPFP = document.getElementById('PFP') as HTMLImageElement
const userName = document.getElementById('nav-user-name') as HTMLSpanElement
const userMenuName = document.getElementById('user-Menu-Name') as HTMLSpanElement
const userScore = document.getElementById('nav-total-score') as HTMLSpanElement

document.getElementById('logo')?.addEventListener('click', () => {
    window.location.href = '/index.html'
})

//interface for provide what getUserDetails() function return
interface UserDetails {
    avatar_url: string
    username: string
    total_points: number
}

//function to check user is auth or not
(async function () {
    //1. get user data
    const data = await getUserDetails() as UserDetails

    // 2. if user not found then send user to the login page
    if (!data) {
        window.location.href = '/Pages/login.html'
        return
    }

    //3. set user PFP , name and points
    userPFP.src = `${data.avatar_url}`
    userName.textContent = `Hello , ${data.username}`
    userMenuName.textContent = `${data.username}`
    userScore.textContent = `${data.total_points}`
})()

function handleOpenUserMenu(e: Event) {
    //this prevents event from continuing to bubble (or capture) through the DOM after it is handled by the current element.
    e.stopPropagation();

    //1. toggle class list of all of this
    userMenu.classList.toggle('hidden')
    userMenu.classList.toggle('slidInOut')
    greater.classList.toggle('arrowDown')
    document.addEventListener('click', handleCloseUserMenu);
}


//function to close user menu
function handleCloseUserMenu(e: Event) {
    // @ts-ignore
    if (!e.target.closest('#user-Menu')) {
        //1. add hidden class list of all of this
        userMenu.classList.remove('slidInOut')
        greater.classList.remove('arrowDown')
        userMenu.classList.add('hidden')
        document.removeEventListener('click', handleCloseUserMenu)
    }

}

avatar.addEventListener('click', handleOpenUserMenu)