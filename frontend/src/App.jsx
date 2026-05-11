import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Skills from "./pages/JobSkills";
import Contacts from "./pages/Contacts";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contacts" element={<Contacts />} />

        </Routes>

        <Navbar />
        
      </Router>
    </>
  );
}

export default App;