import React, { useEffect } from "react";
import cl from "./styles/newpriceform.module.css";
import { useInput } from "../../hooks/useInput";
import MyInput from "../UI/inputs/MyInput";
import ErrorList from "../UI/other/ErrorList";
import { useTelegram } from "../../hooks/useTelegram.js";

export default function Newpriceform() {
  const { props: nameProps, ...name } = useInput(
    "",
    { isEmpty: true, maxLength: 10 },
    "text"
  );
  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  useEffect(() => {
    if (!name.inValid) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [nameProps.value]);

  return (
    <div>
      <div className="horizontal">
        <MyInput {...nameProps} type="text" />
        <ErrorList>{name.errorText}</ErrorList>
      </div>
    </div>
  );
}
