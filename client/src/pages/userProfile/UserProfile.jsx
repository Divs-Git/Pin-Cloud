import { useState } from 'react';
import Image from './../../components/image/Image';
import './userProfile.css';
import Gallery from './../../components/gallery/Gallery';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api';
import { useParams } from 'react-router';
import Boards from '../../components/boards/Boards';
import FollowButton from './FollowButton';

const UserProfile = () => {
  const [type, setType] = useState('saved');

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => axios.get(`/users/${username}`).then((res) => res.data),
  });

  if (error) return 'An error has occured';
  if (isPending) return 'Loading...';

  if (!data) return 'User not found...';

  // console.log(data);
  return (
    <div className='userProfile'>
      <Image
        className={'profileImage'}
        w={100}
        h={100}
        path={data.image || '/general/noAvatar.png'}
        alt={''}
      />
      <h1 className='profileName'>{data.displayName}</h1>
      <span className='profileUsername'>{data.username}</span>
      <div className='followCounts'>
        {data.followerCount} followers &#x2022; {data.followingCount} followings
      </div>
      <div className='profileInteractions'>
        <Image path={'/general/share.svg'} alt={''} />
        <div className='profileButtons'>
          <button>Message</button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
        </div>
        <Image path={'/general/more.svg'} alt={''} />
      </div>
      <div className='profileOptions'>
        <span
          onClick={() => setType('created')}
          className={type == 'created' ? 'active' : ''}
        >
          Created
        </span>
        <span
          onClick={() => setType('saved')}
          className={type == 'saved' ? 'active' : ''}
        >
          Saved
        </span>
      </div>
      {type === 'created' ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default UserProfile;
