import ThemeToggle from "./ThemeToggle"
import darkColorLogo from "../assets/light-theme-fyp-logo-removebg-preview-scaled.png"
import lightColorLogo from "../assets/dark-theme-fyp-logo-removebg-preview-scaled.png"

const NavBar = () => {
    const condition = localStorage.getItem("theme") == "light";

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 inline-block">
      {/* Left: Logo and App Name */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {condition ? (
            <img
            src={darkColorLogo} // Replace with the path to your logo
            alt="dark-color-logo"
            className="h-8 w-8"
            />
        ) : (
            <img
            src={lightColorLogo} // Replace with the path to your logo
            alt="light-color-logo"
            className="h-8 w-8"
            />
        )}
        <span className="text-xl font-bold text-black dark:text-white">
          Research AI
        </span>
      </div>

      <div className="flex justify-center items-center flex-shrink-0 px-4">
        <div className="mr-8">
            <ThemeToggle />
        </div>

        <div className="flex items-center space-x-4 ml-4">
            { condition ? (
            <img
                src={darkColorLogo} // Replace with the path to the profile picture
                alt="default-profile"
                className="h-8 w-8 rounded-full"
            />
            ) : (
            <>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Sign Up</button>
            </>
            )}
        </div>
      </div>

    </nav>
  )
}

export default NavBar