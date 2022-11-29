import React from 'react'
import './ProfileCard.css';
import Cover from '../../img/cover.jpg';
import Profile from '../../img/tải xuống.jpg';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ProfileCard = ({location}) => {
  const { posts, loading } = useSelector(state => ({ ...state.post }))
  const { user } = useSelector(state => ({ ...state.auth }));
  const navigate = useNavigate();
  return (
    <div className='ProfileCard'>
      <div className='ProfileImages'>
        <img src={user.coverPicuture?user.coverPicuture:Cover} alt="" />
        <img src={user.profilePicuture?user.profilePicuture:Profile} alt="" />
      </div>
      <div className='ProfileName'>
        <span>{user.firstname}{user.lastname}</span>
        <span> {user.worksAt?user.worksAt:''}</span>
      </div>

      <div className='followStatus'>
        <hr />
        <div>
          <div className='follow'>
            <span>{user.following.length}</span>
            <span>Followings</span>
          </div>
          
          <div className='follow'>
            <span> {user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location==='profilePage' && (
            <>
              
              <div className="follow">
                <span>{posts.filter(post=>post.userId===user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === 'homePage' && 
        <span onClick={()=>navigate('/profile')} className='profile'>
        My Profile
      </span>
      }
    </div>
  )
}

export default ProfileCard
