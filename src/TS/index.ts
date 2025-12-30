(function () {
    // @ts-ignore
    const user = localStorage.getItem('sb-btzwhcdauwvywppnrddm-auth-token')

    if (!user) {
        window.location.href = 'src/Pages/login.html'
    }

})()

const avatar = document.getElementById('user-avatar') as HTMLDivElement
const userMenu = document.getElementById('user-Menu') as HTMLDivElement
const greater = document.getElementById('toggle-arrow') as HTMLElement


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