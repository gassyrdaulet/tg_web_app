import React, { useEffect, useState, useCallback } from "react";
import cl from "./styles/newpriceform.module.css";
import { useInput } from "../../hooks/useInput";
import MyInput from "../UI/inputs/MyInput.jsx";
import ErrorList from "../UI/other/ErrorList";
import { useTelegram } from "../../hooks/useTelegram.js";
import Header from "../Header";
import questionmark from "../../img/questionmark.svg";
import MyCheckBox from "../UI/inputs/MyCheckBox.jsx";
import { newUser } from "../../API/PricesService.js";
import Select from "react-select";
import cities from "../../cities.json";

export default function RegistrationPage() {
  const { props: cellPhoneProps, ...cellPhone } = useInput(
    "",
    { isEmpty: true, maxLength: 15, cellPhone: true },
    "tel"
  );
  const { props: nameProps, ...name } = useInput(
    "",
    { isEmpty: true, minLength: 1, maxLength: 20 },
    "name"
  );
  const { props: passProps, ...pass } = useInput(
    "",
    { isEmpty: true, minLength: 8, maxLength: 20, password: true },
    "text"
  );
  const { props: dampProps, ...damp } = useInput(
    "",
    { isEmpty: true, minLength: 1, maxLength: 3 },
    "number"
  );
  const { props: storeNameProps, ...storeName } = useInput(
    "",
    { isEmpty: true, maxLength: 20 },
    "text"
  );
  const { props: storeIdProps, ...storeId } = useInput(
    "",
    { isEmpty: true, maxLength: 20 },
    "number"
  );
  const [pp1ch, setpp1ch] = useState(true);
  const [pp2ch, setpp2ch] = useState(false);
  const [pp3ch, setpp3ch] = useState(false);
  const [pp4ch, setpp4ch] = useState(false);
  const [pp5ch, setpp5ch] = useState(false);
  const [city, setCity] = useState("");
  const [isAvailabilityError, setIsAvailabilityError] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const showHintBtn = true;
  const { tg, queryId, user } = useTelegram();

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
      marginTop: "5px",
      minWidth: 195,
      maxWidth: 195,
      maxHeight: 38,
      fontSize: 11,
      background: "white",
      border: "1px solid #c0c0c0",
      borderRadius: "1px",
      cursor: "pointer",
    }),
    dropdownIndicatorStyles: () => ({}),
  };
  const onSendData = useCallback(async () => {
    const available_storages = [];
    if (pp1ch) {
      available_storages.push(1);
    }
    if (pp2ch) {
      available_storages.push(2);
    }
    if (pp3ch) {
      available_storages.push(3);
    }
    if (pp4ch) {
      available_storages.push(4);
    }
    if (pp5ch) {
      available_storages.push(5);
    }
    const telegramData = {
      telegram_id: user?.id,
      telephone_number: cellPhoneProps.value,
      name: nameProps.value,
      password: passProps.value,
      damp: dampProps.value,
      city: city.value,
      store_name: storeNameProps.value,
      store_id: storeIdProps.value,
      available_storages: available_storages.toLocaleString(),
    };
    await newUser(user.id, telegramData, queryId);
    // tg.sendData(JSON.stringify(telegramData));
  }, [
    cellPhoneProps.value,
    nameProps.value,
    passProps.value,
    city,
    storeNameProps.value,
    storeIdProps.value,
    pp1ch,
    pp2ch,
    pp3ch,
    pp4ch,
    pp5ch,
  ]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);
  useEffect(() => {
    if (pp1ch || pp2ch || pp3ch || pp4ch || pp5ch) {
      setIsAvailabilityError(false);
    } else {
      setIsAvailabilityError(true);
    }
  }, [pp1ch, pp2ch, pp3ch, pp4ch, pp5ch]);
  useEffect(() => {
    tg.MainButton.setParams({
      text: "Зарегистрироваться",
    });
  }, []);
  useEffect(() => {
    const temp = [];
    for (let city of cities.data) {
      if (city.attributes.active === true) {
        temp.push({
          value: city.attributes.code,
          label: city.attributes.name,
        });
      }
    }
    setCityOptions(temp);
  }, [cities]);
  useEffect(() => {
    if (
      city === "" ||
      cellPhone.inValid ||
      name.inValid ||
      pass.inValid ||
      storeId.inValid ||
      storeName.inValid ||
      isAvailabilityError
    ) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [
    city,
    cellPhone.inValid,
    name.inValid,
    pass.inValid,
    storeId.inValid,
    storeName.inValid,
    isAvailabilityError,
  ]);

  return (
    <div className={cl.NewPrice}>
      <Header searchable={false} infoButton={true} />
      <div className={cl.pageTitle}>
        <p>Страница регистарции.</p>
        <button onClick={onSendData}>CLICK IT</button>
        <p>Все поля обязательны.</p>
        <p>
          После полного заполнения внизу <br /> появится кнопка регистрации.
        </p>
      </div>
      <div className={cl.inputsContainer}>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Введите номер телефона:</div>
            <div className={cl.input}>
              <MyInput
                {...cellPhoneProps}
                placeholder="87*********"
                inputMode="tel"
                type="text"
              />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>
              {cellPhone.isDirty ? cellPhone.errorText : ""}
            </ErrorList>
          </span>
        </div>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Введите свое имя:</div>
            <div className={cl.input}>
              <MyInput {...nameProps} type="text" placeholder="Арсен" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{name.isDirty ? name.errorText : ""}</ErrorList>
          </span>
        </div>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Введите свой новый пароль:</div>
            <div className={cl.input}>
              <MyInput {...passProps} placeholder="Qwerty123" type="text" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{pass.isDirty ? pass.errorText : ""}</ErrorList>
          </span>
        </div>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Выберите город:</div>
            <div className={cl.input}>
              <Select
                defaultValue={city}
                placeholder="Выберите..."
                onChange={(value) => setCity(value)}
                styles={selectStyle}
                options={cityOptions}
              />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{city.isDirty ? city.errorText : ""}</ErrorList>
          </span>
        </div>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Демп:</div>
            <div className={cl.input}>
              <MyInput
                {...dampProps}
                placeholder="Не больше 999"
                type="text"
                inputMode="numeric"
              />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{damp.isDirty ? damp.errorText : ""}</ErrorList>
          </span>
        </div>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Название магазина:</div>
            <div className={cl.input}>
              <MyInput
                {...storeNameProps}
                placeholder="МойМагазин"
                type="text"
              />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>
              {storeName.isDirty ? storeName.errorText : ""}
            </ErrorList>
          </span>
        </div>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>ИД магазина:</div>
            <div className={cl.input}>
              <MyInput
                {...storeIdProps}
                placeholder="51546987"
                inputMode="numeric"
                type="text"
              />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{storeId.isDirty ? storeId.errorText : ""}</ErrorList>
          </span>
        </div>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Доступность складов:</div>
            <div className={cl.availabilities}>
              <div>
                <div>
                  <MyCheckBox
                    checked={pp1ch ? pp1ch : false}
                    onChange={(e) => {
                      setpp1ch(e.target.checked);
                    }}
                  />
                </div>
                <p>PP1</p>
              </div>
              <div>
                <div>
                  <MyCheckBox
                    checked={pp2ch ? pp2ch : false}
                    onChange={(e) => {
                      setpp2ch(e.target.checked);
                    }}
                  />
                </div>
                <p>PP2</p>
              </div>
              <div>
                <div>
                  <MyCheckBox
                    checked={pp3ch ? pp3ch : false}
                    onChange={(e) => {
                      setpp3ch(e.target.checked);
                    }}
                  />
                </div>
                <p>PP3</p>
              </div>
              <div>
                <div>
                  <MyCheckBox
                    checked={pp4ch ? pp4ch : false}
                    onChange={(e) => {
                      setpp4ch(e.target.checked);
                    }}
                  />
                </div>
                <p>PP4</p>
              </div>
              <div>
                <div>
                  <MyCheckBox
                    checked={pp5ch ? pp5ch : false}
                    onChange={(e) => {
                      setpp5ch(e.target.checked);
                    }}
                  />
                </div>
                <p>PP5</p>
              </div>
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>
              {isAvailabilityError ? "Выберите хотя бы один склад." : ""}
            </ErrorList>
          </span>
        </div>
      </div>

      <div></div>
    </div>
  );
}
