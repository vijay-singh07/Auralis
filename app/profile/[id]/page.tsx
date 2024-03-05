
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import React from 'react'
import ProfileContent from './components/ProfileContent'
import useGetUserDetails from '@/hooks/useGetUserDetails'
import getSongsByUserId from '@/actions/getSongsByUserId';
import { useUser } from '@/hooks/useUser'
import HeaderProfile from '@/components/HeaderProfile'

interface ProfileProps {
    params: {
        id: string;
    }
};

export const revalidate = 0; 

const page:React.FC<ProfileProps> = async({params}) => {

    
    const songs = await getSongsByUserId();
    const userId = params.id;
    
    
    

  return (
    <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto">
        <HeaderProfile className={""}/>
        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">
              Your Profile
            </h1>
          </div>
          <ProfileContent userId={userId} songs={songs}/>
        </div>
    </div>
  )
}

export default page