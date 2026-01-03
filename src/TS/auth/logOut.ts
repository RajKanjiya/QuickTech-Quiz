import {supabase} from "../../supabase/SupabaseClint.ts";

const logOutBtn = document.getElementById('logOutBtn') as HTMLButtonElement | null

logOutBtn?.addEventListener('click', async () => {

    //sigh out function from supabase
    let {error} = await supabase.auth.signOut()

    //if any error in log our show this to user
    if (error) {
        alert('Error happen in logout')
        return
    }

    //logout successfully the set user to login page
    window.location.href = '/Pages/login.html'
})