
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import React from 'react'
import ProfileContent from './components/ProfileContent'
import useGetUserDetails from '@/hooks/useGetUserDetails'
import getSongsByUserId from '@/actions/getSongsByUserId';
import { useUser } from '@/hooks/useUser'

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
        <Header className={""}>
          <div className="mb-2">
            <h1 className=" text-white
            text-3xl
            font-semibold">
              Welcome Back
            </h1>
            <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4">
              <ListItem
              image= "/images/liked.png"
              name="Liked Songs"
              href="liked"
              />
            </div>
          </div>
        </Header>
        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">
              Newest Songs
            </h1>
          </div>
          <ProfileContent userId={userId} songs={songs}/>
        </div>
    </div>
  )
}

export default page