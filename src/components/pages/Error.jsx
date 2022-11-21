import React from "react";
import cl from "./styles/Error.module.css";
import telegram from "../../img/telegram.svg";

export default function Error() {
  return (
    <div className={cl.Error}>
      <div className={cl.info}>
        <div className={cl.text}>
          <h1>Эта страница недоступна в браузере.</h1>
        </div>
        <div className={cl.icon}>
          <img src={telegram} alt="Телеграм Мессенджер." />
          <a href="https://t.me/KaspiDampingBot">
            <p>Откройте Telegram.</p>
          </a>
        </div>
      </div>
    </div>
  );
}
