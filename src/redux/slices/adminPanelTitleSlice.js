import { createSlice } from '@reduxjs/toolkit'

export const adminPanelTitle = createSlice({
    name: 'adminPanelTitle',
    initialState: [],
    reducers: {
        setAdminPanelTitle: (state, action) => {
            return action.payload
        },
    }
})

export const { setAdminPanelSavedProducts } = adminPanelTitle.actions
export default adminPanelTitle.reducer