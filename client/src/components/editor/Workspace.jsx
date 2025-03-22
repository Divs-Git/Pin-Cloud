import React, { useEffect, useRef } from 'react';
import useEditorStore from '../../store/editorStore';
import Image from '../image/Image';

const Workspace = ({ previewImage }) => {
  const {
    setSelectedLayer,
    textOptions,
    setTextOptions,
    canvasOptions,
    setCanvasOptions,
  } = useEditorStore();

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

  const itemRef = useRef(null);
  const itemContainer = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setSelectedLayer('text');
    isDragging.current = true;
    offset.current = {
      x: e.clientX - textOptions.left,
      y: e.clientY - textOptions.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) {
      return;
    }

    setTextOptions({
      ...textOptions,
      left: e.clientX - offset.current.x,
      top: e.clientY - offset.current.y,
    });
  };

  const handleMouseLeave = (e) => {
    isDragging.current = false;
  };

  const handleMouseUp = (e) => {
    isDragging.current = false;
  };

  return (
    <div className='workspace'>
      <div
        className='canvas'
        style={{
          height: canvasOptions.height,
          backgroundColor: canvasOptions.backgroundColor,
        }}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={itemContainer}
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
            onMouseDown={handleMouseDown}
            ref={itemRef}
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
