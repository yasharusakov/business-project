import Counter from "./Counter"
import {IShoppingCart} from "../../../types/IShoppingCart"
import {FC, memo} from "react"
import {useActions} from "../../../hooks/useActions"

type ProductsProps = IShoppingCart

const Products: FC<ProductsProps> = memo(({products}) => {
    const {removeFromCart} = useActions()

    return (
        <div className="shopping-cart-popup__products">
            <div className="shopping-cart-popup__products__container">
                {products.map(product => {
                    return (
                        <div key={product.productId} className="shopping-cart-popup__product">
                            <div onClick={() => removeFromCart({categoryId: product.categoryId, productId: product.productId})} className="shopping-cart-popup__product__remove">✕</div>
                            <div className="shopping-cart-popup__product__row">
                                <div className="shopping-cart-popup__product__column shopping-cart-popup__product__column_1">
                                    <div className="shopping-cart-popup__product__picture">
                                        <img src={product.url} alt={product.title}/>
                                    </div>
                                    <div className="shopping-cart-popup__product__data__product-title">{product.title}</div>
                                </div>
                                <div className="shopping-cart-popup__product__column shopping-cart-popup__product__column_2">
                                    <div className="shopping-cart-popup__product__additional-data">
                                        <Counter categoryId={product.categoryId} productId={product.productId} amount={product.amount} />
                                        <div className="shopping-cart-popup__product__additional-data__additional-data__price">{product.price} грн</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

export default Products