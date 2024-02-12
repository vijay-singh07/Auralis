import { Playlist} from "@/types";

import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import usePlaylist from "./usePlaylist";

const useOnPlaylistOpen = () => {
  const data = usePlaylist();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlaylistOpen = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    data.setId(id);
  }

  return onPlaylistOpen;
};

export default useOnPlaylistOpen;