import React from "react";
import defaultProfile from "../assets/default-profile.jpg"

const Dialog = ({ query }) => {
  return (
    <div className="flex justify-center space-x-4 items-center p-4 rounded-full bg-zinc-700 mr-4">
        <span>{ query }</span>
        <span className="h-6 w-6 rounded-full">
            <img src={defaultProfile} className="rounded-full h-6 w-6" alt="user-profile-picture"  />
        </span>
        
    </div>
  )
}

export default Dialog;