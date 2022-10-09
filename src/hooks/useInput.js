import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValue, validations, limiter) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const onChange = (e) => {
    let temp = "";
    if (limiter === "street") {
      temp = e.target.value
        .replace(/([^a-zа-яё0-9-,.\s])/gi, "")
        .replace(/-+/gi, "-")
        .substring(0, 99);
      setValue(temp);
    } else if (limiter === "tel") {
      temp = e.target.value
        .replace(/\s|[^0-9-+()]/gi, "")
        .replace(/-+/gi, "-")
        .replace(/\)+/gi, ")")
        .replace(/\(+/gi, "(")
        .replace(/\++/gi, "+")
        .substring(0, 13);
      setValue(temp);
    } else if (limiter === "number") {
      temp = e.target.value.replace(/^0{1,}|[^0-9]/gim, "").substring(0, 7);
      setValue(temp);
    } else if (limiter === "text") {
      temp = e.target.value
        .replace(/[^0-9а-яa-z\s\.\,\/\-\_\@\#\%\&\*\(\)\@\!]/gi, "")
        .substring(0, 50);
      setValue(temp);
    } else if (limiter === "house") {
      temp = e.target.value.replace(/^0{1,}|[^0-9\/]/gim, "").substring(0, 5);
      setValue(temp);
    } else if (limiter === "price") {
      temp = e.target.value
        .replace(/^0{2,}|^0.|[^0-9\/]/gim, "")
        .substring(0, 9);
      setValue(temp);
    } else {
      setValue(e.target.value);
    }
  };

  const onBlur = (e) => {
    setIsDirty(true);
  };

  const valid = useValidation(value, validations);

  return {
    props: {
      isInvalid: isDirty && valid.inValid,
      value,
      onChange,
      onBlur,
    },
    isDirty,
    ...valid,
    setIsDirty,
    setValue,
  };
};
