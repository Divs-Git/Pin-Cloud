import Image from '../image/Image';
import './leftBar.css';

const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className='menuIcons'>
        <a href='/' className='menuIcon'>
          <Image path='/general/logo.png' alt='logo' className='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <Image path='/general/home.svg' alt='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <Image path='/general/create.svg' alt='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <Image path='/general/updates.svg' alt='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <Image path='/general/messages.svg' alt='logo' />
        </a>
      </div>
      <a href='/' className='menuIcon'>
        <Image path='/general/settings.svg' alt='logo' />
      </a>
    </div>
  );
};

export default LeftBar;
