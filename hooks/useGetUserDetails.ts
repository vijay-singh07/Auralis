import { UserDetails } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast";


const useGetUserDetails
 = (id?: string) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserDetails | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if(!id){
            return;
        }

        setIsLoading(true);

        const fetchUser = async() =>{
            const { data, error} = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

            if(error){
                setIsLoading(false);
                return toast.error(error.message);
            }

            setUser(data as UserDetails);
            setIsLoading(false);
        }
        fetchUser();
    },[id, supabaseClient])

    return useMemo(() => ({
        isLoading,
        user
    }),[isLoading, user])
}

export default useGetUserDetails
