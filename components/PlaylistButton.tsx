
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline } from 'react-icons/io'
import { IoAddCircle } from 'react-icons/io5'

interface PlaylistButtonProps{
  playlistId: string;
  songId: string;

}

const PlaylistButton: React.FC<PlaylistButtonProps> = ({
  playlistId,
  songId
}) => {

  const router = useRouter();
    const { supabaseClient } = useSessionContext();


    const authModal = useAuthModal();

    const { user } = useUser();

    const [isAdded, setIsAdded] = useState(false);

    useEffect(()=>{
        if(!user?.id){
            return;
        }

        const fetchData = async () => {
            const {data, error} = await supabaseClient
            .from('playlist_songs')
            .select('*')
            .eq('user_id', user.id)
            .eq('song_id', songId)
            .eq('playlist_id', playlistId)
            .single()

            if(!error && data){
                setIsAdded(true);
            }
        };

        fetchData();
    },[songId, supabaseClient, user?.id])

    const Icon = isAdded ? IoMdAddCircleOutline : IoAddCircle;

    const handleAdd = async() => {
        if(!user){
            return authModal.onOpen();
        }

        if(isAdded){
            const {error} = await supabaseClient
            .from('playlist_songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songId)
            .eq('playlist_id', playlistId)

            if(error) {
                toast.error(error.message);
            }
            else{
                setIsAdded(false);
            }
        } else{
            const { error } = await supabaseClient
            .from('playlist_songs')
            .insert({
                song_id: songId,
                user_id: user.id,
                playlist_id: playlistId
            });

            if(error) {
                toast.error(error.message);
            }else {
                setIsAdded(true);
                toast.success('Added!');
            }
        }

        router.refresh();
    }
    
  return (
    <button
    onClick={handleAdd}
    className="
    cursor-pointer
    hover:opcaity-75
    transition">
        <Icon color = {isAdded? 'white' : 'zinc'} size={25}/>
        </button>
  )
}

export default PlaylistButton