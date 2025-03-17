import Image from '../image/Image';
import UserButton from '../userButton/UserButton';
import './topBar.css';

const TopBar = () => {
  return (
    <div className='topBar'>
      {/*Search*/}
      <div className='search'>
        <Image path='/general/search.svg' alt='search' />
        <input type='text' placeholder='Search...' />
      </div>

      {/*User*/}
      <UserButton />
    </div>
  );
};

export default TopBar;
