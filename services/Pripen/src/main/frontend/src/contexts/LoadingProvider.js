import React, { createContext, useState } from 'react';
import LoadingPage from '../components/LoadingPage/LoadingPage';

export const LoadingContext = createContext({ isLoading: false, setIsLoading: () => {} });


const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            {isLoading && <LoadingPage />}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;
