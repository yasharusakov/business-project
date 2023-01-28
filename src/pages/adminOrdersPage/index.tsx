import {useEffect, useState} from "react"
import FirebaseService from "../../services/firebaseService"
import './style.scss'

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([])

    useEffect(() => {
        FirebaseService.getOrders(setOrders)
    }, [])

    return (
        <div>
            {orders.map(order => {
                return (
                    <div key={order.id}>
                        <h1>{order.firstName}</h1>
                        <h2>{order.lastName}</h2>
                        {order.products.map((product: any) => {
                            return (
                                <div>
                                    {product.title}
                                    <br/>
                                    {product.price}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default AdminOrdersPage