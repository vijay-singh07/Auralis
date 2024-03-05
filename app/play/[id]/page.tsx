

import getPlaylistById from "@/actions/getPlaylistById";
import getSongs from "@/actions/getSongs";
import PlaylistContent from "@/app/play/[id]/PlaylistContent";
import Header from "@/components/Header";



import PlaylistSongs from "./PlaylistSongs";
import getPlaylistSongs from "@/actions/getPlaylistSongs";
import PlaylistHeader from "@/components/PlaylistHeader";

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
            <PlaylistHeader data={data} id={data.id}/>
        </Header>
        <PlaylistSongs songs={playlistSongs}/>
        <PlaylistContent playlistId={data.id} songs={songs} />
    </div>
    )
}

export default Play;