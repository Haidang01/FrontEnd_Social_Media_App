import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify';
import { updateUser } from '../../redux/features/authSlice';

 export function ProfileModal({modalOpen,setModalOpen,user}) {
    const handleClose = () => setModalOpen(false);
   const handleShow = () => setModalOpen(true);
   const [formData, setFormData] = useState(user);
   const {firstname, lastname, worksAt, address, relationship, profilePicture, coverPicture,country } = formData;
    const dispatch = useDispatch();
   const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   }
   const handleUpdate = (e) => {
     e.preventDefault();
     dispatch(updateUser({
       id: user._id,
       userData: formData,
       toast   
     }));
    //  handleClose();
   }
  return (
    <>
      <Modal
        show={modalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
    
        <Modal.Body>
          <form className='infoForm'>
            <h3>Your info</h3>
            <div>
              <input
                type="text"
                className='infoInput'
                onChange={handleChange}
                value={firstname}
                name='firstname'
                placeholder='First Name'
              />
              <input
                type="text"
                className='infoInput'
                value={lastname}
                name='lastname'
                onChange={handleChange}
                placeholder='Last Name'
              />
            </div>
            <div>
              <input
                type="text"
                className='infoInput'
                onChange={handleChange}
                value={worksAt}
                name='worksAt'
                placeholder='Works At'
              />
            </div>
            <div>
              <input
                type="text"
                className='infoInput'
                onChange={handleChange}
                value={address}
                name='address'
                placeholder='Address '
              />
              <input
                type="text"
                className='infoInput'
                onChange={handleChange}
                value={country}
                name='country'
                placeholder='Country'
              />
            </div>
            <div>
              <input
                type="text"
                className='infoInput'
                onChange={handleChange}
                value={relationship}
                name='relationship'
                placeholder='Relationship status'
              />
            </div>
           
            <div>
              Profile Image
               <FileBase  fullWidth type='file' multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, profilePicture: base64 })
              } />
              Cover Image
               <FileBase  fullWidth type='file' multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, coverPicture: base64 })
              } />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

