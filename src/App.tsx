import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { Zoom } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Orcamentos from "./pages/Orcamentos";
import Cargos from "./pages/Cargos";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/orcamentos"
          element={
            <PrivateRoute>
              <Orcamentos />
            </PrivateRoute>
          }
        />
        <Route path="/cargos" element={<Cargos />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
