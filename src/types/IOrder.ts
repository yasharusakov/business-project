import {IProductInCart} from "./IProductInCart"
import {Timestamp} from "firebase/firestore"

export interface IOrder {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    products: IProductInCart[]
    address: string
    viewed: boolean
    timestamp: Timestamp
}