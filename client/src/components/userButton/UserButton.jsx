import { useState } from 'react';
import './userbutton.css';
import Image from '../image/Image';

const UserButton = () => {
  // Temp user
  const currentUser = true;
  const [open, setOpen] = useState(false);

  return currentUser ? (
    <div className='userButton'>
      <Image path='/general/noAvatar.png' />
      <Image
        onClick={() => setOpen((prev) => !prev)}
        path='/general/arrow.svg'
        className='arrow'
      />

      {open && (
        <div className='userOptions'>
          <div className='userOption'>Profile</div>
          <div className='userOption'>Settings</div>
          <div className='userOption'>Logout</div>
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
