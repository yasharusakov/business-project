import {FC, useEffect, useState, Fragment} from "react"
import {useParams} from "react-router-dom"
import {useActions} from "../../hooks/useActions"
import {useAppSelector} from "../../hooks/useAppSelector"
import ProductPageCharacteristics from "./productPageCharacteristics"
import {IProduct} from "../../types/IProduct"
import {IProductCharacteristic} from "../../types/IProductCharacteristic"
import Loader from "../../components/ui/loader"
import Tabs from "../../components/ui/tabs"
import ProductService from "../../services/productService"
import {Swiper, SwiperSlide} from "swiper/react"
import {Swiper as SwiperType} from "swiper/types"
import {Navigation, Pagination} from "swiper"
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'
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
    const [swiper, setSwiper] = useState<SwiperType>()
    const [product, setProduct] = useState<IProduct>({} as IProduct)
    const products = useAppSelector(state => state.shoppingCart.products)
    const {addToCart, setPopup} = useActions()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!categoryId || !productId) return

        ProductService.getProduct(categoryId, productId)
            .then(data => {
                if (!data) return
                setProduct(data)
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

    const transformedCharacteristics = product.characteristics
        .split('/')
        .map(item => {
            const data = item.split('+++')
            return {title: data[0], value: data[1]}
        }) as IProductCharacteristic[]

    return (
        <div className="product-page">
            <Tabs tabs={tabs}/>
            <div className="product-page__container container">
                <div className="product-page__row">
                    {(characteristics && product.characteristics) && <ProductPageCharacteristics productCharacteristics={transformedCharacteristics}/>}
                    <div className={`product-page__column ${characteristics ? 'characteristics' : ''}`}>
                        <div className={`slides ${characteristics ? 'characteristics': ''}`}>
                            <div className="slides__choose">
                                {[{url: product.url, id: product.id}, ...product.images].map((image, index) => {
                                    return (
                                        <div key={image.id} onClick={() => swiper?.slideTo(index + 1)} className={`product-page__picture ${characteristics ? 'characteristics' : '' }`}>
                                            <img src={image.url} alt={image.id}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <Swiper
                                loop
                                modules={[Navigation, Pagination]}
                                navigation
                                spaceBetween={10}
                                slidesPerView={1}
                                grabCursor={true}
                                pagination={{clickable: true}}
                                onSwiper={setSwiper}
                                onSlideChange={setSwiper}
                            >
                                <SwiperSlide>
                                    <div className={`product-page__picture ${characteristics ? 'characteristics' : ''}`}>
                                        <img src={product.url} alt={product.id}/>
                                    </div>
                                </SwiperSlide>
                                {product.images.map(image => {
                                    return (
                                        <SwiperSlide key={image.id}>
                                            <div className={`product-page__picture ${characteristics ? 'characteristics' : ''}`}>
                                                <img src={image.url} alt={image.id}/>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                        <div className="product-page__additional-data">
                            <h1 className="product-page__product-title">
                                {product?.title}
                            </h1>
                            {(!characteristics && product.characteristics) && (
                                <p className="product-page__product-characteristics">
                                    {transformedCharacteristics.map((characteristic, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {index === transformedCharacteristics.length - 1 ? (
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