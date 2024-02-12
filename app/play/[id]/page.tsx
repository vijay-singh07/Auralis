

import getPlaylistById from "@/actions/getPlaylistById";
import getSongs from "@/actions/getSongs";
import PlaylistContent from "@/app/play/[id]/PlaylistContent";
import Header from "@/components/Header";


import Image from "next/image";
import PlaylistSongs from "./PlaylistSongs";
import getPlaylistSongs from "@/actions/getPlaylistSongs";




interface PlayProps {
    params: {
        id: string;
    }
};

export const revalidate = 0; 

const Play: React.FC<PlayProps> = async ({ params}) => {
    const data =  await getPlaylistById(params.id);

    const playlistSongs =  await getPlaylistSongs(params.id);

    const songs = await getSongs();


    return (
        <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto">
        <Header  className={""}>
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
                        src="/images/liked.png"
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
        </Header>
        <PlaylistSongs songs={playlistSongs}/>
        <PlaylistContent playlistId={data.id} songs={songs} />
    </div>
    )
}

export default Play;