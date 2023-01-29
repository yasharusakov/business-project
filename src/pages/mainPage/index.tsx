import MainPageCategories from "./mainPageCategories"
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

    const powerbanks = [
        {url: powerbank4},
        {url: powerbank1},
        {url: powerbank3},
        {url: powerbank2},
        {url: powerbank5}
    ]

    const aboutItems = [
        {title: 'Оплата при отриманні', url: wallet},
        {title: 'Доставка з Європи', url: delivery},
        {title: 'Гарантія якості', url: warranty}
    ]

    return (
        <div className="main-page">
            <div className="main-page__container">
                <div className="main-page__powerbanks">
                    <div className="main-page__powerbanks__container container">
                        <div className="main-page__powerbanks-title">
                            ТУТ ТИ ЗНАЙДЕШ СВІЙ ПОВЕРБАНК
                        </div>
                        <div className="main-page__items">
                            {powerbanks.map((item, index) => {
                                return (
                                    <div key={index} className="main-page__item">
                                        <img
                                            src={item.url}
                                            alt="powerbank"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div style={{paddingTop: 125, paddingBottom: 125}} className="main-page__info container">
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