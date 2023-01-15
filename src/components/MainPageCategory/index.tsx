import {FC, memo} from "react"
import {Link} from "react-router-dom"

import {ICategory} from "../../types/ICategory"

const MainPageCategory: FC<ICategory> = memo(({id, url, title, timestamp}) => {
    return (
        <Link to={`/c/${id}`} className="cards__card">
            <div className="cards__card__container">
                <div className="cards__card__picture">
                    <img src={url} alt={id}/>
                </div>
                <div className="cards__card__text">
                    <div className="cards__card__text__title category">{title}</div>
                </div>
            </div>
        </Link>
    )
})

export default MainPageCategory