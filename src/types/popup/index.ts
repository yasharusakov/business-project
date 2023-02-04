import {ReactElement, ReactNode} from "react"

export enum PopupNames {
    ShoppingCart = 'ShoppingCart',
    CategoriesPopup = 'CategoriesPopup',
    CreateCategoryPopup = 'CreateCategoryPopup',
    SupportPopup = 'SupportPopup'
}

export type PopupState = {
    [propName in keyof typeof PopupNames]: {type: boolean, data?: any}
}

export interface IPopupPayloadAction {
    name: keyof typeof PopupNames
    data?: any
    type: boolean
}

export interface IPopup {
    title?: string
    name: keyof typeof PopupNames
    render: () => ReactNode | ReactElement
}
