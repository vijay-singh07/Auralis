"use client";


import { Toaster } from"react-hot-toast"
import { BiColor } from "react-icons/bi";

const ToasterProvider = () => {
    return (
        <Toaster 
        toastOptions={{
            style: { 
            background: '#333',
            color: '#fff',
            }
        }
        }
        />
    )
}

export default ToasterProvider