import { createSlice } from '@reduxjs/toolkit'

export const selectedCategorySlice = createSlice({
    name: 'categoryData',
    initialState: {
        category: "",
        subCategory: ""
    },
    reducers: {
        setCategoryData: (state, action) => {
            return action.payload
        },
    }
})

export const { setCategoryData } = selectedCategorySlice.actions
export default selectedCategorySlice.reducer