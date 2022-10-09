import React, { useEffect, useState, useCallback } from "react";
import cl from "./styles/newpriceform.module.css";
import { useInput } from "../../hooks/useInput";
import MyInput from "../UI/inputs/MyInput";
import ErrorList from "../UI/other/ErrorList";
import { useTelegram } from "../../hooks/useTelegram.js";
import Header from "../Header";
import questionmark from "../../img/questionmark.svg";
import MyCheckBox from "../UI/inputs/MyCheckBox";

export default function NewPriceForm() {
  const { props: skuProps, ...sku } = useInput(
    "",
    { isEmpty: true, maxLength: 25 },
    "text"
  );
  const { props: nameProps, ...name } = useInput(
    "",
    { isEmpty: true, maxLength: 25 },
    "text"
  );
  const { props: modelProps, ...model } = useInput(
    "",
    { isEmpty: true, maxLength: 150 },
    "text"
  );
  const { props: brandProps, ...brand } = useInput(
    "",
    { isEmpty: true, maxLength: 25 },
    "text"
  );
  const { props: categoryProps, ...category } = useInput(
    "",
    { isEmpty: true, maxLength: 15 },
    "text"
  );
  const { props: minPriceProps, ...minPrice } = useInput(
    "",
    { isEmpty: true },
    "price"
  );
  const { props: maxPriceProps, ...maxPrice } = useInput(
    "",
    { isEmpty: true },
    "price"
  );
  const [pp1ch, setpp1ch] = useState(false);
  const [pp2ch, setpp2ch] = useState(false);
  const [pp3ch, setpp3ch] = useState(false);
  const [pp4ch, setpp4ch] = useState(false);
  const [pp5ch, setpp5ch] = useState(false);

  const [arePricesError, setArePricesError] = useState(false);
  const [isAvailabilityError, setIsAvailabilityError] = useState(false);

  const { tg } = useTelegram();
  const showHintBtn = true;

  const onSendData = useCallback(() => {
    const data = {
      method: "new",
      suk: sku,
      suk2: name,
      model,
      brand,
      category,
      minprice: minPrice,
      availability: pp1ch,
      availability2: pp2ch,
      availability3: pp3ch,
      availability4: pp4ch,
      availability5: pp5ch,
      maxprice: maxPrice,
    };
    tg.sendData(JSON.stringify(data));
  });

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, []);
  useEffect(() => {
    if (pp1ch || pp2ch || pp3ch || pp4ch || pp5ch) {
      setIsAvailabilityError(false);
    } else {
      setIsAvailabilityError(true);
    }
  }, [pp1ch, pp2ch, pp3ch, pp4ch, pp5ch]);
  useEffect(() => {
    if (parseInt(minPriceProps.value) >= parseInt(maxPriceProps.value)) {
      setArePricesError(true);
    } else {
      setArePricesError(false);
    }
  }, [minPriceProps.value, maxPriceProps.value]);
  useEffect(() => {
    tg.MainButton.setParams({
      text: "Сохранить прайс",
    });
  }, []);
  useEffect(() => {
    if (
      sku.inValid ||
      name.inValid ||
      model.inValid ||
      brand.inValid ||
      category.inValid ||
      minPrice.inValid ||
      maxPrice.inValid ||
      arePricesError ||
      isAvailabilityError
    ) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [
    sku.inValid,
    name.inValid,
    model.inValid,
    brand.inValid,
    category.inValid,
    minPrice.inValid,
    maxPrice.inValid,
    arePricesError,
    isAvailabilityError,
  ]);

  return (
    <div className={cl.NewPrice}>
      <Header searchable={false} infoButton={true} />
      <div className={cl.pageTitle}>
        <p>Страница добавления нового прайса.</p>
        <p>Все поля обязательны.</p>
        <p>
          После полного заполнения внизу <br /> появится кнопка сохранения.
        </p>
      </div>
      <div className={cl.inputsContainer}>
        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Уникальный идентификатор:</div>
            <div className={cl.input}>
              <MyInput {...skuProps} type="text" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{sku.isDirty ? sku.errorText : ""}</ErrorList>
          </span>
        </div>

        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>
              Наименование в системе продавца:
            </div>
            <div className={cl.input}>
              <MyInput {...nameProps} type="text" />
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
            <div className={cl.inputTitle}>Модель:</div>
            <div className={cl.input}>
              <MyInput {...modelProps} type="text" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{model.isDirty ? model.errorText : ""}</ErrorList>
          </span>
        </div>

        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Бренд:</div>
            <div className={cl.input}>
              <MyInput {...brandProps} type="text" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{brand.isDirty ? brand.errorText : ""}</ErrorList>
          </span>
        </div>

        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Категория:</div>
            <div className={cl.input}>
              <MyInput {...categoryProps} type="text" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>{category.isDirty ? category.errorText : ""}</ErrorList>
          </span>
        </div>

        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Минимальная цена:</div>
            <div className={cl.input}>
              <MyInput {...minPriceProps} inputMode="numeric" type="text" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>
              {arePricesError
                ? "Минимальная цена не может быть больше максимальной или быть ей равной.\n"
                : "" + minPrice.isDirty
                ? minPrice.errorText
                : ""}
            </ErrorList>
          </span>
        </div>

        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Максимальная цена:</div>
            <div className={cl.input}>
              <MyInput {...maxPriceProps} inputMode="numeric" type="text" />
            </div>
          </span>
          <span className={cl.errors}>
            <ErrorList>
              {arePricesError
                ? "Минимальная цена не может быть больше максимальной или быть ей равной.\n"
                : "" + maxPrice.isDirty
                ? maxPrice.errorText
                : ""}
            </ErrorList>
          </span>
        </div>

        <div className={cl.inputItem}>
          <span className={cl.hint}>
            {showHintBtn ? <img src={questionmark} /> : ""}
          </span>
          <span className={cl.inputWrapper}>
            <div className={cl.inputTitle}>Доступность в складах:</div>
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
      {/* {tg.initData} */}
    </div>
  );
}
