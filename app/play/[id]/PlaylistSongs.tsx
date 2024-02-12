"use client";

import MediaItem from '@/components/MediaItem';
import PlayButton from '@/components/PlayButton';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/types';
import React, { useEffect } from 'react'


interface PlaylistSongsProps{
    songs: Song[];
}


const PlaylistSongs: React.FC<PlaylistSongsProps> = ({songs}) => {
    const onPlay = useOnPlay(songs);

   

    if(songs.length == 0){
        return (
            <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400">
                No songs in This Playlist.
            </div>
        )
    }

  return (
    <div className="
    flex
    flex-col
    gap-y-2
    w-full
    p-6
    border-solid border-y-2">
        <div className='flex flex-col pl-2 mb-5 text-3xl text-white w-full'>
            <h1>
                Songs in this Playlist
            </h1>
        </div>
        {songs.map((song)=> (
            <div key={song.id}
            className="flex items-center gap-x-4 w-full ">
                <div className="flex flex-1">
                    <MediaItem 
                    onClick = {(id: string) => onPlay(id)}
                    data={song}/>
                    <PlayButton/>
                </div>
            </div>
        ))}
    </div>
  )
}

export default PlaylistSongs