import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistSongs = async (id: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const {data, error} = await supabase
    .from('playlist_songs')
    .select('*,songs(*)')
    .eq('user_id', session?.user?.id)
    .eq('playlist_id', id )
    .order('created_at', { ascending: false});

    if(error){
        console.log(error)
        return [];
    }

    if(!data) {
        return [];
    }

    return data.map((item) => ({
        ...item.songs
    }));
}

export default getPlaylistSongs;