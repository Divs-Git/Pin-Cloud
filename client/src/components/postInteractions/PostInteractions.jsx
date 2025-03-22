import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from '../image/Image';
import './postInteractions.css';
import axios from '../../api';

const interact = async (id, type) => {
  const response = await axios.post(`/pins/interact/${id}`, { type });

  return response.data;
};

const PostInteractions = ({ postId }) => {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['interactionCheck', postId],
    queryFn: () =>
      axios.get(`/pins/interaction-check/${postId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactionCheck', postId] });
    },
  });

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong</h1>;
  if (!data) return null;
  return (
    <div className='postInteractions'>
      <div className='interactionIcons'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={() => mutation.mutate({ id: postId, type: 'like' })}
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z'
            stroke={data.isLiked ? '#e50422' : '#000'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill={data.isLiked ? '#e50422' : 'none'}
          />
        </svg>
        {data.likeCount}
        <Image path={'/general/share.svg'} alt={''} />
        <Image path={'/general/more.svg'} alt={''} />
      </div>
      <button
        disabled={mutation.isPending}
        onClick={() => mutation.mutate({ id: postId, type: 'save' })}
      >
        {data.isSaved ? 'Saved' : 'Save'}
      </button>
    </div>
  );
};

export default PostInteractions;
