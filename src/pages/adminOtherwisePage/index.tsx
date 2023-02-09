import Upload from "../../components/ui/upload"
import {useState} from "react"
import './style.scss'

const AdminOtherwisePage = () => {
    const [file, setFile] = useState<File | null>(null)
    const [url, setUrl] = useState<string>('')

    return (
        <div className="admin-otherwise-page" >
            <img src={url} alt=""/>
            <Upload setFile={setFile} setUrl={setUrl} file={file}/>
        </div>
    )
}

export default AdminOtherwisePage