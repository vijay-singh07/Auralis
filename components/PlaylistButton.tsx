
import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

interface PlaylistButtonProps{
  onClick: () => void;

}

const PlaylistButton: React.FC<PlaylistButtonProps> = ({
  onClick
}) => {
    
  return (
    <button
    onClick={onClick}
    className="
    cursor-pointer
    hover:opcaity-75
    transition">
        <IoMdAddCircleOutline size={25}/>
        </button>
  )
}

export default PlaylistButton