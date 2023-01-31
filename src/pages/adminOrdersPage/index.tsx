import {useEffect, useState} from "react"
import {IOrder} from "../../types/IOrder"
import FirebaseService from "../../services/firebaseService"
import Accordion from "../../components/ui/accordion"
import './style.scss'

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([])

    useEffect(() => {
        FirebaseService.getOrders(setOrders)
    }, [])

    return (
        <div className="admin-orders-page">
            <div className="admin-orders-page__container">
                {orders.map(order => {
                    return (
                        <Accordion
                            key={order.id}
                            render={() => {
                                return (
                                    <div className="admin-orders-page__order__user">
                                        <div className="admin-orders-page__order__user__full-name">
                                            <div className="admin-orders-page__order__user__full-name__first-name">{order.firstName}</div>
                                            <div className="admin-orders-page__order__user__full-name__last-name">{order.lastName}</div>
                                        </div>
                                        <div className="admin-orders-page__order__user__phone-number">{order.phoneNumber}</div>
                                        <div className="admin-orders-page__order__user__total-price">Усього: <span>{order.products.reduce((accumulator, currentValue) => (accumulator + currentValue.price * currentValue.amount), 0)} грн</span></div>
                                    </div>
                                )
                            }}>
                            <div className="admin-orders-page__order__products">
                                {order.products.map(product => {
                                    return (
                                        <div key={product.productId} className="admin-orders-page__order__products__product">
                                            <div className="admin-orders-page__order__products__product__container">
                                                <div className="admin-orders-page__order__products__product__picture">
                                                    <img src={product.url} alt={product.title}/>
                                                </div>
                                                <div className="admin-orders-page__order__products__product__data">
                                                    <div className="admin-orders-page__order__products__product__data__title">Назва: <span>{product.title}</span></div>
                                                    <div className="admin-orders-page__order__products__product__data__price">Ціна: <span>{product.price} грн</span></div>
                                                    <div className="admin-orders-page__order__products__product__data__amout">Кількість: <span>{product.amount}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminOrdersPage