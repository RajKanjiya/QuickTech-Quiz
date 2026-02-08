import {supabase} from "../../supabase/SupabaseClint.ts";

const loginBtn = document.getElementById('loginDiv') as HTMLDivElement | null
const signUpBtn = document.getElementById('signUpDiv') as HTMLDivElement | null
const loginFrm = document.querySelector('form[name="loginForm"]')
const signUpFrm = document.querySelector('form[name="signUpForm"]')

//Event listener for click event on login btn at the top of login page
loginBtn?.addEventListener('click', function (): void {
    //add active class to log in btn and login form
    loginBtn.classList.add('btn--active')
    loginFrm?.classList.add('active')

    //remove active class to sighUp btn and sighUp form
    signUpBtn?.classList.remove('btn--active')
    signUpFrm?.classList.remove('active')

    //add left to right animation
    // loginFrm?.classList.add('leftToRightAnimation')

    //remove left to right animation
    // signUpFrm?.classList.remove('leftToRightAnimation')
})

signUpBtn?.addEventListener('click', function (): void {
    //add active class to login btn and login form
    signUpBtn?.classList.add('btn--active')
    signUpFrm?.classList.add('active')

    //remove active class to login btn and login form
    loginBtn?.classList.remove('btn--active')
    loginFrm?.classList.remove('active')

    //add left to right animation
    // signUpFrm?.classList.add('leftToRightAnimation')

    //remove left to right animation
    // loginFrm?.classList.remove('leftToRightAnimation')
})

signUpFrm?.addEventListener('submit', handleSignUp)
loginFrm?.addEventListener('submit', handleLogin)


async function handleLogin(e: Event) {
    e.preventDefault()

    const errorSpan = document.getElementById('loginError') as HTMLElement
    const email = (document.getElementById('loginEmail') as HTMLInputElement).value
    const password = (document.getElementById('loginPass') as HTMLInputElement).value


    //1. to hide the error span when there was an error before
    errorSpan.classList.add('hidden')

    //2. email and pass gose to the supabase and check for valid user if not the return error
    let {error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    //3. if error in email or pass remove hidden class from the error span then return to form
    if (error) {
        // errorSpan.textContent = error.message
        errorSpan.classList.remove('hidden')
        return;
    }

    //4. email and pass is correct the see this alert
    alert('login successfully!')


    //5. then go to the home/dashboard page
    window.location.href = `/index.html`

}

async function handleSignUp(e: any) {

    //max and min value of user profile store in storage of supabase
    const MAX = 3
    const MIN = 1;


    e.preventDefault()
    const errorSpan = document.getElementById('signUpError') as HTMLElement
    const username = (document.getElementById('signupUsername') as HTMLInputElement).value;
    const email = (document.getElementById('signupEmail') as HTMLInputElement).value;
    const password = (document.getElementById('signupPass') as HTMLInputElement).value;
    const conPassword = (document.getElementById('signupConPass') as HTMLInputElement).value;
    const firstName = (document.getElementById('signupFname') as HTMLInputElement).value;
    const lastName = (document.getElementById('signupLname') as HTMLInputElement).value;

    if (password !== conPassword) {
        errorSpan.textContent = 'Password and Confirm Password are not same'
        errorSpan.classList.remove('hidden')
        return;
    }

    if (!firstName.match(/^[a-zA-Z]+$/)) {
        errorSpan.textContent = 'Please enter valid first name'
        errorSpan.classList.remove('hidden')
        return;
    }

    if (!lastName.match(/^[a-zA-Z]+$/)) {
        errorSpan.textContent = 'Please enter valid last name'
        errorSpan.classList.remove('hidden')
        return;
    }

    //1. to hide the error span when there was an error before
    errorSpan.classList.add('hidden')

    //2. email and pass with username store in the supabase
    let {error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                Display_name: username,
                // This sends the username to your Trigger -> Profile Table
                username,
                //generate url of user PFP get from the storage of supabase
                avatar_url: `https://btzwhcdauwvywppnrddm.supabase.co/storage/v1/object/public/user_profile/${Math.floor(Math.random() * (MAX - MIN + 1)) + MIN}.jpg`
            }
        }
    })

    //3. if error in email or pass or username remove hidden class from the error span then return to form
    if (error) {
        //Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};':"|<>?,./`~.
        //User already registered
        errorSpan.textContent = error.message
        errorSpan.classList.remove('hidden')
        return;
    }

    //4. email and pass is correct the see this alert
    alert('Account created!')

    //5. then go to the home/dashboard page
    window.location.href = `/index.html`

}