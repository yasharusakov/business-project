import {useEffect, useState} from "react"
import Question from "./question"
import QuestionService from "../../services/questionService"
import './style.scss'

const AdminQuestionsPage = () => {
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        const unsub = QuestionService.getQuestions(setQuestions)
        if (!unsub) return

        return () => {
            unsub()
        }
    }, [])

    return (
        <div className="admin-questions-page">
            <div className="admin-questions-page__container">
                {questions.map(question => <Question {...question} />)}
            </div>
        </div>
    )
}

export default AdminQuestionsPage