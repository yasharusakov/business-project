import Upload from "../../components/ui/upload"
import {useState} from "react"
import './style.scss'

const AdminCreateProductPage = () => {

    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string>('')

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>()

    const [characteristics, setCharacteristics] = useState<string>('')

    const deletePhoto = () => {
        setFile(null)
        setUrl('')
    }

    return (
        <div className="admin-create-product-page">
            <form>
                <div className="admin-create-product-page__container">
                    <div className="admin-create-product-page__column admin-create-product-page__column_1">
                        <div className="admin-create-product-page__inputs">
                            <input placeholder="Назва продукту" value={name} onChange={(e) => setName(e.target.value)} type="text"/>
                            <input placeholder="Ціна продукту" value={price} onChange={(e) => setPrice(+e.target.value.replace(/\D/g, ''))} type="text"/>
                        </div>
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
                    </div>
                    <div className="admin-create-product-page__column admin-create-product-page__column_2">
                        <div className="admin-create-product-page__characteristics">
                            <div className="admin-create-product-page__characteristics__title">Характеристики</div>
                            <textarea value={characteristics} onChange={(e) => setCharacteristics(e.target.value)} />
                        </div>
                    </div>
                </div>
                <button type="button">Створити продукт</button>
            </form>
        </div>
    )
}

export default AdminCreateProductPage