import Image from '../image/Image';
import './galleryItem.css';
import { Link } from 'react-router';

const GalleryItem = ({ item }) => {
  const optimisedHeight = (380 * item.height) / item.width;
  return (
    <div
      className='galleryItem'
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <Image path={item.media} alt='' w={380} h={optimisedHeight} />
      <Link to={`/pin/${item._id}`} className='overlay' />
      <button className='saveBtn'>Save</button>
      <div className='overlayIcons'>
        <button>
          <Image path='/general/share.svg' />
        </button>
        <button>
          <Image path='/general/more.svg' />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
