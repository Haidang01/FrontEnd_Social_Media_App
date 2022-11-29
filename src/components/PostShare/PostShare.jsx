import React, { useRef } from 'react'
import './PostShare.css';
import Profile from '../../img/tải xuống.jpg';
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost } from '../../redux/features/postSlice';
import { useEffect } from 'react';

const PostShare = () => {
  const [openShare, setOpenShare] = useState(false);
  const [dataShare, setDataShare] = useState({ desc: '', img: '' });
  const {desc,img}=dataShare;
  const { user } = useSelector(state => ({ ...state.auth }))
  const { loading,error } = useSelector(state => ({ ...state.post }))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc:dataShare.desc,
      image:dataShare.img
    }
    if (!newPost.desc) {
      return
    }
    setOpenShare(false)
    dispatch(createPost({ newPost, navigate, toast }));
    setDataShare({ desc: '', img: '' });
  }
  useEffect(() => {
    error&&toast.error(error);
  },[error])
  return (
    <div className='PostShare'>
      <img src={user.coverPicuture?user.coverPicuture:Profile} alt="" />
      <div>
        <input type='text'
          value={desc}
          onChange={(e)=>setDataShare({...dataShare,desc:e.target.value})}
          required
        placeholder="What's happening"/>
        <div className='postOptions'>
          <div className='option'
            style={{ color: 'var(--photo)',cursor: 'pointer' }}
            onClick={()=>setOpenShare(!openShare)}
          >
            <UilScenery />
            Photo
            </div>
          <div className='option'
          style={{color:'var(--video)'}}>
            <UilPlayCircle />
            Video
            </div>
          <div className='option'
            style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
            </div>
          <div className='option'
          style={{color:'var(--shedule)'}}>
            <UilSchedule />
            Schedule
          </div>
          <button className='button ps-button'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ?
            'Loading...':'Share'
          }
          </button>
       
        </div>

        {openShare && <>
          <div>
                <FileBase  fullWidth type='file' multiple={false}
              onDone={({ base64 }) =>
                setDataShare({ ...dataShare, img: base64 })
              } />
          </div>
          {dataShare.img&&
            <div className='PreviewImage'>
            <UilTimes className='x' onClick={()=>setDataShare({ ...dataShare, img: '' })} />
            <img src={dataShare.img} alt="" />
          </div>
          }
        </>}
      </div>
    </div>  
  )
}

export default PostShare
