import React from "react";
import cl from "../styles/button.module.css";

export default function Button(props) {
  return (
    <div {...props} className={cl.button + " " + props.className}>
      {props.children}
    </div>
  );
}
