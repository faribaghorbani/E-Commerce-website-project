import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUserToken: (state, action) => {
      // console.log(state)
      return action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setUserToken } = userSlice.actions
export default userSlice.reducer