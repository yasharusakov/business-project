import {FormEvent, useEffect, useState} from "react"
import Upload from "../../ui/upload"
import FirebaseService from "../../../services/firebaseService"
import {collection, doc, getFirestore} from "firebase/firestore"
import Loader from "../../ui/loader"
import {useActions} from "../../../hooks/useActions"
import {useAppSelector} from "../../../hooks/useAppSelector"
import './style.scss'

const CreateCategoryPopup = () => {
    const {setPopup} = useActions()
    const data = useAppSelector(state => state.popup.CreateCategoryPopup.data)
    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [categoryName, setCategoryName] = useState<string>('')

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const id = doc(collection(getFirestore(), '/id')).id

        if (categoryName && id && file) {
            FirebaseService.upload(file, id)
                .then((url) => {
                    if (!url) return
                    FirebaseService.createCategory(url, id, categoryName)
                })
                .finally(() => {
                    setLoading(false)
                    setPopup({name: 'CreateCategoryPopup', type: false, data: null})
                })
        } else {
            setLoading(false)
        }
    }

    const onSubmitHandlerEdit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const id = data.id

        if (categoryName && id && url) {
            if (data.url === url) {
                FirebaseService.editCategory('', id, categoryName)
                    .finally(() => {
                        setLoading(false)
                        setPopup({name: 'CreateCategoryPopup', type: false, data: null})
                    })
            } else {
                FirebaseService.upload(file!, id)
                    .then((url) => {
                        FirebaseService.editCategory(url!, id, categoryName)
                    })
                    .finally(() => {
                        setLoading(false)
                        setPopup({name: 'CreateCategoryPopup', type: false, data: null})
                    })
            }
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (data?.id) {
            setCategoryName(data.title)
            setUrl(data.url)
        } else {
            setCategoryName('')
            setUrl('')
        }
    }, [data?.id])

    const deletePhoto = () => {
        setFile(null)
        setUrl('')
    }

    return (
        <div className="create-category-popup">
            <div className="create-category-popup__container">
                <form onSubmit={data ? onSubmitHandlerEdit : onSubmitHandler} className="create-category-popup__form">
                    <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="create-category-popup__name" placeholder="Назва категорії" type="text"/>
                    {
                        url ? (
                                <div className="create-category-popup__picture">
                                    <div onClick={deletePhoto} className="create-category-popup__picture__delete-photo">&#x2715;</div>
                                    <img
                                        src={url}
                                        alt={url}
                                    />
                                </div>
                            )
                            :
                            (
                                <Upload
                                    setUrl={setUrl}
                                    setFile={setFile}
                                    file={file}
                                />
                            )

                    }
                    <button disabled={(loading || categoryName.length <= 0 || !url)} type="submit" className="create-category-popup__button">{loading ? <Loader/> : data ? 'Редагувати категорію' : 'Створити категорію'}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateCategoryPopup