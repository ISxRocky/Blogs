import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blog',
  initialState: { blog: null },

  reducers: {
    SETBLOG: (state, action) => {
      state.blog = { ...state.blog, ...action.payload }
    },

    REMOVEBLOG: state => {
      state.blog = null
    },
  },
})

export const { SETBLOG, REMOVEBLOG } = blogSlice.actions
export const blogReducer = blogSlice.reducer