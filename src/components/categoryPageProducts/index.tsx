import {FC, memo, useEffect, useMemo, useState} from "react"
import {IProduct} from "../../types/IProduct"
import CategoryPageProduct from "../categoryPageProduct"
import FirebaseService from "../../services/firebaseService"

import '../../assets/styles/cards.scss'

interface CategoryPageProducts {
    filterBy: string
    categoryId: string
}

const CategoryPageProducts: FC<CategoryPageProducts> = memo(({filterBy, categoryId}) => {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        if (!categoryId) return

        FirebaseService.getProducts(categoryId)
            .then((data) => {
                if (!data) return

                setProducts(data)
            })
    }, [categoryId])

    const filteredProducts = useMemo(() => {
        return products.sort((a, b) => {
            switch (filterBy) {
                case 'by-popular':
                    return b.orders - a.orders
                case 'from-cheap-to-expensive':
                    return a.price - b.price
                case 'from-expensive-to-cheap':
                    return b.price - a.price
                default:
                    return 0
            }
        })
    }, [filterBy, products])

    return (
        <div className="cards category-page__products">
            <div className="cards__container">
                {filteredProducts.map((product) => {
                    return <CategoryPageProduct key={product.id} categoryId={categoryId} {...product}/>
                })}
            </div>
        </div>
    )
})

export default CategoryPageProducts