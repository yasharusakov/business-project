import {useAppDispatch} from "./useAppDispatch"
import {bindActionCreators} from "redux"
import * as ShoppingCartCreators from '../redux/shoppingCartSlice'
import * as PopupCreators from '../redux/popupSlice'

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(
        {...ShoppingCartCreators, ...PopupCreators},
        dispatch
    )
}