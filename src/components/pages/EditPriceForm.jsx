import React, { useEffect, useState } from "react";
import cl from "./styles/newpriceform.module.css";
import { useInput } from "../../hooks/useInput";
import MyInput from "../UI/inputs/MyInput.jsx";
import ErrorList from "../UI/other/ErrorList";
import { useTelegram } from "../../hooks/useTelegram.js";
import Header from "../Header";
import questionmark from "../../img/questionmark.svg";
import MyCheckBox from "../UI/inputs/MyCheckBox.jsx";
import { getPriceById } from "../../API/PricesService.js";
import { useParams } from "react-router-dom";

export default function EditPriceForm() {
  const [result, setResult] = useState({});
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

  const fromId = "767355250";
  const params = useParams();
  const { tg } = useTelegram();
  const showHintBtn = true;

  useEffect(() => {
    const fetchPriceInfo = async () => {
      setResult(await getPriceById(fromId, params.id));
    };
    fetchPriceInfo();
  }, []);
  useEffect(() => {
    sku.setValue(result.suk ? result.suk : "");
    name.setValue(result.suk2 ? result.suk2 : "");
    model.setValue(result.model ? result.model : "");
    brand.setValue(result.brand ? result.brand : "");
    category.setValue(result.category ? result.category : "");
    minPrice.setValue(result.minprice ? result.minprice : "");
    maxPrice.setValue(result.maxprice ? result.maxprice : "");
    setpp1ch(result.availability?.$.available === "yes");
    setpp2ch(result.availability?.$.available2 === "yes");
    setpp3ch(result.availability?.$.available3 === "yes");
    setpp4ch(result.availability?.$.available4 === "yes");
    setpp5ch(result.availability?.$.available5 === "yes");
  }, [result]);
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
    if (!nameProps.value.length === 0 || name.inValid) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [nameProps.value, name.inValid]);

  return (
    <div className={cl.NewPrice}>
      <Header goBack={true} searchable={false} infoButton={true} />
      <div className={cl.pageTitle}>
        <p>Страница редактирования прайса.</p>
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
