import {useEffect} from "react"
import {useAppSelector} from "../../hooks/useAppSelector"
import {useActions} from "../../hooks/useActions"
import Logo from "../UI/Logo"

import shopping_cart from '../../assets/images/shopping-cart.png'
import categories from '../../assets/images/categories.png'

import './style.scss'

const AppHeader = () => {
    const {setPopup, getProducts} = useActions()
    const cart = useAppSelector(state => state.shoppingCart.products)

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <header className="header">
            <div className="header__container container">
                <Logo/>
                <div className="header__icons">
                    <div tabIndex={0} onClick={() => setPopup({name: 'CategoriesPopup', type: true, data: null})} className="header__icon header__icon_categories">
                        <img width={32} height={32} src={categories} alt="categories"/>
                    </div>
                    <div tabIndex={0} onClick={() => setPopup({name: 'ShoppingCart', type: true, data: null})} className="header__icon header__icon_shopping-cart">
                        <img width={32} height={32} src={shopping_cart} alt="shopping_cart"/>
                        {cart.length !== 0 && <div className="amount-in-cart">{cart.length}</div>}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AppHeader