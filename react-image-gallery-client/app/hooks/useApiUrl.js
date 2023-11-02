import React from 'react'

const useApiUrl = () => {
    let apiUrl;
    if (process.env.NODE_ENV == 'development') apiUrl = 'http://localhost:5000';
    else apiUrl = "https://react-image-gallery-server-pwli5ygbq-amdadullah-raihan.vercel.app"

    return apiUrl;
}

export default useApiUrl;