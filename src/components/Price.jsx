import React, { useEffect, useState } from "react";
import cl from "../components/styles/Price.module.css";
import greenglow from "../img/greenglow.png";
import redglow from "../img/redglow.png";
import ButtonRound from "./UI/buttons/ButtonRound.jsx";
import MyCheckBox from "./UI/inputs/MyCheckBox";

export default function Price({ data, index, checked, markCheck }) {
  return (
    <div className={cl.Price + " " + (checked ? cl.checked : "")}>
      <div className={cl.horizontalthree}>
        <div className={cl.index}>
          <div>
            <MyCheckBox
              checked={checked ? checked : false}
              onChange={(e) => {
                markCheck(data.id, e.target.checked);
              }}
            ></MyCheckBox>
          </div>
          <div className={cl.hint}>{index + 1}</div>
        </div>
        <div>
          {data.activated === "yes" ? (
            <img src={greenglow} />
          ) : (
            <img src={redglow} />
          )}
        </div>
        <div className={cl.hint}>{data.id}</div>
      </div>
      <div className={cl.sku}>
        <a href={data.url}>{data.suk}</a>
      </div>
      <div className={cl.model}>{data.brand + " " + data.model}</div>
      <div className={cl.category}>
        <p className={cl.hint}>
          {data.category ? data.category : "Категория"}{" "}
          {new Date(data.date).toLocaleString("ru")}
        </p>
      </div>
      <div className={cl.horizontalthree}>
        <div className={cl.cost}>
          <div className={cl.hint}>Мин.:</div>
          <div>{data.minprice}</div>
        </div>
        <div className={cl.cost}>
          <div className={cl.hint}>Сейч.:</div>
          <div>{data.actualprice}</div>
        </div>
        <div className={cl.cost}>
          <div className={cl.hint}>Макс.:</div>
          <div>{data.maxprice}</div>
        </div>
      </div>
      <div className={cl.horizontaltwo}>
        <div className={cl.pp}>
          <p className={cl.hint}>PP:</p>
          <p
            className={
              data.availability?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            1
          </p>
          <p
            className={
              data.availability2?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            2
          </p>
          <p
            className={
              data.availability3?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            3
          </p>
          <p
            className={
              data.availability4?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            4
          </p>
          <p
            className={
              data.availability5?.$?.available === "yes" ? cl.ppgreen : cl.ppred
            }
          >
            5
          </p>
        </div>
        <div className={cl.buttons}>
          <ButtonRound>Деакт.</ButtonRound>
          <ButtonRound>Удал.</ButtonRound>
          <ButtonRound>Ред.</ButtonRound>
        </div>
      </div>
    </div>
  );
}
