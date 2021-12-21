import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import useToken from "./auth/useToken";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    <Login setToken={setToken} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
