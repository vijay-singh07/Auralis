"use client";

import Modal from './Modal'

import Button from './Button';
import { Playlist } from "@/types";
import PlaylistItem from './PlaylistItem';
import toast from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import usePlaylistModal from '@/hooks/usePlaylistModal';
import { useState } from 'react';
import uniqid from 'uniqid';
import usePlaylistOptionsModal from '@/hooks/usePlaylistOptionsModal';
import Input from './Input';




const PlaylistOptionsModal = ({
  
}) => {

  const [isLoading , setIsLoading] = useState(false);
    const playlistOptionsModal = usePlaylistOptionsModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
      register,
      handleSubmit,
      reset
    } = useForm<FieldValues>({
      defaultValues: {
        title: ''
      }
    })

    const onChange = (open: Boolean) => {
        if(!open){
            reset();
            playlistOptionsModal.onClose();
        }
    }

    const onSubmit:SubmitHandler<FieldValues> = async(values) => {
      try{
        setIsLoading(true);
        
        if (!user){
          toast.error("You must login");
          return;
        }
        router.refresh();
        setIsLoading(false);
        toast.success('Added this song to playlist');
        reset();
        playlistOptionsModal.onClose();
      } catch (error){
        toast.error("Something went wrong")
      } finally{
        setIsLoading(false);
      }
    }

 
  
  return (
    <Modal
    title='Add this song to a playlist'
    description='Below is the list of your playlists, chose one!'
    isOpen = {playlistOptionsModal.isOpen}
    onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='
      flex
      flex-col gap-y-4'>
        <select className='p-3 rounded-sm'>
          <option value="Playlist1">Playlist1</option>
          <option value="Playlist2">Playlist2</option>
          <option value="Playlist3">Playlist3</option>
          <option value="Playlist4">Playlist4</option>
        </select>
        <Button disabled={isLoading} type="submit">
          Add
        </Button>
      </form>
    </Modal>
  )
}

export default PlaylistOptionsModal