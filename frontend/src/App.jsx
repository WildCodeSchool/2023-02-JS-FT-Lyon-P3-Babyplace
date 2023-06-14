import { Route, Routes } from "react-router-dom";
import Particulier from "./pages/Particulier";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/particulier" element={<Particulier />} />
        <Route path="/pro-register" element={<ProRegister />} />
        <Route path="/pro-dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
