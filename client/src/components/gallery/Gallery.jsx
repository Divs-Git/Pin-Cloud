import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import GalleryItem from '../galleryItem/GalleryItem';
import './gallery.css';
import axios from '../../api';
import InfiniteScroll from 'react-infinite-scroll-component';

const items = [
  {
    id: 1,
    media: '/pins/pin1.jpeg',
    width: 1260,
    height: 1000,
  },
  {
    id: 2,
    media: '/pins/pin2.jpeg',
    width: 1280,
    height: 1020,
  },
  {
    id: 3,
    media: '/pins/pin3.jpeg',
    width: 1240,
    height: 980,
  },
  {
    id: 4,
    media: '/pins/pin4.jpeg',
    width: 1300,
    height: 1040,
  },
  {
    id: 5,
    media: '/pins/pin5.jpeg',
    width: 1200,
    height: 960,
  },
  {
    id: 6,
    media: '/pins/pin6.jpeg',
    width: 1260,
    height: 1000,
  },
  {
    id: 7,
    media: '/pins/pin7.jpeg',
    width: 1280,
    height: 1020,
  },
  {
    id: 8,
    media: '/pins/pin8.jpeg',
    width: 1240,
    height: 980,
  },
  {
    id: 9,
    media: '/pins/pin9.jpeg',
    width: 1300,
    height: 1040,
  },
  {
    id: 10,
    media: '/pins/pin10.jpeg',
    width: 1200,
    height: 960,
  },
  {
    id: 11,
    media: '/pins/pin11.jpeg',
    width: 1260,
    height: 1000,
  },
  {
    id: 12,
    media: '/pins/pin12.jpeg',
    width: 1280,
    height: 1020,
  },
  {
    id: 13,
    media: '/pins/pin13.jpeg',
    width: 1240,
    height: 980,
  },
  {
    id: 14,
    media: '/pins/pin14.jpeg',
    width: 1300,
    height: 1040,
  },
  {
    id: 15,
    media: '/pins/pin15.jpeg',
    width: 1200,
    height: 960,
  },
  {
    id: 16,
    media: '/pins/pin16.jpeg',
    width: 1260,
    height: 1000,
  },
  {
    id: 17,
    media: '/pins/pin17.jpeg',
    width: 1280,
    height: 1020,
  },
  {
    id: 18,
    media: '/pins/pin18.jpeg',
    width: 1240,
    height: 980,
  },
  {
    id: 19,
    media: '/pins/pin19.jpeg',
    width: 1300,
    height: 1040,
  },
  {
    id: 20,
    media: '/pins/pin20.jpeg',
    width: 1200,
    height: 960,
  },
  {
    id: 21,
    media: '/pins/pin21.jpeg',
    width: 1200,
    height: 960,
  },
  {
    id: 22,
    media: '/pins/pin22.jpeg',
    width: 1200,
    height: 960,
  },
  {
    id: 23,
    media: '/pins/pin23.jpeg',
    width: 1200,
    height: 960,
  },
];

const fetchPins = async ({ pageParam, search }) => {
  const response = await axios.get(
    `/pins?cursor=${pageParam}&search=${search || ''}`
  );
  return response.data;
};

const Gallery = ({ search }) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['pins', search],
    queryFn: ({ pageParam = 0 }) => fetchPins({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  if (status === 'error') return 'An error has occured';
  if (status === 'pending') return 'Loading...';

  console.log(data);
  const allPins = data?.pages.flatMap((page) => page.pins);

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h3>Loading more pins</h3>}
      endMessage={<h3>All Posts loaded</h3>}
    >
      <div className='gallery'>
        {allPins &&
          allPins.map((item) => <GalleryItem key={item._id} item={item} />)}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
