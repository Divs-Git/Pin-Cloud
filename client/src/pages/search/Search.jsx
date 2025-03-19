import { useSearchParams } from 'react-router';
import Gallery from '../../components/gallery/Gallery';

const Search = () => {
  let [searchParams] = useSearchParams();

  const search = searchParams.get('search');

  return (
    <div>
      <Gallery search={search} />
    </div>
  );
};

export default Search;
