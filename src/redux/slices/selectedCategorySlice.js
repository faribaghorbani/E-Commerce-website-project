import { createSlice } from '@reduxjs/toolkit'

export const selectedCategorySlice = createSlice({
    name: 'selectedCategory',
    initialState: {
        category: "",
        subCategory: ""
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            return action.payload
        },
    }
})

export const { setSelectedCategory } = selectedCategorySlice.actions
export default selectedCategorySlice.reducer