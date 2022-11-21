import React, { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PriceList from "./components/pages/PriceList.jsx";
import NewPriceForm from "./components/pages/NewPriceForm.jsx";
import EditPriceForm from "./components/pages/EditPriceForm.jsx";
import Error from "./components/pages/Error.jsx";
import RegistrationPage from "./components/pages/RegistrationPage.jsx";
import UserSettingsPage from "./components/pages/UserSettingsPage.jsx";
import "./App.css";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<PriceList />} />
        <Route path={"/new"} element={<NewPriceForm />} />
        <Route path={"/edit/:id"} element={<EditPriceForm />} />
        <Route path={"/register"} element={<RegistrationPage />} />
        <Route path={"/settings"} element={<UserSettingsPage />} />
        <Route path={"/error"} element={<Error />} />
        <Route path={"/*"} element={<Navigate to="/error"></Navigate>} />
      </Routes>
    </div>
  );
}

export default App;
