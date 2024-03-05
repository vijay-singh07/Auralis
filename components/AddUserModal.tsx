"use client";
import uniqid from "uniqid";
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useAddUserInfoModal from "@/hooks/useAddUserInfoModal";
import useGetUserDetails from "@/hooks/useGetUserDetails";


const AddUserModal = () => {

  const [isLoading , setIsLoading] = useState(false);
    const addUserModal = useAddUserInfoModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {
      register,
      handleSubmit,
      reset
    } = useForm<FieldValues>({
      defaultValues: {
        name: ''
      }
    })

    const onChange = (open: Boolean) => {
        if(!open){
            reset();
            addUserModal.onClose();
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
        .upload(`image-${values.fullname}-${uniqueID}`, imageFile,{
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
        .from('users')
        .update({
          full_name: values.full_name,
          avatar_url: imageData.path,
        })
        .eq('id', user.id);

        if(supabaseError) {
          setIsLoading(false)
          return toast.error(supabaseError.message)
        }

        router.refresh();
        setIsLoading(false);
        toast.success('User Details Updated!');
        reset();
        addUserModal.onClose();
      } catch (error){
        toast.error("Something went wrong")
      } finally{
        setIsLoading(false);
      }
    }
  
  return (
    <Modal
    title='Edit Your Profile'
    description='Add information to update your profile.'
    isOpen = {addUserModal.isOpen}
    onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='
      flex
      flex-col gap-y-4'>
        <Input
          id="full_name" disabled={isLoading}
          {...register('full_name', {required: true})}
          placeholder="Your Full Name"

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
          Update
        </Button>
      </form>
    </Modal>
  )
}

export default AddUserModal