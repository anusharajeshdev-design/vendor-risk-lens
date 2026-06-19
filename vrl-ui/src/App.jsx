import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Vendors from "./pages/Vendors";
import VendorForm from "./pages/VendorForm";
import Incidents from "./pages/Incidents";
import IncidentForm from "./pages/IncidentForm";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

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
        <Route path="/users"element={<ProtectedRoute><MainLayout><Users /></MainLayout></ProtectedRoute>}/>
        <Route path="/users/new" element={<ProtectedRoute><MainLayout><UserForm /></MainLayout></ProtectedRoute>}/>
        <Route path="/users/edit/:id" element={<ProtectedRoute><MainLayout><UserForm /></MainLayout></ProtectedRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;