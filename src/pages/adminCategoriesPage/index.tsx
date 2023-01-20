import {useActions} from "../../hooks/useActions"
import {useEffect, useState} from "react"
import {ICategory} from "../../types/ICategory"
import FirebaseService from "../../services/firebaseService"
import Loader from "../../components/ui/loader"
import {Link} from "react-router-dom"
import delete_icon from "../../assets/images/delete.png"
import editing from "../../assets/images/editing.png"
import Popup from "../../components/popup"
import CreateCategoryPopup from "../../components/popups/createCategoryPopup"
import './style.scss'

const AdminCategoriesPage = () => {
    const {setPopup} = useActions()
    const [loading, setLoading] = useState<boolean>(true)
    const [categories, setCategories] = useState<ICategory[]>([])

    const deleteCategory = (id: string, title: string) => {
        FirebaseService.deleteCategory(id, title)
            .then(() => FirebaseService.deleteMedia(id))
    }

    useEffect(() => {
        const unsub = FirebaseService.listenData(setCategories, '/categories')

        setLoading(false)

        if (!unsub) return

        return () => unsub()
    }, [])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="admin-panel__categories">
            <button onClick={() => setPopup({name: 'CreateCategoryPopup', type: true, data: null})} className="admin-panel__create-category">Створити категорію</button>
            <div className="cards">
                <div className="cards__container">
                    {categories.map(category => {
                        return (
                            <Link to={`/admin/panel/с/${category.id}`} key={category.id} className="cards__card">
                                <div className="cards__card__container">
                                    <div className="cards__card__picture">
                                        <img src={category.url} alt={category.title}/>
                                    </div>
                                    <div className="cards__card__text admin">
                                        <div className="cards__card__text__title category">{category.title}</div>
                                        <div className="cards__card__text__icons">
                                            <div onClick={() => deleteCategory(category.id, category.title)} className="delete_icon">
                                                <img width={24} height={24} src={delete_icon} alt="delete"/>
                                            </div>
                                            <div className="editing_icon">
                                                <img width={24} height={24} src={editing} alt="editing"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <Popup title="Створення категорії" name='CreateCategoryPopup' render={() => <CreateCategoryPopup/>}/>
        </div>
    )
}

export default AdminCategoriesPage