import './galleryItem.css';
import { Link } from 'react-router';

const GalleryItem = ({ item }) => {
  return (
    <div
      className='galleryItem'
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <img src={item.media} alt='image' />
      <Link to={`/pin/${item.id}`} className='overlay' />
      <button className='saveBtn'>Save</button>
      <div className='overlayIcons'>
        <button>
          <img src='/general/share.svg' />
        </button>
        <button>
          <img src='/general/more.svg' />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
