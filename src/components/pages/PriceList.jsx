import React, { useEffect, useMemo, useState, useRef } from "react";
import { useScroll } from "framer-motion";
import cl from "./styles/pricelist.module.css";
import {
  getAllPrices,
  getBrands,
  getCategories,
} from "../../API/PricesService";
import Prices from "../Prices.jsx";
import Header from "../Header.jsx";
import MyCheckBox from "../UI/inputs/MyCheckBox";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ButtonRound from "../UI/buttons/ButtonRound.jsx";
import debounce from "lodash.debounce";
import { useTelegram } from "../../hooks/useTelegram";

export default function Pricelist() {
  const fromId = "767355250";
  const storeId = "15503068";
  const [copied, setCopied] = useState(false);
  const [prices, setPrices] = useState([]);
  const [checkedPrices, setCheckedPrices] = useState({});
  const [markAll, setMarkAll] = useState(false);
  const [markedSum, setMarkedSum] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [fixedButtonsShown, setFixedButtonsShown] = useState(false);
  const refScrollUp = useRef(null);
  const { scrollY } = useScroll();
  const [showGoTop, setshowGoTop] = useState(false);
  const [firstSortSelectValue, setFirstSortSelectValue] = useState({
    value: "brand",
    label: "По бренду",
  });
  const [modelSelectValue, setModelSortSelectValue] = useState({
    value: 1,
    label: "По возраст.",
  });
  const [activatedSelectValue, setActivatedSortSelectValue] = useState({
    value: "all",
    label: "Все",
  });
  const [categorySelectValue, setCategorySortSelectValue] = useState({
    value: "all",
    label: "Все",
  });
  const [brandSelectValue, setBrandSortSelectValue] = useState({
    value: "all",
    label: "Все",
  });
  const [availabilitySelectValue, setAvailabilitySortSelectValue] = useState({
    value: "all",
    label: "Все",
  });
  const [idSelectValue, setIdSortSelectValue] = useState({
    value: 1,
    label: "По возраст.",
  });
  const [dateSelectValue, setDateSortSelectValue] = useState({
    value: 1,
    label: "Сперва новые",
  });

  const { tg } = useTelegram();

  const getMarkedIdsArray = () => {
    let array = [];
    for (let key in checkedPrices) {
      if (checkedPrices[key] === true) {
        array.push(parseInt(key));
      }
    }
    return array;
  };

  const deactivate = () => {
    const data = {
      method: "deactivate",
      id: getMarkedIdsArray(),
    };
    tg.sendData(JSON.stringify(data));
  };
  const activate = () => {
    const data = {
      method: "activate",
      id: getMarkedIdsArray(),
    };
    tg.sendData(JSON.stringify(data));
  };
  const deleteprices = () => {
    const data = {
      method: "delete",
      id: getMarkedIdsArray(),
    };
    tg.sendData(JSON.stringify(data));
  };

  const handleOnCopy = () => {
    setCopied(true);
    setTimeout(setCopied, 2000, false);
  };
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 60) {
        setshowGoTop(true);
      } else if (latest < 60) {
        setshowGoTop(false);
      }
    });
  }, []);
  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  const _searchBrands = (inputValue, callback) => {
    getBrands(inputValue, fromId).then((resp) => callback(resp));
  };
  const _searchCategories = (inputValue, callback) => {
    getCategories(inputValue, fromId).then((resp) => callback(resp));
  };
  const searchBrands = debounce(_searchBrands, 800);
  const searchCategories = debounce(_searchCategories, 800);

  const fetchPrices = async () => {
    try {
      setPrices(await getAllPrices(fromId));
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

  const options = [
    { value: "model", label: "По наименов." },
    { value: "activated", label: "По активности" },
    { value: "category", label: "По категории" },
    { value: "brand", label: "По бренду" },
    { value: "availability", label: "По складам" },
    { value: "id", label: "По ID" },
    { value: "date", label: "Дата обновления" },
  ];
  const availabilityOptions = [
    { value: "all", label: "Все" },
    { value: "nowhere", label: "Нигде" },
    { value: "", label: "PP1" },
    { value: "2", label: "PP2" },
    { value: "3", label: "PP3" },
    { value: "4", label: "PP4" },
    { value: "5", label: "PP5" },
  ];
  const whichFirstOptionsDate = [
    { value: 1, label: "Сперва новые" },
    { value: -1, label: "Сперва старые" },
  ];
  const whichFirstOptionsActivation = [
    {
      value: "all",
      label: "Все",
    },
    {
      value: "yes",
      label: "Активные",
    },
    {
      value: "no",
      label: "Неактивные",
    },
  ];
  const whichFirstOptions = [
    { value: 1, label: "По возраст." },
    { value: -1, label: "По убыванию" },
  ];
  const selectStyle = {
    option: (provided) => ({
      ...provided,
      fontSize: 8,
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
    }),
    menuList: (provided) => ({
      ...provided,
      zIndex: 1000,
    }),
    control: () => ({
      display: "flex",
      minWidth: 88,
      maxWidth: 88,
      maxHeight: 38,
      fontSize: 11,
      background: "white",
      border: "1px solid #c0c0c0",
      borderRadius: "5px",
      cursor: "pointer",
    }),
    dropdownIndicatorStyles: () => ({}),
  };

  const sortedPrices = useMemo(() => {
    try {
      let sortedArray = [];
      switch (firstSortSelectValue.value) {
        case "model":
          sortedArray = [...prices].sort((a, b) => {
            return modelSelectValue.value * a.model.localeCompare(b.model);
          });
          return sortedArray;
        case "activated":
          sortedArray = [...prices].sort((a, b) => {
            return b.activated?.localeCompare(a.activated);
          });
          if (activatedSelectValue?.value !== "all") {
            sortedArray = [...sortedArray].filter((price) => {
              return price.activated.includes(activatedSelectValue.value);
            });
          }
          return sortedArray;
        case "category":
          sortedArray = [...prices].sort((a, b) => {
            return a.category.localeCompare(b.category);
          });
          if (categorySelectValue?.value !== "all") {
            sortedArray = [...sortedArray].filter((price) => {
              return price.category.includes(categorySelectValue.value);
            });
          }
          return sortedArray;
        case "brand":
          sortedArray = [...prices].sort((a, b) => {
            return a.brand.localeCompare(b.brand);
          });
          if (brandSelectValue?.value !== "all") {
            sortedArray = [...sortedArray].filter((price) => {
              return price.brand.includes(brandSelectValue.value);
            });
          }
          return sortedArray;
        case "availability":
          sortedArray = [...prices].sort((a, b) => {
            return a.brand.localeCompare(b.brand);
          });
          if (availabilitySelectValue.value === "nowhere") {
            sortedArray = [...sortedArray].filter((price) => {
              let nowhere = true;
              for (let i = 1; i <= 5; i++) {
                if (price["availability"].$.available === "yes") {
                  nowhere = false;
                  break;
                }
              }
              return nowhere;
            });
          }
          if (availabilitySelectValue.value === "all") {
            return sortedArray;
          }
          sortedArray = [...sortedArray].filter((price) => {
            return (
              price["availability" + availabilitySelectValue.value].$
                .available === "yes"
            );
          });
          return sortedArray;
        case "id":
          sortedArray = [...prices].sort((a, b) => {
            return idSelectValue.value * (a.id - b.id);
          });
          return sortedArray;
        case "date":
          sortedArray = [...prices].sort((a, b) => {
            return (
              dateSelectValue.value *
              (b.date < a.date ? -1 : b.date > a.date ? 1 : 0)
            );
          });
          return sortedArray;
        default:
          return [];
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [
    prices,
    firstSortSelectValue,
    modelSelectValue,
    activatedSelectValue,
    categorySelectValue,
    brandSelectValue,
    availabilitySelectValue,
    idSelectValue,
    dateSelectValue,
  ]);
  const filteredPrices = useMemo(() => {
    try {
      const temp = [...sortedPrices].filter((price) => {
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
  }, [searchInput, sortedPrices]);

  useEffect(() => {
    handleMarkAll(false);
  }, [
    prices,
    firstSortSelectValue,
    modelSelectValue,
    activatedSelectValue,
    categorySelectValue,
    brandSelectValue,
    availabilitySelectValue,
    idSelectValue,
    dateSelectValue,
  ]);
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
    for (let i in checkedPrices) {
      if (checkedPrices[i] === false) {
        isThereFalse = true;
      } else {
        temp++;
      }
      temp > 0 ? setFixedButtonsShown(true) : setFixedButtonsShown(false);
      isThereFalse ? setMarkAll(false) : setMarkAll(true);
      setMarkedSum(temp);
    }
  }, [checkedPrices]);

  const renderSwitch = (param) => {
    switch (param) {
      case "model":
        return (
          <Select
            key={param}
            defaultValue={modelSelectValue}
            onChange={(value) => setModelSortSelectValue(value)}
            isSearchable={false}
            placeholder="Выберите..."
            styles={selectStyle}
            options={whichFirstOptions}
          />
        );
      case "activated":
        return (
          <Select
            key={param}
            defaultValue={activatedSelectValue}
            isSearchable={false}
            placeholder="Выберите..."
            styles={selectStyle}
            options={whichFirstOptionsActivation}
            onChange={(value) => setActivatedSortSelectValue(value)}
          />
        );
      case "category":
        return (
          <AsyncSelect
            defaultValue={categorySelectValue}
            defaultOptions={[{ value: "all", label: "Все" }]}
            onChange={(value) => setCategorySortSelectValue(value)}
            key={param}
            loadOptions={searchCategories}
            placeholder="Выберите..."
            styles={selectStyle}
          />
        );
      case "brand":
        return (
          <AsyncSelect
            defaultValue={brandSelectValue}
            defaultOptions={[{ value: "all", label: "Все" }]}
            onChange={(value) => setBrandSortSelectValue(value)}
            key={param}
            loadOptions={searchBrands}
            placeholder="Выберите..."
            styles={selectStyle}
          />
        );
      case "availability":
        return (
          <Select
            defaultValue={availabilitySelectValue}
            onChange={setAvailabilitySortSelectValue}
            key={param}
            placeholder="Выберите..."
            styles={selectStyle}
            options={availabilityOptions}
          />
        );
      case "date":
        return (
          <Select
            defaultValue={dateSelectValue}
            onChange={setDateSortSelectValue}
            key={param}
            placeholder="Выберите..."
            styles={selectStyle}
            options={whichFirstOptionsDate}
          />
        );
      case "id":
        return (
          <Select
            defaultValue={idSelectValue}
            onChange={setIdSortSelectValue}
            key={param}
            placeholder="Выберите..."
            styles={selectStyle}
            options={whichFirstOptions}
          />
        );
      default:
        return "";
    }
  };

  return (
    <div ref={refScrollUp} className={cl.PriceList}>
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
          <Select
            defaultValue={firstSortSelectValue}
            options={options}
            isSearchable={false}
            placeholder="Выберите..."
            styles={selectStyle}
            onChange={(value) => setFirstSortSelectValue(value)}
          />
          {renderSwitch(firstSortSelectValue.value)}
        </div>
      </div>
      <Prices
        markCheck={markCheck}
        checkedPrices={checkedPrices}
        data={filteredPrices}
        markedSum={markedSum}
        storeId={storeId}
        handleOnCopy={handleOnCopy}
      />
      <p className={copied ? cl.copysuccessactive : cl.copysuccess}>
        Скопировано
      </p>
      {showGoTop ? <div onClick={handleScrollUp} className={cl.up} /> : ""}
      {fixedButtonsShown ? (
        <div className={cl.fixedbuttons}>
          <ButtonRound
            onClick={() => {
              tg.showConfirm(
                "Вы уверены что хотите активировать все выбранные прайсы?",
                (pressed) => {
                  if (pressed) {
                    activate();
                  }
                }
              );
            }}
          >
            Акт.
          </ButtonRound>
          <ButtonRound
            onClick={() => {
              tg.showConfirm(
                "Вы уверены что хотите деактивировать все выбранные прайсы?",
                (pressed) => {
                  if (pressed) {
                    deactivate();
                  }
                }
              );
            }}
          >
            Деакт.
          </ButtonRound>
          <ButtonRound
            onClick={() => {
              tg.showConfirm(
                "Вы уверены что хотите удалить все выбранные прайсы?",
                (pressed) => {
                  if (pressed) {
                    deleteprices();
                  }
                }
              );
            }}
          >
            Удал.
          </ButtonRound>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
