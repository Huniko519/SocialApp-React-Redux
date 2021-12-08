import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postUpdated, selectPostById } from './postsSlice'
import { useHistory } from 'react-router-dom'

export const UpdatePostForm = ({match}) => {
    const { postID } = match.params
    const dispatch = useDispatch()
    const history = useHistory()

    var post = useSelector(state => selectPostById(state, postID))
    if(!post) post = { title: null, content:null } 
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    
    const titleChanged = e => setTitle(e.target.value)
    const contentChanged = e => setContent(e.target.value)
    const updateButtonClicked = () => {
        if(title && content) {
            dispatch(
                postUpdated({
                    id: postID,
                    title,
                    content
                })
            )
        }
        history.push(`/posts/${postID}`)
    }

    if(!post.title) {
        return (
            <section>
                Not Found.
            </section>
        )
    }

    return (
        <section>
            <form>
                <h2>Edit Post</h2>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' name='title' value={ title } onChange={ titleChanged } />
                <label htmlFor='content'>Content</label>
                <textarea id='content' name='content' value={ content } onChange={ contentChanged } />
                <button type='button' className='button' onClick={ updateButtonClicked }>Update</button>
            </form>
        </section>
    )
}