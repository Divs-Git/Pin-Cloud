import Image from '../image/Image';
import './collections.css';
const Collections = () => {
  return (
    <div className='collections'>
      {/*COLLECTION*/}
      <div className='collection'>
        <Image path={'/pins/pin1.jpeg'} alt={''} />
        <div className='collectionInfo'>
          <h1>Minimalist Bedroom</h1>
          <span>12 Pins &#x2022; 1w</span>
        </div>
      </div>

      {/*COLLECTION*/}
      <div className='collection'>
        <Image path={'/pins/pin1.jpeg'} alt={''} />
        <div className='collectionInfo'>
          <h1>Minimalist Bedroom</h1>
          <span>12 Pins &#x2022; 1w</span>
        </div>
      </div>

      {/*COLLECTION*/}
      <div className='collection'>
        <Image path={'/pins/pin1.jpeg'} alt={''} />
        <div className='collectionInfo'>
          <h1>Minimalist Bedroom</h1>
          <span>12 Pins &#x2022; 1w</span>
        </div>
      </div>
    </div>
  );
};

export default Collections;
