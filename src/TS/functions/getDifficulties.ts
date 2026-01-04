import {supabase} from "../../supabase/SupabaseClint"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

// 1. Define the interface
export interface Subject {
    id: number
    level_name: string
    points_per_question: string
    time_limit_seconds: number
    level_icon: string
    level_text: string
}


export default async function getDifficulties() {
    // 2. Fetch the data
    const {data: difficulties, error} = await supabase
        .rpc('get_difficulties', {p_subject_id: urlParams.get('sid')})

    if (error) {
        alert("Error fetching difficulties")
        return
    }

    // console.log(difficulties)


    return difficulties
}
