import {supabase} from "../../supabase/SupabaseClint.ts";


const logOutBtn = document.getElementById('logOutBtn') as HTMLButtonElement | null
// const logOutBtn = document.querySelector<HTMLButtonElement>('#logOutBtn');
console.log('slafj')


logOutBtn?.addEventListener('click', async () => {

    let {error} = await supabase.auth.signOut()

    if (error) {
        alert('Not successful')
    }

    // alert('Log Out')

    window.location.href = '/Pages/login.html'
})