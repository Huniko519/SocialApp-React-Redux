import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../posts/postsSlice'
import { Link } from 'react-router-dom'
import { selectUserById, selectPostByUser } from './usersSlice'

export const UserPage = ({ match }) => {
    const { userId } = match.params
    const user = useSelector(state => selectUserById(state, userId))

    // Following code cause the UserPage re-render when any action dispatchs even if the posts data has'nt changed
    // Because useSelector forces the component to re-render when we return a new refrence value.
    // Here, allPosts.filter(...) returns a new refrence array so the UserPage re-render needlessly.
    // So we create selectPostByUser function to use memorized selector so that UserPage not re-render.

    // const postForUser = useSelector(state => {
    //     const allPosts = selectAllPosts(state)
    //     return allPosts.filter( post => post.user === userId)
    // })

    const postForUser = useSelector(state => selectPostByUser(state, userId))

    if(!user) {
        return (
            <section>
                Not found!
            </section>
        )
    }
    const postTitles = postForUser.map( post => (
        <li key={ post.id }>
            <Link to={`/posts/${post.id}`}>{ post.title }</Link>
        </li>
    ))

    return (
        <section>
            <h2>{ user.name }</h2>
            <ul>
                { postTitles }
            </ul>
        </section>
    )
}