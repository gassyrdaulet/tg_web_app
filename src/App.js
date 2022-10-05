import "./App.css";
import React, { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import PriceList from "./components/pages/PriceList";
import NewPriceForm from "./components/pages/NewPriceForm";

function App() {
  const { tg, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<PriceList />} />
        <Route path={"new"} element={<NewPriceForm />} />
      </Routes>
    </div>
  );
}

export default App;
