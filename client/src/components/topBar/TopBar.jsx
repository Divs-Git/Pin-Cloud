import { useNavigate } from 'react-router';
import Image from '../image/Image';
import UserButton from '../userButton/UserButton';
import './topBar.css';

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <form onSubmit={handleSubmit} className='topBar'>
      {/*Search*/}
      <div className='search'>
        <Image path='/general/search.svg' alt='search' />
        <input type='text' placeholder='Search...' />
      </div>

      {/*User*/}
      <UserButton />
    </form>
  );
};

export default TopBar;
