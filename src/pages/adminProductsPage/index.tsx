import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {IProduct} from "../../types/IProduct"
import FirebaseService from "../../services/firebaseService"
import './style.scss'
import Loader from "../../components/ui/loader";

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

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="admin-products-page">
            <button className="admin-products-page__create-product">
                <Link to={`/admin/panel/c/${categoryId}/create-product`}>Створити продукт</Link>
            </button>
        </div>
    )
}

export default AdminProductsPage