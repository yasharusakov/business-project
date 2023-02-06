import {useEffect, useState} from "react"
import FirebaseService from "../../services/firebaseService"
import Accordion from "../../components/ui/accordion"
import './style.scss'
import Question from "./question";

const AdminQuestionsPage = () => {
    const [questions, setQuestions] = useState<any[]>([])

    useEffect(() => {
        const unsub = FirebaseService.getQuestions(setQuestions)
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