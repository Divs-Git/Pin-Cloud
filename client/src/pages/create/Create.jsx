import IKmage from '../../components/image/Image';
import './create.css';
import useAuthStore from './../../store/authStore';
import { useNavigate } from 'react-router';
import { Fragment, useEffect, useRef, useState } from 'react';
import Editor from '../../components/editor/Editor';
import useEditorStore from '../../store/editorStore';
import axios from './../../api/index';

const Create = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const formRef = useRef();
  const { textOptions, canvasOptions } = useEditorStore();

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState({
    url: '',
    width: 0,
    height: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        setPreviewImage({
          url: image.src,
          width: image.width,
          height: image.height,
        });
      };
    }
  }, [file]);

  const previewImageURL = file ? URL.createObjectURL(file) : null;

  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append('file', file);
      formData.append('textOptions', JSON.stringify(textOptions));
      formData.append('canvasOptions', JSON.stringify(canvasOptions));

      try {
        const res = await axios.post('/pins', formData, {
          headers: {
            'Content-Type': 'mutlipart/form-data',
          },
        });
        // console.log(res);
        navigate(`/pin/${res.data._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='createPage'>
      <div className='createTop'>
        <h1>{isEditing ? 'Edit' : 'Create'} Pin</h1>
        <button onClick={handleSubmit}>{isEditing ? 'Done' : 'Publish'}</button>
      </div>

      {isEditing ? (
        <Editor previewImage={previewImage} />
      ) : (
        <div className='createBottom'>
          {previewImage.url ? (
            <div className='preview'>
              <img src={previewImage.url} />
              <div className='editIcon' onClick={() => setIsEditing(true)}>
                <IKmage path={'/general/edit.svg'} alt={''} />
              </div>
            </div>
          ) : (
            <Fragment>
              <label htmlFor='file' className='upload'>
                <div className='uploadTitle'>
                  <IKmage path={'/general/upload.svg'} alt={''} />
                  <span>Choose a file</span>
                </div>
                <div className='uploadInfo'>
                  We recommend using high quality .jpg files less than 200 MB.
                </div>
              </label>
              <input
                type='file'
                id='file'
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Fragment>
          )}
          <form className='createForm' ref={formRef}>
            <div className='createFormItem'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder='Add a title'
                name='title'
                id='title'
              />
            </div>

            <div className='createFormItem'>
              <label htmlFor='description'>Description</label>
              <textarea
                rows={6}
                type='text'
                placeholder='Add a description'
                name='description'
                id='description'
              />
            </div>

            <div className='createFormItem'>
              <label htmlFor='link'>Link</label>
              <input
                type='text'
                placeholder='Add a link'
                name='link'
                id='link'
              />
            </div>

            <div className='createFormItem'>
              <label htmlFor='board'>Board</label>
              <select name='board' id='board'>
                <option value={''}>Choose a board</option>
                <option value={'1'}>Board 1</option>
                <option value={'2'}>Board 2</option>
                <option value={'3'}>Board 3</option>
              </select>
            </div>

            <div className='createFormItem'>
              <label htmlFor='tags'>Tagged topics</label>
              <input type='text' placeholder='Add tags' name='tags' id='tags' />
              <small>Don&apos;t worry, people won&apos;t see your tags</small>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Create;
