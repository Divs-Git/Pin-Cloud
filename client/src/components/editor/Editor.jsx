import './editor.css';
import Layers from './Layers';
import Options from './Options';
import Workspace from './Workspace';

const Editor = ({ previewImage }) => {
  return (
    <div className='editor'>
      <Layers previewImage={previewImage} />
      <Workspace previewImage={previewImage} />
      <Options previewImage={previewImage} />
    </div>
  );
};

export default Editor;
