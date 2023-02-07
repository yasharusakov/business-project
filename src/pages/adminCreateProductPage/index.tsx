import FirebaseService from "../../services/firebaseService"
import Upload from "../../components/ui/upload"
import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import {collection, doc, getFirestore} from "firebase/firestore"
import {useParams} from "react-router-dom"
import Loader from "../../components/ui/loader"
import './style.scss'

type AdminCreateProductPageParams = {
    categoryId: string
    productId?: string
}

const AdminCreateProductPage = () => {
    const {categoryId, productId} = useParams<AdminCreateProductPageParams>()
    const [loading, setLoading] = useState<boolean>(false)

    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const [price, setPrice] = useState<number>()

    const [characteristics, setCharacteristics] = useState<string>('')

    const [images, setImages] = useState<File[]>([])
    const [imagesUrl, setImagesUrl] = useState<string[]>([])

    useEffect(() => {
        if (!categoryId || !productId) return

        FirebaseService.getProduct(categoryId, productId)
            .then(data => {
                if (!data) return
                setUrl(data.url)
                setTitle(data.title)
                setPrice(data.price)
                setCharacteristics(data.characteristics)
            })


    }, [categoryId, productId])

    const deletePhoto = () => {
        setFile(null)
        setUrl('')
    }

    const onHandleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const productId = doc(collection(getFirestore(), '/id')).id

        if (categoryId && productId && file) {
            FirebaseService.upload({name: 'product', file, categoryId, productId})
                .then((urlData) => {
                    if (!urlData) return
                    FirebaseService.createProduct(categoryId, productId, urlData, title, price!, characteristics, images)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }

    }

    const onHandleSubmitEdit = (e: FormEvent) => {
        e.preventDefault()

        setLoading(true)

        if (categoryId && productId && price) {
            const data = (url && !file) ? null : file
            FirebaseService.editProduct({file: data, categoryId, productId, title, price, characteristics})
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }

    }

    const createUrl = (images: File[]) => {
        const data = images.map(image => {
            const creator = window.URL || window.webkitURL
            return creator.createObjectURL((image as Blob))
        })
        setImagesUrl(data)
    }

    useEffect(() => {
        if (!images.length) return
        createUrl(images)
    }, [images.length])

    return (
        <div className="admin-create-product-page">
            <form onSubmit={productId ? onHandleSubmitEdit : onHandleSubmit}>
                <div className="admin-create-product-page__container">
                    <div className="admin-create-product-page__column admin-create-product-page__column_1">
                        <div className="admin-create-product-page__inputs">
                            <input placeholder="Назва продукту" value={title} onChange={(e) => setTitle(e.target.value)} type="text"/>
                            <input placeholder="Ціна продукту" value={price} onChange={(e) => setPrice(+e.target.value.replace(/\D/g, ''))} type="text"/>
                        </div>
                        <div className="admin-create-product-page__images">
                            <div className="admin-create-product-page__picture">
                                {
                                    url ? (
                                        <>
                                            <div onClick={deletePhoto} className="admin-create-product-page__delete-photo">&#x2715;</div>
                                            <img src={url}/>
                                        </>
                                    ) : <Upload setFile={setFile} setUrl={setUrl} file={file}/>
                                }
                            </div>
                            <div className="admin-create-product-page__images__additional">
                                {imagesUrl.map((imageUrl, index) => {
                                    return (
                                        <div key={index} className="admin-create-product-page__images__additional__image">
                                            <img src={imageUrl} alt={imageUrl}/>
                                        </div>
                                    )
                                })}
                                <div className="admin-create-product-page__images__additional__add-image">
                                    +
                                    <input multiple onChange={(e: ChangeEvent<HTMLInputElement>) => setImages(images => [...images, ...e.target.files!])} accept=".jpg,.jpeg,.png" type="file"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-create-product-page__column admin-create-product-page__column_2">
                        <textarea placeholder="Характеристики" value={characteristics} onChange={(e) => setCharacteristics(e.target.value)} />
                    </div>
                </div>
                <button
                    disabled={(
                        loading ||
                        categoryId === undefined ||
                        !url ||
                        !title ||
                        !characteristics ||
                        !price
                    )}
                    type="submit">
                    {
                        loading ?
                            <Loader/> :
                            productId ? 'Редагувати продукт' : 'Створити продукт'
                    }
                </button>
            </form>
        </div>
    )
}

export default AdminCreateProductPage