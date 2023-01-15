import {FC, memo} from "react"

import './style.scss'

interface LoaderProps {
    loading: boolean
}

const Loader: FC<LoaderProps> = memo(({loading}) => {
    return (
        <div className={`loader-container ${loading && 'loading'}`}>
            <span className="loader"></span>
        </div>
    )
})

export default Loader