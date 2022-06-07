import { createSlice } from '@reduxjs/toolkit'

export const themeModeSlice = createSlice({
    name: 'themeMode',
    initialState: 'dark',
    reducers: {
        setThemeMode: (state, action) => {
            return action.payload
        },
    }
})

export const { setThemeMode } = themeModeSlice.actions
export default themeModeSlice.reducer