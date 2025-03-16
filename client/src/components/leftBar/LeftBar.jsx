import './leftBar.css';

const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className='menuIcons'>
        <a href='/' className='menuIcon'>
          <img src='/general/logo.png' alt='logo' className='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <img src='/general/home.svg' alt='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <img src='/general/create.svg' alt='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <img src='/general/updates.svg' alt='logo' />
        </a>
        <a href='/' className='menuIcon'>
          <img src='/general/messages.svg' alt='logo' />
        </a>
      </div>
      <a href='/' className='menuIcon'>
        <img src='/general/settings.svg' alt='logo' />
      </a>
    </div>
  );
};

export default LeftBar;
