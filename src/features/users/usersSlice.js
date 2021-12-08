import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { selectAllPosts } from '../posts/postsSlice'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.users
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
      [fetchUsers.fulfilled]: (state, action) => {
          return action.payload
      }
  }
})
export const selectAllUsers = state => state.users;
export const selectUserById = (state, userId) => 
    state.users.find( user => user.id === userId)
export const selectPostByUser = createSelector(
    [selectAllPosts, (state, userId) => userId], 
    (posts, userId) => posts.filter(post => post.user === userId)
)

export default usersSlice.reducer