"use client";

import {usePathname} from 'next/navigation';
import { useMemo } from 'react';
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi"
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Playlist, Song } from '@/types';
import PlaylistStore from './PlaylistStore';

interface SidebarProps {
    children: React.ReactNode;
    playlist: Playlist[];
    isLoading: boolean; 
    songs: Song[];
}



const Sidebar: React.FC<SidebarProps> = ({
    children,
    isLoading,
    playlist,
    songs
}) => {
    const pathname = usePathname();

    const routes = useMemo(()=> [{
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
    },
{
    icon: BiSearch,
    label: 'Search',
    href: '/search',
    active: pathname === '/search'
},
], [pathname]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
  return (
    <div className='flex h-full'>
        <div className='hidden md:flex
        flex-col gap-y-2
         bg-black h-full w-[300px] p-2'>
            <Box className=''>
                <div className='flex
                flex-col
                gap-y-4
                px-5
                py-4'>
                    {routes.map((item)=>(
                        <SidebarItem
                        key= {item.label}
                        {...item}
                        />
                    ))}
                </div>
            </Box>
            <Box   className="overflow-y-auto h-[400px]">
                <Library songs={songs}/>
            </Box>
            <Box   className="overflow-y-auto h-[400px]">
                <PlaylistStore playlist={playlist}/>
            </Box>
        </div>
        <main className='h-full flex-1 overflow-y-auto py-2'>
           {children}
        </main>
    </div>
  );
}


export default Sidebar;