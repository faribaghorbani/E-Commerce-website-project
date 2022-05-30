import { createSlice, current } from '@reduxjs/toolkit'

export const basketProductsSlice = createSlice({
    name: 'basketProducts',
    initialState: {},
    reducers: {
        addBasketProducts: (state, action) => {        
            state[action.payload.id] = {product: action.payload, quantity: 1, status: 'normal'}
    
            console.log(current(state))
        },

        changeBasketProducts: (state, action) => {
            if (action.payload.quantity === 0) {
                delete state[action.payload.product.id]
            } else {
                state[action.payload.product.id] = {...state[action.payload.product.id], quantity: action.payload.quantity}
            }
            console.log(current(state))
        }
    }
})

export const { addBasketProducts, changeBasketProducts } = basketProductsSlice.actions
export default basketProductsSlice.reducer