import { useState } from 'react';
import Image from './../../components/image/Image';
import './userProfile.css';
import Gallery from './../../components/gallery/Gallery';
import Collections from '../../components/collections/Collections';

const UserProfile = () => {
  const [type, setType] = useState('saved');
  return (
    <div className='userProfile'>
      <Image
        className={'profileImage'}
        w={100}
        h={100}
        path={'/general/noAvatar.png'}
        alt={''}
      />
      <h1 className='profileName'>Divyash Srivastava</h1>
      <span className='profileUsername'>@divyansh</span>
      <div className='followCounts'>10 followers &#x2022; 20 followings </div>
      <div className='profileInteractions'>
        <Image path={'/general/share.svg'} alt={''} />
        <div className='profileButtons'>
          <button>Message</button>
          <button>Follow</button>
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
      {type === 'created' ? <Gallery /> : <Collections />}
    </div>
  );
};

export default UserProfile;
