import { createSlice } from '@reduxjs/toolkit'

export const basketProductsSlice = createSlice({
    name: 'basketProducts',
    initialState: [],
    reducers: {
        addBasketProducts: (state, action) => {
            return action.payload
        },
        removeBasketProducts: (state, action) => {
            
        }
    }
})

export const { addBasketProducts } = basketProductsSlice.actions
export default basketProductsSlice.reducer