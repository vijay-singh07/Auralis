import React from 'react'
import { TbPlaylist} from "react-icons/tb"
import { AiOutlinePlus} from "react-icons/ai"
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { Playlist} from '@/types';
import usePlaylistModal from '@/hooks/usePlaylistModal';
import PlaylistItem from './PlaylistItem';
import useOnPlaylistOpen from '@/hooks/useOnPlaylistOpen';
import { useRouter } from "next/navigation";

interface PlaylistProps{
    playlist: Playlist[];
}

const Playlist: React.FC<PlaylistProps> = ({
    playlist,
}) => {
    const onPlaylistOpen = useOnPlaylistOpen();
    const authModal = useAuthModal();
    const playlistModal = usePlaylistModal();

    const router = useRouter();

        const { user } = useUser();
    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }

        //todo: check subscription
        return playlistModal.onOpen();
    };

    const OnClickPlaylistItem = (id: string) => {
        router.push(`/play/${id}`);
      // Call the onPlaylistOpen function
      onPlaylistOpen(id);
    }


  return (
    <div className='flex flex-col'>
        <div 
        className='
        flex
        items-center
        justify-between
        px-5
        py-4'>
            <div className='
            inline-flex
            items-center
            gap-x-2'>
                <TbPlaylist className='text-neutral-400' size={26}/>
                <p className='text-neutral-400
                font-medium
                text-md'>
                    your Playlists
                </p>
            </div>
            <AiOutlinePlus onClick= {onClick} size={20}
            className= "text-neutral-400 cursor-pointer hover:text-white transition"
            />
        </div>
        {user? (
        <div className='
        flex
        flex-col
        gap-y-2
        mt-4
        px-2
        '>
           
            {playlist.length < 1 ? (
            <p className='text-neutral-400'>No Playlists in Store. Add some by clicking on the plus button.</p>
          ) : (
         playlist.map((item)=>(
                <PlaylistItem
                onClick={OnClickPlaylistItem}
                href={`play/${item.id}`}
                key={item.id}
                data={item}/>
            ))
          )}
        </div>
        ):(
            <p className='px-2 text-neutral-400'>Please login to access your PLaylists</p>
        )}
    </div>
  )
}

export default Playlist