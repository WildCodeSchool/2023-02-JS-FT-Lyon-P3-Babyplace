import { Route, Routes } from "react-router-dom";
import Requirements from "./components/Particuliers/Requirements/Requirements";
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
import Reservation from "./components/Particuliers/Reservation/Reservation";
import SelectChild from "./components/Particuliers/SelectChild/SelectChild";
import ReservationConfirm from "./components/Particuliers/ReservationConfirm/ReservationConfirm";
import NotificationPage from "./components/Particuliers/NotificationCenter/NotificationPage";
import { UserContextProvider } from "./contexts/UserContext";
import { ReservationContextProvider } from "./contexts/ReservationContext";

import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <ReservationContextProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ----------- Route Parent  ----------------- */}

            <Route path="/particulier" element={<Particulier />}>
              <Route index element={<Account />} />
              <Route path="recherche" element={<SearchList />} />
              <Route path="recherche/:id" element={<ProDetails />} />
              <Route path="recherche/:id/date" element={<DateChoice />} />
              <Route path="enregistrement" element={<FormParent />} />
              <Route
                path="enregistrement/bienvenue"
                element={<WelcomePage />}
              />
              <Route path="reservation" element={<Reservation />}>
                <Route index element={<Requirements />} />
                <Route path="enfant" element={<SelectChild />} />
                <Route path="confirmation" element={<ReservationConfirm />} />
              </Route>
              <Route path=":id" element={<FormCompletWelcome />} />
              <Route path=":id/enfant" element={<FormCompletChildren />} />
              <Route path=":id/parent" element={<FormCompletParent />} />
              <Route path="notifications" element={<NotificationPage />} />
            </Route>

            {/* ----------- Route RegisterPro  ----------------- */}

            <Route path="/pro-inscription" element={<ProRegister />} />

            {/* ----------- Route DashboardPro  ----------------- */}

            <Route path="/pro" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="calendrier" element={<Calendar />} />
              <Route path="reservations" element={<Orders />} />
              <Route path="authentification" element={<UserAuth />} />
              <Route path="modification" element={<ModifyData />} />
            </Route>
          </Routes>
        </div>
      </ReservationContextProvider>
    </UserContextProvider>
  );
}

export default App;
