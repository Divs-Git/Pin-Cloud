import './app.css';
import LeftBar from './components/leftBar/LeftBar';
import TopBar from './components/topBar/TopBar';

const App = () => {
  return (
    <div className='app'>
      <LeftBar />
      <div className='content'>
        <TopBar />
      </div>
    </div>
  );
};

export default App;
