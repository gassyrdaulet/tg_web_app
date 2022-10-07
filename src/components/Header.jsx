import React, { useState } from "react";
import cl from "./styles/header.module.css";
import { useTelegram } from "../hooks/useTelegram";
import MyInputSearch from "../components/UI/inputs/MyInputSearch.jsx";

export default function header({ searchValue, setSearchValue }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { user } = useTelegram();
  return (
    <div className={cl.header}>
      {isSearchActive ? (
        <span className={cl.username}>
          <MyInputSearch
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className={cl.searchinput}
            type="text"
            name=""
            id=""
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
      )}
    </div>
  );
}
