import { useNavigate } from 'react-router';
import Image from '../image/Image';
import './topBar.css';
import UserButton from '../userButton/UserButton';

const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className='topBar'>
      {/* SEARCH */}
      <form onSubmit={handleSubmit} className='search'>
        <Image path='/general/search.svg' alt='' />
        <input type='text' placeholder='Search' />
      </form>
      {/* USER */}
      <UserButton />
    </div>
  );
};

export default TopBar;
