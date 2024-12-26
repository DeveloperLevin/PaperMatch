import React from "react";
import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import InputForm from "./InputForm";
import Dialog from "./Dialog";
import ResDialog from "./ResDialog";
import { v4 as uuidv4 } from "uuid"; 

const Main = () => {
    const [query, setQuery] = useState('');
    const { papers, loading, error, fetchData } = useFetch();  
    const [controller, setController] = useState(null);
    const [prevData, setPrevData] = useState([]);
    
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
        await fetchData("http://localhost:5000/api/recommend", query);
        // // store the previous chat history
        // setPrevData(prev => [...prev, {id: uuidv4() ,user: query, response: papers}]);
      };

    // Ensure that prevData is updated only when the data has been fetched
    useEffect(() => {
        if (papers && papers.length > 0) {
            setPrevData(prev => [...prev, { id: uuidv4(), user: query, response: papers }]);
        }
    }, [papers]); 
      
    return (
        <>
            <main className="mt-[69px] w-full h-full">
                <div className="w-full overflow-y-auto h-full p-4">

                    {/* Only render previous chat history if there's data */}
                    {prevData.length > 0 && prevData.map((data) => (
                        <>
                            {/* Render the query dialog (user input) */}
                            <div key={`query-${data.id}`} className="flex justify-end mr-4">
                                <Dialog query={data.user} />
                            </div>
                        
                            {/* Render the response dialog (papers related to the query) */}
                            {data.response && data.response.length > 0 && (
                                <div key={`response-${data.id}`} className="flex justify-start ml-4 mt-4">
                                    <ResDialog papers={data.response} />
                                </div>
                            )}
                        </>
                    ))}


                    {/* {papers && (
                        <>
                        <div className="flex justify-end mr-4">
                            <Dialog query={query} />
                        </div>
                        <div className="flex justify-start ml-4 mt-4">
                            <ResDialog papers={papers} />
                        </div>
                        </>
                    )} */}

                    {loading && <p className="text-center mt-4">Loading...</p>}
                    {error && <p className="text-center mt-4">Error: {error}</p>}

                </div>
            </main>
            <InputForm loading={loading} handleChange={handleChange} handleSubmit={handleSubmit} query={query}/>
        </>
    );
}

export default Main;