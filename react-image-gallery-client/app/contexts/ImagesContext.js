'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import useApiUrl from '../hooks/useApiUrl';
import axios from 'axios';

const ImagesContext = createContext();

const ImagesContextProvider = ({children}) => {
  const [images, setImages] = useState([]);
  const apiUrl = useApiUrl();



  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/images`)
      .then((response) => {
        const sortedImages = response.data.sort((a, b) => {
          // Move featured images to the beginning
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
        setImages(sortedImages);

     
      })
      .catch((error) => {
        console.error('Error getting images:', error);
      });
  }, [apiUrl]);


  return <ImagesContext.Provider value={[images,setImages]}>
    {children}
  </ImagesContext.Provider>
}

export default ImagesContextProvider


export const useImages = () => {
    return useContext(ImagesContext);
}