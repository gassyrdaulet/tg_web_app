import React, { useEffect, useMemo, useState } from "react";
import cl from "./styles/pricelist.module.css";
import { getAllPrices } from "../../API/PricesService";
import Prices from "../Prices.jsx";
import Header from "../Header.jsx";
import MyCheckBox from "../UI/inputs/MyCheckBox";
import Select from "react-select";
import { useInput } from "../../hooks/useInput.js";

export default function Pricelist() {
  const [prices, setPrices] = useState([]);
  const [checkedPrices, setCheckedPrices] = useState([]);
  const [markAll, setMarkAll] = useState(false);
  const [markedSum, setMarkedSum] = useState(0);
  const search = useInput("", { noValidations: true }, "text");

  const fetchPrices = async () => {
    try {
      setPrices(await getAllPrices("767355250"));
    } catch (e) {
      console.log(e);
    }
  };
  const handleMarkAll = (checked) => {
    setMarkAll(checked);
    const temp = [];
    for (let i in prices) {
      temp[i] = checked;
    }
    setCheckedPrices(temp);
  };
  const markCheck = (index, check) => {
    const temp = [...checkedPrices];
    temp[index] = check;
    setCheckedPrices(temp);
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
  useEffect(() => {
    const temp = [];
    for (let i in prices) {
      temp[i] = false;
    }
    setCheckedPrices(temp);
  }, [prices]);
  useEffect(() => {
    let temp = 0;
    let isThereFalse = false;
    for (let i in checkedPrices) {
      if (checkedPrices[i] === false) {
        isThereFalse = true;
      } else {
        temp++;
      }
      isThereFalse ? setMarkAll(false) : setMarkAll(true);
      setMarkedSum(temp);
    }
  }, [checkedPrices]);
  const filteredPrices = useMemo(() => {
    console.log(search.props.value);
    try {
      const temp = [...prices].filter((price) => {
        price.model.toLowerCase().includes(search.props.value.toLowerCase());
      });
      return temp;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [search.props.value, prices]);

  return (
    <div className={cl.PriceList}>
      <Header
        searchValue={search.props.value}
        setSearchValue={search.props.onChange}
      />
      <div className={cl.horizontaltwo}>
        <div className={cl.checkall}>
          <MyCheckBox
            checked={markAll}
            onChange={(e) => handleMarkAll(e.target.checked)}
          />
          <p>Выбрать всё</p>
        </div>
        <div className={cl.sortselect}>
          <Select styles={selectStyle} />
          <Select styles={selectStyle} />
        </div>
      </div>
      <Prices
        markCheck={markCheck}
        checkedPrices={checkedPrices}
        data={filteredPrices}
        markedSum={markedSum}
      />
    </div>
  );
}
