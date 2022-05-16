import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUserToken: (state, action) => {
      return action.payload
    },
  }
})

export const { setUserToken } = userSlice.actions
export default userSlice.reducer