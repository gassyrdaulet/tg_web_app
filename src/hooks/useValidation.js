import { useState, useEffect } from "react";

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cellPhoneError, setCellPhoneError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setErrorText("");
    let text = "";
    for (const validation in validations) {
      switch (validation) {
        case "cellPhone":
          if (
            !value.match(
              /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/i
            )
          ) {
            setCellPhoneError(true);
            text += "Неверный  формат номера телефона!\n";
          } else {
            setCellPhoneError(false);
          }
          break;
        case "password":
          if (
            !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i)
          ) {
            setPasswordError(true);
            text +=
              "Пароль должен состоять только из английских букв и цифр. Пароль должен содержать как минимум одну заглавную букву, одну строчную, и одну цифру.\n";
          } else {
            setPasswordError(false);
          }
          break;

        case "email":
          if (
            !value
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          ) {
            setEmailError(true);
            text += `Некорректный E-mail.\n`;
          } else {
            setEmailError(false);
          }
          break;
        case "minLength":
          if (value.length < validations[validation]) {
            setMinLengthError(true);
            text += `Минимальная длина - ${validations[validation]}.\n`;
          } else {
            setMinLengthError(false);
          }
          break;
        case "maxLength":
          if (value.length > validations[validation]) {
            setMaxLengthError(true);
            text += `Максимальная длина - ${validations[validation]}.\n`;
          } else {
            setMaxLengthError(false);
          }
          break;
        case "isEmpty":
          if (value) {
            setEmpty(false);
          } else {
            setEmpty(true);
            text += "Поле не может быть пустым.\n";
          }
          break;
        case "editpassword":
          if (value === "") {
            setPasswordError(false);
            setEmpty(false);
          } else if (
            !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/i)
          ) {
            setPasswordError(true);
            text +=
              "Пароль должен состоять только из английских букв и цифр. Пароль должен содержать как минимум одну заглавную букву, одну строчную, и одну цифру.\n";
          } else {
            setPasswordError(false);
          }
          break;
        case "noValidation":
          setEmpty(false);
          break;
      }
      if (text.length !== 0) {
        setErrorText(text.substring(0, text.length - 2) + ".");
      }
    }
  }, [value]);

  return {
    errorText,
    inValid:
      isEmpty ||
      minLengthError ||
      maxLengthError ||
      emailError ||
      passwordError,
  };
};
