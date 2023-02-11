import CategoryService from "../../services/categoryService"
import {useEffect, useState} from "react"
import {ICategory} from "../../types/ICategory"
import MainPageCategories from "./mainPageCategories"
import Loader from "../../components/ui/loader"
import wallet from '../../assets/images/wallet.png'
import delivery from '../../assets/images/delivery.png'
import warranty from '../../assets/images/warranty.png'
import {Pagination, Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/autoplay'
import './style.scss'
import MainSliderService from "../../services/mainSliderService";

const MainPage = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [slides, setSlides] = useState<{id: string, url: string}[]>([])

    useEffect(() => {
        MainSliderService.getSlides()
            .then(data => {
                setSlides(data as {id: string, url: string}[])
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
                    loop
                    autoplay={{delay: 3500}}
                    modules={[Pagination, Autoplay]}
                    navigation
                    slidesPerView={1}
                    grabCursor={true}
                    pagination={{clickable: true}}
                >
                    {slides.map(slide => {
                        return (
                            <SwiperSlide key={slide.id}>
                                <img src={slide.url} alt={slide.url}/>
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