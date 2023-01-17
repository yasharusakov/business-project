import {FC, memo} from "react"
import {useActions} from "../../../hooks/useActions"

interface CounterProps {
    categoryId: string
    productId: string
    amount: number
}

const Counter: FC<CounterProps> = memo(({categoryId, productId, amount}) => {
    const {increaseAmount, decreaseAmount} = useActions()

    const plus = () => {
        if (!categoryId || !productId) return
        increaseAmount({categoryId, productId})
    }

    const minus = () => {
        if (!categoryId || !productId) return
        if (amount === 1) return
        decreaseAmount({categoryId, productId})
    }

    return (
        <div className="counter">
            <div onClick={plus} className="counter__plus">&#10133;</div>
            <div className="counter__amount">{amount}</div>
            <div onClick={minus} className="counter__minus">&#10134;</div>
        </div>
    )
})

export default Counter