import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {IProduct} from "../../types/IProduct"
import FirebaseService from "../../services/firebaseService"
import Loader from "../../components/ui/loader"
import edit_icon from "../../assets/images/pencil.png"
import delete_icon from "../../assets/images/delete.png"
import './style.scss'

type ProductsParams = {
    categoryId: string
}

const AdminProductsPage = () => {
    const {categoryId} = useParams<ProductsParams>()
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!categoryId) return

        FirebaseService.getProducts(categoryId)
            .then((data) => {
                if (!data) return
                setProducts(data)
            })
            .finally(() => setLoading(false))
    }, [categoryId])

    const deleteProduct = (productId: string, name: string) => {
        if (!categoryId || !productId) return
        FirebaseService.deleteData({categoryId, productId, name})
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="admin-products-page">
            <button className="admin-products-page__create-product">
                <Link to={`/admin/panel/c/${categoryId}/create-product`}>Створити продукт</Link>
            </button>
            <div className="cards">
                <div className="cards__container">
                    {products.map(product => {
                        return (
                            <div key={product.id} className="cards__card">
                                <div className="cards__card__container">
                                    <Link to={`/admin/panel/с/${product.id}`} className="cards__card__picture">
                                        <img src={product.url} alt={product.title}/>
                                    </Link>
                                    <div className="cards__card__text admin">
                                        <div className="cards__card__text__title category">{product.title}</div>
                                        <div className="cards__card__text__icons">
                                            <Link to={`/admin/panel/c/${categoryId}/edit-product/${product.id}`} className="edit_icon">
                                                <img src={edit_icon} alt="edit_icon" style={{width: 24, height: 24}}/>
                                            </Link>
                                            <div onClick={() => deleteProduct(product.id, product.title)} className="delete_icon">
                                                <img src={delete_icon} alt="delete_icon" style={{width: 24, height: 24}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminProductsPage