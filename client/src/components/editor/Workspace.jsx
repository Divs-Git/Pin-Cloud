import React, { useEffect } from 'react';
import useEditorStore from '../../store/editorStore';
import Image from '../image/Image';

const Workspace = ({ previewImage }) => {
  const { textOptions, setTextOptions, canvasOptions, setCanvasOptions } =
    useEditorStore();

  useEffect(() => {
    if (canvasOptions.height === 0) {
      const canvasHeight = (375 * previewImage.height) / previewImage.width;

      setCanvasOptions({
        ...canvasOptions,
        height: canvasHeight,
        orientation: canvasHeight > 375 ? 'portrait' : 'landscape',
      });
    }
  }, [previewImage, canvasOptions, setCanvasOptions]);
  return (
    <div className='workspace'>
      <div
        className='canvas'
        style={{
          height: canvasOptions.height,
          backgroundColor: canvasOptions.backgroundColor,
        }}
      >
        <img src={previewImage.url} alt='' />
        {textOptions.text && (
          <div
            className='text'
            style={{
              left: textOptions.left,
              top: textOptions.top,
              fontSize: `${textOptions.fontSize}px`,
            }}
          >
            <input
              type='text'
              value={textOptions.text}
              onChange={(e) =>
                setTextOptions({ ...textOptions, text: e.target.value })
              }
              style={{ color: textOptions.color }}
            />

            <div
              className='deleteButton'
              onClick={() => setTextOptions({ ...textOptions, text: '' })}
            >
              <Image path={'/general/delete.svg'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
