// import {supabase} from "../../supabase/SupabaseClint.ts";

// @ts-ignore
import {supabase} from "../../supabase/SupabaseClint.ts";

export default async function handleUploadQuizResult(subjectId: string | null, difficultyId: string | null, score: number, correctAnswers: number, totalQuestions: any, timeTaken: number) {

    console.log(subjectId, difficultyId, score, correctAnswers, totalQuestions, timeTaken)


    const {data: {user}} = await supabase.auth.getUser();

    const {error} = await supabase
        .rpc('submit_quiz_attempt', {
            p_user_id: user?.id, // Get this from supabase.auth.getUser()
            p_subject_id: subjectId,
            p_difficulty_id: difficultyId,
            p_score: score,
            p_correct_answers: correctAnswers,
            p_total_questions: totalQuestions,
            p_time_taken_seconds: timeTaken
        })

    if (error) console.error(error)
    // else console.log("Attempt saved! Attempt ID:", data)

}
