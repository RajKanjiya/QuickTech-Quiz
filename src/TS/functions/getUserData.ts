import {supabase} from "../../supabase/SupabaseClint.ts";

export default async function getUserDetails() {
    const {data} = await supabase.rpc('get_my_profile').single();// Use .single() because we expect only 1 row
    // console.log(data)

    return data
}