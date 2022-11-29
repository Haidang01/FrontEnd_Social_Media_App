import React from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons';
import FollowersCard from '../FollowersCard/FollowersCard'
import { useNavigate } from 'react-router-dom'
const RightSide = () => {
  const navigate = useNavigate()
  return (
    <div className='RightSide'> 
      <div className='navIcons'>
        <img src={Home} alt="" onClick={()=>navigate('/home')} />
        <UilSetting/>
        <img src={Noti} alt="" />
        <img src={comment} alt="" />
      </div>
      <FollowersCard />
      <button style={{ width: '90%', margin: '0 auto',height:'2rem'}} className='button'>Share</button>
    </div>
  )
}

export default RightSide
