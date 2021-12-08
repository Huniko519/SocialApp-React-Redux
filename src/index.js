import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { fetchUsers } from './features/users/usersSlice'
import { fetchPosts } from './features/posts/postsSlice'
import { Provider } from 'react-redux'

import './api/server'

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
