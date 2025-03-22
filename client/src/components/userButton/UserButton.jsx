import { useState } from 'react';
import './userbutton.css';
import Image from '../image/Image';
import axios from '../../api';
import { Link, useNavigate } from 'react-router';
import useAuthStore from '../../store/authStore';

const UserButton = () => {
  const { currentUser, removeCurrentUser } = useAuthStore();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/users/auth/logout');
      removeCurrentUser();
      navigate('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  return currentUser ? (
    <div className='userButton'>
      <Image path={currentUser.image || '/general/noAvatar.png'} />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path='/general/arrow.svg' className='arrow' />
      </div>

      {open && (
        <div className='userOptions'>
          <Link to={`/${currentUser.username}`} className='userOption'>
            Profile
          </Link>
          <div className='userOption'>Settings</div>
          <div className='userOption' onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to='/auth' className='loginLink'>
      Login / Sign Up
    </Link>
  );
};

export default UserButton;
