import {FC, memo, useEffect, useState} from "react"
import MainPageCategory from "../mainPageCategory"
import {ICategory} from "../../types/ICategory"
import FirebaseService from '../../services/firebaseService'

import '../../assets/styles/cards.scss'

interface MainPageCategoriesProps {
    setLoading: (data: boolean) => void
}

const MainPageCategories: FC<MainPageCategoriesProps> = memo(({setLoading}) => {
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        FirebaseService.getCategories()
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