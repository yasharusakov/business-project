import {ReactNode, FC} from "react"
import Tabs from "../ui/tabs"
import './style.scss'

interface AdminPagePanelProps {
    children: ReactNode
}

const AdminPanelLayout: FC<AdminPagePanelProps> = ({children}) => {

    const tabs = [
        {to: '/admin/panel', value: 'Категорії'},
        {to: '/admin/orders', value: 'Замовлення'},
        {to: '/admin/questions', value: 'Запитання'}
    ]

    return (
        <div className="admin-panel-layout">
            <div className="admin-panel-layout__container">
                <Tabs tabs={tabs}/>
                <div className="admin-panel-layout__content container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminPanelLayout