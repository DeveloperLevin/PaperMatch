// useFetch.js
import { useState, useRef } from "react";
import axios from "axios";

export const useFetch = () => {
  const [papers, setPapers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = async (url, query) => {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Abort any ongoing request
    }

    const newController = new AbortController();
    controllerRef.current = newController;

    try {
      setLoading(true);
      const res = await axios.post(url, { query: query }, {
        signal: newController.signal,
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      if (res.data.status !== "success") {
        throw new Error(res.data.message);
      } else {
        setPapers(res.data.ranked_papers);
        setError(null);
      }
    } catch (e) {
      if (e.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { papers, loading, error, fetchData };
};
