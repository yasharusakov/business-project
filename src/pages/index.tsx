import {useAuthState} from "../hooks/useAuthState"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Layout from "../components/layout"
import MainPage from "./mainPage"
import CategoryPage from "./categoryPage"
import ProductPage from "./productPage"
import Page404 from "./page404"
import ScrollToTop from "../utils/scrollToTop"
import AdminPageLogin from "./adminPageLogin"
import AdminPagePanel from "./adminPagePanel"
import Loader from "../components/ui/loader"

const Pages = () => {
    const {userState, loading} = useAuthState()

    console.log(userState)

    return (
        <BrowserRouter>
            <Layout>
                <Loader loading={loading}/>
                <ScrollToTop/>
                {
                    userState ?
                        (
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/c/:categoryId" element={<CategoryPage/>}/>
                                <Route path="/c/:categoryId/:productId" element={<ProductPage/>}/>
                                <Route path="/c/:categoryId/:productId/characteristics" element={<ProductPage characteristics={true}/>}/>
                                <Route path="/admin/login" element={<Navigate to="/admin/panel" replace/>}/>
                                <Route path="/admin/panel" element={<AdminPagePanel/>}/>
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        )
                        :
                        (
                            <Routes>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/c/:categoryId" element={<CategoryPage/>}/>
                                <Route path="/c/:categoryId/:productId" element={<ProductPage/>}/>
                                <Route path="/c/:categoryId/:productId/characteristics" element={<ProductPage characteristics={true}/>}/>
                                <Route path="/admin/login" element={<AdminPageLogin/>}/>
                                <Route path="/admin/panel" element={<Navigate to="/admin/login" replace/>}/>
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        )
                }
            </Layout>
        </BrowserRouter>
    )
}

export default Pages