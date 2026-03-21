import {supabase} from "../../supabase/SupabaseClint.ts";

const loginBtn = document.getElementById('loginDiv') as HTMLDivElement | null
const signUpBtn = document.getElementById('signUpDiv') as HTMLDivElement | null
const loginFrm = document.querySelector('form[name="loginForm"]')
const signUpFrm = document.querySelector('form[name="signUpForm"]')
const svgPass = document.querySelectorAll(".svg-pass");


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

svgPass.forEach(element => {
    element.addEventListener("click", handleShowHidePass);
})

function handleShowHidePass(e: any) {
    const input = document.getElementById(e.target.closest("svg").dataset.show) as HTMLInputElement;

    if (input == null || input.value == '') {
        return;
    }

    if (input.type == "text") {
        e.target.closest("svg").innerHTML = `
        <path d="M12 16.01C14.2091 16.01 16 14.2191 16 12.01C16 9.80087 14.2091 8.01001 12 8.01001C9.79086 8.01001 8 9.80087 8 12.01C8 14.2191 9.79086 16.01 12 16.01Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 11.98C8.09 1.31996 15.91 1.32996 22 11.98" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 12.01C15.91 22.67 8.09 22.66 2 12.01" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        `
        input.type = "password";
    } else {
        e.target.closest("svg").innerHTML = `
        <path d="M14.83 9.17999C14.2706 8.61995 13.5576 8.23846 12.7813 8.08386C12.0049 7.92926 11.2002 8.00851 10.4689 8.31152C9.73758 8.61453 9.11264 9.12769 8.67316 9.78607C8.23367 10.4444 7.99938 11.2184 8 12.01C7.99916 13.0663 8.41619 14.08 9.16004 14.83" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 16.01C13.0609 16.01 14.0783 15.5886 14.8284 14.8384C15.5786 14.0883 16 13.0709 16 12.01" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.61 6.39004L6.38 17.62C4.6208 15.9966 3.14099 14.0944 2 11.99C6.71 3.76002 12.44 1.89004 17.61 6.39004Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.9994 3L17.6094 6.39" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.38 17.62L3 21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19.5695 8.42999C20.4801 9.55186 21.2931 10.7496 21.9995 12.01C17.9995 19.01 13.2695 21.4 8.76953 19.23" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        `
        input.type = "text";
    }
}