import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import Logo from "../../UI/Logo";

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
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({resolver: yupResolver(schema)})
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input autoComplete="off" placeholder="Ім'я" {...register("firstName")} />
            <p style={{color: 'red'}}>{errors.firstName?.message}</p>
            <input autoComplete="off" placeholder="Фамілія" {...register("lastName")} />
            <p style={{color: 'red'}}>{errors.lastName?.message}</p>
            <input autoComplete="off" placeholder="Мобільний телефон" {...register("phoneNumber")} />
            <p style={{color: 'red'}}>{errors.phoneNumber?.message}</p>
            <button type="submit" >Відправити</button>
        </form>
    )
}

export default ShoppingCartForm