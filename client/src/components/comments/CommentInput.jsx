import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react';
import axios from './../../api/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentInput = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState('');

  const queryClient = useQueryClient();

  const addComment = async (comment) => {
    const res = await axios.post('/comments', comment);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      setDesc('');
      setOpen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({
      description: desc,
      pin: id,
    });
  };

  const handleEmojiClick = ({ emoji }) => {
    setDesc((prev) => prev + emoji);
    setOpen(false);
  };
  return (
    <form className='commentForm' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add a comment'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className='emoji'>
        <div onClick={() => setOpen((prev) => !prev)}>😊</div>
        {open && (
          <div className='emojiPicker'>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentInput;
