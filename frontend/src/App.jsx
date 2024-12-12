import './App.css';
import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import NavBar from './components/NavBar';
import { useFetch } from './components/useFetch';  

function App() {
  const [query, setQuery] = useState('');
  const { papers, loading, error, fetchData } = useFetch();  
  const [controller, setController] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the query is empty or not before sending the request
    if (!query.trim()) {
      alert('Please enter a query!');
      return;
    }

    // If a previous request is ongoing, abort it before making a new one
    if (controller) {
      controller.abort();  
    }

    const newController = new AbortController();
    setController(newController);  

    // Call the fetchData function passed from useFetch with the query
    fetchData("http://localhost:5000/api/recommend", query);
  };

  return (
    <>
      <NavBar />
      
      <main className="flex justify-center items-center">
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          {papers && (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Summary</th>
                  <th>Category</th>
                  <th>Publication Date</th>
                  <th>Authors</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((paper, index) => (
                  <tr key={index}>
                    <td><a href={paper.metadata.link[0]}>{paper.metadata.title}</a></td>
                    <td>{paper.metadata.summary}</td>
                    <td>{paper.metadata.categories ? paper.metadata.categories.join(', ') : 'No categories available'}</td>
                    <td>{paper.metadata.published_date}</td>
                    <td>{paper.metadata.categories ? paper.metadata.authors.join(', ') : 'No authors available'}</td>
                    <td>{paper.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 p-2 w-full">
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="flex justify-between items-center px-4 bg-white rounded-md border border-slate-950 w-full">
            <input
              id="input-text"
              onChange={handleChange}
              type="text"
              placeholder={loading ? "Loading..." : "What kind of papers do you like?"}
              disabled={loading}
              value={query || ''} // Prevent null value for the input field
              className="text-sm p-4 bg-white outline-none text-black w-full"
            />
            <button
              type="submit"
              className="mr-4 p-2 rounded-full bg-gray-200 border border-slate-900 text-black"
              disabled={loading}
            >
              <FaArrowUp />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
