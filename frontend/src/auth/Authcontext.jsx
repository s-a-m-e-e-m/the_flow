import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { getMeLink } from "../links";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMe = async () => {
            try {
                setLoading(true);
                const response = await axios.get(getMeLink, {
                    withCredentials: true
                });
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}