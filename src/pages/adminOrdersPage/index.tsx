import {useEffect, useState} from "react"
import {IOrder} from "../../types/IOrder"
import OrderService from "../../services/orderService"
import Order from "./order"
import './style.scss'

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(() => {
        const unsub = OrderService.getOrders(setOrders)

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