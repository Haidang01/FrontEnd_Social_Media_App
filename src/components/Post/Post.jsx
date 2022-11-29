import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../redux/features/postSlice';

const Post = ({ post }) => {
  const { user } = useSelector(state => ({ ...state.auth }));
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const chekc = post.likes.some(e=>e===user._id)
  const [checkLiked, setCheckLiked] = useState(chekc)
  const dispatch = useDispatch();
  const handleLike = () => {
    setLiked((pre) => !pre);
    dispatch(likePost({id: post._id,userId: user._id }));
    if (checkLiked) {
      setLikes(likes - 1);
      setCheckLiked(!checkLiked)
    } else {
      setLikes(likes + 1)
      setCheckLiked(!checkLiked)
    }
  }
  
  return (
    <div className='Post'>
      <img src={post.image} alt='' />
      <div className='PostReact'> 
            <img onClick={()=>handleLike()} src={checkLiked?Heart:NotLike} alt="" />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
      </div>
      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>
      <div className='detail'>
        <span><b>{post.name}</b></span>
        <span>{post.desc}</span>
      </div>
    </div>
  )
}

export default Post
