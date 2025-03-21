import './comments.css';
import { useQuery } from '@tanstack/react-query';
import axios from './../../api/index';
import Comment from './Comment';
import CommentInput from './CommentInput';

const Comments = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => axios.get(`/comments/${id}`).then((res) => res.data),
  });

  if (error) return 'An error has occured';
  if (isPending) return 'Loading...';

  if (!data) return 'User not found...';

  console.log(data);
  return (
    <div className='comments'>
      <div className='commentList'>
        <span className='commentCount'>
          {data.length == 0 ? 'No comments' : data.length + ' comments'}
        </span>

        {/**COMMENT */}
        {data &&
          data.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>
      <CommentInput id={id} />
    </div>
  );
};

export default Comments;
