import {useEffect, useState} from "react"
import {IOrder} from "../../types/IOrder"
import FirebaseService from "../../services/firebaseService"
import Order from "./order"
import './style.scss'

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(() => {
        const unsub = FirebaseService.getOrders(setOrders)

        if (!unsub) return

        return () => {
            unsub()
        }
    }, [])

    return (
        <div className="admin-orders-page">
            <div className="admin-orders-page__container">
                {orders.map(order => <Order {...order} />)}
            </div>
        </div>
    )
}

export default AdminOrdersPage