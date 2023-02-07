import {useState} from "react"
import FirebaseService from "../../../services/firebaseService"
import Loader from "../../ui/loader"
import * as yup from "yup"
import {SubmitHandler, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import {useActions} from "../../../hooks/useActions"
import './style.scss'

const reg = /^\+?3?8?(0\d{9})$/

const schema = yup.object({
    fullName: yup.string().required('Введіть Ім\'я та фамілію'),
    phoneNumber: yup.string().required('Введіть мобільний телефон').matches(reg, 'Мобільний телефон введений неправильно'),
    question: yup.string().required('Введіть запитання')
}).required()

type Inputs = {
    fullName: string
    phoneNumber: string
    question: string
}

const SupportPopup = () => {
    const {setPopup, setNotification} = useActions()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: yupResolver(schema)})
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = ({fullName, phoneNumber, question}) => {
        setLoading(true)

        FirebaseService.createQuestion({fullName, phoneNumber, question})
            .finally(() => {
                setLoading(false)
                setPopup({name: 'SupportPopup', type: false, data: null})
                setNotification({value: 'Запитання відправлено', status: 'good'})
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="support-popup">
            <input autoComplete="off" placeholder="Ім'я та фамілія"  type="text" {...register("fullName")} />
            <p>{errors.fullName?.message}</p>
            <input autoComplete="off" placeholder="Номер телефону" type="text" {...register("phoneNumber")} />
            <p>{errors.phoneNumber?.message}</p>
            <textarea autoComplete="off" placeholder="Ваше запитання" {...register("question")} />
            <p>{errors.question?.message}</p>
            <button disabled={loading} type="submit">{loading ? <Loader/> : 'Відправити'}</button>
        </form>
    )
}

export default SupportPopup