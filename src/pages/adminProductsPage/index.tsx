import {Link, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {IProduct} from "../../types/IProduct"
import FirebaseService from "../../services/firebaseService"
import './style.scss'

type ProductsParams = {
    categoryId: string
}

const AdminProductsPage = () => {
    const {categoryId} = useParams<ProductsParams>()
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        if (!categoryId) return

        const unsub = FirebaseService.listenData(setProducts, `/categories/${categoryId}/items`)

        if (!unsub) return

        return () => unsub()
    }, [categoryId])

    return (
        <div className="admin-panel__products">
            <Link to={`/admin/panel/c/${categoryId}/create-product`} className="admin-panel__create-product">Створити продукт</Link>
        </div>
    )
}

export default AdminProductsPage