import { BrowserRouter, Routes, Route } from "react-router-dom";

import Vendors from "./pages/Vendors";
import VendorForm from "./pages/VendorForm";
import Incidents from "./pages/Incidents";
import IncidentForm from "./pages/IncidentForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vendors />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/new" element={<VendorForm />} />
        <Route path="/vendors/edit/:id" element={<VendorForm />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/incidents/new" element={<IncidentForm />} />
        <Route path="/incidents/edit/:id" element={<IncidentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;