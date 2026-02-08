import {createClient} from '@supabase/supabase-js'
// 1. Initialize
// Replace these with your actual details from Supabase Settings -> API
const _supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
const _supabaseKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY// Use the ANON key, not service_role

if (!_supabaseUrl || !_supabaseKey) {
    alert("Missing Supabase environment variables!")
    throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(_supabaseUrl, _supabaseKey);


// import.meta.env.VITE_SUPABASE_URL
// import.meta.env.VITE_SUPABASE_KEY