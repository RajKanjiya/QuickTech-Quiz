import {supabase} from "../../supabase/SupabaseClint"

// 1. Define the interface
export interface Subject {
    id: number
    name: string
    svg_icon: string
}


export default async function getSubjects() {
    // 2. Fetch the data
    const {data: subjects, error} = await supabase
        .rpc('get_subjects')

    if (error) {
        alert("Error fetching subjects")
        return
    }

    return subjects
}

