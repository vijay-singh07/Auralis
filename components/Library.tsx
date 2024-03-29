import React from 'react'
import { TbPlaylist} from "react-icons/tb"
import { AiOutlinePlus} from "react-icons/ai"
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';

interface LibraryProps{
    songs: Song[]
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {

    const onPlay = useOnPlay(songs);
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
        const { user } = useUser();
    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }

        //todo: check subscription
        return uploadModal.onOpen();
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
                    your Library
                </p>
            </div>
            <AiOutlinePlus onClick= {onClick} size={20}
            className= "text-neutral-400 cursor-pointer hover:text-white transition"
            />
        </div>
        {user?(
        <div className='
        flex
        flex-col
        gap-y-2
        mt-4
        px-2
        '>{songs.length < 1 ? (
            <p className='text-neutral-400'>No songs in library. Add some by clicking on the plus button.</p>
          ) : (
            songs.map((item)=>(
                <MediaItem
                onClick={(id: string) => onPlay(id)}
                key={item.id}
                data={item}/>
            ))
          )}
        </div>
        ): (
            <p className='px-2 text-neutral-400'>Please login to access your Library</p>
        )}
    </div>
  )
}

export default Library