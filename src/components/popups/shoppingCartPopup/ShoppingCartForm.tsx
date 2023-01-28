import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import FirebaseService from "../../../services/firebaseService"
import {useState} from "react"
import Loader from "../../ui/loader"
import {useAppSelector} from "../../../hooks/useAppSelector"
import {collection, doc, getFirestore} from "firebase/firestore";

const reg = /^\+?3?8?(0\d{9})$/

const schema = yup.object({
    firstName: yup.string().required('Ім\'я обов\'язкове поле'),
    lastName: yup.string().required('Фамілія обов\'язкове поле'),
    phoneNumber: yup.string().required('Мобільний телефон обов\'язкове поле').matches(reg, 'Мобільний телефон введений неправильно')
}).required()

type Inputs = {
    firstName: string
    lastName: string
    phoneNumber: string
}

const ShoppingCartForm = () => {
    const cart = useAppSelector(state => state.shoppingCart.products)
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<Inputs> = ({firstName, lastName, phoneNumber}) => {
        setLoading(true)

        FirebaseService.createOrder(firstName, lastName, phoneNumber, cart)
            .finally(() => setLoading(false))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input autoComplete="off" placeholder="Ім'я" {...register("firstName")} />
            <p style={{color: 'red'}}>{errors.firstName?.message}</p>
            <input autoComplete="off" placeholder="Фамілія" {...register("lastName")} />
            <p style={{color: 'red'}}>{errors.lastName?.message}</p>
            <input autoComplete="off" placeholder="Мобільний телефон" {...register("phoneNumber")} />
            <p style={{color: 'red'}}>{errors.phoneNumber?.message}</p>
            <button type="submit" >{loading ? <Loader/> : 'Відправити'}</button>
        </form>
    )
}

export default ShoppingCartForm