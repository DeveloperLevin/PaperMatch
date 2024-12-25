 import React from "react";

const ResDialog = () => {
  return (
    <div>
        <img src={localStorage.getItem("theme") == 'light'? '../assets/dark-theme-fyp-logo-removebg-preview-scaled.png' : '../assets/light-theme-fyp-logo-removebg-preview-scaled.png'} alt="bot-profile-picture" />
    </div>
  )
}

export default ResDialog