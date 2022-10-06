import React from "react";
import Price from "./Price";
import cl from "./styles/Prices.module.css";

export default function ({ data, checkedPrices, markCheck }) {
  return (
    <div className={cl.Prices}>
      <div className={cl.resultsum}>
        <p>Всего результатов: {data.length}</p>
        <p>Отмечено: {data.length}</p>
      </div>
      {data.map((price, index) => (
        <Price
          markCheck={markCheck}
          checked={checkedPrices[index]}
          key={price.id}
          data={price}
          index={index}
        />
      ))}
      <div className={cl.extraplace} />
    </div>
  );
}
