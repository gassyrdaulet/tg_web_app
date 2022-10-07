import React from "react";
import Price from "./Price";
import cl from "./styles/Prices.module.css";

export default function ({ data, checkedPrices, markCheck, markedSum }) {
  return (
    <div className={cl.Prices}>
      <div className={cl.resultsum}>
        <p>Всего результатов: {data.length}</p>
        <p>Отмечено: {markedSum}</p>
      </div>
      {data.map((price, index) => (
        <Price
          markCheck={markCheck}
          checked={checkedPrices[price.id]}
          key={price.id}
          data={price}
          index={index}
        />
      ))}
      <div className={cl.extraplace} />
    </div>
  );
}
