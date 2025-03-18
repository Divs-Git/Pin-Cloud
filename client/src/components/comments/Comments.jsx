import { useState } from 'react';
import Image from '../image/Image';
import './comments.css';
import EmojiPicker from 'emoji-picker-react';

const Comments = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className='comments'>
      <div className='commentList'>
        <span className='commentCount'>6 comments</span>

        {/**COMMENT */}
        <div className='comment'>
          <Image path={'/general/noAvatar.png'} alt={''} />

          <div className='commentContent'>
            <span className='commentUsername'>Divyansh Srivastava</span>
            <p className='commentText'>This is a very beautiful post image.</p>
            <span className='commentTime'>2h</span>
          </div>
        </div>
        {/**COMMENT */}
        <div className='comment'>
          <Image path={'/general/noAvatar.png'} alt={''} />

          <div className='commentContent'>
            <span className='commentUsername'>Divyansh Srivastava</span>
            <p className='commentText'>This is a very beautiful post image.</p>
            <span className='commentTime'>2h</span>
          </div>
        </div>
        {/**COMMENT */}
        <div className='comment'>
          <Image path={'/general/noAvatar.png'} alt={''} />

          <div className='commentContent'>
            <span className='commentUsername'>Divyansh Srivastava</span>
            <p className='commentText'>This is a very beautiful post image.</p>
            <span className='commentTime'>2h</span>
          </div>
        </div>
        {/**COMMENT */}
        <div className='comment'>
          <Image path={'/general/noAvatar.png'} alt={''} />

          <div className='commentContent'>
            <span className='commentUsername'>Divyansh Srivastava</span>
            <p className='commentText'>This is a very beautiful post image.</p>
            <span className='commentTime'>2h</span>
          </div>
        </div>
        {/**COMMENT */}
        <div className='comment'>
          <Image path={'/general/noAvatar.png'} alt={''} />

          <div className='commentContent'>
            <span className='commentUsername'>Divyansh Srivastava</span>
            <p className='commentText'>This is a very beautiful post image.</p>
            <span className='commentTime'>2h</span>
          </div>
        </div>
        {/**COMMENT */}
        <div className='comment'>
          <Image path={'/general/noAvatar.png'} alt={''} />

          <div className='commentContent'>
            <span className='commentUsername'>Divyansh Srivastava</span>
            <p className='commentText'>This is a very beautiful post image.</p>
            <span className='commentTime'>2h</span>
          </div>
        </div>
      </div>

      <form className='commentForm'>
        <input type='text' placeholder='Add a comment' />
        <div className='emoji'>
          <div onClick={() => setOpen((prev) => !prev)}>😊</div>
          {open && (
            <div className='emojiPicker'>
              <EmojiPicker />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Comments;
