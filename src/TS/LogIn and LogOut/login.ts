import {supabase} from "../../supabase/SupabaseClint.ts";

// window.location.href = 'Login'

const loginBtn = document.getElementById('loginDiv') as HTMLDivElement | null
const signUpBtn = document.getElementById('signUpDiv') as HTMLDivElement | null
const loginFrm = document.querySelector('form[name="loginForm"]')
const signUpFrm = document.querySelector('form[name="signUpForm"]')

// function validateEmail(email: string): boolean {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
// }

loginBtn?.addEventListener('click', function (): void {
    loginBtn.classList.add('btn--active')
    signUpBtn?.classList.remove('btn--active')
    loginFrm?.classList.add('active')
    signUpFrm?.classList.remove('active')


    loginFrm?.classList.add('leftToRightAnimation')
    signUpFrm?.classList.remove('leftToRightAnimation')
})

signUpBtn?.addEventListener('click', function (): void {
    loginBtn?.classList.remove('btn--active')
    signUpBtn?.classList.add('btn--active')
    loginFrm?.classList.remove('active')
    loginFrm?.classList.remove('leftToRightAnimation')
    signUpFrm?.classList.add('active')
    signUpFrm?.classList.add('leftToRightAnimation')
})

signUpFrm?.addEventListener('submit', handleSignUp)


loginFrm?.addEventListener('submit', handleLogin)

async function handleSignUp(e: any) {
    const max = 2
    const min = 1;
    e.preventDefault()
    const errorSpan = document.getElementById('signUpError') as HTMLElement
    errorSpan.classList.add('hidden')

    const username = (document.getElementById('signupUsername') as HTMLInputElement).value;
    const email = (document.getElementById('signupEmail') as HTMLInputElement).value;
    const password = (document.getElementById('signupPass') as HTMLInputElement).value;

    let {error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                "Display name": username,
                // This sends the username to your Trigger -> Profile Table
                username,
                avatar_url: `https://btzwhcdauwvywppnrddm.supabase.co/storage/v1/object/public/user_profile/${Math.random() * (max - min + 1)}.jpg`
            }
        }
    })

    if (error) {
        // switch (error.message)
        //Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};':"|<>?,./`~.
        //User already registered
        errorSpan.textContent = error.message
        errorSpan.classList.remove('hidden')
        return;
    }

    alert('Account created!')
    window.location.replace("../../index.html")

}

async function handleLogin(e: Event) {
    e.preventDefault()
    const errorSpan = document.getElementById('loginError') as HTMLElement
    errorSpan.classList.add('hidden')

    const email = (document.getElementById('loginEmail') as HTMLInputElement).value
    const password = (document.getElementById('loginPass') as HTMLInputElement).value


    let {error} = await supabase.auth.signInWithPassword({
        email,
        password
    })


    if (error) {
        // console.log(error.message)

        // errorSpan.textContent = error.message
        errorSpan.classList.remove('hidden')
        return;
    }

    alert('login successfully!')
    window.location.replace("../../index.html")
}

