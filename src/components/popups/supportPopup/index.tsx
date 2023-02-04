import {FormEvent} from "react"
import './style.scss'

const SupportPopup = () => {
    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmitHandler} className="support-popup">
            <input type="text"/>
            <button type="submit">Відправити</button>
        </form>
    )
}

export default SupportPopup