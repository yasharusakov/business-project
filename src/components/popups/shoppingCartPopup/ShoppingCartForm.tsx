import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import FirebaseService from "../../../services/firebaseService"
import {useState} from "react"
import Loader from "../../ui/loader"
import {useAppSelector} from "../../../hooks/useAppSelector"
import {useActions} from "../../../hooks/useActions"
import nova from '../../../assets/images/nova.jpg'

const reg = /^\+?3?8?(0\d{9})$/

const schema = yup.object({
    firstName: yup.string().required('Введіть Ім\'я'),
    lastName: yup.string().required('Введіть фамілію'),
    phoneNumber: yup.string().required('Введіть мобільний телефон').matches(reg, 'Мобільний телефон введений неправильно'),
    address: yup.string().required('Введіть адрес / відділення Нової Пошти'),
}).required()

type Inputs = {
    firstName: string
    lastName: string
    phoneNumber: string
    address: string
}

const ShoppingCartForm = () => {
    const {clearCart} = useActions()
    const cart = useAppSelector(state => state.shoppingCart.products)
    const [loading, setLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: yupResolver(schema)})

    const onSubmit: SubmitHandler<Inputs> = ({firstName, lastName, phoneNumber, address}) => {
        setLoading(true)

        FirebaseService.createOrder(firstName, lastName, phoneNumber, address, cart)
            .finally(() => {
                setLoading(false)
                clearCart()
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input autoComplete="off" placeholder="Ім'я" {...register("firstName")} />
            <p>{errors.firstName?.message}</p>
            <input autoComplete="off" placeholder="Фамілія" {...register("lastName")} />
            <p>{errors.lastName?.message}</p>
            <input autoComplete="off" placeholder="Мобільний телефон" {...register("phoneNumber")} />
            <p>{errors.phoneNumber?.message}</p>
            <div>
                <img width={24} height={24} src={nova} alt="Нова Пошта"/>
                <input autoComplete="off" placeholder="Адрес / відділення Нової Пошти" {...register("address")} />
            </div>
            <p>{errors.address?.message}</p>
            <button type="submit" >{loading ? <Loader/> : 'Відправити'}</button>
        </form>
    )
}

export default ShoppingCartForm