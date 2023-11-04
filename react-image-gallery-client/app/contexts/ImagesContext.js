'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import useApiUrl from '../hooks/useApiUrl';
import axios from 'axios';
import { toast } from 'react-toastify';

const ImagesContext = createContext();

const ImagesContextProvider = ({children}) => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isHovering, setIsHovering] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState(1);
  const apiUrl = useApiUrl();


  // UseEffects to load images 
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}/api/v1/images?sorting=${sorting}`)
      .then((response) => {
        const sortedImages = response.data.sort((a, b) => {
          // Move featured images to the beginning
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
        setImages(sortedImages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error getting images:', error);
        
      });
  }, [apiUrl, sorting]);



  return <ImagesContext.Provider
   value={[
    images,
    setImages, 
    selectedImages, 
    setSelectedImages, 
    isHovering, 
    setIsHovering,
    isLoading,
    sorting,
    setSorting
    
  ]}
   >
    {children}
  </ImagesContext.Provider>
}

export const useImages = () =>  useContext(ImagesContext);

export default ImagesContextProvider