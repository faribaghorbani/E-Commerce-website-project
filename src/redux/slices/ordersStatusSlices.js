import { createSlice } from '@reduxjs/toolkit'

export const ordersStatusSlice = createSlice({
    name: 'orderStatus',
    initialState: 0,
    reducers: {
        setOrdersStatus: (state, action) => {
            console.log(action.payload)
            return action.payload
        },
    }
})

export const { setOrdersStatus } = ordersStatusSlice.actions
export default ordersStatusSlice.reducer