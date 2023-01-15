import {useAppDispatch} from "./useAppDispatch"
import {bindActionCreators} from "redux"
import * as ShoppingCartCreators from '../redux/slices/shoppingCartSlice'
import * as PopupCreators from '../redux/slices/popupSlice'

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(
        {...ShoppingCartCreators, ...PopupCreators},
        dispatch
    )
}