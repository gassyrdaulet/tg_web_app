import React from "react";
import Price from "./Price";
import cl from "./styles/Prices.module.css";

export default function ({ data }) {
  return (
    <div className={cl.Prices}>
      {data.map((price, index) => (
        <Price key={price.id} data={price} index={index} />
      ))}
    </div>
  );
}
