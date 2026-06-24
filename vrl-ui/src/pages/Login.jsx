import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {

        try {

            const response = await fetch(
                "http://localhost:5037/api/Auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                });

            const result = await response.json();

            if (response.ok) {

                setError("");

                localStorage.setItem(
                    "token",
                    result.token);

                localStorage.setItem(
                    "userId",
                    result.userId);

                localStorage.setItem(
                    "username",
                    result.username);

                localStorage.setItem(
                    "fullName",
                    result.fullName);

                localStorage.setItem(
                    "roleName",
                    result.roleName);

                navigate("/dashboard");
            }
            else {

                setError(
                    "Invalid username or password.");
            }
        }
        catch (error) {

            console.error(error);

            setError(
                "Unable to connect to server.");
        }
    };

    return (

        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-left">

                <div className="brand-section">
                    <h1 className="brand-logo">
                        VRL
                    </h1>

                    <p className="brand-name">
                        Vendor Risk Lens
                    </p>

                    <h2 className="brand-heading">
                        See Risk Clearly.
                        <br />
                        Manage Vendors Confidently.
                    </h2>

                    <p className="brand-description">

                        Centralize vendor assessments,
                        incident tracking, compliance monitoring
                        and risk intelligence in one unified
                        platform designed for modern enterprises.

                    </p>

                </div>

                <div className="feature-grid">

                    <div className="feature-card">
                        <h4>
                            Unified Risk View
                        </h4>

                        <p>
                            Monitor all vendors from a
                            single intelligent dashboard.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h4>
                            Proactive Alerts
                        </h4>

                        <p>
                            Identify potential issues
                            before they become incidents.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h4>
                            Smarter Assessments
                        </h4>

                        <p>
                            Streamline reviews with
                            AI-powered risk insights.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h4>
                            Strong Compliance
                        </h4>

                        <p>
                            Stay audit-ready with
                            continuous monitoring.
                        </p>
                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="login-right">

                <div className="login-card">

                    <h1 className="login-title">
                        Welcome Back
                    </h1>

                    <p className="login-subtitle">

                        Sign in to continue
                        to Vendor Risk Lens

                    </p>

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}

                    <div className="login-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            onChange={(e) =>
                                setUsername(e.target.value)}
                        />

                    </div>

                    <div className="login-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) =>
                                setPassword(e.target.value)}
                        />

                    </div>

                    <div className="login-options">

                        <label className="remember-me">

                            <input
                                type="checkbox"
                            />

                            Remember Me

                        </label>

                        <a
                            href="/"
                            className="forgot-password"
                        >
                            Forgot Password?
                        </a>

                    </div>

                    <button
                        className="login-button"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>

                    <div className="login-divider">

                        <span>
                            Secure Enterprise Access
                        </span>

                    </div>

                    <div className="login-footer">

                        Vendor Risk Lens © 2026

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;

