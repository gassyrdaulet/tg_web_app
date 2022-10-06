import React, { useEffect, useState } from "react";
import cl from "./styles/pricelist.module.css";
import { getAllPrices } from "../../API/PricesService";
import Prices from "../Prices.jsx";
import Header from "../Header.jsx";
import MyCheckBox from "../UI/inputs/MyCheckBox";
import Select from "react-select";

export default function Pricelist() {
  const [prices, setPrices] = useState([]);

  const fetchPrices = async () => {
    try {
      setPrices(await getAllPrices("767355250"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div className={cl.PriceList}>
      <Header />
      <div className={cl.horizontaltwo}>
        <div className={cl.checkall}>
          <MyCheckBox />
          <p>Выбрать всё</p>
        </div>
        <div className={cl.sortselect}>
          <Select />
          <Select />
        </div>
      </div>
      <Prices data={prices} />
    </div>
  );
}
