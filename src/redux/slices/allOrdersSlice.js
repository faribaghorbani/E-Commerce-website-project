import { createSlice } from '@reduxjs/toolkit'

export const allOrdersSlice = createSlice({
    name: 'allOrder',
    initialState: [],
    reducers: {
        setOrders: (state, action) => {
            return action.payload
        },
    }
})

export const { setOrders } = allOrdersSlice.actions
export default allOrdersSlice.reducer