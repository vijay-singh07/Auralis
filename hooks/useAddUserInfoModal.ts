import { create } from "zustand";

interface UserModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    id: string;
};

const useAddUserInfoModal = create<UserModalStore>((set)=> ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
    id: '',
}))

export default useAddUserInfoModal;