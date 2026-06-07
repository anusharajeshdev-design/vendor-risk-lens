import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Vendors from "./pages/Vendors";
import VendorForm from "./pages/VendorForm";
import Incidents from "./pages/Incidents";
import IncidentForm from "./pages/IncidentForm";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/vendors" element={ <ProtectedRoute><MainLayout><Vendors /></MainLayout></ProtectedRoute>} />
        <Route path="/vendors/new" element={ <ProtectedRoute><MainLayout><VendorForm /></MainLayout></ProtectedRoute>} />
        <Route path="/vendors/edit/:id" element={ <ProtectedRoute><MainLayout><VendorForm /></MainLayout></ProtectedRoute> }/>
        <Route path="/incidents" element={ <ProtectedRoute><MainLayout><Incidents /></MainLayout></ProtectedRoute>} />
        <Route path="/incidents/new" element={ <ProtectedRoute><MainLayout><IncidentForm /></MainLayout></ProtectedRoute>} />
        <Route path="/incidents/edit/:id" element={ <ProtectedRoute><MainLayout><IncidentForm /></MainLayout></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;