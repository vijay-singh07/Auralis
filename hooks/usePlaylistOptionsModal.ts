import { create } from "zustand";

interface PlaylistOptionsModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const usePlaylistOptionsModal = create<PlaylistOptionsModalStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}))

export default usePlaylistOptionsModal;