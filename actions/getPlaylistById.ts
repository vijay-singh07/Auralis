import { Playlist } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";


const getPlaylistById = async (id: string): Promise<Playlist> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if(!id){
        console.log("No id found")
    }

    const { data, error } = await supabase 
    .from('playlist')
    .select('*')
    .eq('id', id)
    .single();

    if(error) {
        console.log(error.message)
    }

    return (data as any);
}

export default getPlaylistById;