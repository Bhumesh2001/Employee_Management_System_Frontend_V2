import React from "react";
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const { login } = useAuth();  // Use the login function from context
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = () => {
        if (!email || !password || !role) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        console.log('Login attempt with:', { email, password, role });
        login({ email, password, role });
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="col-11 col-sm-8 col-md-6 col-lg-4 bg-white p-4 rounded shadow">
                <h2 className="text-center mb-4">Login</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="role" className="form-label fw-bold">
                        Role
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select a role</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    onClick={handleLogin}
                    className="btn btn-primary w-100 mb-3"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default LoginForm;