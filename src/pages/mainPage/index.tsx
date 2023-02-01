import {useEffect, useState} from "react"
import {ICategory} from "../../types/ICategory"
import FirebaseService from "../../services/firebaseService"
import MainPageCategories from "./mainPageCategories"
import Loader from "../../components/ui/loader"
import wallet from '../../assets/images/wallet.png'
import delivery from '../../assets/images/delivery.png'
import warranty from '../../assets/images/warranty.png'

import {Pagination, Autoplay, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'

import './style.scss'

const MainPage = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        FirebaseService.getCategories()
            .then(data => {
                if (!data) return
                setCategories(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const aboutItems = [
        {title: 'Оплата при отриманні', url: wallet},
        {title: 'Доставка з Європи', url: delivery},
        {title: 'Гарантія якості', url: warranty}
    ]

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="main-page">
            <div className="main-page__container">
                <Swiper
                    className="categories-slider"
                    loop
                    autoplay={{delay: 3500}}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    spaceBetween={10}
                    slidesPerView={1}
                    grabCursor={true}
                    pagination={{clickable: true}}
                >
                    {categories.map((category, index) => {
                        return (
                            <SwiperSlide className="categories-slider-slide" key={category.id}>
                                <div className="categories-slider-slide-container">
                                    <div className="categories-slider-slide-picture">
                                        <img
                                            src={category.url}
                                            alt={category.title}
                                        />
                                    </div>
                                    <div className="categories-slider-slide-title">
                                        <h3>{category.title}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div style={{paddingTop: 50, paddingBottom: 50}} className="main-page__info container">
                    <div className="main-page__about-products-row">
                        {aboutItems.map((item, index) => {
                            return (
                                <div key={index} className="main-page__about-products-item">
                                    <div className="main-page__about-products-picture">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            style={{width: 64, height: 64}}
                                        />
                                    </div>
                                    <div className="main-page__about-products-title">
                                        {item.title}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="main-page__categories-title">
                        Категорії товарів
                    </div>
                    <MainPageCategories/>
                </div>
            </div>
        </div>
    )
}

export default MainPage