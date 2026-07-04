import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

function MainLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <div className="layout">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className={`main-content ${
                    collapsed ? "collapsed" : ""
                }`}
            >

                {children}

            </main>

        </div>

    );
}

export default MainLayout;