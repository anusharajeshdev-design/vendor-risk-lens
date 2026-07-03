import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import VendorNetwork from "../components/VendorNetwork";
import VrlLogo from "../components/Logo/VrlLogo";
import { FiEye, FiEyeOff, FiShield, FiActivity } from "react-icons/fi";
import { Sparkles } from "lucide-react";
function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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

        <VrlLogo />

        <h1 className="brand-heading">

            See Risk Clearly.
            <br />
            Manage Vendors.
            <br />
            Confidently.

        </h1>

        <p className="brand-description">

            Enterprise-grade vendor risk management powered by AI,
            continuous compliance monitoring and intelligent incident
            management.

        </p>

        <div className="quick-features">

            <div className="quick-feature-card">

                <div className="quick-feature-icon">
                    <Sparkles size={18}/>
                </div>

                <h4>AI Powered</h4>

                <p>Intelligent Analysis</p>

            </div>

            <div className="quick-feature-card">

                <div className="quick-feature-icon">
                    <FiShield size={18}/>
                </div>

                <h4>Compliance</h4>

                <p>Governance</p>

            </div>

            <div className="quick-feature-card">

                <div className="quick-feature-icon">
                    <FiActivity size={18}/>
                </div>

                <h4>Risk Monitor</h4>

                <p>Live Vendor Health</p>

            </div>

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

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword
                                        ? <FiEyeOff />
                                        : <FiEye />
                                }
                            </button>

                        </div>

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

