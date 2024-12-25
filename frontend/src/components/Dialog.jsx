import React from "react";

const Dialog = ({ text }) => {
  return (
    <div className="flex justify-center items-center p-4 w-full bg-gray-300">
        <span className="h-6 w-6 rounded-full">
            <img src="" alt="user-profile-picture"  />
        </span>
        <span>{ text }</span>
    </div>
  )
}

export default Dialog;