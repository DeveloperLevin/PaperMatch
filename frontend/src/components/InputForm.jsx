import React from "react";
import { FaArrowUp } from "react-icons/fa";

const InputForm = ({ loading, handleChange, handleSubmit, query }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-2 w-full bg-zinc-800 border-none">
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
            <div className="min-w-[400px] flex justify-between items-center px-4 bg-zinc-700 rounded-lg w-[500px]">
                <input
                    id="input-text"
                    onChange={handleChange}
                    type="text"
                    placeholder={loading ? "Loading..." : "What kind of papers do you like?"}
                    disabled={loading}
                    value={query || ''} 
                    className="text-sm p-4 bg-zinc-700 focus:bg-zinc-700 outline-none text-white w-full" />
                <button
                    type="submit"
                    className="mr-4 p-2 rounded-full bg-gray-300 text-black hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={loading}>
                    <FaArrowUp />
                </button>
            </div>
        </form>
    </div>
    );
}

export default InputForm;