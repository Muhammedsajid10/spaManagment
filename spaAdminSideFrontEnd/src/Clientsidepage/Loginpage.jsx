// LoginPage.jsx
import React, { useState } from 'react';
import './Loginpage.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login submitted:', formData);
        // Handle login logic here
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <div className="brand-content">
                    <h1 className="brand-title">Allora</h1>
                    <p className="brand-subtitle">The most popular media centre</p>
                    <button className="read-more-btn">Read More</button>
                </div>
            </div>
            
            <div className="right-section">
                <div className="login-form-container">
                    <div className="form-header">
                        <h2 className="form-title">Hello Again!</h2>
                        <p className="form-subtitle">Welcome Back</p>
                    </div>
                    
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                        
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        
                        <a href="#" className="forgot-password">
                            Forgot Password
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;