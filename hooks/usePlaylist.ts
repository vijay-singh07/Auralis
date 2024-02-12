import { create } from 'zustand';

interface PlaylistStore {
  id: string;
  activeId?: string;
  setId: (id: string) => void;
  reset: () => void;
}

const usePlaylist = create<PlaylistStore>((set) => ({
  id: '',
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  reset: () => set({ id: '', activeId: undefined })
}));

export default usePlaylist;