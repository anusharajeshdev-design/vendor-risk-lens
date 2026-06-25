import {
    LuBuilding2,
    LuShieldCheck,
    LuChartColumn,
    LuSearch,
    LuTriangleAlert
} from "react-icons/lu";

import "./VendorNetwork.css";

function VendorNetwork() {

    const nodes = [

        {
            id: "vendor",
            x: 350,
            y: 170,
            icon: <LuBuilding2 />
        },

        {
            id: "analytics",
            x: 500,
            y: 90,
            icon: <LuChartColumn />
        },

        {
            id: "search",
            x: 650,
            y: 170,
            icon: <LuSearch />
        },

        {
            id: "shield",
            x: 400,
            y: 340,
            icon: <LuShieldCheck />
        },

        {
            id: "warning",
            x: 600,
            y: 340,
            icon: <LuTriangleAlert />
        }

    ];

    return (

        <div className="vendor-network">

            <div className="scan-beam"></div>

            <svg
                className="network-svg"
                viewBox="250 20 520 420"
            >

                <defs>

                    <radialGradient id="coreGlow">

                        <stop
                            offset="0%"
                            stopColor="#2563eb"
                        />

                        <stop
                            offset="100%"
                            stopColor="transparent"
                        />

                    </radialGradient>

                </defs>

                {/* LINKS */}

                {

                    nodes.map(node => (

                        <line

                            key={node.id}

                            className="link"

                            x1="500"
                            y1="220"

                            x2={node.x}
                            y2={node.y}

                        />

                    ))

                }

                {/* AI */}

                <circle
                    cx="500"
                    cy="220"
                    r="70"
                    className="core-glow"
                />

                <circle
                    cx="500"
                    cy="220"
                    r="78"
                    className="ring outer"
                />

                <circle
                    cx="500"
                    cy="220"
                    r="54"
                    className="ring middle"
                />

                <circle
                    cx="500"
                    cy="220"
                    r="34"
                    className="ring inner"
                />

                <circle
                    cx="500"
                    cy="220"
                    r="24"
                    className="ai-dot"
                />

                <text
                    x="500"
                    y="226"
                    className="ai-text"
                    textAnchor="middle"
                >

                    AI

                </text>

                {

                    nodes.map(node => (

                        <g

                            key={node.id}

                            className={`node ${node.id}`}

                        >

                            <circle

                                cx={node.x}

                                cy={node.y}

                                r="22"

                                className="node-circle"

                            />

                            <foreignObject

                                x={node.x - 12}

                                y={node.y - 12}

                                width="24"

                                height="24"

                            >

                                <div className="node-icon">

                                    {node.icon}

                                </div>

                            </foreignObject>

                        </g>

                    ))

                }

                {/* DATA */}

                <circle
                    r="5"
                    className="packet"
                >

                    <animateMotion

                        dur="4s"

                        repeatCount="indefinite"

                        path="M350 170 L500 220"

                    />

                </circle>

                <circle
                    r="5"
                    className="packet"
                >

                    <animateMotion

                        dur="5s"

                        begin="1s"

                        repeatCount="indefinite"

                        path="M500 220 L650 170"

                    />

                </circle>

                <circle
                    r="5"
                    className="packet"
                >

                    <animateMotion

                        dur="5s"

                        begin="2s"

                        repeatCount="indefinite"

                        path="M400 340 L500 220"

                    />

                </circle>

            </svg>

            <div className="floating-card compliance">

                <span>Compliance</span>

                <strong>96%</strong>

            </div>

            <div className="floating-card risk">

                <span>High Risk</span>

                <strong>3</strong>

            </div>

        </div>

    );

}

export default VendorNetwork;