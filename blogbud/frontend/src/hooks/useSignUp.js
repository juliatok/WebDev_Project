import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (username, email, password ) => {
        setIsLoading(true);
        setError(null);
    
        const response = await fetch('http://localhost:3001/api/users/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password}),
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

    return { signup, error, isLoading };
}
