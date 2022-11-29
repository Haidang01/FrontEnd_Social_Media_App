import React from 'react'
import './Auth.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../img/logo.png';
import { useState} from 'react';
import { toast } from 'react-toastify';
import { login, register } from '../../redux/features/authSlice';
import { useEffect } from 'react';
const Auth = () => {
  const { loading, error } = useSelector(state => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const initData = {
    firstname: '', lastname: '', username: '', password: '', confirmpass: ''
  }
  const [formData, setFormData] = useState(initData)
  const { firstname, lastname, username, password,confirmpass  } = formData;
  const [comfirmPassword, setComfirmPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    setComfirmPassword(false)
    e.preventDefault();
    if (isSignup) {
      if (formData.password !== formData.confirmpass) {
        setComfirmPassword(true)
      } else {
        dispatch(register({...formData,navigate, toast }));
        clearForm()
      }
    } else {
      dispatch(login({ formData,navigate, toast }));
      clearForm()
    }
    
  }
  const clearForm = () => {
    setComfirmPassword(false);
    setFormData(initData)
  }
  useEffect(() => {
    error && toast.error(error);
  },[error])
    return (
      <div className='Auth'>
        <div className="a-left">
          <img src={Logo} alt="" />
          <div className='WebName'>
            <h1>HID Media</h1>
            <h6>Explore the ideas throughout the world</h6>
          </div>
        </div>
        {/* <SignUp/> */}
        <div className='a-right'>
          <form className='infoForm auth-form' onSubmit={handleSubmit} >
            {isSignup ? <>
              <h3>Sign up</h3>
              <div>
                <input type="text" placeholder='First Name' value={firstname} onChange={handleChange} className='infoInput' name='firstname' />
                <input type="text" placeholder='Last Name' value={lastname} onChange={handleChange} className='infoInput' name='lastname' />
              </div>
              <div className='my-3'>
                <input type="text" className='infoInput' value={username} onChange={handleChange} name='username' placeholder='Username' />
              </div>
              <div>
                <input type="password" className='infoInput' value={password} onChange={handleChange} name='password' placeholder='Password' />
                <input type="password" className='infoInput' value={confirmpass} onChange={handleChange} name='confirmpass' placeholder='Confirm Password' />
              </div>
              <span style={{ display: comfirmPassword ?'block' :"none"  , color: 'red', fontSize: '12px', alignSelf: 'flex-end', marginRight: '8px' }}>
                * Comfirm Password is not same
              </span>
              <div>
                <span style={{ fontSize: '12px' }} onClick={() => { clearForm(); setIsSignup(!isSignup) }}>Already have an account. Login!</span>
              </div>
            </>
              :
              <>
                <h3>Log In</h3>
                <div className='my-3 '>
                  <input type="text" onChange={handleChange} value={username}  placeholder='Username' className='infoInput ' name='username' />
                </div>
                <div>
                  <input type="password" onChange={handleChange} value={password}  placeholder='Password' className='infoInput' name='password' />
                </div>
                <div>
                  <span style={{ fontSize: '12px' }} onClick={() => { clearForm(); setIsSignup(!isSignup) }}>Don't have an account. Sign up</span>
                </div>
              </>
            }
            <button disabled={loading} className='button info-button' type='submit'>
              {loading?'Loading...':isSignup ? 'SignUp' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  
}

export default Auth
