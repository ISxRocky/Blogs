import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('auth-user')
      ? JSON.parse(localStorage.getItem('auth-user'))
      : null,
  },
  reducers: {
    SETUSER: (state, action) => {
      state.user = action.payload
      localStorage.setItem('auth-user', JSON.stringify(state.user))
    },

    REMOVEUSER: state => {
      state.user = null
      localStorage.removeItem('auth-user')
    },
  },
})

export const { SETUSER, REMOVEUSER } = userSlice.actions
export const userReducer = userSlice.reducer
