import {useAppSelector} from "../../../hooks/useAppSelector"
import {useEffect} from "react"
import {useActions} from "../../../hooks/useActions"
import './style.scss'

const Notification = () => {
    const {setNotification} = useActions()
    const {status, value} = useAppSelector(state => state.notification)

    useEffect(() => {
        if (!status || !value) return
        setTimeout(() => {
            setNotification({value: null, status: null})
        }, 3500)
    }, [status, value])

    return (
        <div className={`notification ${status} ${status ? 'show' : 'hide'}`}>
            <div className="notification__value">{value}</div>
        </div>
    )
}

export default Notification