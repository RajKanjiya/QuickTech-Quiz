import {supabase} from "../../supabase/SupabaseClint"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

export default async function getDifficulties() {
    // 1. Fetch the data
    const {data: difficulties, error} = await supabase
        .rpc('get_difficulties', {p_subject_id: urlParams.get('sid')})

    if (error) {
        alert("Error fetching difficulties")
        return
    }

    return difficulties
}
