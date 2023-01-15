import {collection, getDocs, getFirestore} from "firebase/firestore"
import {FC, memo, useEffect, useMemo, useState} from "react"
import {IProduct} from "../../types/IProduct"
import CategoryPageProduct from "../CategoryPageProduct"

import '../../assets/styles/cards.scss'

interface CategoryPageProducts {
    filterBy: string
    categoryId: string
}

const CategoryPageProducts: FC<CategoryPageProducts> = memo(({filterBy, categoryId}) => {
    const [products, setProducts] = useState<IProduct[]>([])
    const db = getFirestore()

    const getProducts = async () => {
        try {
            const collectionRef = collection(db, `/categories/${categoryId}/items`)
            const docsSnapshot = await getDocs(collectionRef)
            const docsData = docsSnapshot.docs.map<IProduct>(doc => ({...doc.data(), id: doc.id} as IProduct))
            setProducts(docsData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!categoryId) return

        getProducts()
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