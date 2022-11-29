import React from 'react';
import './LogoSeach.css';
import Logo from '../../img/logo.png';
import {UilSearch} from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';
const LogoSearch = () => {
  const navigate=useNavigate()
  return (
    <div className='LogoSearch'>
      <div onClick={()=>navigate('/home')} style={{cursor:'pointer'}}>
        <img src={Logo} alt="" />
      </div>
      <div className='Search'>
        <input type="text" placeholder='#Explore' />
        <div className='s-icon'> 
          <UilSearch/>
        </div>
      </div>
    </div>
  )
}

export default LogoSearch
