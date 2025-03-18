import { Link } from 'react-router';
import Image from '../image/Image';
import './leftBar.css';

const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className='menuIcons'>
        <Link to='/' className='menuIcon'>
          <Image path='/general/logo.png' alt='logo' className='logo' />
        </Link>
        <Link to='/' className='menuIcon'>
          <Image path='/general/home.svg' alt='logo' />
        </Link>
        <Link to='/create' className='menuIcon'>
          <Image path='/general/create.svg' alt='logo' />
        </Link>
        <Link to='/' className='menuIcon'>
          <Image path='/general/updates.svg' alt='logo' />
        </Link>
        <Link to='/' className='menuIcon'>
          <Image path='/general/messages.svg' alt='logo' />
        </Link>
      </div>
      <Link to='/' className='menuIcon'>
        <Image path='/general/settings.svg' alt='logo' />
      </Link>
    </div>
  );
};

export default LeftBar;
