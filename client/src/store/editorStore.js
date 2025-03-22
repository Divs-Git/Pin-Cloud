import { create } from 'zustand';

const useEditorStore = create((set) => ({
  selectedLayer: 'canvas',
  textOptions: {
    text: '',
    fontSize: 48,
    color: '#000000',
    top: 0,
    left: 0,
  },
  canvasOptions: {
    height: 0,
    orientation: '',
    size: 'original',
    backgroundColor: '#452637',
  },
  setSelectedLayer: (newLayer) => set({ selectedLayer: newLayer }),
  setTextOptions: (newOptions) => set({ textOptions: newOptions }),
  addText: () =>
    set({
      textOptions: {
        text: 'Add Text',
        fontSize: 48,
        color: '#000000',
        top: 0,
        left: 0,
      },
    }),
  setCanvasOptions: (newOptions) => set({ canvasOptions: newOptions }),
}));

export default useEditorStore;
