import { Route, Routes } from "react-router-dom";
import SearchList from "./components/Particuliers/SearchList/SearchList";
import ProDetails from "./components/Particuliers/ProDetails/ProDetails";
import ProRegister from "./pages/ProRegister";
import Dashboard from "./pages/Dashboard";
import Particulier from "./pages/Particulier";
import Home from "./pages/Home";
import Calendar from "./components/ProDashboard/Calendar/Calendar";
import Account from "./components/Particuliers/Account/Account";
import Orders from "./components/ProDashboard/Orders/Orders";
import UserAuth from "./components/ProDashboard/UserAuth/UserAuth";
import DashboardHome from "./components/ProDashboard/DashboardHome/DashboardHome";
import DateChoice from "./components/Particuliers/DateChoice/DateChoice";
import ModifyData from "./components/ProDashboard/ModifyData/ModifyData";
import FormParent from "./components/Particuliers/Form/FormParent";
import FormCompletChildren from "./components/Particuliers/FormComplet/FormCompletChildren";
import FormCompletParent from "./components/Particuliers/FormComplet/FormCompletParent";
import FormCompletWelcome from "./components/Particuliers/FormComplet/FormCompletWelcome";
import WelcomePage from "./components/Particuliers/WelcomePage/WelcomePage";
import { UserContextProvider } from "./contexts/UserContext";
import { UserInfoContextProvider } from "./contexts/UserInfoContext";

import "./App.css";

function App() {
  return (
    <UserInfoContextProvider>
      <UserContextProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/particulier" element={<Particulier />}>
              <Route index element={<Account />} />
              <Route path="recherche" element={<SearchList />} />
              <Route path="recherche/:id" element={<ProDetails />} />
              <Route path="recherche/:id/date" element={<DateChoice />} />
              <Route path="register" element={<FormParent />} />
              <Route path="register/welcome" element={<WelcomePage />} />
              <Route path=":id" element={<FormCompletWelcome />} />
              <Route path=":id/child" element={<FormCompletChildren />} />
              <Route path=":id/parent" element={<FormCompletParent />} />
            </Route>

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
    </UserInfoContextProvider>
  );
}

export default App;
