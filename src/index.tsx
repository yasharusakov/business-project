import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux"
import index from './redux'
import App from "./components/app"
import './firebase'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={index}>
        <App/>
    </Provider>
)