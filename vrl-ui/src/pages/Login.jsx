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

            const result =
                await response.json();

            if (response.ok) {
                setError("");
                localStorage.setItem(
                    "token",
                    result.token);

                navigate("/vendors");
            }
            else {

                setError("Invalid Username or Password");
            }

        }
        catch (error) {

            console.error(error);
        }
    };

   return (

<div className="login-page">


<div className="login-left">

    <div className="brand-section">

        <h1 className="brand-logo">
            VRL
        </h1>

        <p className="brand-name">
            Vendor Risk Lens
        </p>

        <h2 className="brand-heading">
            Smarter Vendor Risk.
            <br />
            Stronger Business.
        </h2>

        <p className="brand-description">
            Identify, assess and mitigate
            vendor risks with AI-powered
            insights.
        </p>

    </div>

    <div className="dashboard-preview">

        <div className="preview-card">
            Risk Overview
        </div>

        <div className="preview-card">
            AI Insights
        </div>

        <div className="preview-card">
            Incidents
        </div>

    </div>

</div>

<div className="login-right">

    <div className="login-card">

        <h1 className="login-title">
            Welcome Back
        </h1>

        <p className="login-subtitle">
            Sign in to continue to VRL
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
                onChange={(e) =>
                    setPassword(e.target.value)}
            />

        </div>

        <button
            className="login-button"
            onClick={handleLogin}
        >
            Sign In
        </button>

    </div>

</div>


</div>

);

}

export default Login;