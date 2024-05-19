// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
    }, []);

    return isAuthenticated;
};

export default useAuth;
