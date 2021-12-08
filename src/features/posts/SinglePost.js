import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { selectPostById } from './postsSlice'

export const SinglePostPage = ({ match }) => {
    const { postID } = match.params
    const post = useSelector(state => selectPostById(state, postID))

    if (!post) {
        return (
            <section>
                Not found!
            </section>
        )
    }
    return (
        <section>
            <article className='post'>
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
                <Link to={`/editPost/${post.id}`} className='button'>Edit</Link>
            </article>
        </section>
    )
}