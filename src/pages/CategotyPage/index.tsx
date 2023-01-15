import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import CategoryPageProducts from "../../components/CategoryPageProducts"
import {doc, getDoc, getFirestore} from "firebase/firestore"
import {ICategory} from "../../types/ICategory"
import Loader from "../../components/UI/Loader"

import './style.scss'

type CategoryPageParams = {
    categoryId: string
}

const CategoryPage = () => {
    const {categoryId} = useParams<CategoryPageParams>()
    const [category, setCategory] = useState<ICategory>({} as ICategory)
    const [loading, setLoading] = useState<boolean>(true)
    const [filterBy, setFilterBy] = useState<string>('by-popular')
    const db = getFirestore()

    const getCategory = async () => {
        try {
            const docRef = doc(db, `/categories/${categoryId}`)
            const docSnapshot = await getDoc(docRef)
            const docData = docSnapshot.data() as ICategory
            return docData
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!categoryId) return

        getCategory()
            .then(data => {
                if (!data) {
                    setLoading(false)
                    return
                }
                setCategory(data)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [categoryId])

    return (
        <div className="category-page">
            <Loader loading={loading}/>
            <div style={{paddingTop: 30, paddingBottom: 30}} className="category-page__container container">
                <h1 className="category-page__title">{category?.title}</h1>
                <div className="category-page__filters">
                    <select onChange={(e) => setFilterBy(e.target.value)}>
                        <option value="by-popular">За популярністю</option>
                        <option value="from-cheap-to-expensive">Від дешевих до дорогих</option>
                        <option value="from-expensive-to-cheap">Від дорогих до дешевих</option>
                    </select>
                </div>
                {categoryId && <CategoryPageProducts filterBy={filterBy} categoryId={categoryId}/>}
            </div>
        </div>
    )
}

export default CategoryPage