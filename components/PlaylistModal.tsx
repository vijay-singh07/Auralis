"use client";
import uniqid from "uniqid";
import useUploadModal from '@/hooks/useUploadModal'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import usePlaylistModal from "@/hooks/usePlaylistModal";

const PlaylistModal = () => {

  const [isLoading , setIsLoading] = useState(false);
    const playlistModal = usePlaylistModal();
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
            playlistModal.onClose();
        }
    }

    const onSubmit:SubmitHandler<FieldValues> = async(values) => {
      try{
        setIsLoading(true);

        const imageFile = values.image?.[0];

        const uniqueID = uniqid();
        
        if (!user){
          toast.error("You must login");
          return;
        }

        const {
          data: imageData,
          error: imageError,
        } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile,{
          cacheControl: '3600',
          upsert: false
        });

        if (imageError) {
          setIsLoading(false);
          return toast.error('Failed image Upload')
        }

        const {
          error: supabaseError
        } = await supabaseClient
        .from('playlist')
        .insert({
          user_id: user.id,
          title: values.title,
          image_path: imageData.path,
        });

        if(supabaseError) {
          setIsLoading(false)
          return toast.error(supabaseError.message)
        }

        router.refresh();
        setIsLoading(false);
        toast.success('PLaylist Created!');
        reset();
        playlistModal.onClose();
      } catch (error){
        toast.error("Something went wrong")
      } finally{
        setIsLoading(false);
      }
    }
  
  return (
    <Modal
    title='Add a Playlist'
    description='Add a new Playlist to your  Account'
    isOpen = {playlistModal.isOpen}
    onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='
      flex
      flex-col gap-y-4'>
        <Input
          id="title"disabled={isLoading}
          {...register('title', {required: true})}
          placeholder="Playlist Name"
        />
        <div>
          <div className='pb-1'>
            Select a Image
          </div>
          <Input
          id="image"
          type='file'
          disabled={isLoading}
          accept='image/*'
          {...register('image', {required: true})}
        />
        </div>
        
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default PlaylistModal