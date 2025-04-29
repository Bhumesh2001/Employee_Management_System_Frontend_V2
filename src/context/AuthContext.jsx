import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../utils/apiInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // for auth check

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiInstance.get('/auth/profile');
                if (response.data?.data) {
                    const { email, name, role } = response.data.data
                    setUser({ email, name, role });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error?.response?.data || error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const login = async (userData) => {
        try {
            const response = await apiInstance.post('/auth/login', {
                email: userData.email,
                password: userData.password,
                role: userData.role,
            });

            const { email, name, role } = response.data.data;
            setUser({ email, name, role });

            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'employee') {
                navigate('/employee');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error?.response?.data || error.message);
        }
    };

    const logout = async (role) => {
        try {
            await apiInstance.post('/auth/logout', { role });
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error?.response?.data || error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
