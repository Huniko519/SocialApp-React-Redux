import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'


const initialState = {
    posts: [],
    status: 'idle',
    errors: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

/*************************************************************************************************
   Normal thunk function which can be used as normal action, and can include async function
*************************************************************************************************

EX.1
(normal thunk function)

const exampleThunkFunction = (dispatch, getState) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter}`)
  dispatch(increment())
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter}`)
}

EX.2
(thunk action creator returns thunk function)

const logAndAdd = amount => {
    return (dispatch, getState) => {
        const stateBefore = getState()
        console.log(`Counter before: ${stateBefore.counter}`)
        dispatch(incrementByAmount(amount))
        const stateAfter = getState()
        console.log(`Counter after: ${stateAfter.counter}`)
    }
}

EX.3 
(async thunk function which is called redux thunk)

const getRepoDetailsStarted = () => ({
  type: 'repoDetails/fetchStarted'
})
const getRepoDetailsSuccess = repoDetails => ({
  type: 'repoDetails/fetchSucceeded',
  payload: repoDetails
})
const getRepoDetailsFailed = error => ({
  type: 'repoDetails/fetchFailed',
  error
})

const fetchIssuesCount = (org, repo) => async dispatch => {
  dispatch(getRepoDetailsStarted())
  try {
    const repoDetails = await getRepoDetails(org, repo)
    dispatch(getRepoDetailsSuccess(repoDetails))
  } catch (err) {
    dispatch(getRepoDetailsFailed(err.toString()))
  }
}

************************************************************************************************/

/*  
    Create AsyncThunk using createAsyncThunk function in redux toolkit.
    This function returns 'action creator'.
    Created actions have action type of 'pending', 'fulfilled', 'rejected'
    And is used in extraReducers in slice 
*/

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost => {
    const response = await client.post('/fakeApi/posts', { post: initialPost })
    return response.post
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: { thumbsUp: 0, hooray: 0 }
                    },
                }
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find(item => item.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'completed'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.errors = action.errors.message
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        }
    }
})

export const { reactionAdded, postAdded, postUpdated } = postSlice.actions

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postID) => state.posts.posts.find(
    post => post.id === postID
)
export default postSlice.reducer