import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Assuming you're using react-icons

const InputForm = () => {
  const [query, setQuery] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value)
    console.log(query)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-200 p-4">
      <form className="flex justify-center items-center mx-auto w-full max-w-sm p-2 border border-red rounded-md space-x-4">
        <input
          onChange={handleChange}
          type="text"
          placeholder="What kind of papers do you like?"
          className="w-full p-2 bg-gray-200 text-sm outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-white border border-black text-sm"
        >
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
};

export default InputForm;
