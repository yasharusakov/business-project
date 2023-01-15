import {FC, memo, useEffect, useState} from "react"
import MainPageCategory from "../MainPageCategory"
import {ICategory} from "../../types/ICategory"
import {collection, getFirestore, getDocs} from 'firebase/firestore'

import '../../assets/styles/cards.scss'

interface MainPageCategoriesProps {
    setLoading: (data: boolean) => void
}

const MainPageCategories: FC<MainPageCategoriesProps> = memo(({setLoading}) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const db = getFirestore()

    const getCategories = async () => {
        try {
            const collectionRef = collection(db, '/categories')
            const docsSnapshot = await getDocs(collectionRef)
            const docsData = docsSnapshot.docs.map<ICategory>(doc => ({...doc.data(), id: doc.id} as ICategory))
            return docsData
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCategories()
            .then(data => {
                if (!data) return

                setCategories(data)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
    }, [])

    return (
        <div className="cards">
            <div className="cards__container">
                {categories.map(category => {
                    return <MainPageCategory key={category.id} {...category} />
                })}
            </div>
        </div>
    )
})

export default MainPageCategories