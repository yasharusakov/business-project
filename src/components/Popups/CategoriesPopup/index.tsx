import {useEffect, useState} from "react"
import {ICategory} from "../../../types/ICategory"
import {useActions} from "../../../hooks/useActions"
import {collection, getDocs, getFirestore} from "firebase/firestore"
import {Link} from "react-router-dom"

import './style.scss'

const CategoriesPopup = () => {
    const {setPopup} = useActions()
    const db = getFirestore()
    const [categories, setCategories] = useState<ICategory[]>([])

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
    }, [])

    return (
        <div className="categories-popup">
            <div className="categories-popup__container">
                {categories.map(category => {
                    return (
                        <Link onClick={() => setPopup({name: 'CategoriesPopup', type: false, data: null})} to={`/c/${category.id}`} key={category.id} className="categories-popup__category">
                            <div className="categories-popup__category__container">
                                <div className="categories-popup__category__picture">
                                    <img src={category.url} alt={category.title}/>
                                </div>
                                <div className="categories-popup__category__name">{category.title}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoriesPopup