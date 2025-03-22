import Comments from '../../components/comments/Comments';
import PostInteractions from '../../components/postInteractions/PostInteractions';
import Image from './../../components/image/Image';
import { Link, useParams } from 'react-router';
import './post.css';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api';

const Post = () => {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['pin', id],
    queryFn: () => axios.get(`/pins/${id}`).then((res) => res.data),
  });

  if (error) return 'An error has occured';
  if (isPending) return 'Loading...';

  if (!data) return 'Pin not found...';

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
          <Image path={data.media} alt={''} w={736} />
        </div>
        <div className='postDetails'>
          <PostInteractions />
          <Link to={`/${data.user.username}`} className='postUser'>
            <Image path={data.user.image || '/general/noAvatar.png'} />
            <span>{data.user.displayName}</span>
          </Link>
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};

export default Post;
