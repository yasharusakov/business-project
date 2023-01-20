import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit"
import {PopupState, IPopupPayloadAction} from "../types/popup"

const initialState: PopupState = {
	ShoppingCart: {type: false, data: null},
	CategoriesPopup: {type: false, data: null},
	CreateCategoryPopup: {type: false, data: null}
}

const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		setPopup(state: Draft<PopupState>, action: PayloadAction<IPopupPayloadAction>) {
			state[action.payload.name] = {type: action.payload.type, data: action.payload.data}
		}
	}
})

export default popupSlice.reducer

export const {
	setPopup
} = popupSlice.actions