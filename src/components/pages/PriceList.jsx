import React, { useEffect, useMemo, useState } from "react";
import cl from "./styles/pricelist.module.css";
import { getAllPrices } from "../../API/PricesService";
import Prices from "../Prices.jsx";
import Header from "../Header.jsx";
import MyCheckBox from "../UI/inputs/MyCheckBox";
import Select from "react-select";
import ButtonRound from "../UI/buttons/ButtonRound.jsx";

export default function Pricelist() {
  const [prices, setPrices] = useState([]);
  const [checkedPrices, setCheckedPrices] = useState({});
  const [markAll, setMarkAll] = useState(false);
  const [markedSum, setMarkedSum] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [fixedButtonsShown, setFixedButtonsShown] = useState(false);

  const fetchPrices = async () => {
    try {
      setPrices(await getAllPrices("767355250"));
    } catch (e) {
      console.log(e);
    }
  };
  const handleMarkAll = (checked) => {
    setMarkAll(checked);
    const temp = {};
    for (let i of filteredPrices) {
      temp[i.id] = checked;
    }
    setCheckedPrices(temp);
  };
  const markCheck = (id, check) => {
    const temp = { ...checkedPrices };
    temp[id] = check;
    setCheckedPrices(temp);
  };
  const handleSearchChange = (value) => {
    if (value.length > 27) {
      return;
    }
    setMarkAll(false);
    const temp = value
      .replace(/[^0-9а-яa-z\s\.\,\/\-\+]/gi, "")
      .substring(0, 50);
    setSearchInput(temp);
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

  const filteredPrices = useMemo(() => {
    try {
      const temp = [...prices].filter((price) => {
        return (
          price.model.toLowerCase().includes(searchInput.toLowerCase()) ||
          (price.id + "").toLowerCase().includes(searchInput.toLowerCase()) ||
          price.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
          price.suk.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      return temp;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [searchInput, prices]);

  useEffect(() => {
    fetchPrices();
  }, []);
  useEffect(() => {
    const temp = {};
    for (let i of filteredPrices) {
      temp[i.id] = false;
    }
    setCheckedPrices(temp);
  }, [filteredPrices]);
  useEffect(() => {
    let temp = 0;
    let isThereFalse = false;
    let isThereTrue = false;
    for (let i in checkedPrices) {
      if (checkedPrices[i] === false) {
        isThereFalse = true;
      } else {
        isThereTrue = true;
        temp++;
      }
      isThereTrue ? setFixedButtonsShown(true) : setFixedButtonsShown(false);
      isThereFalse ? setMarkAll(false) : setMarkAll(true);
      setMarkedSum(temp);
    }
  }, [checkedPrices]);

  return (
    <div className={cl.PriceList}>
      <Header searchValue={searchInput} setSearchValue={handleSearchChange} />
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
      <div className={cl.up} />
      {fixedButtonsShown ? (
        <div className={cl.fixedbuttons}>
          <ButtonRound>Деакт.</ButtonRound>
          <ButtonRound>Удал.</ButtonRound>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
