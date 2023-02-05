import {useEffect, useState} from "react"
import FirebaseService from "../../services/firebaseService"
import './style.scss'
import Accordion from "../../components/ui/accordion";

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
                {questions.map(question => {
                    return (
                        <div key={question.id} className="admin-questions-page__question">
                            <Accordion render={() => (
                                <div className="admin-questions-page__question__data">
                                    <div className="admin-questions-page__question__full-name">{question.fullName}</div>
                                    <div className="admin-questions-page__question__phone-number">{question.phoneNumber}</div>
                                    <div className="admin-questions-page__question__phone-number">{new Date(question.timestamp.seconds * 1000).toLocaleString()}</div>
                                </div>
                            )}>
                                <div className="admin-questions-page__question__question">{question.question}</div>
                            </Accordion>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminQuestionsPage