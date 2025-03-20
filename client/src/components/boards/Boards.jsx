import { useQuery } from '@tanstack/react-query';
import axios from '../../api';
import Image from '../image/Image';
import './boards.css';
import { format } from 'timeago.js';
import { Link } from 'react-router';

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['boards', userId],
    queryFn: () => axios.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (error) return 'An error has occured';
  if (isPending) return 'Loading...';

  if (!data) return 'User not found...';

  // console.log(data);

  return (
    <div className='collections'>
      {/*COLLECTION*/}
      {data &&
        data.map((board) => (
          <Link
            to={`/search?boardId=${board._id}`}
            className='collection'
            key={board._id}
          >
            <Image src={board.firstPin.media} alt={''} />
            <div className='collectionInfo'>
              <h1>{board.title}</h1>
              <span>
                {board.pinCount} Pins &#x2022; {format(board.createdAt)}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Boards;
