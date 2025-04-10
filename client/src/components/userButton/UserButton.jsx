import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuthStore from '../../stores/authStore';
import axiosInstance from '../../api';
import Image from '../image/Image';

const UserButton = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { currentUser, removeCurrentUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/users/auth/logout', {});
      removeCurrentUser();
      navigate('/auth');
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className='userButton'>
      <Image path={currentUser.img || '/general/noAvatar.png'} alt='' />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path='/general/arrow.svg' alt='' className='arrow' />
      </div>
      {open && (
        <div className='userOptions'>
          <Link to={`/${currentUser.username}`} className='userOption'>
            Profile
          </Link>
          <div className='userOption'>Setting</div>
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
