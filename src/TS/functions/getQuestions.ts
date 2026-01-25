import {supabase} from "../../supabase/SupabaseClint.ts";

export default async function getQuestions() {
    const url = new URL(window.location.href)
    const sid = url.searchParams.get('sid')
    const did = url.searchParams.get('did')


    const {data, error} = await supabase
        .rpc('get_random_questions', {
            p_subject_id: sid,
            p_difficulty_id: did
        });


    if (error) {
        alert('Error fetching question')
        return
    }

    // console.log(data)

    return data;
}