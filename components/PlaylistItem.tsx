"use client";

import Image from "next/image";

import { Playlist } from "@/types";
import useLoadPlaylistImage from "@/hooks/useLoadPlaylistImage";
import { useRouter } from "next/navigation";



interface PlaylistItemProps {
    data: Playlist;
    onClick?: (id: string) => void;
    href: string;
}
const PlaylistItem: React.FC<PlaylistItemProps> = ({
    data,
    onClick,
    href
}) => {
    
    const router = useRouter();
    const imageUrl = useLoadPlaylistImage(data);

    const handleClick = () => {
        router.push(href);
        if(onClick)
            return onClick(data.id);
    };
  return (

    <div
    onClick={handleClick}
    className="
    flex
    items-center
    gap-x-3
    cursor-pointer
    transition
    ease-in
    hover:scale-105
    w-full
    bg-gradient-to-r
    from-black
    to-white
    p-2
    rounded-md">
        <div 
        className="
        relative
        rounded-md
        min-h-[48px]
        min-w-[48px]
        overflow-hidden">
            <Image
            fill
            src={imageUrl || '/image/liked.png'}
            alt="Media Item"
            className="object-cover"
            />
        </div>
        <div className="
        flex
        flex-col
        gap-y-1
        overflow-hidden
        ">
            <p className="text-white truncate">
                {data.title}
            </p>
        </div>
    </div>
  )
}

export default PlaylistItem