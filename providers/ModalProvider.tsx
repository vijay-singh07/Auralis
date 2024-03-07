"use client";

import AddUserModal from "@/components/AddUserModal";
import AuthModal from "@/components/AuthModal";
import Modal from "@/components/Modal";
import PlaylistModal from "@/components/PlaylistModal";
import PlaylistOptionsModal from "@/components/PlaylistOptionsModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }
    return (
        <>
        <AuthModal/>
        <UploadModal/>
        <PlaylistModal/>
        <PlaylistOptionsModal/>
        <AddUserModal/>
        </>
    )
}

export default ModalProvider;