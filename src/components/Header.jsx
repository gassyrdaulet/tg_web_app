import React, { useState } from "react";
import cl from "./styles/header.module.css";
import { useTelegram } from "../hooks/useTelegram";
import MyInputSearch from "../components/UI/inputs/MyInputSearch.jsx";
import { Link } from "react-router-dom";

export default function header({
  goBack = false,
  searchValue = null,
  setSearchValue = null,
  searchable = true,
  infoButton = false,
}) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { user } = useTelegram();
  return (
    <div className={cl.header}>
      {searchable ? (
        isSearchActive ? (
          <span className={cl.username}>
            <MyInputSearch
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className={cl.searchinput}
              type="text"
            />
            <div
              onClick={() => {
                setIsSearchActive(!isSearchActive);
                setSearchValue("");
              }}
              className={cl.closebutton}
            />
          </span>
        ) : (
          <span className={cl.username}>
            <p>
              {user
                ? user.username.length > 15
                  ? user.username.substring(0, 12) + "..."
                  : user.username
                : "Пользователь"}
            </p>
            <div
              className={cl.searchButton}
              onClick={() => setIsSearchActive(!isSearchActive)}
            />
          </span>
        )
      ) : (
        ""
      )}
      {infoButton ? (
        <span className={cl.username}>
          {goBack ? (
            <Link className={cl.link} to="/">
              Назад
            </Link>
          ) : (
            ""
          )}
          <p>
            {user
              ? user.username.length > 15
                ? user.username.substring(0, 12) + "..."
                : user.username
              : "Пользователь"}
          </p>
          <div
            className={cl.infoButton}
            onClick={() => console.log("Not available yet!")}
          />
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
