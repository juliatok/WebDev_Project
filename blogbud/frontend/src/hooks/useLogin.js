import { useState } from 'react';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password}),
            });

            if (!response.ok) {
                throw new Error('Response not OK');
            }

            const user = await response.json();

            localStorage.setItem('token', user.token);

            setIsLoading(false);
            return true;
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return false;
        }
    };

    return { login, error, isLoading };
}
