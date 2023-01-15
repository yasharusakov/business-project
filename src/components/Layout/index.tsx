import {FC, ReactNode} from "react"
import AppHeader from "../AppHeader"
import AppFooter from "../AppFooter"

import './style.scss'

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className="layout">
            <div className="layout__container">
                <AppHeader/>
                <main className="layout__content">
                    {children}
                </main>
                <AppFooter/>
            </div>
        </div>
    )
}

export default Layout