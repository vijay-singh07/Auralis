import React from 'react'
import { TbPlaylist} from "react-icons/tb"
import { AiOutlinePlus} from "react-icons/ai"
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { Playlist} from '@/types';
import usePlaylistModal from '@/hooks/usePlaylistModal';
import PlaylistItem from './PlaylistItem';

interface PlaylistProps{
    playlist: Playlist[]
}

const Playlist: React.FC<PlaylistProps> = ({
    playlist
}) => {

    const authModal = useAuthModal();
    const playlistModal = usePlaylistModal();
        const { user } = useUser();
    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }

        //todo: check subscription
        return playlistModal.onOpen();
    };

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
        <div className='
        flex
        flex-col
        gap-y-2
        mt-4
        px-2
        '>
         {playlist.map((item)=>(
                <PlaylistItem
                key={item.id}
                data={item}/>
            ))}
        </div>
    </div>
  )
}

export default Playlist