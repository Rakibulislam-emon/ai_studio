import { useState } from "react";
import { ImageContext } from "../context/ImageContext";
import useFetchData from "../hooks/useFetchData";

export default function ImageContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useFetchData(searchTerm);
  console.log('data:', data)
  return (
    <ImageContext.Provider
      value={{
        data,
        loading,
        error,
        setSearchTerm,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
