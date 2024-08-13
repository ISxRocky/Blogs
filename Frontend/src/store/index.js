import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { blogReducer } from './blogSlice'

const store = configureStore({
  reducer: {
    auth: userReducer,
    blog: blogReducer,
  },
})

export default store