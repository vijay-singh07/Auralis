"use client";

import React from 'react'
import Image from "next/image";
import useLoadPlaylistImage from '@/hooks/useLoadPlaylistImage';
import { Playlist } from '@/types';

interface PlaylistHeaderProps{
    id: string;
    data: Playlist

}

const PlaylistHeader: React.FC<PlaylistHeaderProps> =  ({
    id,
    data,
}) => {
    const imageUrl = useLoadPlaylistImage(data);

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
                    lg:w-44">
                        <Image fill
                        src={ imageUrl||'/image/liked.png'}
                        alt="playlist"
                        className="object-cover"
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
                            Playlist
                        </p>
                        <h1 className="
                        text-white
                        text-4xl
                        sm:text-5xl
                        lg:text-7xl
                        font-bold">
                            {data.title}
                        </h1>
                    </div>
                </div>
            </div>
  )
}

export default PlaylistHeader