import {Link} from "react-router-dom"
import {FC, memo} from "react"

interface CategoryPageProductProps {
    categoryId: string
    id: string
    url: string
    title: string
    price: number
}

const CategoryPageProduct: FC<CategoryPageProductProps> = memo(({categoryId, id, url, title, price}) => {
    return (
        <Link to={`/c/${categoryId}/${id}`} tabIndex={0} className="cards__card">
            <div className="cards__card__container">
                <div className="cards__card__picture">
                    <img src={url} alt="picture"/>
                </div>
                <div className="cards__card__text">
                    <div className="cards__card__text__title product">{title}</div>
                    <div className="cards__card__text__price">{price} грн</div>
                </div>
            </div>
        </Link>
    )
})

export default CategoryPageProduct