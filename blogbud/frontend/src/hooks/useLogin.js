import { useState } from 'react';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch('http://localhost:3001/api/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password}),
        });
        const user = await response.json();
    
        if (!response.ok) {
            setError(user.message);
            setIsLoading(false);
            return false;
        }
    
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsLoading(false);
        return true;
    };

    return { login, error, isLoading };
}
