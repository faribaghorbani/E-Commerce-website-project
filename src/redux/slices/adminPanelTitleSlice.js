import { createSlice } from '@reduxjs/toolkit'

export const adminPanelTitle = createSlice({
    name: 'adminPanelTitle',
    initialState: 'پنل مدیریت فروشگاه',
    reducers: {
        setAdminPanelTitle: (state, action) => {
            return action.payload
        },
    }
})

export const { setAdminPanelTitle } = adminPanelTitle.actions
export default adminPanelTitle.reducer