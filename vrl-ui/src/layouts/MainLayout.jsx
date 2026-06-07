import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {

    return (
        <div
            style={{
                display: "flex"
            }}
        >
            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "20px"
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default MainLayout;