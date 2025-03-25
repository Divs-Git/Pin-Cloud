import './comments.css';
import { useQuery } from '@tanstack/react-query';
import Comment from './Comment';
import CommentForm from './CommentInput';
import axiosInstance from '../../api';

const Comments = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => axiosInstance.get(`/comments/${id}`).then((res) => res.data),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  return (
    <div className='comments'>
      <div className='commentList'>
        <span className='commentCount'>
          {data.length === 0 ? 'No comments' : data.length + ' Comments'}
        </span>
        {/* COMMENT */}
        {data.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
      <CommentForm id={id} />
    </div>
  );
};

export default Comments;
