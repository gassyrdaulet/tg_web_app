import React from "react";
import cl from "./styles/header.module.css";
import Button from "./UI/buttons/Button.jsx";
import { useTelegram } from "../hooks/useTelegram";

export default function header() {
  const { onClose, tg, user, onToggleButton } = useTelegram();
  return (
    <div className={cl.header}>
      <Button onClick={onClose}>Close</Button>
      <span className={cl.username}>{user?.username}</span>
    </div>
  );
}
