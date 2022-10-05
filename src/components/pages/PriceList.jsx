import React, { useEffect, useState } from "react";
import cl from "./styles/pricelist.module.css";
import { getAllPrices } from "../../API/PricesService";
import Prices from "../Prices.jsx";

export default function Pricelist() {
  const [prices, setPrices] = useState([]);

  const fetchPrices = async () => {
    try {
      setPrices(await getAllPrices("767355250"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div>
      <Prices data={prices} />
    </div>
  );
}
