import axios from "axios";
const serverURL = "https://jackmarket.kz:2222";

export const getAllPrices = async (fromId) => {
  const { data } = await axios.post(serverURL, {
    fromId,
  });
  fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: fromId,
  }).then((result) => {
    console.log(result);
  });
  return data;
};
