import "./VrlLogo.css";

function VrlLogo() {

    return (

        <div className="vrl-logo">

            {/* Moving Lens */}

            <div className="lens-wrapper">

                <div className="lens">

                    <div className="lens-glass">

                        {/* Scan Beam */}

                        <div className="scan-line"></div>

                        {/* AI Core */}

                        <div className="ai-core">

                            AI

                            <span className="orbit orbit1"></span>
                            <span className="orbit orbit2"></span>
                            <span className="orbit orbit3"></span>

                        </div>

                    </div>

                    <div className="lens-handle"></div>

                </div>

            </div>

            {/* Logo Text */}

            <div className="logo-text">

                <h1>

                    <span className="letter letter-v">

                        V

                    </span>

                    <span className="letter letter-r">

                        R

                    </span>

                    <span className="letter letter-l">

                        L

                    </span>

                </h1>

                <p>

                    Vendor Risk Lens

                </p>

            </div>

        </div>

    );

}

export default VrlLogo;