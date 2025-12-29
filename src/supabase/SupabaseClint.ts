import {createClient} from '@supabase/supabase-js'
// 1. Initialize
// Replace these with your actual details from Supabase Settings -> API
const _supabaseUrl: string = 'https://btzwhcdauwvywppnrddm.supabase.co'
const _supabaseKey: string = 'sb_publishable_vHxCDVLA-Xp41YqmxsqP-w__lYWN34T' // Use the ANON key, not service_role
export const supabase = createClient(_supabaseUrl, _supabaseKey);



