import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButton';
import { selectAllPosts, fetchPosts } from './postsSlice';

export const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const error = useSelector(state => state.posts.error)
    const postStatus = useSelector(state => state.posts.status)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    if (postStatus === 'loading') {
        return (
            <section className='posts-list'>
                <div className='loader'>Loading...</div>
            </section>
        )
    }
    else if (postStatus === 'failed') {
        return (
            <section className='posts-list'>
            <div>{ error }</div>
        </section>
        )
    }
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    const renderedPosts = orderedPosts.map(post => (
        <article className='post-excerpt' key={post.id}>
            <h3>{post.title}</h3>
            <p className='post-content'>{post.content.substring(0, 100)}</p>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
            <ReactionButtons post={post} />
            <Link to={`posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        </article>
    ))
    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}
