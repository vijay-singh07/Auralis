"use client";

import MediaItem from "@/components/MediaItem";
import PlayButton from "@/components/PlayButton";
import PlaylistButton from "@/components/PlaylistButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PlaylistContentProps{
    songs: Song[];
    playlistId: string;
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({
    songs,
    playlistId
}) => {

    const onPlay = useOnPlay(songs);
    const router = useRouter();
    const { isLoading, user } = useUser();

    useEffect(() => {
        if(!isLoading && !user){
            router.replace('/');
        }
    },[isLoading, user, router]);

    if(songs.length == 0){
        return (
            <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400">
                No Liked Songs.
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
    bg-black">
        <div className="text-3xl text-white mb-10">
            <h1>
                Choose Songs from the Library for your Playlist
            </h1>
        </div>
        {songs.map((song)=> (
            <div key={song.id}
            className="flex items-center gap-x-4 w-full">
                <div className="flex flex-1">
                    <MediaItem 
                    onClick = {(id: string) => onPlay(id)}
                    data={song}/>
                    <PlayButton/>
                </div>
                <PlaylistButton playlistId={playlistId} songId={song.id}/>
            </div>
        ))}
    </div>
  )
}

export default PlaylistContent