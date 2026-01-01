import getUserDetails from "./functions/getUserData.ts";
import {supabase} from "../supabase/SupabaseClint.ts";

//function to check user is auth or not
(async function () {
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        // @ts-ignore
        window.location.href = '/Pages/login.html'
    }
})()

interface UserDetails {
    username: string;
    avatar_url: string;
    total_points: number;
}

//get detail of the user
const {username, avatar_url, total_points} = await getUserDetails() as UserDetails
// console.log(username, avatar_url, total_points)


const avatar = document.getElementById('user-avatar') as HTMLDivElement
const userMenu = document.getElementById('user-Menu') as HTMLDivElement
const greater = document.getElementById('toggle-arrow') as HTMLElement
const userPFP = document.getElementById('PFP') as HTMLImageElement
const userName = document.getElementById('nav-user-name') as HTMLSpanElement
const userScore = document.getElementById('nav-total-score') as HTMLSpanElement

userPFP.src = avatar_url
userName.textContent = `Hello , ${username}`
userScore.textContent = `${total_points}`

//function to open user menu
function handleOpenUserMenu(e: Event) {
    //this prevents event from continuing to bubble (or capture) through the DOM after it is handled by the current element.
    e.stopPropagation();
    userMenu.classList.toggle('hidden')
    userMenu.classList.toggle('show')
    greater.classList.toggle('arrowDown')
    document.addEventListener('click', handleCloseUserMenu);
}


//function to close user menu
function handleCloseUserMenu(e: Event) {
    // @ts-ignore
    if (!e.target.closest('#user-Menu')) {
        userMenu.classList.add('hidden')
        userMenu.classList.remove('show')
        greater.classList.remove('arrowDown')
    }

    document.removeEventListener('click', handleCloseUserMenu)
}

avatar.addEventListener('click', handleOpenUserMenu)