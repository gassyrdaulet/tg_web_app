import React, { useEffect, useState } from "react";
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
    if (!nameProps.value.length === 0 || name.inValid) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [nameProps.value, name.inValid]);

  return (
    <div>
      <div className="horizontal">
        {console.log(tg.initData.hash)}
        <MyInput {...nameProps} type="text" />
        <ErrorList>{name.isDirty ? name.errorText : ""}</ErrorList>
      </div>
    </div>
  );
}
