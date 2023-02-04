import './style.scss'
import {useActions} from "../../../hooks/useActions"

const Support = () => {
    const {setPopup} = useActions()

    return (
        <div onClick={() => setPopup({name: 'SupportPopup', type: true, data: null})} className="support">
            <div className="support__title">
                ТЕХНІЧНА ПІДТРИМКА
            </div>
        </div>
    )
}

export default Support