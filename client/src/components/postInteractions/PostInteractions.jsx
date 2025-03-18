import Image from '../image/Image';
import './postInteractions.css';

const PostInteractions = () => {
  return (
    <div className='postInteractions'>
      <div className='interactionIcons'>
        <Image path={'/general/react.svg'} alt={''} />
        181
        <Image path={'/general/share.svg'} alt={''} />
        <Image path={'/general/more.svg'} alt={''} />
      </div>
      <button>Save</button>
    </div>
  );
};

export default PostInteractions;
