import { useState } from 'react';
import './userbutton.css';

const UserButton = () => {
  // Temp user
  const currentUser = true;
  const [open, setOpen] = useState(false);

  return currentUser ? (
    <div className='userButton'>
      <img src='/general/noAvatar.png' />
      <img
        onClick={() => setOpen((prev) => !prev)}
        src='/general/arrow.svg'
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
