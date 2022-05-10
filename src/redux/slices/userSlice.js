import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUserToken: (state, action) => {
      state = action.payload
      console.log(state)
    },
  }
})

// Action creators are generated for each case reducer function
export const { setUserToken } = userSlice.actions
export default userSlice.reducer