import { createSlice } from '@reduxjs/toolkit'

export const categoryDataSlice = createSlice({
    name: 'categoryData',
    initialState: [],
    reducers: {
        setCategoryData: (state, action) => {
            return action.payload
        },
    }
})

export const { setCategoryData } = categoryDataSlice.actions
export default categoryDataSlice.reducer