import { Route, Routes } from "react-router-dom";
import Particulier from "./pages/Particulier";
import ProRegister from "./pages/ProRegister";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Calendar from "./components/ProDashboard/Calendar/Calendar";
import Orders from "./components/ProDashboard/Orders/Orders";
import UserAuth from "./components/ProDashboard/UserAuth/UserAuth";
import DashboardHome from "./components/ProDashboard/DashboardHome/DashboardHome";
import ModifyData from "./components/ProDashboard/ModifyData/ModifyData";
import { UserContextProvider } from "./contexts/UserContext";
import { ModalContextProvider } from "./contexts/ModalContext";

import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <ModalContextProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/particulier" element={<Particulier />} />
            <Route path="/pro-register" element={<ProRegister />} />
            <Route path="/pro" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="orders" element={<Orders />} />
              <Route path="authentification" element={<UserAuth />} />
              <Route path="modify" element={<ModifyData />} />
            </Route>
          </Routes>
        </div>
      </ModalContextProvider>
    </UserContextProvider>
  );
}

export default App;
