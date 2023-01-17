import {useState} from "react"
import Loader from "../../components/ui/loader"
import MainPageCategories from "../../components/mainPageCategories"

import wallet from '../../assets/images/wallet.png'
import delivery from '../../assets/images/delivery.png'
import warranty from '../../assets/images/warranty.png'
import powerbank1 from '../../assets/images/powerbank1.png'
import powerbank2 from '../../assets/images/powerbank2.png'
import powerbank3 from '../../assets/images/powerbank3.png'
import powerbank4 from '../../assets/images/powerbank4.png'
import powerbank5 from '../../assets/images/powerbank5.png'

import './style.scss'

const MainPage = () => {

    const [loading, setLoading] = useState<boolean>(true)

    return (
        <div className="main-page">
            <Loader loading={loading}/>
            <div className="main-page__container">
                <div className="main-page__powerbanks">
                    <div className="main-page__powerbanks__container container">
                        <div className="main-page__powerbanks-title">
                            ТУТ ТИ ЗНАЙДЕШ СВІЙ ПОВЕРБАНК
                        </div>
                        <div className="main-page__items">
                            <div className="main-page__item">
                                <img src={powerbank4} alt="powerbank"/>
                            </div>
                            <div className="main-page__item">
                                <img src={powerbank1} alt="powerbank"/>
                            </div>
                            <div className="main-page__item">
                                <img src={powerbank3} alt="powerbank"/>
                            </div>
                            <div className="main-page__item">
                                <img src={powerbank2} alt="powerbank"/>
                            </div>
                            <div className="main-page__item">
                                <img src={powerbank5} alt="powerbank"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{paddingTop: 125, paddingBottom: 125}} className="main-page__info container">
                    <div className="main-page__about-products-row">
                        <div className="main-page__about-products-item">
                            <div className="main-page__about-products-picture">
                                <img width={64} height={64} src={wallet} alt="wallet"/>
                            </div>
                            <div className="main-page__about-products-title">
                                Оплата при отриманні
                            </div>
                        </div>
                        <div className="main-page__about-products-item">
                            <div className="main-page__about-products-picture">
                                <img width={64} height={64} src={delivery} alt="delivery"/>
                            </div>
                            <div className="main-page__about-products-title">
                                Доставка з Європи
                            </div>
                        </div>
                        <div className="main-page__about-products-item">
                            <div className="main-page__about-products-picture">
                                <img width={64} height={64} src={warranty} alt="warranty"/>
                            </div>
                            <div className="main-page__about-products-title">
                                Гарантія якості
                            </div>
                        </div>
                    </div>
                    <div className="main-page__categories-title">
                        Категорії товарів
                    </div>
                    <MainPageCategories setLoading={setLoading} />
                </div>
            </div>
        </div>
    )
}

export default MainPage