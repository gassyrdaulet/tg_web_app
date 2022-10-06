import React from "react";
import cl from "../styles/MyCheckBox.module.css";

export default function MyCheckBox({ checked, onChange }) {
  return (
    <label className={cl.CheckBox}>
      <input checked={checked} onChange={onChange} type={"checkbox"} />
      <span className={cl.RoundCheckBox} />
    </label>
  );
}
