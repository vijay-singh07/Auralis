"use client";
import { Song} from '@/types'
import React from 'react'
import Image from 'next/image'
import Button from '@/components/Button';
import useAddUserInfoModal from '@/hooks/useAddUserInfoModal';
import useAuthModal from '@/hooks/useAuthModal';
import useLoadProfileImage from '@/hooks/useLoadProfileImage';
import useGetUserDetails from '@/hooks/useGetUserDetails';
import Library from '@/components/Library';



interface ProfileContentProps{
    userId: string;
    songs: Song[];
}
const ProfileContent:React.FC<ProfileContentProps> = ({
    userId,
    songs,
}) => {

    const addUserModal = useAddUserInfoModal();
    const editProfile = () => {
        return addUserModal.onOpen();
    }
    const data =  useGetUserDetails(userId);
    const user = data.user;
    const image = useLoadProfileImage(user);

    
  return (
    <div className="mt-20">
                <div className="
                flex
                flex-col
                md:flex-row
                items-center
                gap-x-5">
                    <div className="
                    relative
                    h-32
                    w-32
                    lg:h-44
                    lg:w-44
                    bg-white
                    rounded-full">
                        <Image fill
                        src={image||'/images/profile.png'}
                        alt="profile image"
                        className="object-cover rounded-full"
                        />
                    </div>
                    <div className="
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    md:mt-0
                    ">
                        <p className="hidden md:block font-semibold text-sm">
                            {user?.full_name}
                        </p>
                        <h1 className="
                        text-white
                        text-4xl
                        sm:text-5xl
                        lg:text-2xl
                        font-bold">
                            {userId}
                        </h1>
                        <h1 className="
                        text-white
                        text-4xl
                        sm:text-5xl
                        lg:text-2xl
                        font-bold">
                            {user?.full_name || "Add Your Fullname"}
                        </h1>
                    </div>
                    <div className='
                    flex
                    ml-10
                    '>
                    <Button onClick={editProfile} className='bg-white
                        px-6
                        py-2'>
                        Edit Profile
                    </Button>
                    </div>
                </div>
                <div className='mt-10 flex flex-col'>
                    <h1 className='mt-5 text-2xl font-bold'>
                        Your contribution to Auralis
                    </h1>
                    <div className='mt-5 '>
                    <Library songs={songs}/>
                    </div>
                    
                </div>
            </div>
  )
}

export default ProfileContent