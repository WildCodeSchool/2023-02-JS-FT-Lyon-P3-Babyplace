import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Particuliers from "./pages/Particuliers";
import Pro from "./pages/Pro";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pro" element={<Pro />} />
        <Route path="/particuliers" element={<Particuliers />} />
      </Routes>
    </div>
  );
}

export default App;
