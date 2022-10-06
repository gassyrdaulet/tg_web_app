import React from "react";
import cl from "../styles/MyInputSearch.module.css";

function MyInput({
  type,
  placeholder,
  list,
  value,
  onChange,
  onBlur,
  inputMode,
}) {
  if (onChange === undefined) {
    onChange = () => {
      console.log("empty");
    };
  }
  return (
    <input
      list={list}
      onChange={onChange}
      inputMode={inputMode ? inputMode : "text"}
      className={cl.MyInput}
      type={type}
      onBlur={onBlur}
      placeholder={placeholder}
      value={value}
    />
  );
}

export default MyInput;
