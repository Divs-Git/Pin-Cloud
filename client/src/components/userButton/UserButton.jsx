import { useState } from 'react';
import './userbutton.css';
import Image from '../image/Image';
import axios from '../../api';
import { useNavigate } from 'react-router';

const UserButton = () => {
  // Temp user
  const currentUser = true;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/users/auth/logout');
      navigate('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  return currentUser ? (
    <div className='userButton'>
      <Image path='/general/noAvatar.png' />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path='/general/arrow.svg' className='arrow' />
      </div>

      {open && (
        <div className='userOptions'>
          <div className='userOption'>Profile</div>
          <div className='userOption'>Settings</div>
          <div className='userOption' onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <a href='' className='loginLink'>
      Login / Sign Up
    </a>
  );
};

export default UserButton;
