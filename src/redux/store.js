import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export default configureStore({
    devTools: true,
    reducer: {
        user: userReducer,
    }
})