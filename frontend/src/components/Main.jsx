import React from "react";
import { useState } from "react";
import { useFetch } from "./useFetch";
import InputForm from "./InputForm";


const Main = () => {
    const [query, setQuery] = useState('');
    const { papers, loading, error, fetchData } = useFetch();  
    const [controller, setController] = useState(null);
    
    const handleChange = (e) => {
        setQuery(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!query.trim()) {
          alert('Please enter a query!');
          return;
        }
    
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
            <main className="flex justify-center items-center w-full h-full">
                <div className="relative overflow-x-auto">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}

                    {papers && (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Publication Date</th>
                                    <th scope="col" className="px-6 py-3">Authors</th>
                                    <th scope="col" className="px-6 py-3">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {papers.map((paper, index) => (
                                    <tr key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-600">
                                        <td className="px-6 py-4"><a href={paper.metadata.link[0]}>{paper.metadata.title}</a></td>
                                        <td className="px-6 py-4">{paper.metadata.categories ? paper.metadata.categories.join(', ') : 'No categories available'}</td>
                                        <td className="px-6 py-4">{paper.metadata.published_date}</td>
                                        <td className="px-6 py-4">{paper.metadata.categories ? paper.metadata.authors.join(', ') : 'No authors available'}</td>
                                        <td className="px-6 py-4">{paper.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
            <InputForm loading={loading} handleChange={handleChange} handleSubmit={handleSubmit} query={query}/>
        </>
    );
}

export default Main;