import { BrowserRouter, Routes, Route } from "react-router-dom";

import Vendors from "./pages/Vendors";
import VendorForm from "./pages/VendorForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vendors />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/new" element={<VendorForm />} />
        <Route path="/vendors/edit/:id" element={<VendorForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;