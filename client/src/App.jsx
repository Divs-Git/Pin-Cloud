import './app.css';
import Gallery from './components/gallery/gallery';
import LeftBar from './components/leftBar/LeftBar';
import TopBar from './components/topBar/TopBar';

const App = () => {
  return (
    <div className='app'>
      <LeftBar />
      <div className='content'>
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
