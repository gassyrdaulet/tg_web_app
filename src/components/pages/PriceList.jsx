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

  const selectStyle = {
    option: (provided) => ({
      ...provided,
      fontSize: 12,
    }),
    menu: (provided) => ({
      ...provided,
      height: 30,
    }),
    menuList: (provided) => ({
      ...provided,
      height: 100,
      zIndex: 1000,
    }),
    control: () => ({
      display: "flex",
      maxWidth: 88,
      maxWHight: 38,
      fontSize: 11,
      background: "white",
      border: "1px solid #c0c0c0",
      borderRadius: "5px",
      cursor: "pointer",
    }),
    dropdownIndicatorStyles: () => ({}),
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
          <Select styles={selectStyle} />
          <Select styles={selectStyle} />
        </div>
      </div>
      <Prices data={prices} />
    </div>
  );
}
