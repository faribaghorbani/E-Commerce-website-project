import { createSlice } from '@reduxjs/toolkit'

export const ordersDataSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        setOrdersData: (state, action) => {
            // console.log(action.payload)
            return action.payload
        },
    }
})

export const { setOrdersData } = ordersDataSlice.actions
export default ordersDataSlice.reducer