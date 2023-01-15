import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from "../components/Layout"
import MainPage from "./MainPage"
import CategoryPage from "./CategotyPage"
import ProductPage from "./ProductPage"
import Page404 from "./Page404"
import ScrollToTop from "../utils/scrollToTop"

const Pages = () => {
    return (
        <BrowserRouter>
            <Layout>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/c/:categoryId" element={<CategoryPage/>}/>
                    <Route path="/c/:categoryId/:productId" element={<ProductPage/>}/>
                    <Route path="/c/:categoryId/:productId/characteristics" element={<ProductPage characteristics={true}/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default Pages