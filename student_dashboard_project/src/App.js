import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Syllabus from "./components/pages/Syllabus";
import Account from "./components/pages/Account";
import Login from "./auth/Login";
import { Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
