import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {ICategory} from "../../types/ICategory"
import FirebaseService from '../../services/firebaseService'
import '../../assets/styles/cards.scss'

const MainPageCategories = () => {
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        FirebaseService.getCategories()
            .then(data => {
                if (!data) return
                setCategories(data)
            })
    }, [])

    return (
        <div className="cards">
            <div className="cards__container">
                {categories.map(category => {
                    return (
                        <Link key={category.id} to={`/c/${category.id}`} className="cards__card">
                            <div className="cards__card__container">
                                <div className="cards__card__picture">
                                    <img src={category.url} alt={category.title}/>
                                </div>
                                <div className="cards__card__text">
                                    <div className="cards__card__text__title category">{category.title}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPageCategories