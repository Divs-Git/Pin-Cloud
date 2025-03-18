import Comments from '../../components/comments/Comments';
import PostInteractions from '../../components/postInteractions/PostInteractions';
import Image from './../../components/image/Image';
import { Link } from 'react-router';
import './post.css';
const Post = () => {
  return (
    <div className='postPage'>
      <img
        width='20'
        height='20'
        src='https://img.icons8.com/ios-filled/50/left.png'
        alt='left'
        style={{ cursor: 'pointer' }}
      />
      <div className='postContainer'>
        <div className='postImg'>
          <Image path={'/pins/pin1.jpeg'} alt={''} w={736} />
        </div>
        <div className='postDetails'>
          <PostInteractions />
          <Link to={'/divyansh'} className='postUser'>
            <Image path={'/general/noAvatar.png'} />
            <span>Divyansh Srivastava</span>
          </Link>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default Post;
