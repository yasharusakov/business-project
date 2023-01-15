import {configureStore} from "@reduxjs/toolkit"
import shoppingCartSlice from "./slices/shoppingCartSlice"
import popupSlice from "./slices/popupSlice"

const store = configureStore({
    reducer: {shoppingCart: shoppingCartSlice, popup: popupSlice},
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store