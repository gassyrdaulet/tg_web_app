import "./App.css";
import React, { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from "react-router-dom";
import PriceList from "./components/pages/PriceList";
import NewPriceForm from "./components/pages/NewPriceForm";
import EditPriceForm from "./components/pages/EditPriceForm";
import Error from "./components/pages/Error.jsx";
import { Navigate } from "react-router-dom";

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
        <Route path={"/error"} element={<Error />} />
        <Route path={"/*"} element={<Navigate to="/error"></Navigate>} />
      </Routes>
    </div>
  );
}

export default App;
