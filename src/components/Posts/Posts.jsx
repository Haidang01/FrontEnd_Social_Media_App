import React from 'react'
import './Posts.css'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTimeLinePosts } from '../../redux/features/postSlice'
const Posts = () => {
  const dispatch = useDispatch();
  const {user}= useSelector(state=>({...state.auth}))
  const { posts, loading } = useSelector(state => ({ ...state.post }))
  useEffect(() => {
    dispatch(getTimeLinePosts(user._id))
  }, [])
  console.log(posts);
  return (
    <div className='Posts'>
      {loading ?
        <div className='text-center'>
          Loading Posts...
        </div>
        :
        posts.map((post, index) => {
        return <Post post={post} id={index} />
      })}
    </div>
  )
}

export default Posts
