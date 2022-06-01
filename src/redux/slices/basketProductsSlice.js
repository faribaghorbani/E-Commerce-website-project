import { createSlice, current } from '@reduxjs/toolkit'

export const basketProductsSlice = createSlice({
    name: 'basketProducts',
    initialState: {},
    reducers: {
        addBasketProducts: (state, action) => {        
            state[action.payload.id] = {product: action.payload, quantity: 1, status: 'normal'}
    
        },

        changeNumberBasketProducts: (state, action) => {
            if (action.payload.quantity <= 0) {
                delete state[action.payload.product.id]
            } else if (action.payload.formerQuantity !== undefined) {
                state[action.payload.product.id] = {...state[action.payload.product.id], quantity: action.payload.quantity, formerQuantity: action.payload.formerQuantity}
            } else {
                state[action.payload.product.id] = {...state[action.payload.product.id], quantity: action.payload.quantity}
            }
            console.log(current(state))
        },
        changeStatusBasketProducts: (state, action) => {
            state[action.payload.id] = {...state[action.payload.id], status: action.payload.status}
            console.log(current(state))
        }
    }
})

export const { addBasketProducts, changeNumberBasketProducts, changeStatusBasketProducts } = basketProductsSlice.actions
export default basketProductsSlice.reducer