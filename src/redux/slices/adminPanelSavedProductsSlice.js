import { createSlice } from '@reduxjs/toolkit'

export const adminPanelSavedProductsSlice = createSlice({
    name: 'adminPanelSavedProducts',
    initialState: [],
    reducers: {
        setAdminPanelSavedProducts: (state, action) => {
            return action.payload
        },
    }
})

export const { setAdminPanelSavedProducts } = adminPanelSavedProductsSlice.actions
export default adminPanelSavedProductsSlice.reducer