import { useEffect, useState, useRef } from "react";

export default function useFetchData(searchTerm) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // Keep track of current URLs to revoke on cleanup
  const urlsRef = useRef([]);

  useEffect(() => {
    if (!searchTerm) {
      // revoke previous URLs
      urlsRef.current.forEach(url => URL.revokeObjectURL(url));
      urlsRef.current = [];

      setData([]);
      return;
    }

    let isCancelled = false; // to ignore outdated fetches

    setLoading(true);
    setError(null);

    async function getData() {
      try {
        // revoke old URLs before fetching new
        urlsRef.current.forEach(url => URL.revokeObjectURL(url));
        urlsRef.current = [];

        const imagePromises = Array(9).fill().map(async (_, index) => {
          const response = await fetch(
            `https://image.pollinations.ai/prompt/${encodeURIComponent(searchTerm)}?seed=${index}&enhance=true`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return url;
        });

        const imageUrls = await Promise.all(imagePromises);

        if (!isCancelled) {
          urlsRef.current = imageUrls;  // save for cleanup later
          setData(imageUrls);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Fetch error:", error);
          setError(error.message || "Something went wrong");
          setData([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    getData();

    return () => {
      isCancelled = true;
      urlsRef.current.forEach(url => URL.revokeObjectURL(url));
      urlsRef.current = [];
    };
  }, [searchTerm]);

  return { data, error, loading };
}
