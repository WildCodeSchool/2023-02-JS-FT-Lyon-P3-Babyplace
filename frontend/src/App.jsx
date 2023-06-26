import { Route, Routes } from "react-router-dom";
import SearchList from "./components/Particuliers/SearchList/SearchList";
import ProDetails from "./components/Particuliers/ProDetails/ProDetails";
import ProRegister from "./pages/ProRegister";
import Dashboard from "./pages/Dashboard";
import Particulier from "./pages/Particulier";
import Home from "./pages/Home";
import Calendar from "./components/ProDashboard/Calendar/Calendar";
import Orders from "./components/ProDashboard/Orders/Orders";
import UserAuth from "./components/ProDashboard/UserAuth/UserAuth";
import DashboardHome from "./components/ProDashboard/DashboardHome/DashboardHome";
import DateChoice from "./components/Particuliers/DateChoice/DateChoice";
import ModifyData from "./components/ProDashboard/ModifyData/ModifyData";
import FormParent from "./components/Particuliers/Form/FormParent";
import { UserContextProvider } from "./contexts/UserContext";

import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/particulier/recherche/:id" element={<ProDetails />} />
          <Route
            path="/particulier/recherche/:id/date"
            element={<DateChoice />}
          />
          <Route path="/particulier/recherche" element={<SearchList />} />
          <Route path="/particulier" element={<Particulier />} />
          <Route path="/particulier-register" element={<FormParent />} />
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
    </UserContextProvider>
  );
}

export default App;
