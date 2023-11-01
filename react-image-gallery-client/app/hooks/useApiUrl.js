import React from 'react'

const useApiUrl = () => {
    let apiUrl;
    if (process.env.NODE_ENV == 'development') apiUrl = 'http://localhost:5000';
    else apiUrl = "http://localhost:5000"

    return apiUrl;
}

export default useApiUrl;