import React from "react";
import cl from "./styles/header.module.css";
import { useTelegram } from "../hooks/useTelegram";

export default function header() {
  const { user } = useTelegram();
  return (
    <div className={cl.header}>
      <span className={cl.username}>
        <p>{user ? user.username : "Пользователь"}</p>
        <div className={cl.searchButton} />
      </span>
    </div>
  );
}
