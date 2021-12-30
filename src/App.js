import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import useToken from "./auth/useToken";
import CreateHabit from "./pages/AddHabit/CreateHabit";
import Register from "./auth/Register";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    <Login setToken={setToken} />;
  }
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {token && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<CreateHabit />} />

            <Route path="/logout" element={<Logout />} />
          </>
        )}
        {!token && (
          <>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
