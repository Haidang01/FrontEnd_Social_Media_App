import React from 'react'
import './InfoCard.css';
import {UilPen}from '@iconscout/react-unicons'
import { ProfileModal } from '../ProfileModal/ProfileModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setLogout } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
const InfoCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state.auth }));
  const [profileUser, setProfileUser] = useState({});
  useEffect(() => {
    setProfileUser(user);
  }, [user])
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setLogout())
    toast('Logout successful');
    navigate('/')
  }
  return (
    <div className='InfoCard'>
      <div className="infoHead">
        <h4>Your Info</h4>
        <div  >
            <UilPen onClick={()=>setModalOpen(true)}  width='2rem' height='1.2rem'/>
            <ProfileModal setModalOpen={setModalOpen} user={user} modalOpen={modalOpen} />
        </div>
      </div>
      <div className="info">
        <span>
          <b>Status : </b>
        </span>
        <span>
            {profileUser.relationship?profileUser.relationship:'null'}
        </span>
      </div>
      <div className='info'>
        <span>
          <b>Address : </b>
        </span>
        <span>{profileUser.address?profileUser.address:'null'}</span>
      </div>
      <div className='info'>
        <span>
          <b>Works at : </b>
        </span>
        <span>{profileUser.worksAt?profileUser.worksAt:'null'} </span>
      </div>
      <button className='button logo-button'onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default InfoCard
