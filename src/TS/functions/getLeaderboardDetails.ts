import {supabase} from "../../supabase/SupabaseClint.ts";

export default async function getLeaderboardDetails() {
    // 1. Fetch the data
    const {data, error} = await supabase
        .rpc('get_leaderboard_details')

    if (error) {
        alert("Error fetching ranks")
        return
    }

    return data;
}