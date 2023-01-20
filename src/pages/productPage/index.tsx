import {FC, useEffect, useState, Fragment} from "react"
import {useParams} from "react-router-dom"
import {useActions} from "../../hooks/useActions"
import {useAppSelector} from "../../hooks/useAppSelector"
import ProductPageCharacteristics from "../../components/productPageCharacteristics"
import {IProduct} from "../../types/IProduct"
import {IProductCharacteristic} from "../../types/IProductCharacteristic"
import Loader from "../../components/ui/loader"
import FirebaseService from "../../services/firebaseService"
import Tabs from "../../components/ui/tabs"
import './style.scss'

type ProductPageParams = {
    categoryId: string
    productId: string
}

interface ProductPageProps {
    characteristics?: boolean
}

const ProductPage: FC<ProductPageProps> = ({characteristics}) => {
    const {categoryId, productId} = useParams<ProductPageParams>()
    const [product, setProduct] = useState<IProduct>({} as IProduct)
    const [productCharacteristics, setProductCharacteristics] = useState<IProductCharacteristic[]>([])
    const products = useAppSelector(state => state.shoppingCart.products)
    const {addToCart, setPopup} = useActions()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!categoryId || !productId) return

        FirebaseService.getProduct(categoryId, productId)
            .then(data => {
                if (!data) return
                setProduct(data.product)
                setProductCharacteristics(data.characteristics)
            })
            .finally(() => setLoading(false))
    }, [categoryId, productId])

    if (loading) {
        return <Loader/>
    }

    const tabs = [
        {to: `/c/${categoryId}/${productId}`, value: 'Усе про товар'},
        {to: `/c/${categoryId}/${productId}/characteristics`, value: 'Характеристики'}
    ]

    return (
        <div className="product-page">
            <Tabs tabs={tabs}/>
            <div className="product-page__container container">
                <div className="product-page__row">
                    {(characteristics && productCharacteristics.length > 0) && <ProductPageCharacteristics productCharacteristics={productCharacteristics}/>}
                    <div className={`product-page__column ${characteristics ? 'characteristics' : ''}`}>
                        <div className={`product-page__picture ${characteristics ? 'characteristics' : ''}`}>
                            <img src={product?.url} alt={product?.title}/>
                        </div>
                        <div className="product-page__additional-data">
                            <h1 className="product-page__product-title">
                                {product?.title}
                            </h1>
                            {(!characteristics && productCharacteristics.length > 0) && (
                                <p className="product-page__product-characteristics">
                                    {productCharacteristics.map((characteristic, index) => {
                                        return (
                                            <Fragment key={characteristic.id}>
                                                {index === productCharacteristics.length - 1 ? (
                                                    <>
                                                        {characteristic.title} {characteristic.value}
                                                    </>
                                                ) : (
                                                    <>
                                                        {characteristic.title} {characteristic.value} <span> / </span>
                                                    </>
                                                )}
                                            </Fragment>
                                        )
                                    })}
                                </p>
                            )}
                            <div className="product-page__product-price">
                                {product?.price} грн
                            </div>
                            {(categoryId && productId) && (
                                products.find(product => (product.productId === productId && product.categoryId === categoryId)) ? (
                                    <button tabIndex={0} className="product-page__product-button has" onClick={() => setPopup({name: 'ShoppingCart', type: true, data: null})}>В кошику</button>
                                ) : (
                                    <button tabIndex={0} className="product-page__product-button add-to-cart" onClick={() => addToCart({categoryId, productId, amount: 1, ...product})}>+ Додати у кошик</button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage